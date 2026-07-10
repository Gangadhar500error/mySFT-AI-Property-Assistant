"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";

interface FloatingAIButtonProps {
  onClick: () => void;
  visible?: boolean;
}

export function FloatingAIButton({ onClick, visible = true }: FloatingAIButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed right-6 bottom-6 z-40"
        >
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 bottom-full mb-3 whitespace-nowrap rounded-xl bg-gray-900 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg"
            >
              Chat with Sarah
              <span className="absolute right-5 -bottom-1.5 h-2.5 w-2.5 rotate-45 bg-gray-900" />
            </motion.div>
          )}

          <motion.button
            onClick={onClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] ring-2 ring-white"
            aria-label="Open AI Property Assistant"
          >
            <AIAvatar size="sm" showOnline className="scale-110" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
