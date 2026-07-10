"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";

interface FloatingAIButtonProps {
  onClick: () => void;
  visible?: boolean;
  active?: boolean;
}

export function FloatingAIButton({ onClick, visible = true, active = false }: FloatingAIButtonProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className={`fixed right-6 bottom-6 z-[60] flex items-center gap-2.5 rounded-full bg-white py-1 pl-4 pr-1 shadow-[0_4px_24px_rgba(0,0,0,0.15)] ${
            active ? "ring-2 ring-blue-500/30" : ""
          }`}
          aria-label={active ? "Close AI Property Assistant" : "Open AI Property Assistant"}
          aria-expanded={active}
        >
          <span className="text-[13px] font-semibold text-gray-900">AI Property Assistant</span>
          <AIAvatar size="sm" showOnline bare />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
