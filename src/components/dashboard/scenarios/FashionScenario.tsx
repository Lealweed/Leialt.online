"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Package, Star, AlertTriangle, TrendingUp, TrendingDown,
  ArrowUpRight, Store, BarChart3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { CommerceHero } from "@/components/ui/commerce-hero";

// ── Dark analytics tokens ─────────────────────────────────────────────────────
const C = {
  surface:  "#0d1320",
  border:   "rgba(255,255,255,0.055)",
  hover:    "rgba(255,255,255,0.03)",
  iconBg:   "rgba(255,255,255,0.05)",
  textPri:  "#e6edf3",
  textSec:  "rgba(255,255,255,0.48)",
  textMute: "rgba(255,255,255,0.22)",
  accent:   "#833AB4",
  positive: "#22c55e",
  negative: "#ef4444",
};
const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14 };

// ── Fashion storefront CSS theme (light purple) ───────────────────────────────
const FASHION_THEME: React.CSSProperties = {
  "--color-background":           "#faf7fd",
  "--color-foreground":           "#18041e",
  "--color-primary":              "#833AB4",
  "--color-primary-foreground":   "#ffffff",
  "--color-secondary":            "#f0e8f8",
  "--color-secondary-foreground": "#4a2070",
  "--color-accent":               "#f0e8f8",
  "--color-accent-foreground":    "#4a2070",
  "--color-muted":                "#f5f0fa",
  "--color-muted-foreground":     "#6b4c8a",
  "--color-border":               "rgba(131,58,180,0.14)",
  "--color-input":                "rgba(131,58,180,0.14)",
  "--color-ring":                 "#833AB4",
  "--commerce-border":            "rgba(131,58,180,0.16)",
  background:                     "#faf7fd",
  color:                          "#18041e",
  fontFamily:                     "'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif",
} as React.CSSProperties;

// ── Mock data ─────────────────────────────────────────────────────────────────
const categoryData = [
  { cat: "Vestidos",   vendas: 348, color: "#833AB4" },
  { cat: "Calças",     vendas: 216, color: "#E1306C" },
  { cat: "Blusas",     vendas: 184, color: "#2AABEE" },
  { cat: "Acessórios", vendas: 97,  color: "#F77737" },
  { cat: "Calçados",   vendas: 73,  color: "#22c55e" },
];

const products = [
  { id: 1, name: "Vestido Midi Floral",   cat: "Vestidos",   price: 189, stock: 48, sold: 124, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=260&fit=crop&q=80" },
  { id: 2, name: "Calça Alfaiataria",     cat: "Calças",     price: 219, stock: 12, sold: 89,  img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=260&fit=crop&q=80" },
  { id: 3, name: "Blusa Seda Premium",    cat: "Blusas",     price: 149, stock: 3,  sold: 76,  img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=200&h=260&fit=crop&q=80" },
  { id: 4, name: "Tênis Chunky Platform", cat: "Calçados",   price: 349, stock: 21, sold: 58,  img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=260&fit=crop&q=80" },
  { id: 5, name: "Bolsa Couro Tote",      cat: "Acessórios", price: 429, stock: 8,  sold: 47,  img: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=200&h=260&fit=crop&q=80" },
  { id: 6, name: "Conjunto Linho Bege",   cat: "Vestidos",   price: 289, stock: 0,  sold: 93,  img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=260&fit=crop&q=80" },
];

const recentOrders = [
  { id: "#8741", customer: "Mariana Oliveira", item: "Vestido Midi Floral",   value: 189, status: "entregue" },
  { id: "#8742", customer: "Fernanda Costa",   item: "Blusa Seda Premium",    value: 149, status: "em trânsito" },
  { id: "#8743", customer: "Juliana Pereira",  item: "Calça Alfaiataria",     value: 219, status: "separando" },
  { id: "#8744", customer: "Amanda Souza",     item: "Tênis Chunky Platform", value: 349, status: "pago" },
];

const statusColors: Record<string, string> = {
  entregue:       "#22c55e",
  "em trânsito":  "#2AABEE",
  separando:      "#F77737",
  pago:           "#833AB4",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FashionTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1320", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, marginBottom: 6 }}>{label}</p>
      <p style={{ color: "#e6edf3", fontSize: 13, fontWeight: 700 }}>{payload[0].value} vendas</p>
    </div>
  );
}

function KpiCard({ label, value, sub, icon, change, up }: {
  label: string; value: string; sub?: string; icon: React.ReactNode; change: string; up: boolean;
}) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-2" style={card}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.iconBg }}>
        <span style={{ color: C.accent }}>{icon}</span>
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

// ── Root ──────────────────────────────────────────────────────────────────────
export default function FashionScenario() {
  const [view, setView] = useState<"loja" | "analytics">("loja");

  return (
    <div className="flex flex-col gap-4 max-w-[1600px]">

      {/* View switcher */}
      <div className="flex items-center gap-2 p-1 rounded-xl w-fit" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
        {[
          { id: "loja" as const,      label: "Loja",      icon: <Store size={13} />      },
          { id: "analytics" as const, label: "Analytics", icon: <BarChart3 size={13} /> },
        ].map((tab) => {
          const isActive = tab.id === view;
          return (
            <button key={tab.id} onClick={() => setView(tab.id)}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all"
              style={{
                background: isActive ? C.accent : "transparent",
                color:      isActive ? "#fff" : C.textSec,
              }}>
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
        <span className="ml-2 text-[10px] pl-2" style={{ color: C.textMute, borderLeft: `1px solid ${C.border}` }}>
          Moda & Arte Boutique
        </span>
      </div>

      <AnimatePresence mode="wait">
        {view === "loja" ? (
          // ── STOREFRONT VIEW ─────────────────────────────────────────────────
          <motion.div
            key="loja"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {/* Fashion theme wrapper — overrides CSS variables to light mode */}
            <div style={FASHION_THEME} className="rounded-2xl overflow-hidden pb-6">
              {/* Store label badge */}
              <div className="flex items-center gap-2 px-4 pt-4 pb-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{ background: "rgba(131,58,180,0.12)", color: "#833AB4", border: "1px solid rgba(131,58,180,0.2)" }}>
                  <Store size={9} /> Prévia do Site do Cliente
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.18)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                  Loja Online
                </div>
              </div>
              <CommerceHero
                brandName="Moda & Arte"
                tagline="Vista sua melhor versão."
                subtitle="Curadoria de peças exclusivas que combinam estilo e personalidade. Descubra a coleção perfeita para cada momento da sua vida."
              />
            </div>
          </motion.div>
        ) : (
          // ── ANALYTICS VIEW ──────────────────────────────────────────────────
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-4"
          >
            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard label="Produtos Ativos" value="1.247" icon={<Package size={16} />} change="+18" up sub="vs semana" />
              <KpiCard label="Pedidos Hoje" value="94" icon={<ShoppingBag size={16} />} change="+11%" up sub="Meta: 80" />
              <KpiCard label="Ticket Médio" value="R$ 312" icon={<TrendingUp size={16} />} change="+7.3%" up sub="vs mês anterior" />
              <KpiCard label="Satisfação" value="96%" icon={<Star size={16} />} change="-0.4%" up={false} sub="847 avaliações" />
            </div>

            {/* Chart + Orders */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-7 p-5" style={card}>
                <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>Vendas por Categoria</h2>
                <p className="text-[11px] mb-5" style={{ color: C.textMute }}>Mês atual · unidades vendidas</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={categoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={28}>
                    <CartesianGrid stroke="rgba(255,255,255,0.035)" vertical={false} />
                    <XAxis dataKey="cat" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<FashionTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="vendas" radius={[6, 6, 0, 0]} fill="#833AB4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="col-span-12 lg:col-span-5 p-5" style={card}>
                <h2 className="font-display font-extrabold text-[15px] mb-0.5" style={{ color: C.textPri }}>Pedidos Recentes</h2>
                <p className="text-[11px] mb-4" style={{ color: C.textMute }}>Últimas atualizações</p>
                <div className="flex flex-col gap-2">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: C.hover, border: `1px solid ${C.border}` }}>
                      <span className="text-[11px] font-mono font-bold shrink-0" style={{ color: C.textMute }}>{order.id}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold truncate" style={{ color: C.textPri }}>{order.customer}</p>
                        <p className="text-[10px] truncate" style={{ color: C.textMute }}>{order.item}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[12px] font-bold" style={{ color: C.textPri }}>R${order.value}</p>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: `${statusColors[order.status]}18`, color: statusColors[order.status] }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="p-5" style={card}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-display font-extrabold text-[15px]" style={{ color: C.textPri }}>Catálogo</h2>
                  <p className="text-[11px] mt-0.5" style={{ color: C.textMute }}>Mais vendidos do mês</p>
                </div>
                <button className="text-[11px] px-3 py-1.5 rounded-lg font-semibold text-white"
                  style={{ background: C.accent }}>+ Novo Produto</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {products.map((p, idx) => (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                    style={{ background: C.hover, border: `1px solid ${C.border}` }}>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      {p.stock === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ background: "rgba(0,0,0,0.6)" }}>
                          <span className="text-[10px] font-bold text-white/80">Esgotado</span>
                        </div>
                      )}
                      {p.stock > 0 && p.stock <= 5 && (
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-0.5"
                          style={{ background: "#F77737", color: "white" }}>
                          <AlertTriangle size={8} /> {p.stock}
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-[11px] font-semibold leading-tight truncate" style={{ color: C.textPri }}>{p.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: C.textMute }}>{p.cat}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[12px] font-extrabold" style={{ color: C.accent }}>R${p.price}</span>
                        <span className="text-[9px]" style={{ color: C.textMute }}>{p.sold} vendas</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
