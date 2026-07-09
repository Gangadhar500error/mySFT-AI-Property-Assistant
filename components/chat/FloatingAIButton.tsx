"use client";

interface FloatingAIButtonProps {
  onClick: () => void;
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 z-50 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow-xl active:scale-95 sm:right-8 sm:bottom-8 sm:h-[72px] sm:w-[72px]"
      aria-label="Ask AI"
    >
      <span className="text-sm font-bold">AI</span>
      <span className="text-[10px] font-medium opacity-80">Ask AI</span>
    </button>
  );
}
