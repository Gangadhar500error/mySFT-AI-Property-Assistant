"use client";

interface OptionalActionBarProps {
  onSkip: () => void;
  onContinue: () => void;
  continueLabel?: string;
  disabled?: boolean;
}

export function OptionalActionBar({
  onSkip,
  onContinue,
  continueLabel = "Continue",
  disabled,
}: OptionalActionBarProps) {
  return (
    <div className="flex gap-2 border-t border-gray-100 bg-white px-4 py-3">
      <button
        type="button"
        onClick={onSkip}
        disabled={disabled}
        className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
      >
        Skip
      </button>
      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-40"
      >
        {continueLabel}
      </button>
    </div>
  );
}
