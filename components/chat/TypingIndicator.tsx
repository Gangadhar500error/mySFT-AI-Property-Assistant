"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { TypingDots } from "@/components/chat/TypingDots";

const SARAH_MESSAGES = [
  "Sarah is thinking...",
  "Checking inventory...",
  "Finding matching projects...",
  "Preparing recommendations...",
];

interface TypingIndicatorProps {
  message?: string;
}

export function TypingIndicator({ message }: TypingIndicatorProps) {
  const [index, setIndex] = useState(0);
  const messages = message ? [message, ...SARAH_MESSAGES] : SARAH_MESSAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2.5 px-5 py-2"
    >
      <AIAvatar size="md" className="shrink-0" />
      <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-soft">
        <TypingDots />
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-2 text-[13px] text-gray-500"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
