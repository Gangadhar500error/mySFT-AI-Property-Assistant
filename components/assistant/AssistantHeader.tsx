"use client";

import { AIAvatar } from "@/components/chat/AIAvatar";

interface AssistantHeaderProps {
  onVoiceCall: () => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onClose: () => void;
}

export function AssistantHeader({
  onVoiceCall,
  isMaximized,
  onToggleMaximize,
  onClose,
}: AssistantHeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-100/80 px-4 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <AIAvatar size="md" showOnline />
        <div className="min-w-0">
          <h2 className="truncate text-[15px] font-semibold text-gray-900">Sarah</h2>
          <p className="truncate text-[12px] text-gray-500">AI Property Consultant</p>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-emerald-600">Online</span>
            <span>·</span>
            <span>Usually replies instantly</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <IconButton onClick={onVoiceCall} label="Voice Call">
          <MicIcon />
        </IconButton>
        <IconButton
          onClick={onToggleMaximize}
          label={isMaximized ? "Restore chat size" : "Maximize chat"}
        >
          {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
        </IconButton>
        <IconButton onClick={onClose} label="Close">
          <CloseIcon />
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
      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
    >
      {children}
    </button>
  );
}

function MicIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 14h6v6" />
      <path d="M20 10h-6V4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
