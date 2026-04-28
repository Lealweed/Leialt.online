"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { contactLinks } from "@/lib/contact";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-background/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Ir para o início">
          {/* Rainbow gradient logo text */}
          <span
            className="font-display font-extrabold text-2xl tracking-[-0.02em] hidden sm:block"
            style={{
              background:
                "linear-gradient(to right, #22c55e, #06b6d4, #3b82f6, #833AB4, #E1306C, #F77737)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Leialt.IA
          </span>
          <span
            className="font-display font-extrabold text-2xl tracking-[-0.02em] sm:hidden"
            style={{
              background:
                "linear-gradient(to right, #22c55e, #06b6d4, #3b82f6, #833AB4, #E1306C, #F77737)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            LA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#topicos" className="hover:text-white transition-colors">
            Soluções
          </a>
          <a href="#empresa" className="hover:text-white transition-colors">
            Empresa
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Dashboard demo button */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.75)",
            }}
            aria-label="Ver demo do dashboard"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="hidden sm:inline">Ver Demo ao Vivo</span>
            <span className="sm:hidden">Demo</span>
          </Link>

          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white animate-navbar-bounce hover:animate-none hover:scale-105 active:scale-95 transition-transform"
            style={{
              background: "linear-gradient(to right, #2AABEE, #06b6d4)",
              boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
              fontFamily: "'Google Sans', sans-serif",
            }}
            aria-label="Falar com especialista"
          >
            Falar com especialista
          </a>
        </div>
      </div>
    </motion.header>
  );
}
