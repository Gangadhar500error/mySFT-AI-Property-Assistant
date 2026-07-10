"use client";

import { AIAvatar } from "@/components/chat/AIAvatar";

interface AssistantHeaderProps {
  onVoiceCall: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export function AssistantHeader({ onVoiceCall, onMinimize, onClose }: AssistantHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-5">
      <div className="flex items-center gap-3">
        <AIAvatar size="md" showOnline />
        <div>
          <h2 className="text-[16px] font-semibold text-gray-900">Sarah</h2>
          <span className="flex items-center gap-1.5 text-[12px] text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online
          </span>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <IconButton onClick={onVoiceCall} label="Voice">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </IconButton>
        <IconButton onClick={onMinimize} label="Minimize">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M4 14h6v6" />
            <path d="M20 10h-6V4" />
          </svg>
        </IconButton>
        <IconButton onClick={onClose} label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </IconButton>
      </div>
    </header>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-700"
    >
      {children}
    </button>
  );
}
