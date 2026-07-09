"use client";

interface TypingIndicatorProps {
  message?: string;
}

export function TypingIndicator({
  message = "AI is analysing your requirements...",
}: TypingIndicatorProps) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 animate-fade-in">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
        AI
      </div>
      <div className="rounded-2xl rounded-tl-md border border-gray-100 bg-gray-50 px-4 py-3">
        <p className="mb-2 text-xs text-gray-500">{message}</p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-gray-400 animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
