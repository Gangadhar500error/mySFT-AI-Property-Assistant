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
  placeholder = "Ask about properties...",
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
    if (!disabled && !isRecording) inputRef.current?.focus();
  }, [disabled, isRecording, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    if (controlledValue === undefined) setInternalInput("");
  };

  return (
    <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-3">
      {isRecording && <VoiceWaveform />}
      {error && <p className="mb-2 text-[12px] text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type={mode === "phone" ? "tel" : "text"}
            inputMode={mode === "phone" ? "numeric" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={disabled || isRecording}
            maxLength={mode === "phone" ? 10 : undefined}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-300 focus:bg-white disabled:opacity-50"
          />
          {!hideVoice && (
            <button
              type="button"
              onClick={isRecording ? onVoiceStop : onVoiceStart}
              disabled={disabled}
              className={`absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg ${
                isRecording ? "text-red-500" : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label="Voice"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!input.trim() || disabled || isRecording}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40"
          aria-label="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m22 2-7 20-4-9-9-4Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
