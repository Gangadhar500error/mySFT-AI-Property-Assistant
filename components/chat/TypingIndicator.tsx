"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { TypingDots } from "@/components/chat/TypingDots";

const HELPER_TEXTS = [
  "Checking inventory...",
  "Finding matching projects...",
  "Calculating best budget...",
  "Comparing nearby properties...",
];

interface TypingIndicatorProps {
  message?: string;
}

export function TypingIndicator({ message }: TypingIndicatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HELPER_TEXTS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="flex items-start gap-2 px-4 py-2"
    >
      <AIAvatar size="sm" className="shrink-0" />
      <div className="rounded-[18px] rounded-tl-md bg-gray-100 px-3.5 py-2.5">
        <p className="mb-1.5 text-[13px] font-medium text-gray-600">Typing...</p>
        <TypingDots />
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-[12px] text-gray-500"
          >
            {message ?? HELPER_TEXTS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
