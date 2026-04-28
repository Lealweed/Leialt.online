"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  videoSrc: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ isOpen, videoSrc, title, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Lock scroll
    document.body.style.overflow = "hidden";
    // Focus close button
    setTimeout(() => closeButtonRef.current?.focus(), 100);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Pause video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${title}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              aria-label="Fechar video"
            >
              <X className="w-5 h-5" />
              Fechar
            </button>

            {/* Topic title */}
            <p className="text-white/50 text-sm tracking-widest uppercase mb-3 font-display font-extrabold">
              {title}
            </p>

            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
              {/* Rainbow border via outline */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{
                  boxShadow: "0 0 0 2px rgba(225,48,108,0.6), 0 0 40px rgba(131,58,180,0.3)",
                }}
              />
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
