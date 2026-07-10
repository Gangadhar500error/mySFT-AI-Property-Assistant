"use client";

import { motion } from "framer-motion";
import type { SuggestionChip } from "@/types";

interface DefaultOptionCardsProps {
  suggestions: SuggestionChip[];
  onSelect: (suggestion: SuggestionChip) => void;
  disabled?: boolean;
  title?: string;
}

export function DefaultOptionCards({
  suggestions,
  onSelect,
  disabled,
  title,
}: DefaultOptionCardsProps) {
  return (
    <div className="w-full space-y-3">
      {title && <p className="text-base font-semibold text-gray-900">{title}</p>}
      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion, i) => (
          <motion.button
            key={suggestion.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-4 text-left text-[15px] text-gray-800 shadow-soft transition-all hover:border-gray-200 hover:shadow-md disabled:opacity-50"
          >
            <span className="whitespace-pre-line">{suggestion.label}</span>
            <span className="text-gray-400">→</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
