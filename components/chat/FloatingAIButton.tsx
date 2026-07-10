"use client";

import { motion } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";

interface FloatingAIButtonProps {
  onClick: () => void;
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-full border border-gray-200/80 bg-white py-2 pl-2 pr-5 shadow-lg transition-shadow hover:shadow-xl sm:right-8 sm:bottom-8"
      aria-label="Ask AI"
    >
      <AIAvatar size="sm" showOnline />
      <div className="flex flex-col items-start">
        <span className="flex items-center gap-1 text-sm font-semibold text-gray-900">
          <span aria-hidden>✨</span> AI
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Online
        </span>
      </div>
    </motion.button>
  );
}
