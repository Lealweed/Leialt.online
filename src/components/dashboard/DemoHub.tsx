"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Music2,
  Camera,
  Search,
  Sparkles,
} from "lucide-react";
import DashboardShell from "./DashboardShell";
import CrmScenario from "./scenarios/CrmScenario";
import FashionScenario from "./scenarios/FashionScenario";
import TikTokScenario from "./scenarios/TikTokScenario";
import InstagramScenario from "./scenarios/InstagramScenario";
import GoogleScenario from "./scenarios/GoogleScenario";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  border:   "rgba(255,255,255,0.055)",
  textSec:  "rgba(255,255,255,0.48)",
  textMute: "rgba(255,255,255,0.22)",
};

// ── Scenario registry ─────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id:       "crm",
    label:    "CRM",
    sublabel: "Empresarial",
    icon:     LayoutDashboard,
    color:    "#E1306C",
    desc:     "Gestão de clientes, pipeline e equipe em tempo real",
    tag:      "Gestão",
    component: CrmScenario,
  },
  {
    id:       "fashion",
    label:    "Loja",
    sublabel: "Fashion",
    icon:     ShoppingBag,
    color:    "#833AB4",
    desc:     "E-commerce de moda com IA para personalização e vendas",
    tag:      "E-commerce",
    component: FashionScenario,
  },
  {
    id:       "tiktok",
    label:    "TikTok",
    sublabel: "Shop",
    icon:     Music2,
    color:    "#00F2EA",
    desc:     "Social commerce e automação de conteúdo via TikTok",
    tag:      "Social Commerce",
    component: TikTokScenario,
  },
  {
    id:       "instagram",
    label:    "Instagram",
    sublabel: "Marketing",
    icon:     Camera,
    color:    "#F77737",
    desc:     "Campanhas visuais, crescimento orgânico e análise de público",
    tag:      "Marketing",
    component: InstagramScenario,
  },
  {
    id:       "google",
    label:    "Google",
    sublabel: "& SEO",
    icon:     Search,
    color:    "#2AABEE",
    desc:     "Ads, SEO e visibilidade digital para escalar resultados",
    tag:      "Performance",
    component: GoogleScenario,
  },
] as const;

type ScenarioId = (typeof SCENARIOS)[number]["id"];

// ── Component ─────────────────────────────────────────────────────────────────
export default function DemoHub() {
  const [active, setActive] = useState<ScenarioId>("crm");

  const scenario  = SCENARIOS.find((s) => s.id === active)!;
  const ScenarioComponent = scenario.component;

  return (
    <DashboardShell>
      {/* ── Scenario switcher bar ─────────────────────────────── */}
      <div
        className="sticky top-0 z-20 -mx-5 px-5 pt-3 pb-2 mb-5"
        style={{
          background:     "rgba(7,11,18,0.96)",
          backdropFilter: "blur(24px)",
          borderBottom:   `1px solid ${C.border}`,
        }}
      >
        {/* Context row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles size={11} style={{ color: scenario.color }} />
            <span
              className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: scenario.color }}
            >
              Demo Interativo
            </span>
            <span className="text-[10px] hidden sm:block" style={{ color: C.textMute }}>
              — {scenario.desc}
            </span>
          </div>
          <span
            className="text-[9px] font-semibold px-2 py-0.5 rounded-md shrink-0"
            style={{
              background: `${scenario.color}18`,
              color:       scenario.color,
              border:      `1px solid ${scenario.color}30`,
            }}
          >
            {scenario.tag}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {SCENARIOS.map((s) => {
            const Icon    = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0"
                style={{
                  background: isActive ? `${s.color}14` : "transparent",
                  border:     `1px solid ${isActive ? `${s.color}40` : C.border}`,
                  color:      isActive ? s.color : C.textSec,
                }}
              >
                <Icon size={12} />
                <span className="text-[12px] font-semibold whitespace-nowrap">{s.label}</span>
                <span
                  className="text-[11px] hidden sm:block whitespace-nowrap"
                  style={{ color: isActive ? `${s.color}bb` : C.textMute }}
                >
                  {s.sublabel}
                </span>

                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="demo-tab-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                    style={{ background: s.color }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scenario content ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <ScenarioComponent />
        </motion.div>
      </AnimatePresence>
    </DashboardShell>
  );
}
