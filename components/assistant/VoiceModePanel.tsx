"use client";

import { motion } from "framer-motion";
import { VoiceWaveform } from "@/components/chat/VoiceWaveform";
import { AIAvatar } from "@/components/chat/AIAvatar";

interface VoiceModePanelProps {
  isRecording: boolean;
  transcript?: string;
  onStart: () => void;
  onStop: () => void;
  onEnd: () => void;
}

export function VoiceModePanel({
  isRecording,
  transcript,
  onStart,
  onStop,
  onEnd,
}: VoiceModePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-white/98 px-4"
    >
      <AIAvatar size="lg" className="mb-8" />

      <div className="mb-6 h-16 w-full max-w-xs">
        {isRecording ? (
          <VoiceWaveform />
        ) : (
          <div className="flex h-full items-center justify-center gap-1">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-gray-200"
                animate={{ height: [8, 20, 8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mb-2 text-sm font-medium text-gray-800">
        {isRecording ? "Listening..." : "Ready to listen"}
      </p>
      <p className="mb-8 max-w-sm px-6 text-center text-sm text-gray-500">
        {transcript ?? (isRecording ? "Speak naturally about your property needs..." : "Tap the microphone to start")}
      </p>

      <div className="flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? onStop : onStart}
          className={`relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-colors ${
            isRecording
              ? "bg-red-500 text-white"
              : "bg-gray-900 text-white"
          }`}
        >
          {isRecording && (
            <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-30" />
          )}
          <MicIcon />
        </motion.button>
      </div>

      <button
        onClick={onEnd}
        className="mt-10 rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
      >
        End Voice Session
      </button>
    </motion.div>
  );
}

function MicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
