"use client";

import { motion } from "framer-motion";
import type { ConversationStep } from "@/types";
import { COLORFUL_STEPS, getConversationProgress } from "@/lib/assistant-ui";

interface AssistantProgressProps {
  step: ConversationStep;
}

export function AssistantProgress({ step }: AssistantProgressProps) {
  const { current, total, label } = getConversationProgress(step);
  const activeColor = COLORFUL_STEPS[current - 1]?.color ?? "#6366f1";

  if (step === "welcome" || step === "success" || step === "summary") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex shrink-0 items-center gap-3 border-b border-gray-100 bg-white px-5 py-2"
    >
      <div className="flex items-center gap-1">
        {COLORFUL_STEPS.map((s, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <div
              key={s.key}
              title={s.label}
              className="h-1.5 w-1.5 rounded-full transition-colors"
              style={{
                backgroundColor: done || active ? s.color : "#e5e7eb",
                transform: active ? "scale(1.4)" : undefined,
                boxShadow: active ? `0 0 0 2px ${s.color}40` : undefined,
              }}
            />
          );
        })}
      </div>

      <p className="min-w-0 flex-1 truncate text-[12px] text-gray-500">
        <span className="font-medium text-gray-600">
          {current}/{total}
        </span>
        <span className="mx-1.5 text-gray-300">·</span>
        <span style={{ color: activeColor }} className="font-medium">
          {label}
        </span>
      </p>
    </motion.div>
  );
}
