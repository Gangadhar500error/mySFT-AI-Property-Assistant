"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SuggestionChip } from "@/types";
import { HYDERABAD_AREAS } from "@/lib/assistant-ui";

interface LocationOptionCardsProps {
  suggestions: SuggestionChip[];
  onSelect: (suggestion: SuggestionChip) => void;
  disabled?: boolean;
  title?: string;
  city?: string;
}

export function LocationOptionCards({
  suggestions,
  onSelect,
  disabled,
  title,
  city,
}: LocationOptionCardsProps) {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? suggestions.filter((s) =>
        s.label.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    const match = suggestions.find(
      (s) => s.label.toLowerCase() === search.toLowerCase()
    );
    if (match) {
      onSelect(match);
    } else {
      onSelect({
        id: `custom-${Date.now()}`,
        label: search.trim(),
        value: search.trim(),
      });
    }
  };

  const popularAreaChips: SuggestionChip[] =
    city === "Hyderabad"
      ? HYDERABAD_AREAS.map((area, i) => {
          const existing = suggestions.find((s) => s.label === area);
          return existing ?? { id: `hyd-${i}`, label: area, value: area };
        })
      : suggestions.filter((s) => s.value !== "other");

  const displayAreas = filtered ?? popularAreaChips;

  return (
    <div className="w-full space-y-4">
      {title && <p className="text-base font-semibold text-gray-900">{title}</p>}

      <div>
        <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-gray-400">
          Popular Areas
        </p>
        <div className="flex flex-wrap gap-2">
          {displayAreas.map((suggestion, i) => (
            <motion.button
              key={suggestion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => onSelect(suggestion)}
              disabled={disabled}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50"
            >
              {suggestion.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="mb-2.5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your preferred location"
            disabled={disabled}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 disabled:opacity-50"
          />
        </form>
      </div>
    </div>
  );
}
