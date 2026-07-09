"use client";

import type { Message, SuggestionChip } from "@/types";
import { SuggestionChips } from "@/components/chat/SuggestionChips";
import { PropertyCard } from "@/components/chat/PropertyCard";

interface MessageBubbleProps {
  message: Message;
  onSuggestionSelect?: (suggestion: SuggestionChip) => void;
  onBookSiteVisit?: (project: { projectId: string; projectName: string }) => void;
  disabled?: boolean;
}

export function MessageBubble({
  message,
  onSuggestionSelect,
  onBookSiteVisit,
  disabled,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-2 animate-fade-in">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-gray-900 px-4 py-3 text-sm text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 px-4 py-2 animate-fade-in">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
        AI
      </div>
      <div className="max-w-[85%] space-y-1">
        <div className="rounded-2xl rounded-tl-md border border-gray-100 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-800 whitespace-pre-line">
          {message.content}
        </div>

        {message.suggestions && message.suggestions.length > 0 && onSuggestionSelect && (
          <SuggestionChips
            suggestions={message.suggestions}
            onSelect={onSuggestionSelect}
            disabled={disabled}
          />
        )}

        {message.propertyCards && message.propertyCards.length > 0 && (
          <div className="space-y-3 pt-2">
            {message.propertyCards.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onBookSiteVisit={onBookSiteVisit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
