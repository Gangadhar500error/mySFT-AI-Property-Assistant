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
  placeholder = "Ask anything about properties...",
  error,
  value: controlledValue,
  onChange: controlledOnChange,
  hideVoice = false,
}: ChatInputProps) {
  const [internalInput, setInternalInput] = useState("");
  const input = controlledValue !== undefined ? controlledValue : internalInput;
  const setInput = controlledOnChange ?? setInternalInput;
  const inputRef = useRef<HTMLInputElement>(null);
  const hasText = Boolean(input.trim());

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
    <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
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
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-20 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-300 focus:bg-white disabled:opacity-50"
          />
          <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
            {!hideVoice && (
              <button
                type="button"
                onClick={isRecording ? onVoiceStop : onVoiceStart}
                disabled={disabled}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isRecording
                    ? "bg-red-50 text-red-500"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
                aria-label="Voice"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              disabled={!hasText || disabled || isRecording}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                hasText
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400"
              } disabled:opacity-40`}
              aria-label="Send"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m22 2-7 20-4-9-9-4Z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
