"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
