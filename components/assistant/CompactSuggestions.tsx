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
      className="flex flex-wrap gap-1.5"
    >
      {suggestions.map((suggestion, i) => (
        <motion.button
          key={suggestion.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03, duration: 0.2 }}
          whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className="cursor-pointer rounded-full border border-gray-200/80 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 disabled:opacity-40"
        >
          {suggestion.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
