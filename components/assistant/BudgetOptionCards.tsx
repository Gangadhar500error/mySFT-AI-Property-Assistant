"use client";

import { motion } from "framer-motion";
import type { SuggestionChip } from "@/types";
import { BUDGET_CARD_LABELS } from "@/lib/assistant-ui";

interface BudgetOptionCardsProps {
  suggestions: SuggestionChip[];
  onSelect: (suggestion: SuggestionChip) => void;
  disabled?: boolean;
  title?: string;
}

export function BudgetOptionCards({
  suggestions,
  onSelect,
  disabled,
  title,
}: BudgetOptionCardsProps) {
  return (
    <div className="w-full space-y-3">
      {title && <p className="text-base font-semibold text-gray-900">{title}</p>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {suggestions.map((suggestion, i) => {
          const label = BUDGET_CARD_LABELS[suggestion.value] ?? suggestion.label;
          return (
            <motion.button
              key={suggestion.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(suggestion)}
              disabled={disabled}
              className="rounded-2xl border border-gray-100 bg-white px-4 py-5 text-center text-[15px] font-medium text-gray-800 shadow-soft transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50"
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
