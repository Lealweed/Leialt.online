"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center pointer-events-none"
    >
      {/* Pulse effect rings */}
      <span className="absolute w-[60px] h-[60px] bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
      
      <a
        href="https://wa.me/seunumerodecontato"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-[60px] h-[60px] bg-green-500 hover:bg-green-400 text-white rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all hover:scale-110 active:scale-95 z-50 pointer-events-auto"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle size={32} className="fill-current" />
      </a>
    </motion.div>
  );
}
