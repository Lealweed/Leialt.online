"use client";

import { motion } from "framer-motion";
import { Play, TrendingUp, TrendingDown, Heart, MessageCircle, Share2, ShoppingCart, Zap } from "lucide-react";
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
  tiktok:   "#00F2EA",
  pink:     "#FF0050",
  positive: "#22c55e",
  negative: "#ef4444",
};
const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14 };

// ── Mock data ─────────────────────────────────────────────────────────────────
const viewsData = [
  { day: "Seg", views: 24000, shop: 1200 },
  { day: "Ter", views: 38000, shop: 1900 },
  { day: "Qua", views: 52000, shop: 2600 },
  { day: "Qui", views: 47000, shop: 2350 },
  { day: "Sex", views: 89000, shop: 4450 },
  { day: "Sáb", views: 134000, shop: 6700 },
  { day: "Dom", views: 98000, shop: 4900 },
  { day: "Seg", views: 61000, shop: 3050 },
  { day: "Ter", views: 74000, shop: 3700 },
  { day: "Qua", views: 112000, shop: 5600 },
  { day: "Qui", views: 143000, shop: 7150 },
  { day: "Sex", views: 189000, shop: 9450 },
  { day: "Sáb", views: 247000, shop: 12350 },
  { day: "Dom", views: 186000, shop: 9300 },
];

const topVideos = [
  { title: "5 Looks para o verão 2025 🌊", views: "2.4M", likes: "184K", shop: "R$18.400", viral: 98  },
  { title: "Como usar peças neutras ✨",    views: "1.8M", likes: "112K", shop: "R$12.700", viral: 91  },
  { title: "Haul de inverno completo 🧥",   views: "1.2M", likes: "84K",  shop: "R$9.800",  viral: 83  },
  { title: "Tendências da semana 📱",       views: "987K", likes: "61K",  shop: "R$7.200",  viral: 76  },
  { title: "Dia a dia com estilo 👗",       views: "741K", likes: "48K",  shop: "R$5.400",  viral: 68  },
];

const schedule = [
  { day: "Seg", time: "18:00", type: "vídeo",    title: "Outfit do dia verão",   status: "publicado" },
  { day: "Ter", time: "20:00", type: "live",      title: "Live de vendas fashion", status: "publicado" },
  { day: "Qua", time: "12:00", type: "vídeo",    title: "3 blusas com 1 look",    status: "agendado"  },
  { day: "Qui", time: "19:30", type: "dueto",     title: "Collab @moda_brasil",    status: "agendado"  },
  { day: "Sex", time: "17:00", type: "vídeo",    title: "Haul Shopee fashion",     status: "rascunho"  },
  { day: "Sáb", time: "15:00", type: "live",      title: "Promoção fim de semana", status: "rascunho"  },
];

const statusStyle: Record<string, { color: string; bg: string }> = {
  publicado: { color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
  agendado:  { color: "#00F2EA", bg: "rgba(0,242,234,0.08)" },
  rascunho:  { color: "rgba(255,255,255,0.28)", bg: "rgba(255,255,255,0.04)" },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TikTokTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1320", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, marginBottom: 6 }}>{label}</p>
      <p style={{ color: C.tiktok, fontSize: 12, fontWeight: 700 }}>{(payload[0].value / 1000).toFixed(0)}K views</p>
      <p style={{ color: C.pink, fontSize: 12, fontWeight: 700 }}>R${payload[1]?.value?.toLocaleString("pt-BR")} shop</p>
    </div>
  );
}

function KpiCard({ label, value, sub, icon, change, up, accent }: {
  label: string; value: string; sub?: string; icon: React.ReactNode; change: string; up: boolean; accent?: string;
}) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-2" style={card}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.iconBg }}>
        <span style={{ color: accent ?? C.tiktok }}>{icon}</span>
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

export default function TikTokScenario() {
  return (
    <div className="flex flex-col gap-4 max-w-[1600px]">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={card}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-extrabold text-black"
          style={{ background: C.tiktok }}>TT</div>
        <div>
          <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>@boutiquemoda.oficial</h2>
          <p className="text-[11px]" style={{ color: C.textMute }}>TikTok Shop · automação Leialt.IA</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold"
            style={{ background: "rgba(0,242,234,0.08)", color: C.tiktok, border: "1px solid rgba(0,242,234,0.18)" }}>
            <Zap size={10} /> IA ativa · 3 posts/dia
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Seguidores" value="347K" icon={<Play size={16} />} change="+12.4K/mês" up sub="este mês" accent={C.tiktok} />
        <KpiCard label="Views / Mês" value="8.4M" icon={<TrendingUp size={16} />} change="+34%" up sub="vs mês ant." accent={C.tiktok} />
        <KpiCard label="Engajamento" value="12.7%" icon={<Heart size={16} />} change="+1.2%" up sub="acima da média" accent={C.pink} />
        <KpiCard label="Receita Shop" value="R$ 89K" icon={<ShoppingCart size={16} />} change="+28%" up sub="via TikTok Shop" accent={C.pink} />
      </div>

      {/* Chart + Top Videos */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 p-5" style={card}>
          <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>Visualizações · Últimos 14 dias</h2>
          <p className="text-[11px] mb-5" style={{ color: C.textMute }}>Views totais e receita TikTok Shop</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={viewsData} margin={{ top: 6, right: 4, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.tiktok} stopOpacity={0.24} />
                  <stop offset="100%" stopColor={C.tiktok} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradShop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.pink} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={C.pink} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.035)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="v" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <YAxis yAxisId="s" orientation="right" tick={{ fill: "rgba(255,255,255,0.18)", fontSize: 10 }}
                axisLine={false} tickLine={false} width={24} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<TikTokTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }} />
              <Area yAxisId="v" type="monotone" dataKey="views" stroke={C.tiktok} strokeWidth={1.5}
                fill="url(#gradViews)" dot={false} isAnimationActive={false} />
              <Area yAxisId="s" type="monotone" dataKey="shop" stroke={C.pink} strokeWidth={1.5}
                fill="url(#gradShop)" dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top videos */}
        <div className="col-span-12 lg:col-span-4 p-5" style={card}>
          <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>Top Vídeos</h2>
          <p className="text-[11px] mb-4" style={{ color: C.textMute }}>Melhor performance do mês</p>
          <div className="flex flex-col gap-3">
            {topVideos.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[11px] font-bold tabular-nums w-4 shrink-0 text-right" style={{ color: C.textMute }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold truncate" style={{ color: C.textPri }}>{v.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: C.textMute }}>
                      <Play size={8} />{v.views}
                    </span>
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: C.textMute }}>
                      <Heart size={8} />{v.likes}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-bold" style={{ color: C.positive }}>{v.shop}</p>
                  {/* Viral score */}
                  <div className="flex items-center gap-1 mt-0.5 justify-end">
                    <div className="h-[3px] w-12 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full" style={{ width: `${v.viral}%`, background: C.tiktok }} />
                    </div>
                    <span className="text-[9px]" style={{ color: C.textMute }}>{v.viral}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content schedule */}
      <div className="p-5" style={card}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>Calendário de Conteúdo</h2>
            <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>Semana atual · gerenciado por IA</p>
          </div>
          <button className="text-[11px] px-3 py-1.5 rounded-lg font-semibold text-black transition-all hover:opacity-90"
            style={{ background: C.tiktok }}>+ Criar Conteúdo</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {schedule.map((s, i) => {
            const st = statusStyle[s.status];
            const typeColor: Record<string, string> = { vídeo: C.tiktok, live: C.pink, dueto: "#833AB4" };
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl flex flex-col gap-2"
                style={{ background: C.hover, border: `1px solid ${C.border}` }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold" style={{ color: C.textMute }}>{s.day}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                    style={{ background: `${typeColor[s.type]}18`, color: typeColor[s.type] }}>
                    {s.type}
                  </span>
                </div>
                <p className="text-[11px] font-semibold leading-tight" style={{ color: C.textPri }}>{s.title}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-mono" style={{ color: C.textMute }}>{s.time}</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                    style={{ background: st.bg, color: st.color }}>{s.status}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
