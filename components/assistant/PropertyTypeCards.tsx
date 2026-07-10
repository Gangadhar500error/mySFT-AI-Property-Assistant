"use client";

import { motion } from "framer-motion";
import type { SuggestionChip } from "@/types";
import { PROPERTY_TYPE_CARDS } from "@/lib/assistant-ui";

interface PropertyTypeCardsProps {
  suggestions: SuggestionChip[];
  onSelect: (suggestion: SuggestionChip) => void;
  disabled?: boolean;
  title?: string;
}

export function PropertyTypeCards({
  suggestions,
  onSelect,
  disabled,
  title,
}: PropertyTypeCardsProps) {
  return (
    <div className="w-full space-y-3">
      {title && (
        <p className="text-base font-semibold text-gray-900">{title}</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {suggestions.map((suggestion, i) => {
          const meta = PROPERTY_TYPE_CARDS[suggestion.value] ?? {
            icon: "✨",
            title: suggestion.label,
            subtitle: "Select option",
          };
          return (
            <motion.button
              key={suggestion.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              onClick={() => onSelect(suggestion)}
              disabled={disabled}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-soft transition-colors hover:border-gray-200 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{meta.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{meta.title}</p>
                  <p className="text-xs text-gray-500">{meta.subtitle}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-gray-900">
                Select →
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
