"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Activity,
  Zap,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Circle,
  ArrowUpRight,
  Check,
  Star,
  Flame,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import SalesChart from "@/components/dashboard/panels/SalesChart";
import CrmPipeline from "@/components/dashboard/panels/CrmPipeline";
import { useLiveMetrics } from "@/components/dashboard/hooks/useLiveMetrics";

// ── Corporate design tokens ───────────────────────────────────────────────────
const C = {
  surface:    "#0d1320",
  border:     "rgba(255,255,255,0.055)",
  hover:      "rgba(255,255,255,0.03)",
  iconBg:     "rgba(255,255,255,0.05)",
  iconColor:  "rgba(255,255,255,0.42)",
  textPri:    "#e6edf3",
  textSec:    "rgba(255,255,255,0.48)",
  textMute:   "rgba(255,255,255,0.22)",
  accent:     "#E1306C",
  accentDim:  "rgba(225,48,108,0.1)",
  positive:   "#22c55e",         // functional status only
  negative:   "#ef4444",         // functional status only
  chartBg:    "#070b12",         // sidebar bg reuse
};

const card = {
  background: C.surface,
  border:     `1px solid ${C.border}`,
  borderRadius: 14,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

// ── Tiny sparkline (inline SVG, no library) ───────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const W = 56, H = 22;
  const mn = Math.min(...data), mx = Math.max(...data);
  const range = mx - mn || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - mn) / range) * (H - 2) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const last = data[data.length - 1];
  const lx = W;
  const ly = H - ((last - mn) / range) * (H - 2) - 1;
  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={2.5} fill={color} />
    </svg>
  );
}

// Static sparkline seeds (deterministic — no Math.random on module level)
const SPARKS = {
  revenue:    [180, 210, 195, 230, 220, 245, 260, 248, 270, 285],
  sales:      [120, 130, 128, 145, 140, 155, 150, 165, 158, 175],
  clients:    [380, 381, 383, 383, 384, 385, 386, 388, 390, 394],
  conversion: [65, 67, 66, 68, 70, 69, 71, 69, 68, 68],
};

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimVal({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    setFlash(true);
    const start = prev.current, diff = value - start, steps = 18;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setDisplay(Math.round(start + (diff * step) / steps));
      if (step >= steps) {
        clearInterval(t);
        setDisplay(value);
        setTimeout(() => setFlash(false), 500);
      }
    }, 28);
    prev.current = value;
    return () => clearInterval(t);
  }, [value]);

  return (
    <span style={{ color: flash ? C.positive : "inherit", transition: "color 0.3s" }}>
      {prefix}{display.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

// ── KPI Card (monochrome — sparkline carries the color) ───────────────────────
interface KpiProps {
  label: string; value: number; prefix?: string; suffix?: string;
  icon: React.ReactNode; change: string; up: boolean; sub?: string;
  spark: number[]; sparkColor: string;
}

function KpiCard({ label, value, prefix, suffix, icon, change, up, sub, spark, sparkColor }: KpiProps) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:border-white/10" style={card}>
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.iconBg }}>
          <span style={{ color: C.iconColor }}>{icon}</span>
        </div>
        <Sparkline data={spark} color={sparkColor} />
      </div>
      <div>
        <p className="text-[11px] font-medium tracking-[0.06em] mb-1.5" style={{ color: C.textMute }}>
          {label}
        </p>
        <p className="font-display font-extrabold text-2xl leading-none" style={{ color: C.textPri }}>
          <AnimVal value={value} prefix={prefix} suffix={suffix} />
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="flex items-center gap-0.5 text-[10px] font-semibold"
            style={{ color: up ? C.positive : C.negative }}
          >
            {up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
            {change}
          </span>
          {sub && <span className="text-[10px]" style={{ color: C.textMute }}>{sub}</span>}
        </div>
      </div>
    </div>
  );
}

// ── Activity feed ─────────────────────────────────────────────────────────────
// All event types use same neutral icon — no per-type colors in UI
const EVENT_ICONS = {
  sale:    <DollarSign size={11} />,
  lead:    <Target size={11} />,
  task:    <Zap size={11} />,
  meeting: <Users size={11} />,
};

// ── Team data ─────────────────────────────────────────────────────────────────
const teamMembers = [
  { name: "Ana Lima",      role: "Sales Lead",    avatar: "AL", status: "online",  perf: 94, deals: 12 },
  { name: "Pedro Costa",   role: "BDR",           avatar: "PC", status: "online",  perf: 78, deals: 8  },
  { name: "Julia Nunes",   role: "Account Exec",  avatar: "JN", status: "meeting", perf: 88, deals: 10 },
  { name: "Carlos Melo",   role: "Automação IA",  avatar: "CM", status: "online",  perf: 91, deals: 15 },
  { name: "Beatriz Alves", role: "Growth",        avatar: "BA", status: "away",    perf: 82, deals: 9  },
];

const statusStyle: Record<string, { label: string; color: string }> = {
  online:  { label: "Online",     color: C.positive },
  meeting: { label: "Em reunião", color: "#F77737" },
  away:    { label: "Ausente",    color: C.textMute },
};

// ── Tasks ─────────────────────────────────────────────────────────────────────
const tasks = [
  { id: 1, col: "todo",     title: "Criar campanha TikTok Q2",       priority: "high",   assignee: "Ana Lima",      tag: "Marketing" },
  { id: 2, col: "todo",     title: "Integrar Shopee API v3",         priority: "medium", assignee: "Carlos Melo",   tag: "Dev"       },
  { id: 3, col: "todo",     title: "Relatório mensal clientes",      priority: "low",    assignee: "Julia Nunes",   tag: "Relatório" },
  { id: 4, col: "progress", title: "Dashboard Analytics IA",         priority: "high",   assignee: "Carlos Melo",   tag: "Dev"       },
  { id: 5, col: "progress", title: "Onboarding 3 novos clientes",    priority: "high",   assignee: "Pedro Costa",   tag: "CRM"       },
  { id: 6, col: "progress", title: "Automação WhatsApp flows",       priority: "medium", assignee: "Beatriz Alves", tag: "Automação" },
  { id: 7, col: "done",     title: "Setup CRM pipeline",             priority: "high",   assignee: "Ana Lima",      tag: "CRM"       },
  { id: 8, col: "done",     title: "Landing page redesign",          priority: "medium", assignee: "Julia Nunes",   tag: "Design"    },
  { id: 9, col: "done",     title: "Agente IA conteúdo posts",       priority: "high",   assignee: "Carlos Melo",   tag: "IA"        },
];

// Priority: minimal color dots only — not colored badges
const PRIO_DOT: Record<string, string> = {
  high:   "#E1306C",
  medium: "#F77737",
  low:    "#2AABEE",
};

const colMeta = [
  { key: "todo",     label: "A Fazer",      icon: <Circle size={12} />,      color: C.textSec  },
  { key: "progress", label: "Em Progresso", icon: <Clock size={12} />,       color: C.textPri  },
  { key: "done",     label: "Concluído",    icon: <CheckCircle size={12} />, color: C.textPri  },
];

// ── Pricing ───────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter", price: "R$ 497", period: "/mês",
    desc: "Para negócios que querem começar com IA",
    highlight: false,
    features: [
      "Automação de conteúdo (30 posts/mês)",
      "1 agente IA personalizado",
      "Integração WhatsApp Business",
      "Dashboard básico",
      "Suporte via email",
    ],
    cta: "Começar Agora",
  },
  {
    name: "Pro", price: "R$ 1.497", period: "/mês",
    desc: "Para empresas que querem crescimento acelerado",
    highlight: true,
    features: [
      "Automação ilimitada de conteúdo",
      "3 agentes IA especializados",
      "TikTok + Shopee + Instagram",
      "CRM com pipeline IA",
      "Dashboard avançado em tempo real",
      "Monitoramento de equipe",
      "Suporte prioritário 24/7",
    ],
    cta: "Mais Popular",
  },
  {
    name: "Enterprise", price: "Sob consulta", period: "",
    desc: "Para grandes operações e redes de franquias",
    highlight: false,
    features: [
      "Agentes IA ilimitados",
      "Integrações customizadas (ERP, CRM)",
      "SaaS jurídico + barbearias",
      "API própria Leialt.IA",
      "Treinamento da equipe",
      "Gerente de conta dedicado",
      "SLA garantido",
    ],
    cta: "Falar com Vendas",
  },
];

// ── Root ──────────────────────────────────────────────────────────────────────
export default function DashboardClient() {
  const { metrics, events, chartData } = useLiveMetrics();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  }

  return (
    <DashboardShell isLive revenueToday={fmt(metrics.revenue)}>
      <div className="flex flex-col gap-4 max-w-[1600px]">

        {/* ── Row 1: KPI cards ──────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Faturamento" value={metrics.revenue} prefix="R$"
            icon={<DollarSign size={16} />} change="+12.4%" up
            sub="vs ontem" spark={SPARKS.revenue} sparkColor="#E1306C" />
          <KpiCard label="Vendas Hoje" value={metrics.sales}
            icon={<Activity size={16} />} change="+8.1%" up
            sub="Meta: 2.000" spark={SPARKS.sales} sparkColor="#2AABEE" />
          <KpiCard label="Clientes Ativos" value={metrics.clients}
            icon={<Users size={16} />} change="+3.2%" up
            sub="24 novos/mês" spark={SPARKS.clients} sparkColor="#22c55e" />
          <KpiCard label="Conversão" value={Math.round(metrics.conversion * 10) / 10} suffix="%"
            icon={<Target size={16} />} change="-0.3%" up={false}
            sub={`${metrics.leadsToday} leads`} spark={SPARKS.conversion} sparkColor="#F77737" />
        </div>

        {/* ── Row 2: Sales Chart + Activity Feed ───────────────── */}
        <div className="grid grid-cols-12 gap-4">

          {/* Chart */}
          <div className="col-span-12 lg:col-span-8 p-5" style={card}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>
                  Performance de Vendas
                </h2>
                <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>
                  Últimas 24h · tempo real
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {["24h", "7d", "30d"].map((r, i) => (
                  <button
                    key={r}
                    className="text-[11px] px-2.5 py-1 rounded-md transition-all"
                    style={
                      i === 0
                        ? { background: C.accentDim, color: C.accent, border: `1px solid rgba(225,48,108,0.2)` }
                        : { background: "transparent", color: C.textMute, border: `1px solid ${C.border}` }
                    }
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <SalesChart data={chartData} />
          </div>

          {/* Feed */}
          <div className="col-span-12 lg:col-span-4 p-5 flex flex-col" style={card}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>
                  Feed ao Vivo
                </h2>
                <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>Eventos em tempo real</p>
              </div>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: C.positive }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: C.positive }} />
              </span>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto flex-1" style={{ maxHeight: 256 }}>
              <AnimatePresence initial={false}>
                {events.map((ev) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: C.hover, border: `1px solid ${C.border}` }}
                  >
                    {/* Neutral icon — no per-type color in UI */}
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: C.iconBg }}
                    >
                      <span style={{ color: C.iconColor }}>{EVENT_ICONS[ev.type]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] leading-relaxed" style={{ color: C.textSec }}>
                        {ev.message}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: C.textMute }}>
                        {ev.timeLabel}
                      </p>
                    </div>
                    {/* Amount gets positive color — functional */}
                    {ev.amount && (
                      <span className="text-[11px] font-bold shrink-0" style={{ color: C.positive }}>
                        +{fmt(ev.amount)}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Row 3: Video + CRM + Team ─────────────────────────── */}
        <div id="videos" className="grid grid-cols-12 gap-4">

          {/* Video */}
          <div className="col-span-12 lg:col-span-4 p-5" style={card}>
            <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>
              Vídeo da Empresa
            </h2>
            <p className="text-[11px] mb-4" style={{ color: C.textMute }}>Apresentação Leialt.IA</p>

            <div
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              style={{ background: "#000", aspectRatio: "16/9" }}
              onClick={toggleVideo}
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={videoRef}
                src="/video-HOME.mp4"
                className="w-full h-full object-cover"
                loop playsInline
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
              {/* Play overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                style={{ background: "rgba(0,0,0,0.45)", opacity: playing ? 0 : 1 }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: C.accent, boxShadow: `0 0 24px ${C.accentDim}` }}
                >
                  <Play size={18} className="text-white fill-white ml-0.5" />
                </div>
              </div>
              {/* Hover controls */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.75)" }}
                  onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                >
                  {playing
                    ? <Pause size={13} className="text-white" />
                    : <Play size={13} className="text-white fill-white ml-0.5" />
                  }
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3">
              {["TikTok", "Shopee", "IA Jurídico"].map((t) => (
                <div
                  key={t}
                  className="flex-1 rounded-lg cursor-pointer opacity-50 hover:opacity-80 transition-opacity flex flex-col items-center justify-center gap-1"
                  style={{ background: C.hover, border: `1px solid ${C.border}`, aspectRatio: "16/9" }}
                >
                  <Play size={9} style={{ color: C.textMute }} />
                  <span className="text-[8px]" style={{ color: C.textMute }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CRM Pipeline */}
          <div id="crm" className="col-span-12 lg:col-span-4 p-5" style={card}>
            <div className="flex items-center justify-between mb-0.5">
              <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>
                Pipeline CRM
              </h2>
              {/* Functional status badge */}
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{ background: "rgba(34,197,94,0.08)", color: C.positive, border: "1px solid rgba(34,197,94,0.15)" }}
              >
                18% fechados
              </span>
            </div>
            <p className="text-[11px] mb-5" style={{ color: C.textMute }}>Funil · mês atual</p>
            <CrmPipeline />
          </div>

          {/* Team */}
          <div id="equipe" className="col-span-12 lg:col-span-4 p-5" style={card}>
            <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>
              Monitoramento da Equipe
            </h2>
            <p className="text-[11px] mb-5" style={{ color: C.textMute }}>Performance em tempo real</p>

            <div className="flex flex-col gap-4">
              {teamMembers.map((m) => {
                const st = statusStyle[m.status];
                return (
                  <div key={m.name} className="flex items-center gap-3">
                    {/* Avatar — uniform, no per-member color */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 relative"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${C.border}`,
                        color: C.textSec,
                      }}
                    >
                      {m.avatar}
                      {/* Status dot — functional color */}
                      <span
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                        style={{ background: st.color, borderColor: C.surface }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[12px] font-semibold truncate" style={{ color: C.textPri }}>{m.name}</p>
                        <span className="text-[10px] font-bold tabular-nums" style={{ color: C.textSec }}>
                          {m.perf}%
                        </span>
                      </div>
                      {/* Accent-colored progress bar */}
                      <div className="h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${m.perf}%`, background: C.accent, opacity: 0.7 }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px]" style={{ color: C.textMute }}>{m.role}</span>
                        <span className="text-[10px] font-medium" style={{ color: st.color }}>{st.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Row 4: Task Board ─────────────────────────────────── */}
        <div id="tarefas" className="p-5" style={card}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>
                Quadro de Tarefas
              </h2>
              <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>
                {tasks.filter((t) => t.col === "done").length}/{tasks.length} concluídas
              </p>
            </div>
            <button
              className="text-[11px] px-3 py-1.5 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ background: C.accent }}
            >
              + Nova Tarefa
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {colMeta.map((col) => {
              const colTasks = tasks.filter((t) => t.col === col.key);
              return (
                <div key={col.key}>
                  <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: col.color }}>{col.icon}</span>
                    <span className="text-[12px] font-semibold" style={{ color: col.color }}>{col.label}</span>
                    <span
                      className="ml-auto text-[10px] w-5 h-5 flex items-center justify-center rounded font-bold"
                      style={{ background: C.iconBg, color: C.textMute }}
                    >
                      {colTasks.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-xl cursor-pointer transition-all hover:border-white/10"
                        style={{ background: C.hover, border: `1px solid ${C.border}` }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ background: C.iconBg, color: C.textMute }}
                          >
                            {task.tag}
                          </span>
                          {/* Priority as small colored dot + text */}
                          <div className="flex items-center gap-1 ml-auto">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: PRIO_DOT[task.priority] }}
                            />
                            <span className="text-[9px]" style={{ color: C.textMute }}>
                              {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                            </span>
                          </div>
                        </div>
                        <p className="text-[12px] font-medium leading-snug" style={{ color: C.textSec }}>
                          {task.title}
                        </p>
                        <p className="text-[10px] mt-2" style={{ color: C.textMute }}>{task.assignee}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Row 5: Pricing ───────────────────────────────────── */}
        <div id="precos" className="p-5" style={card}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>
                Planos & Preços
              </h2>
              <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>
                Escolha o plano ideal para sua operação
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: C.textMute }}>
              <Flame size={12} />
              2 meses grátis no anual
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all hover:scale-[1.005]"
                style={
                  plan.highlight
                    ? {
                        background: C.accentDim,
                        border: `1px solid rgba(225,48,108,0.28)`,
                        boxShadow: "0 0 48px rgba(225,48,108,0.06)",
                      }
                    : { background: C.hover, border: `1px solid ${C.border}` }
                }
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-bold px-3 py-0.5 rounded-full text-white"
                    style={{ background: C.accent }}
                  >
                    <Star size={8} className="fill-white" />
                    Mais Popular
                  </div>
                )}

                {/* Header */}
                <div>
                  <h3 className="font-display font-extrabold text-base mb-0.5" style={{ color: C.textPri }}>
                    {plan.name}
                  </h3>
                  <p className="text-[11px]" style={{ color: C.textMute }}>{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display font-extrabold text-3xl"
                    style={{ color: plan.highlight ? C.accent : C.textPri }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm" style={{ color: C.textMute }}>{plan.period}</span>
                  )}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: C.border }} />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center mt-0.5 shrink-0"
                        style={
                          plan.highlight
                            ? { background: C.accentDim }
                            : { background: C.iconBg }
                        }
                      >
                        <Check size={9} style={{ color: plan.highlight ? C.accent : C.textMute }} />
                      </div>
                      <span className="text-[11px] leading-relaxed" style={{ color: C.textSec }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`#precos-${plan.name.toLowerCase()}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[13px] font-semibold text-white transition-all hover:opacity-90"
                  style={
                    plan.highlight
                      ? { background: C.accent }
                      : { background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}` }
                  }
                >
                  {plan.cta}
                  <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] pb-4" style={{ color: C.textMute }}>
          © {new Date().getFullYear()} Leialt.IA · Dados simulados para demonstração
        </p>
      </div>
    </DashboardShell>
  );
}
