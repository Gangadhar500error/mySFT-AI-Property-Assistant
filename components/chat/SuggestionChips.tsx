"use client";

import type { SuggestionChip } from "@/types";

interface SuggestionChipsProps {
  suggestions: SuggestionChip[];
  onSelect: (suggestion: SuggestionChip) => void;
  disabled?: boolean;
}

export function SuggestionChips({ suggestions, onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className="rounded-full border border-gray-200 bg-white px-3.5 py-2 text-left text-sm text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50 whitespace-pre-line"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}
