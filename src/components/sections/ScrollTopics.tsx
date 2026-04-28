"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useTransform, animate,
  type Variants, type TargetAndTransition,
} from "framer-motion";
import { Play } from "lucide-react";
import VideoModal from "@/components/ui/VideoModal";

// ── Topic data ────────────────────────────────────────────────────────────────
const topics = [
  {
    number: "01",
    title: "Automação Inteligente",
    description:
      "Automatizamos processos repetitivos com agentes de IA, liberando seu time para o que realmente importa: estratégia e crescimento contínuo.",
    color: "#22c55e",
    videoSrc: "/video-HOME.mp4",
  },
  {
    number: "02",
    title: "Análise de Dados",
    description:
      "Insights profundos em tempo real. Transformamos dados brutos em decisões com modelos preditivos, dashboards e tendências de mercado.",
    color: "#06b6d4",
    videoSrc: "/video-HOME.mp4",
  },
  {
    number: "03",
    title: "Personalização de Conteúdo",
    description:
      "Criamos experiências únicas para cada cliente com hiper-personalização baseada em comportamento, preferências e histórico de interações.",
    color: "#3b82f6",
    videoSrc: "/video-HOME.mp4",
  },
  {
    number: "04",
    title: "Engajamento Digital",
    description:
      "Otimizamos sua presença digital com estratégias inteligentes de alcance e conversão, aumentando resultados e fidelizando clientes.",
    color: "#833AB4",
    videoSrc: "/video-HOME.mp4",
  },
  {
    number: "05",
    title: "Integração de Plataformas",
    description:
      "Conectamos seu negócio a TikTok, Shopee, CRMs, WhatsApp e muito mais. Uma plataforma. Infinitas possibilidades.",
    color: "#E1306C",
    videoSrc: "/video-HOME.mp4",
  },
  {
    number: "06",
    title: "Crescimento Escalável",
    description:
      "Soluções que crescem com você, do primeiro cliente ao mercado global. IA estratégica para negócios que querem escala real.",
    color: "#F77737",
    videoSrc: "/video-HOME.mp4",
  },
];

// ── Per-topic title-word animation factories ──────────────────────────────────
// Each returns { hidden, show } given the word position index `i`.
// All are subtle and corporate — no bouncing or flashy effects.

type WordAnim = (i: number) => { hidden: TargetAndTransition; show: TargetAndTransition };

const WORD_ANIMATIONS: WordAnim[] = [
  // 01 — Rise: words float upward into place (classic editorial)
  (i) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.52, delay: 0.08 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }),

  // 02 — Slide: words enter from the left (data flows in)
  (i) => ({
    hidden: { opacity: 0, x: -22 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, delay: 0.06 + i * 0.055, ease: "easeOut" },
    },
  }),

  // 03 — Focus: words blur into sharp clarity (personalization resolves)
  (i) => ({
    hidden: { opacity: 0, filter: "blur(7px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.55, delay: 0.05 + i * 0.065, ease: "easeOut" },
    },
  }),

  // 04 — Scale: words expand into view (engagement grows)
  (i) => ({
    hidden: { opacity: 0, scale: 0.86 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.48, delay: 0.06 + i * 0.058, ease: [0.34, 1.06, 0.64, 1] },
    },
  }),

  // 05 — Descend: words fall from above (platform connects top-down)
  (i) => ({
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.44, delay: 0.06 + i * 0.052, ease: "easeOut" },
    },
  }),

  // 06 — Reveal: words sweep in via clip-path (scale unrolls left to right)
  (i) => ({
    hidden: { opacity: 1, clipPath: "inset(0 100% 0 0)" },
    show: {
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 0.52, delay: 0.04 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
    },
  }),
];

// ── Shared outer-container exit variants ──────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { when: "beforeChildren" } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: "easeIn" } },
};

// ── Shared variants for label, body text, CTA ────────────────────────────────
const labelVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

const bodyVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.34, ease: "easeOut" } },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.44, delay: 0.5, ease: "easeOut" } },
};

// ── Slide-to-Watch constants ──────────────────────────────────────────────────
const THUMB     = 50;   // thumb diameter (px)
const TRACK_W   = 230;  // total track width (px)
const TRACK_H   = 64;   // track height (px)
const PAD       = 7;    // inner padding
const MAX_DRAG  = TRACK_W - THUMB - PAD * 2;

// ── Slide-to-Watch component ──────────────────────────────────────────────────
interface SlideToWatchProps { color: string; onConfirm: () => void }

function SlideToWatch({ color, onConfirm }: SlideToWatchProps) {
  const x = useMotionValue(0);
  const labelOpacity  = useTransform(x, [0, 60],      [1, 0]);
  const trackFill     = useTransform(x, [0, MAX_DRAG], ["0%", "100%"]);
  const arrowOpacity  = useTransform(x, [45, 115],    [0, 0.45]);

  function handleDragEnd() {
    if (x.get() >= MAX_DRAG * 0.78) onConfirm();
    animate(x, 0, { type: "spring", stiffness: 380, damping: 32 });
  }

  return (
    <div
      role="button"
      aria-label="Deslize para assistir o vídeo"
      className="relative select-none"
      style={{
        width: TRACK_W,
        height: TRACK_H,
        borderRadius: TRACK_H / 2,
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 20px ${color}28`,
        background: "rgba(0,0,0,0.18)",
        overflow: "hidden",
      }}
    >
      {/* Progress fill */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, bottom: 0,
          background: `${color}1a`,
          width: trackFill,
        }}
      />

      {/* Label */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: labelOpacity }}
        className="absolute inset-0 flex items-center justify-center text-white font-semibold text-base pointer-events-none"
      >
        Assistir vídeo
      </motion.span>

      {/* Hint arrow (appears as label fades) */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: arrowOpacity }}
        className="absolute right-5 inset-y-0 flex items-center text-white text-2xl pointer-events-none"
      >
        ›
      </motion.span>

      {/* Draggable thumb */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: MAX_DRAG }}
        dragElastic={0.04}
        dragMomentum={false}
        style={{ x, position: "absolute", top: PAD, left: PAD, touchAction: "none" }}
        onDragEnd={handleDragEnd}
        className="cursor-grab"
        whileTap={{ scale: 0.93 }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: THUMB, height: THUMB, background: color }}
        >
          <Play size={19} className="text-white fill-white ml-0.5" />
        </div>
      </motion.div>
    </div>
  );
}

// ── Animated title component ──────────────────────────────────────────────────
interface AnimatedTitleProps {
  title: string;
  topicIndex: number;
}

function AnimatedTitle({ title, topicIndex }: AnimatedTitleProps) {
  const wordAnim = WORD_ANIMATIONS[topicIndex] ?? WORD_ANIMATIONS[0];
  const words = title.split(" ");

  return (
    <h2
      className="font-display font-extrabold leading-[0.92] tracking-[-0.04em] text-white mb-6"
      style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
      aria-label={title}
    >
      {words.map((word, i) => {
        const { hidden, show } = wordAnim(i);
        return (
          <motion.span
            key={`${topicIndex}-${i}`}
            initial={hidden}
            animate={show}
            className="inline-block"
            style={{ marginRight: "0.24em" }}
          >
            {word}
          </motion.span>
        );
      })}
    </h2>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ScrollTopics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState(topics[0]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = container.clientHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const index = Math.min(topics.length - 1, Math.floor(progress * topics.length));
      setActiveIndex(index);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = useCallback((topic: (typeof topics)[0]) => {
    setModalTopic(topic);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const topic = topics[activeIndex];

  return (
    <>
      <div ref={containerRef} id="topicos" style={{ height: "700vh" }} className="relative">
        {/* Sticky viewport */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: "100vh", background: "rgba(3,7,18,0.88)" }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Background watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`bg-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 0.055, scale: 1 }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.48 }}
                className="font-display font-extrabold leading-none"
                style={{ fontSize: "clamp(14rem, 30vw, 28rem)", color: topic.color }}
              >
                {topic.number}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Layout */}
          <div className="relative h-full flex items-center">
            {/* Progress dots */}
            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
              {topics.map((t, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const container = containerRef.current;
                    if (!container) return;
                    const total = container.clientHeight - window.innerHeight;
                    window.scrollTo({ top: container.offsetTop + (i / topics.length) * total, behavior: "smooth" });
                  }}
                  className="group"
                  aria-label={`Ir para tópico ${i + 1}`}
                >
                  <div
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: 6,
                      height: i === activeIndex ? 34 : 6,
                      backgroundColor: i === activeIndex ? t.color : "rgba(255,255,255,0.18)",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="absolute right-6 md:right-10 bottom-8 text-right z-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`counter-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-display font-extrabold text-white/20 text-2xl tracking-widest"
                >
                  {topic.number}<span className="text-sm">/06</span>
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Main content — staggered per-element animations */}
            <div className="w-full max-w-5xl mx-auto px-16 md:px-28 lg:px-36">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {/* Label */}
                  <motion.p
                    variants={labelVariants}
                    className="font-display font-extrabold text-sm tracking-[0.35em] uppercase mb-4"
                    style={{ color: topic.color }}
                  >
                    {topic.number} — Leialt.IA
                  </motion.p>

                  {/* Title — word by word, per-topic animation */}
                  <AnimatedTitle title={topic.title} topicIndex={activeIndex} />

                  {/* Description */}
                  <motion.p
                    variants={bodyVariants}
                    className="text-slate-300 text-lg md:text-xl max-w-[52ch] leading-relaxed mb-10"
                  >
                    {topic.description}
                  </motion.p>

                  {/* CTA — slide to watch */}
                  <motion.div variants={ctaVariants}>
                    <SlideToWatch color={topic.color} onConfirm={() => openModal(topic)} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(to right, #22c55e, #06b6d4, #3b82f6, #833AB4, #E1306C, #F77737)" }}
              animate={{ width: `${((activeIndex + 1) / topics.length) * 100}%` }}
              transition={{ duration: 0.38, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={modalOpen}
        videoSrc={modalTopic.videoSrc}
        title={modalTopic.title}
        onClose={closeModal}
      />
    </>
  );
}
