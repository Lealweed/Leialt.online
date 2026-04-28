"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Bookmark, TrendingUp, TrendingDown, Eye, Users, Send } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
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
  ig:       "#E1306C",
  igOrange: "#F77737",
  igPurple: "#833AB4",
  positive: "#22c55e",
  negative: "#ef4444",
};
const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14 };

// ── Mock data ─────────────────────────────────────────────────────────────────
const followerGrowth = [
  { week: "Sem 1", followers: 112000 },
  { week: "Sem 2", followers: 115400 },
  { week: "Sem 3", followers: 119200 },
  { week: "Sem 4", followers: 122800 },
  { week: "Sem 5", followers: 124100 },
  { week: "Sem 6", followers: 126700 },
  { week: "Sem 7", followers: 127400 },
  { week: "Sem 8", followers: 128000 },
];

const contentTypes = [
  { type: "Reels",     engagement: 9.2, posts: 18 },
  { type: "Carrossel", engagement: 7.8, posts: 12 },
  { type: "Stories",   engagement: 6.1, posts: 42 },
  { type: "Foto",      engagement: 4.4, posts: 8  },
];

const posts = [
  { id: 1, img: "https://picsum.photos/seed/ig1/200/200", likes: "12.4K", comments: "384", saves: "1.2K", type: "Reel"     },
  { id: 2, img: "https://picsum.photos/seed/ig2/200/200", likes: "9.8K",  comments: "247", saves: "847",  type: "Carrossel" },
  { id: 3, img: "https://picsum.photos/seed/ig3/200/200", likes: "8.1K",  comments: "198", saves: "612",  type: "Reel"     },
  { id: 4, img: "https://picsum.photos/seed/ig4/200/200", likes: "7.4K",  comments: "182", saves: "534",  type: "Foto"     },
  { id: 5, img: "https://picsum.photos/seed/ig5/200/200", likes: "6.9K",  comments: "156", saves: "481",  type: "Reel"     },
  { id: 6, img: "https://picsum.photos/seed/ig6/200/200", likes: "5.7K",  comments: "134", saves: "398",  type: "Carrossel" },
  { id: 7, img: "https://picsum.photos/seed/ig7/200/200", likes: "5.2K",  comments: "118", saves: "347",  type: "Reel"     },
  { id: 8, img: "https://picsum.photos/seed/ig8/200/200", likes: "4.8K",  comments: "102", saves: "289",  type: "Foto"     },
  { id: 9, img: "https://picsum.photos/seed/ig9/200/200", likes: "4.1K",  comments: "89",  saves: "241",  type: "Carrossel" },
];

const storyStats = [
  { label: "Impressões",     value: "284K", icon: <Eye size={12} /> },
  { label: "Conclusão",      value: "74%",  icon: <TrendingUp size={12} /> },
  { label: "Respostas",      value: "1.8K", icon: <Send size={12} /> },
  { label: "Stickers clics", value: "12K",  icon: <Bookmark size={12} /> },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IgTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1320", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, marginBottom: 6 }}>{label}</p>
      <p style={{ color: C.ig, fontSize: 13, fontWeight: 700 }}>
        {(payload[0].value / 1000).toFixed(1)}K seguidores
      </p>
    </div>
  );
}

function KpiCard({ label, value, sub, icon, change, up }: {
  label: string; value: string; sub?: string; icon: React.ReactNode; change: string; up: boolean;
}) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-2" style={card}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.iconBg }}>
        <span style={{ color: C.ig }}>{icon}</span>
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

export default function InstagramScenario() {
  return (
    <div className="flex flex-col gap-4 max-w-[1600px]">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={card}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-sm"
          style={{ background: `linear-gradient(135deg, ${C.igPurple}, ${C.ig}, ${C.igOrange})` }}>IG</div>
        <div>
          <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>@boutiquemoda.oficial</h2>
          <p className="text-[11px]" style={{ color: C.textMute }}>Instagram Business · automação Leialt.IA</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-md font-semibold"
            style={{ background: "rgba(225,48,108,0.08)", color: C.ig, border: `1px solid rgba(225,48,108,0.18)` }}>
            48 posts/mês via IA
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Seguidores" value="128K" icon={<Users size={16} />} change="+3.2K" up sub="este mês" />
        <KpiCard label="Alcance Mensal" value="4.2M" icon={<Eye size={16} />} change="+18%" up sub="orgânico" />
        <KpiCard label="Engajamento" value="6.8%" icon={<Heart size={16} />} change="+0.4%" up sub="acima da média" />
        <KpiCard label="Saves / Post" value="2.4K" icon={<Bookmark size={16} />} change="+12%" up sub="média" />
      </div>

      {/* Growth chart + Content types */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7 p-5" style={card}>
          <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>Crescimento de Seguidores</h2>
          <p className="text-[11px] mb-5" style={{ color: C.textMute }}>Últimas 8 semanas</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={followerGrowth} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.035)" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<IgTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }} />
              <Line type="monotone" dataKey="followers" stroke={C.ig} strokeWidth={2}
                dot={{ fill: C.ig, r: 3, strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-12 lg:col-span-5 p-5" style={card}>
          <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>Engajamento por Formato</h2>
          <p className="text-[11px] mb-5" style={{ color: C.textMute }}>Taxa média de engajamento</p>
          <div className="flex flex-col gap-3">
            {contentTypes.map((ct) => (
              <div key={ct.type}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] font-semibold" style={{ color: C.textSec }}>{ct.type}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px]" style={{ color: C.textMute }}>{ct.posts} posts</span>
                    <span className="text-[12px] font-extrabold" style={{ color: C.ig }}>{ct.engagement}%</span>
                  </div>
                </div>
                <div className="h-[4px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${(ct.engagement / 10) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(to right, ${C.igPurple}, ${C.ig})` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Story stats */}
          <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-[11px] font-semibold mb-3" style={{ color: C.textMute }}>Stories · esta semana</p>
            <div className="grid grid-cols-2 gap-2">
              {storyStats.map((s) => (
                <div key={s.label} className="p-2.5 rounded-xl flex items-center gap-2"
                  style={{ background: C.hover, border: `1px solid ${C.border}` }}>
                  <span style={{ color: C.ig }}>{s.icon}</span>
                  <div>
                    <p className="text-[13px] font-extrabold leading-none" style={{ color: C.textPri }}>{s.value}</p>
                    <p className="text-[9px] mt-0.5" style={{ color: C.textMute }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Post grid */}
      <div className="p-5" style={card}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>Feed de Posts</h2>
            <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>Publicações recentes · métricas individuais</p>
          </div>
          <button className="text-[11px] px-3 py-1.5 rounded-lg font-semibold text-white"
            style={{ background: `linear-gradient(to right, ${C.igPurple}, ${C.ig})` }}>+ Novo Post</button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-2">
          {posts.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="relative group rounded-lg overflow-hidden cursor-pointer"
              style={{ aspectRatio: "1/1" }}>
              <img src={p.img} alt={`Post ${p.id}`} className="w-full h-full object-cover" />
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ background: "rgba(0,0,0,0.68)" }}>
                <div className="flex items-center gap-1 text-white text-[10px]">
                  <Heart size={9} className="fill-white" />{p.likes}
                </div>
                <div className="flex items-center gap-1 text-white text-[10px]">
                  <MessageCircle size={9} />{p.comments}
                </div>
              </div>
              {/* Type badge */}
              <div className="absolute top-1 left-1 px-1 py-0.5 rounded text-[8px] font-bold text-white"
                style={{ background: "rgba(0,0,0,0.6)" }}>
                {p.type === "Reel" ? "▶" : p.type === "Carrossel" ? "⊞" : "◻"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
