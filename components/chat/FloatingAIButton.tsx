"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FloatingAIButtonProps {
  onClick: () => void;
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-40 sm:right-8 sm:bottom-8">
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 bottom-full mb-3 whitespace-nowrap rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg"
        >
          Ask AI Property Assistant
          <span className="absolute right-5 -bottom-1.5 h-3 w-3 rotate-45 bg-gray-900" />
        </motion.div>
      )}

      <motion.button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ boxShadow: ["0 4px 20px rgba(0,0,0,0.12)", "0 8px 32px rgba(0,0,0,0.18)", "0 4px 20px rgba(0,0,0,0.12)"] }}
        transition={{ boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg"
        aria-label="Ask AI Property Assistant"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-gray-900/20" style={{ animationDuration: "3s" }} />
        <span className="relative text-2xl" aria-hidden>✨</span>
      </motion.button>
    </div>
  );
}
