"use client";

import { motion } from "framer-motion";
import type { SuggestionChip } from "@/types";

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
      exit={{ opacity: 0, y: -4 }}
      className="flex flex-wrap gap-2"
    >
      {suggestions.map((suggestion, i) => (
        <motion.button
          key={suggestion.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[14px] text-gray-700 shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-40"
        >
          {suggestion.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
