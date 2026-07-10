"use client";

import { motion } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { WELCOME_FEATURES } from "@/lib/assistant-ui";

interface AssistantWelcomeProps {
  onStartConversation: () => void;
  onStartVoice: () => void;
}

export function AssistantWelcome({ onStartConversation, onStartVoice }: AssistantWelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-8"
    >
      <AIAvatar size="lg" className="mb-5" />
      <h1 className="mb-2 text-center text-xl font-semibold text-gray-900">
        Welcome to mySFT
      </h1>
      <p className="mb-8 max-w-sm text-center text-[15px] leading-relaxed text-gray-500">
        I&apos;ll help you find the perfect property based on your budget, location and preferences.
      </p>

      <div className="mb-8 grid w-full max-w-md grid-cols-2 gap-2">
        {WELCOME_FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2.5 text-[13px] text-gray-600"
          >
            <span>{f.icon}</span>
            {f.label}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-xs flex-col gap-2">
        <button
          onClick={onStartConversation}
          className="rounded-xl bg-gray-900 py-3 text-[15px] font-medium text-white hover:bg-gray-800"
        >
          Start Conversation
        </button>
        <button
          onClick={onStartVoice}
          className="rounded-xl border border-gray-200 py-3 text-[15px] text-gray-700 hover:bg-gray-50"
        >
          Talk with Voice
        </button>
      </div>
    </motion.div>
  );
}
