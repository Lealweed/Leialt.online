"use client";

import { motion } from "framer-motion";

// Chart colors — only data visualization elements use color
const CHART_COLORS = ["#2AABEE", "#22c55e", "#833AB4", "#F77737", "#E1306C"];

const stages = [
  { name: "Leads",        value: 100, pct: 100 },
  { name: "Qualificados", value: 72,  pct: 72  },
  { name: "Proposta",     value: 48,  pct: 48  },
  { name: "Negociação",   value: 31,  pct: 31  },
  { name: "Fechados",     value: 18,  pct: 18  },
];

export default function CrmPipeline() {
  return (
    <div className="flex flex-col gap-4">
      {stages.map((stage, i) => {
        const color = CHART_COLORS[i];
        const convPct =
          i === 0 ? null : Math.round((stage.value / stages[i - 1].value) * 100);

        return (
          <div key={stage.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[11px] font-medium"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                {stage.name}
              </span>
              <div className="flex items-center gap-2.5">
                {convPct !== null && (
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    ↓{convPct}%
                  </span>
                )}
                <span
                  className="font-display font-extrabold text-[13px]"
                  style={{ color }}
                >
                  {stage.value}
                </span>
              </div>
            </div>

            {/* Track */}
            <div
              className="relative w-full rounded-full overflow-hidden"
              style={{ height: 4, background: "rgba(255,255,255,0.05)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stage.pct}%` }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ background: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
