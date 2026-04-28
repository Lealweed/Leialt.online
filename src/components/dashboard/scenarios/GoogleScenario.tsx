"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, Globe, MousePointerClick, BarChart2, MapPin } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  surface:  "#0d1320",
  border:   "rgba(255,255,255,0.055)",
  hover:    "rgba(255,255,255,0.03)",
  iconBg:   "rgba(255,255,255,0.05)",
  textPri:  "#e6edf3",
  textSec:  "rgba(255,255,255,0.48)",
  textMute: "rgba(255,255,255,0.22)",
  google:   "#2AABEE",
  googleG:  "#22c55e",
  positive: "#22c55e",
  negative: "#ef4444",
};
const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14 };

// ── Mock data ─────────────────────────────────────────────────────────────────
const trafficData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  organic: Math.round(800 + Math.sin(i * 0.4) * 200 + i * 18),
  paid:    Math.round(300 + Math.cos(i * 0.3) * 80 + i * 6),
}));

const keywords = [
  { keyword: "boutique de roupas femininas",  clicks: 847,  impressions: 12400, ctr: 6.8,  pos: 1.4 },
  { keyword: "vestidos midi floral",           clicks: 612,  impressions: 9800,  ctr: 6.2,  pos: 1.8 },
  { keyword: "loja moda online",               clicks: 489,  impressions: 8200,  ctr: 5.9,  pos: 2.1 },
  { keyword: "calça alfaiataria feminina",     clicks: 374,  impressions: 6100,  ctr: 6.1,  pos: 2.4 },
  { keyword: "blusa seda premium",             clicks: 298,  impressions: 4800,  ctr: 6.2,  pos: 2.7 },
  { keyword: "comprar roupa online barato",    clicks: 241,  impressions: 5200,  ctr: 4.6,  pos: 3.2 },
  { keyword: "tênis chunky feminino",          clicks: 187,  impressions: 3400,  ctr: 5.5,  pos: 3.6 },
  { keyword: "moda verão 2025",               clicks: 156,  impressions: 4100,  ctr: 3.8,  pos: 4.1 },
];

const seoChecks = [
  { label: "Core Web Vitals",        score: 94, color: "#22c55e" },
  { label: "SEO On-page",            score: 88, color: "#22c55e" },
  { label: "Backlinks",              score: 71, color: "#2AABEE" },
  { label: "Velocidade Mobile",      score: 82, color: "#22c55e" },
  { label: "Google Meu Negócio",     score: 96, color: "#22c55e" },
  { label: "Schema Markup",          score: 65, color: "#F77737" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GoogTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1320", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, marginBottom: 6 }}>Dia {label}</p>
      <p style={{ color: C.google, fontSize: 12, fontWeight: 700 }}>{payload[0]?.value?.toLocaleString("pt-BR")} orgânico</p>
      <p style={{ color: "#F77737", fontSize: 12, fontWeight: 700 }}>{payload[1]?.value?.toLocaleString("pt-BR")} pago</p>
    </div>
  );
}

function KpiCard({ label, value, sub, icon, change, up }: {
  label: string; value: string; sub?: string; icon: React.ReactNode; change: string; up: boolean;
}) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-2" style={card}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.iconBg }}>
        <span style={{ color: C.google }}>{icon}</span>
      </div>
      <p className="text-[11px] font-medium tracking-[0.06em]" style={{ color: C.textMute }}>{label}</p>
      <p className="font-display font-extrabold text-2xl leading-none" style={{ color: C.textPri }}>{value}</p>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-0.5 text-[10px] font-semibold"
          style={{ color: up ? C.positive : C.negative }}>
          {up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}{change}
        </span>
        {sub && <span className="text-[10px]" style={{ color: C.textMute }}>{sub}</span>}
      </div>
    </div>
  );
}

export default function GoogleScenario() {
  return (
    <div className="flex flex-col gap-4 max-w-[1600px]">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={card}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)" }}>
          <Globe size={18} className="text-white" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>boutiquemoda.com.br</h2>
          <p className="text-[11px]" style={{ color: C.textMute }}>Google Search Console + Ads · gerenciado por Leialt.IA</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-md font-semibold"
            style={{ background: "rgba(42,171,238,0.08)", color: C.google, border: `1px solid rgba(42,171,238,0.18)` }}>
            Posição média: 2.4
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Impressões / Mês" value="47.8K" icon={<Globe size={16} />} change="+22%" up sub="busca orgânica" />
        <KpiCard label="Cliques" value="3.241" icon={<MousePointerClick size={16} />} change="+14%" up sub="mês atual" />
        <KpiCard label="CTR Médio" value="6.8%" icon={<BarChart2 size={16} />} change="+0.9pp" up sub="acima da média" />
        <KpiCard label="Posição Média" value="2.4" icon={<Search size={16} />} change="-0.3" up sub="melhoria" />
      </div>

      {/* Traffic chart + SEO score */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 p-5" style={card}>
          <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>Tráfego · Últimos 30 dias</h2>
          <div className="flex items-center gap-4 mb-5">
            <p className="text-[11px]" style={{ color: C.textMute }}>Orgânico vs Pago</p>
            <div className="flex items-center gap-3 ml-auto">
              {[{ color: C.google, label: "Orgânico" }, { color: "#F77737", label: "Pago" }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 rounded" style={{ background: l.color }} />
                  <span className="text-[10px]" style={{ color: C.textMute }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={trafficData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="gradOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.google} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={C.google} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F77737" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#F77737" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.035)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false}
                interval={4} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<GoogTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }} />
              <Area type="monotone" dataKey="organic" stroke={C.google} strokeWidth={1.5}
                fill="url(#gradOrganic)" dot={false} isAnimationActive={false} />
              <Area type="monotone" dataKey="paid" stroke="#F77737" strokeWidth={1.5}
                fill="url(#gradPaid)" dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* SEO scores */}
        <div className="col-span-12 lg:col-span-4 p-5" style={card}>
          <div className="flex items-center gap-2 mb-0.5">
            <MapPin size={13} style={{ color: C.google }} />
            <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>Health Score</h2>
          </div>
          <p className="text-[11px] mb-5" style={{ color: C.textMute }}>Diagnóstico SEO completo</p>

          {/* Overall score */}
          <div className="flex items-center gap-4 mb-5 p-3 rounded-xl"
            style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)" }}>
            <div className="text-center">
              <p className="font-display font-extrabold text-3xl leading-none" style={{ color: C.positive }}>84</p>
              <p className="text-[9px] mt-0.5" style={{ color: C.textMute }}>Geral</p>
            </div>
            <div className="flex-1">
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: "84%" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full" style={{ background: C.positive }} />
              </div>
              <p className="text-[10px] mt-1" style={{ color: C.textMute }}>Acima da média do setor (71)</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {seoChecks.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px]" style={{ color: C.textSec }}>{s.label}</span>
                  <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.score}</span>
                </div>
                <div className="h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.score}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full" style={{ background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keywords table */}
      <div className="p-5" style={card}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>Top Palavras-chave</h2>
            <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>Mês atual · Google Search Console</p>
          </div>
          <button className="text-[11px] px-3 py-1.5 rounded-lg font-semibold text-white"
            style={{ background: C.google }}>+ Adicionar Keyword</button>
        </div>
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 pb-2 mb-2" style={{ borderBottom: `1px solid ${C.border}` }}>
          {["Palavra-chave", "Cliques", "Impressões", "CTR", "Posição"].map((h, i) => (
            <div key={h} className={`text-[10px] font-semibold tracking-[0.06em] uppercase ${i === 0 ? "col-span-5" : "col-span-1 text-right"}`}
              style={{ color: C.textMute }}>{h}</div>
          ))}
          <div className="col-span-3 text-right text-[10px] font-semibold tracking-[0.06em] uppercase"
            style={{ color: C.textMute }}>Tendência</div>
        </div>
        {/* Rows */}
        <div className="flex flex-col gap-1">
          {keywords.map((kw, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-12 gap-2 py-2 px-1 rounded-lg transition-colors hover:bg-white/[0.02]">
              <div className="col-span-5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: kw.pos <= 2 ? C.googleG : kw.pos <= 3 ? C.google : "#F77737" }} />
                <span className="text-[12px] font-medium truncate" style={{ color: C.textPri }}>{kw.keyword}</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-[12px] font-semibold" style={{ color: C.textSec }}>{kw.clicks.toLocaleString("pt-BR")}</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-[12px]" style={{ color: C.textMute }}>{(kw.impressions / 1000).toFixed(1)}K</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-[12px] font-semibold" style={{ color: kw.ctr > 6 ? C.googleG : C.textSec }}>{kw.ctr}%</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-[12px] font-extrabold"
                  style={{ color: kw.pos <= 2 ? C.googleG : kw.pos <= 3 ? C.google : "#F77737" }}>
                  #{kw.pos.toFixed(1)}
                </span>
              </div>
              {/* Trend bar */}
              <div className="col-span-3 flex items-center gap-2">
                <div className="flex-1 h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${(kw.clicks / 847) * 100}%`, background: C.google }} />
                </div>
                <TrendingUp size={10} className="shrink-0" style={{ color: C.positive }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
