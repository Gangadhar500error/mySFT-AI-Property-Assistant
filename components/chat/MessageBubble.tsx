"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Message, SuggestionChip } from "@/types";
import { parseAssistantMessage, parseMessageBlocks } from "@/lib/chat-ui";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { UserAvatar } from "@/components/chat/UserAvatar";
import { CompactSuggestions } from "@/components/assistant/CompactSuggestions";
import { PropertyCard } from "@/components/chat/PropertyCard";

interface MessageBubbleProps {
  message: Message;
  userName?: string;
  showAvatar?: boolean;
  isLatestAssistant?: boolean;
  isAnswered?: boolean;
  onSuggestionSelect?: (suggestion: SuggestionChip) => void;
  onBookSiteVisit?: (project: { projectId: string; projectName: string }) => void;
  disabled?: boolean;
}

function FormattedContent({ content }: { content: string }) {
  const blocks = parseMessageBlocks(content);

  return (
    <div className="space-y-1.5">
      {blocks.map((block, i) =>
        block.type === "paragraph" ? (
          <p key={i} className="text-[14px] leading-relaxed text-gray-800">
            {block.text}
          </p>
        ) : (
          <ul key={i} className="space-y-1">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-[14px] text-gray-700">
                <span className="mt-1.5 text-gray-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export function MessageBubble({
  message,
  userName,
  showAvatar = true,
  isLatestAssistant = false,
  isAnswered = false,
  onSuggestionSelect,
  onBookSiteVisit,
  disabled,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const hasSuggestions = Boolean(message.suggestions && message.suggestions.length > 0);
  const showSuggestions = hasSuggestions && isLatestAssistant && !isAnswered;

  const { acknowledgment, question } = parseAssistantMessage(
    message.content,
    showSuggestions
  );

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex items-end justify-end gap-2 px-4 py-1.5"
      >
        <div className="max-w-[78%] rounded-[18px] rounded-br-md bg-blue-600 px-3.5 py-2.5 text-[14px] leading-relaxed text-white">
          {message.content}
        </div>
        <UserAvatar name={userName} />
      </motion.div>
    );
  }

  const displayText = acknowledgment.trim() || (!showSuggestions ? message.content : "");

  return (
    <div className="px-4 py-1.5">
      <div className="flex items-start gap-2">
        {showAvatar ? (
          <AIAvatar size="sm" className="mt-0.5 shrink-0" />
        ) : (
          <div className="w-9 shrink-0" />
        )}

        <div className="min-w-0 max-w-[85%] space-y-2">
          {displayText && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="rounded-[18px] rounded-tl-md bg-gray-100 px-3.5 py-2.5"
            >
              <FormattedContent content={displayText} />
            </motion.div>
          )}

          {showSuggestions && (
            <div className="space-y-2">
              {question && (
                <p className="text-[14px] font-medium text-gray-800">{question}</p>
              )}
              <AnimatePresence mode="wait">
                {message.suggestions && onSuggestionSelect && (
                  <CompactSuggestions
                    suggestions={message.suggestions}
                    onSelect={onSuggestionSelect}
                    disabled={disabled}
                  />
                )}
              </AnimatePresence>
            </div>
          )}

          {message.propertyCards && message.propertyCards.length > 0 && (
            <div className="space-y-2.5 pt-1">
              {message.propertyCards.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  onBookSiteVisit={onBookSiteVisit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
