"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { TypingDots } from "@/components/chat/TypingDots";

interface TypingIndicatorProps {
  message?: string;
}

export function TypingIndicator({
  message = "AI is analysing your requirements...",
}: TypingIndicatorProps) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 px-4 py-3"
    >
      <AIAvatar size="md" />
      <div className="rounded-2xl rounded-tl-md border border-gray-100/80 bg-white px-4 py-3.5 shadow-soft">
        <div className="mb-2.5">
          <TypingDots />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs leading-relaxed text-gray-500"
        >
          {showText ? (
            <>
              <span className="font-medium text-gray-600">Thinking...</span>
              <span className="mx-1.5 text-gray-300">·</span>
              {message}
            </>
          ) : (
            <span className="invisible">Thinking...</span>
          )}
        </motion.p>
      </div>
    </motion.div>
  );
}
