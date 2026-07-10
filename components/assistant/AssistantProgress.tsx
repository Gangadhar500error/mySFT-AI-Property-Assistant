"use client";

import { motion } from "framer-motion";
import type { ConversationStep } from "@/types";
import { getConversationProgress } from "@/lib/assistant-ui";

interface AssistantProgressProps {
  step: ConversationStep;
}

export function AssistantProgress({ step }: AssistantProgressProps) {
  const { current, total, label, percent } = getConversationProgress(step);

  if (step === "welcome" || step === "success" || step === "summary") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-100/80 bg-gray-50/40 px-8 py-4"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-700">
          Step {current} of {total}
        </span>
        <span className="text-gray-500">{label}</span>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-gray-200/80">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full bg-gray-900"
        />
      </div>
    </motion.div>
  );
}
