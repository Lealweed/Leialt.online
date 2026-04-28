"use client";

import { useState, useEffect, useCallback } from "react";

export interface SaleEvent {
  id: string;
  type: "sale" | "lead" | "task" | "meeting";
  message: string;
  amount?: number;
  timeLabel: string; // pre-formatted string — avoids SSR/client mismatch
  agent: string;
}

export interface MetricState {
  revenue: number;
  sales: number;
  clients: number;
  conversion: number;
  leadsToday: number;
}

export interface ChartPoint {
  hour: string;
  revenue: number;
  leads: number;
  conversions: number;
}

// ── Deterministic initial chart data (no Math.random on module load) ──────────
const BASE_CHART: ChartPoint[] = [
  { hour: "00h", revenue: 3200, leads: 5, conversions: 2 },
  { hour: "01h", revenue: 2100, leads: 3, conversions: 1 },
  { hour: "02h", revenue: 1800, leads: 2, conversions: 1 },
  { hour: "03h", revenue: 1400, leads: 2, conversions: 0 },
  { hour: "04h", revenue: 1600, leads: 2, conversions: 1 },
  { hour: "05h", revenue: 2200, leads: 3, conversions: 1 },
  { hour: "06h", revenue: 4100, leads: 7, conversions: 3 },
  { hour: "07h", revenue: 7800, leads: 14, conversions: 6 },
  { hour: "08h", revenue: 14200, leads: 26, conversions: 11 },
  { hour: "09h", revenue: 19500, leads: 38, conversions: 15 },
  { hour: "10h", revenue: 22100, leads: 44, conversions: 18 },
  { hour: "11h", revenue: 24800, leads: 48, conversions: 20 },
  { hour: "12h", revenue: 18600, leads: 35, conversions: 14 },
  { hour: "13h", revenue: 21300, leads: 41, conversions: 17 },
  { hour: "14h", revenue: 25600, leads: 50, conversions: 21 },
  { hour: "15h", revenue: 27400, leads: 52, conversions: 22 },
  { hour: "16h", revenue: 23100, leads: 44, conversions: 18 },
  { hour: "17h", revenue: 20800, leads: 39, conversions: 16 },
  { hour: "18h", revenue: 16400, leads: 31, conversions: 12 },
  { hour: "19h", revenue: 13200, leads: 24, conversions: 10 },
  { hour: "20h", revenue: 10100, leads: 18, conversions: 7 },
  { hour: "21h", revenue: 7600, leads: 13, conversions: 5 },
  { hour: "22h", revenue: 5400, leads: 9, conversions: 3 },
  { hour: "23h", revenue: 3800, leads: 6, conversions: 2 },
];

// ── Deterministic initial events ──────────────────────────────────────────────
const INITIAL_EVENTS: SaleEvent[] = [
  { id: "e0", type: "sale", message: "Ana Lima fechou venda de R$1.800", amount: 1800, timeLabel: "1m atrás", agent: "Ana Lima" },
  { id: "e1", type: "lead", message: "Novo lead qualificado atribuído a Pedro Costa", timeLabel: "2m atrás", agent: "Pedro Costa" },
  { id: "e2", type: "task", message: "Carlos Melo concluiu 'Relatório mensal de IA'", timeLabel: "4m atrás", agent: "Carlos Melo" },
  { id: "e3", type: "meeting", message: "Julia Nunes iniciou reunião com cliente TikTok", timeLabel: "6m atrás", agent: "Julia Nunes" },
  { id: "e4", type: "sale", message: "Beatriz Alves fechou upsell de R$3.200", amount: 3200, timeLabel: "9m atrás", agent: "Beatriz Alves" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const agents = ["Ana Lima", "Pedro Costa", "Julia Nunes", "Carlos Melo", "Beatriz Alves"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function elapsed(startMs: number): string {
  const s = Math.floor((Date.now() - startMs) / 1000);
  if (s < 60) return `${s}s atrás`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m atrás`;
  return `${Math.floor(m / 60)}h atrás`;
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useLiveMetrics() {
  const [metrics, setMetrics] = useState<MetricState>({
    revenue: 247800,
    sales: 1847,
    clients: 394,
    conversion: 68.3,
    leadsToday: 127,
  });
  const [events, setEvents] = useState<SaleEvent[]>(INITIAL_EVENTS);
  const [chartData, setChartData] = useState<ChartPoint[]>(BASE_CHART);
  // track event timestamps for relative-time formatting
  const [eventTimestamps, setEventTimestamps] = useState<Record<string, number>>({});

  // Tick event labels every 10s
  useEffect(() => {
    const tick = setInterval(() => {
      setEvents((prev) =>
        prev.map((ev) => ({
          ...ev,
          timeLabel: eventTimestamps[ev.id] ? elapsed(eventTimestamps[ev.id]) : ev.timeLabel,
        }))
      );
    }, 10000);
    return () => clearInterval(tick);
  }, [eventTimestamps]);

  const addEvent = useCallback((event: Omit<SaleEvent, "id">) => {
    const id = `e-${Date.now()}`;
    const ts = Date.now();
    setEventTimestamps((prev) => ({ ...prev, [id]: ts }));
    setEvents((prev) => [{ ...event, id, timeLabel: "agora" }, ...prev].slice(0, 20));
  }, []);

  // Main simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      const roll = Math.random();
      const agent = pick(agents);

      if (roll < 0.5) {
        const amount = rand(350, 3200);
        const msgs = [
          `${agent} fechou venda de R$${amount.toLocaleString("pt-BR")}`,
          `Nova venda via TikTok Shop — R$${amount.toLocaleString("pt-BR")} · ${agent}`,
          `Upsell concluído por ${agent} · +R$${amount.toLocaleString("pt-BR")}`,
          `Shopee: pedido R$${amount.toLocaleString("pt-BR")} confirmado`,
        ];
        setMetrics((prev) => ({
          ...prev,
          revenue: prev.revenue + amount,
          sales: prev.sales + rand(1, 3),
          clients: prev.clients + (Math.random() > 0.72 ? 1 : 0),
          conversion: Math.max(55, Math.min(98, prev.conversion + (Math.random() > 0.5 ? 0.1 : -0.05))),
        }));
        addEvent({ type: "sale", message: pick(msgs), amount, timeLabel: "agora", agent });
        setChartData((prev) => {
          const updated = [...prev];
          const last = { ...updated[updated.length - 1] };
          last.revenue += amount;
          last.conversions += 1;
          updated[updated.length - 1] = last;
          return updated;
        });
      } else if (roll < 0.75) {
        const msgs = [
          `Novo lead qualificado atribuído a ${agent}`,
          `Lead via Instagram convertido em proposta`,
          `${agent} moveu lead para negociação`,
          `Automação IA gerou ${rand(2, 8)} leads qualificados`,
        ];
        setMetrics((prev) => ({ ...prev, leadsToday: prev.leadsToday + rand(1, 4) }));
        addEvent({ type: "lead", message: pick(msgs), timeLabel: "agora", agent });
      } else {
        const msgs = [
          `${agent} concluiu tarefa 'Relatório de performance'`,
          `Agente IA publicou ${rand(3, 9)} posts automaticamente`,
          `${agent} atualizou status de ${rand(2, 5)} clientes`,
          `WhatsApp: ${rand(10, 40)} mensagens enviadas`,
        ];
        addEvent({ type: "task", message: pick(msgs), timeLabel: "agora", agent });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [addEvent]);

  return { metrics, events, chartData };
}
