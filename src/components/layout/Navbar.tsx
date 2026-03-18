"use client";

import { useState, useEffect } from "react";
import { Link } from "lucide-react";
import { motion } from "framer-motion";

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
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            L
          </div>
          <span className="font-bold text-xl text-white tracking-widest hidden sm:block hover:text-cyan-400 transition-colors">
            LeIALT
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#solucoes" className="hover:text-cyan-400 transition-colors">Soluções</a>
          <a href="#nichos" className="hover:text-cyan-400 transition-colors">Nichos</a>
          <a href="#resultados" className="hover:text-cyan-400 transition-colors">Resultados</a>
        </nav>

        <a 
          href="https://wa.me/seunumerodecontato" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:border-cyan-500/50">
            Falar com especialista
          </button>
        </a>
      </div>
    </motion.header>
  );
}
