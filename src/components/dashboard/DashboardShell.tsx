"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  CheckSquare,
  Play,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  ArrowLeft,
} from "lucide-react";

// ── Design tokens (corporate monochrome) ─────────────────────────────────────
const T = {
  bg: "#070b12",
  sidebar: "#09101a",
  surface: "#0d1320",
  border: "rgba(255,255,255,0.055)",
  accent: "#E1306C",
  accentDim: "rgba(225,48,108,0.08)",
  textPrimary: "#e6edf3",
  textSecondary: "rgba(255,255,255,0.48)",
  textMuted: "rgba(255,255,255,0.22)",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#top" },
  { id: "crm",       label: "CRM",        icon: TrendingUp,    href: "#crm" },
  { id: "equipe",    label: "Equipe",      icon: Users,         href: "#equipe" },
  { id: "tarefas",   label: "Tarefas",     icon: CheckSquare,   href: "#tarefas" },
  { id: "videos",    label: "Vídeos",      icon: Play,          href: "#videos" },
  { id: "precos",    label: "Preços",      icon: CreditCard,    href: "#precos" },
];

interface DashboardShellProps {
  children: React.ReactNode;
  isLive?: boolean;
  revenueToday?: string;
}

export default function DashboardShell({ children, isLive, revenueToday }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const sidebarWidth = collapsed ? 60 : 216;

  return (
    <div className="min-h-screen" style={{ background: T.bg, color: T.textPrimary }}>

      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed top-0 left-0 bottom-0 z-40 flex flex-col overflow-hidden"
        style={{ background: T.sidebar, borderRight: `1px solid ${T.border}` }}
      >
        {/* Brand */}
        <div
          className="flex items-center gap-3 px-3.5 h-14 shrink-0"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div
            className="w-7 h-7 rounded-md shrink-0 flex items-center justify-center font-display font-extrabold text-[11px] text-white"
            style={{ background: T.accent }}
          >
            L
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.12 }}
                className="font-display font-extrabold text-sm tracking-tight whitespace-nowrap"
                style={{ color: T.textPrimary }}
              >
                Leialt.IA
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Section label */}
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pt-5 pb-2 text-[9px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: T.textMuted }}
            >
              Navegação
            </motion.p>
          )}
        </AnimatePresence>

        {/* Nav */}
        <nav className="flex-1 py-1 flex flex-col gap-0.5 px-2 overflow-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all duration-150"
                style={{
                  background: isActive ? T.accentDim : "transparent",
                  borderLeft: isActive ? `2px solid ${T.accent}` : "2px solid transparent",
                }}
              >
                <Icon
                  size={16}
                  className="shrink-0"
                  style={{ color: isActive ? T.accent : T.textMuted }}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="text-[13px] font-medium whitespace-nowrap"
                      style={{ color: isActive ? T.textPrimary : T.textSecondary }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 flex flex-col gap-0.5" style={{ borderTop: `1px solid ${T.border}` }}>
          <button
            className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all hover:bg-white/[0.04] w-full"
            style={{ color: T.textMuted }}
          >
            <Settings size={16} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[13px] whitespace-nowrap"
                >
                  Configurações
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all hover:bg-white/[0.04] w-full"
            style={{ color: T.textMuted }}
            aria-label={collapsed ? "Expandir" : "Recolher"}
          >
            {collapsed
              ? <ChevronRight size={16} className="shrink-0" />
              : <ChevronLeft size={16} className="shrink-0" />
            }
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[13px] whitespace-nowrap"
                >
                  Recolher
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ── Main area ────────────────────────────────────────────── */}
      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex flex-col min-h-screen"
      >
        {/* Header */}
        <header
          id="top"
          className="sticky top-0 z-30 flex items-center justify-between px-6 h-14 shrink-0"
          style={{
            background: `${T.sidebar}ee`,
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[11px] transition-colors hover:text-white/60"
              style={{ color: T.textMuted }}
            >
              <ArrowLeft size={11} />
              Voltar ao site
            </Link>
            <span style={{ color: T.border, fontSize: "0.65rem" }}>|</span>
            <h1 className="font-display font-extrabold text-[13px]" style={{ color: T.textSecondary }}>
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live indicator */}
            {isLive && (
              <div
                className="flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px]"
                style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)" }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="font-semibold text-green-400">Ao vivo</span>
                {revenueToday && (
                  <span className="font-mono text-green-300/80">{revenueToday}</span>
                )}
              </div>
            )}

            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${T.border}`,
                color: T.textMuted,
              }}
            >
              <Search size={11} />
              <span>Buscar...</span>
              <kbd
                className="ml-5 text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: "rgba(255,255,255,0.06)", color: T.textMuted }}
              >
                ⌘K
              </kbd>
            </div>

            {/* Notifications */}
            <button
              className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-white/[0.04]"
              aria-label="Notificações"
            >
              <Bell size={14} style={{ color: T.textSecondary }} />
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: T.accent }}
              />
            </button>

            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: T.accent }}
            >
              LA
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 overflow-auto">{children}</main>
      </motion.div>
    </div>
  );
}
