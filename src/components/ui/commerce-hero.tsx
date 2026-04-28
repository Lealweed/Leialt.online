"use client";

import { ArrowUpRight, Menu, Search, ShoppingBasket, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Vestidos",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&q=80",
    href: "#",
    badge: "Novo",
  },
  {
    title: "Calçados",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&q=80",
    href: "#",
    badge: "Top",
  },
  {
    title: "Acessórios",
    image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=400&h=500&fit=crop&q=80",
    href: "#",
    badge: null,
  },
  {
    title: "Coleções",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop&q=80",
    href: "#",
    badge: "Destaque",
  },
];

const navigation = [
  { name: "Início",     href: "#" },
  { name: "Loja",       href: "#" },
  { name: "Coleções",   href: "#" },
  { name: "Promoções",  href: "#" },
];

interface CommerceHeroProps {
  brandName?: string;
  tagline?: string;
  subtitle?: string;
}

export function CommerceHero({
  brandName = "Moda & Arte",
  tagline = "Vista sua melhor versão.",
  subtitle = "Curadoria de peças exclusivas que combinam estilo e personalidade. Descubra a coleção perfeita para cada momento.",
}: CommerceHeroProps) {
  return (
    <div className="w-full relative px-2 mx-auto max-w-7xl">
      <div className="mt-4 bg-accent/50 rounded-2xl relative overflow-hidden">

        {/* Header */}
        <header className="flex items-center">
          <div className="w-full md:w-2/3 lg:w-1/2 bg-background/95 backdrop-blur-sm p-4 rounded-br-2xl flex items-center gap-2">
            {/* Brand */}
            <a href="#" className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent shrink-0 mr-2">
              {brandName}
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center justify-between w-full">
              {navigation.map((item) => (
                <Button key={item.name} variant="link" className="cursor-pointer hover:text-primary transition-colors text-[13px] px-2">
                  {item.name}
                </Button>
              ))}
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative">
                <ShoppingBasket className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
              </Button>
            </nav>

            {/* Mobile nav */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden ml-auto">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 bg-background border-r border-border/50">
                <SheetHeader className="p-5 text-left border-b border-border/50">
                  <SheetTitle>
                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {brandName}
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-5 space-y-1">
                  {navigation.map((item) => (
                    <Button key={item.name} variant="ghost"
                      className="justify-start px-2 h-11 text-sm font-medium hover:bg-accent/50 hover:text-primary">
                      {item.name}
                    </Button>
                  ))}
                </nav>
                <Separator className="mx-5" />
                <div className="p-5">
                  <Button className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90">
                    Entrar <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop login */}
          <div className="hidden md:flex w-1/2 justify-end items-center pr-4 gap-3 ml-auto">
            {/* Powered by badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(131,58,180,0.1)", color: "#833AB4", border: "1px solid rgba(131,58,180,0.2)" }}>
              <Sparkles size={9} />
              Leialt.IA
            </div>
            <Button variant="secondary"
              className="cursor-pointer bg-primary-foreground p-0 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group">
              <span className="pl-4 py-2 text-sm font-medium text-foreground">Entrar</span>
              <div className="rounded-full flex items-center justify-center bg-background w-9 h-9 m-0.5 group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-foreground" />
              </div>
            </Button>
          </div>
        </header>

        {/* Hero text */}
        <motion.section
          className="w-full px-4 py-16 md:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="mx-auto text-center max-w-3xl">
            <motion.p
              className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--color-primary)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Coleção Verão 2025
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
                {tagline}
              </span>
            </motion.h1>
            <motion.p
              className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
            >
              {subtitle}
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-3 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <Button className="h-11 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                Explorar Coleção
              </Button>
              <Button variant="outline" className="h-11 px-6 rounded-full">
                Ver Promoções
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            className="group relative bg-muted/60 backdrop-blur-sm rounded-2xl p-4 min-h-[220px] w-full overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: "easeOut" }}
            style={{ border: "1px solid var(--commerce-border)" }}
          >
            <a href={category.href} className="absolute inset-0 z-20 flex flex-col">
              {/* Category name */}
              <h2 className="text-center text-xl md:text-2xl font-bold relative z-10 mt-3 group-hover:text-primary/90 transition-colors duration-300"
                style={{ color: "var(--color-primary)" }}>
                {category.title}
              </h2>
              {category.badge && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold text-primary-foreground"
                  style={{ background: "var(--color-primary)" }}>
                  {category.badge}
                </div>
              )}
              {/* Product image */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-28 md:w-32 h-auto object-cover rounded-xl opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              {/* Arrow button */}
              <div className="absolute bottom-0 right-0 w-14 h-14 bg-background/90 backdrop-blur-sm rounded-tl-xl flex items-center justify-center z-10 border-l border-t"
                style={{ borderColor: "var(--commerce-border)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm"
                  style={{ background: "var(--color-primary)", color: "white" }}>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
