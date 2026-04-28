"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { contactLinks } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const menuLinks = [
    { href: "#topicos", label: "Soluções" },
    { href: "#empresa", label: "Empresa" },
  ];

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
          {menuLinks.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full border border-white/10 bg-black/20 text-white hover:bg-white/10 hover:text-white"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[88vw] max-w-[320px] border-white/10 bg-[#070b12]/95 px-0 text-white backdrop-blur-xl"
            >
              <SheetHeader className="border-b border-white/10 px-5 pb-4 text-left">
                <SheetTitle className="font-display text-xl font-extrabold tracking-tight text-white">
                  Leialt.IA
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 px-5 py-6">
                <nav className="flex flex-col gap-2">
                  {menuLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #833AB4, #E1306C)",
                    boxShadow: "0 0 32px rgba(225,48,108,0.25)",
                  }}
                >
                  Ver demo do dashboard
                </Link>

                <a
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-3 text-center text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(to right, #2AABEE, #06b6d4)",
                    boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
                    fontFamily: "'Google Sans', sans-serif",
                  }}
                >
                  Falar com especialista
                </a>
              </div>
            </SheetContent>
          </Sheet>

          {/* Dashboard demo button */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
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
            className="hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-semibold text-white animate-navbar-bounce hover:animate-none hover:scale-105 active:scale-95 transition-transform"
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
