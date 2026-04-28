"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, ArrowRight } from "lucide-react";

export default function VideoHero() {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(3,7,18,0.18) 0%, rgba(3,7,18,0.35) 50%, rgba(3,7,18,0.92) 100%)",
      }}
    >
      {/* Spacer — video speaks for itself */}
      <div className="flex-1" />

      {/* CTA central */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 mb-12"
      >
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 px-6 py-3.5 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #833AB4, #E1306C)",
            boxShadow: "0 0 32px rgba(225,48,108,0.35)",
          }}
        >
          <LayoutDashboard className="w-4 h-4" />
          Ver Demo Interativo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="pb-10 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs tracking-[0.3em] uppercase">Deslize para conhecer</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
