"use client";

import { useState, useRef, useEffect } from "react";
import { VoiceWaveform } from "@/components/chat/VoiceWaveform";

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceStart: () => void;
  onVoiceStop: () => void;
  isRecording: boolean;
  disabled?: boolean;
  mode?: "text" | "phone";
  placeholder?: string;
  error?: string | null;
  value?: string;
  onChange?: (value: string) => void;
  hideVoice?: boolean;
}

export function ChatInput({
  onSend,
  onVoiceStart,
  onVoiceStop,
  isRecording,
  disabled,
  mode = "text",
  placeholder = "Type your message...",
  error,
  value: controlledValue,
  onChange: controlledOnChange,
  hideVoice = false,
}: ChatInputProps) {
  const [internalInput, setInternalInput] = useState("");
  const input = controlledValue !== undefined ? controlledValue : internalInput;
  const setInput = controlledOnChange ?? setInternalInput;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && !isRecording) {
      inputRef.current?.focus();
    }
  }, [disabled, isRecording, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    if (controlledValue === undefined) setInternalInput("");
  };

  const toggleVoice = () => {
    if (isRecording) {
      onVoiceStop();
    } else {
      onVoiceStart();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white p-4">
      {isRecording && <VoiceWaveform />}

      {error && (
        <p className="mb-2 text-xs text-red-600 animate-fade-in">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex flex-1 items-center">
          <input
            ref={inputRef}
            type={mode === "phone" ? "tel" : "text"}
            inputMode={mode === "phone" ? "numeric" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={disabled || isRecording}
            maxLength={mode === "phone" ? 10 : undefined}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-gray-300 focus:bg-white disabled:opacity-50"
          />
          {!hideVoice && (
          <button
            type="button"
            onClick={toggleVoice}
            disabled={disabled}
            className={`absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              isRecording
                ? "bg-red-100 text-red-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            }`}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!input.trim() || disabled || isRecording}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-40"
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </form>
    </div>
  );
}
