"use client";

import { motion } from "framer-motion";
import type { SuggestionChip } from "@/types";

const PILL_COLORS = [
  "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700",
  "hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700",
  "hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700",
  "hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700",
  "hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700",
  "hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700",
  "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700",
];

interface CompactSuggestionsProps {
  suggestions: SuggestionChip[];
  onSelect: (suggestion: SuggestionChip) => void;
  disabled?: boolean;
  isCollapsed?: boolean;
}

export function CompactSuggestions({
  suggestions,
  onSelect,
  disabled,
  isCollapsed,
}: CompactSuggestionsProps) {
  if (isCollapsed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2"
    >
      {suggestions.map((suggestion, i) => (
        <motion.button
          key={suggestion.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className={`rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[14px] text-gray-700 shadow-sm transition-all active:scale-95 disabled:opacity-40 ${PILL_COLORS[i % PILL_COLORS.length]}`}
        >
          {suggestion.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
