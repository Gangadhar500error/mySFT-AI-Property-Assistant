"use client";

import { motion } from "framer-motion";
import type { SuggestionChip } from "@/types";

interface SuggestionChipsProps {
  suggestions: SuggestionChip[];
  onSelect: (suggestion: SuggestionChip) => void;
  disabled?: boolean;
  title?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      delay: 0.08 * i,
      ease: "easeOut" as const,
    },
  }),
};

export function SuggestionChips({
  suggestions,
  onSelect,
  disabled,
  title,
}: SuggestionChipsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[340px] rounded-[18px] border border-gray-100/80 bg-white p-4 shadow-soft"
    >
      {title && (
        <p className="mb-3.5 text-center text-sm font-medium leading-snug text-gray-800">
          {title}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.id}
            custom={index}
            variants={chipVariants}
            initial="hidden"
            animate="visible"
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            className="group flex w-full items-center gap-3 rounded-full border border-gray-200/80 bg-white px-4 py-2.5 text-left text-sm text-gray-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/60 hover:text-gray-900 active:scale-[0.98] disabled:opacity-50"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors group-hover:border-blue-400" />
            <span className="whitespace-pre-line">{suggestion.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
