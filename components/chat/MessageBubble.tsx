"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ConversationStep, Message, SuggestionChip } from "@/types";
import { parseAssistantMessage, parseMessageBlocks } from "@/lib/chat-ui";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { UserAvatar } from "@/components/chat/UserAvatar";
import { CompactSuggestions } from "@/components/assistant/CompactSuggestions";
import { PropertyCard } from "@/components/chat/PropertyCard";

interface MessageBubbleProps {
  message: Message;
  userName?: string;
  currentStep?: ConversationStep;
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
    <div className="space-y-2">
      {blocks.map((block, i) =>
        block.type === "paragraph" ? (
          <p key={i} className="text-[15px] leading-relaxed text-gray-800">
            {block.text}
          </p>
        ) : (
          <ul key={i} className="space-y-1 pl-1">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-[15px] leading-relaxed text-gray-700">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
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
  const showCollapsed = hasSuggestions && isAnswered;

  const { acknowledgment, question } = parseAssistantMessage(
    message.content,
    showSuggestions || showCollapsed
  );

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-end justify-end gap-2 px-5 py-2"
      >
        <div className="max-w-[55%] rounded-2xl bg-gray-900 px-4 py-2.5 text-[15px] leading-relaxed text-white">
          {message.content}
        </div>
        <UserAvatar name={userName} />
      </motion.div>
    );
  }

  const displayText = acknowledgment.trim() || (!showSuggestions ? message.content : "");

  return (
    <div className="px-5 py-2">
      <div className="flex items-start gap-2.5">
        {showAvatar ? (
          <AIAvatar size="md" className="mt-0.5 shrink-0" />
        ) : (
          <div className="w-10 shrink-0" />
        )}

        <div className="min-w-0 max-w-[72%] space-y-2">
          {displayText && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-gray-100 bg-white px-4 py-2.5 shadow-soft"
            >
              <FormattedContent content={displayText} />
            </motion.div>
          )}

          {(showSuggestions || showCollapsed) && (
            <div className="space-y-2">
              {question && (
                <p className="text-[15px] font-medium text-gray-900">{question}</p>
              )}
              <AnimatePresence mode="wait">
                {message.suggestions && onSuggestionSelect && (
                  <CompactSuggestions
                    suggestions={message.suggestions}
                    onSelect={onSuggestionSelect}
                    disabled={disabled}
                    isCollapsed={isAnswered}
                  />
                )}
              </AnimatePresence>
            </div>
          )}

          {message.propertyCards && message.propertyCards.length > 0 && (
            <div className="space-y-3 pt-1">
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
