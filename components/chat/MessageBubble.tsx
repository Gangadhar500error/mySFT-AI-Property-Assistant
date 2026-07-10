"use client";

import { motion } from "framer-motion";
import type { Message, SuggestionChip } from "@/types";
import { parseAssistantMessage } from "@/lib/chat-ui";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { UserAvatar } from "@/components/chat/UserAvatar";
import { SuggestionChips } from "@/components/chat/SuggestionChips";
import { PropertyCard } from "@/components/chat/PropertyCard";

interface MessageBubbleProps {
  message: Message;
  userName?: string;
  onSuggestionSelect?: (suggestion: SuggestionChip) => void;
  onBookSiteVisit?: (project: { projectId: string; projectName: string }) => void;
  disabled?: boolean;
}

const userVariants = {
  hidden: { opacity: 0, x: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const aiBubbleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.1, ease: "easeOut" as const },
  },
};

function AssistantBubble({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={aiBubbleVariants}
      initial="hidden"
      animate="visible"
      className={`rounded-2xl rounded-tl-md border border-gray-100/80 bg-white px-4 py-3 text-sm leading-relaxed text-gray-800 shadow-soft whitespace-pre-line ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function MessageBubble({
  message,
  userName,
  onSuggestionSelect,
  onBookSiteVisit,
  disabled,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const hasSuggestions = Boolean(message.suggestions && message.suggestions.length > 0);
  const { acknowledgment, question } = parseAssistantMessage(message.content, hasSuggestions);

  if (isUser) {
    return (
      <motion.div
        variants={userVariants}
        initial="hidden"
        animate="visible"
        className="flex items-end justify-end gap-2.5 px-4 py-2"
      >
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-gray-900 px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
          {message.content}
        </div>
        <UserAvatar name={userName} />
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-2">
      <div className="flex items-start gap-3">
        <AIAvatar size="md" />
        <div className="min-w-0 flex-1 max-w-[calc(100%-3rem)]">
          {acknowledgment.trim() ? (
            <AssistantBubble>{acknowledgment}</AssistantBubble>
          ) : !hasSuggestions ? (
            <AssistantBubble>{message.content}</AssistantBubble>
          ) : null}

          {!hasSuggestions && question && (
            <div className="mt-3">
              <AssistantBubble>{question}</AssistantBubble>
            </div>
          )}
        </div>
      </div>

      {hasSuggestions && onSuggestionSelect && message.suggestions && (
        <div className="flex justify-center px-2">
          <SuggestionChips
            title={question ?? undefined}
            suggestions={message.suggestions}
            onSelect={onSuggestionSelect}
            disabled={disabled}
          />
        </div>
      )}

      {message.propertyCards && message.propertyCards.length > 0 && (
        <div className="space-y-4 px-2">
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
  );
}
