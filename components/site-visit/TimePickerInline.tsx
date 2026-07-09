"use client";

const TIME_SLOTS: string[] = [];
for (let hour = 9; hour <= 19; hour++) {
  for (const minute of ["00", "15", "30", "45"]) {
    if (hour === 19 && minute !== "00") break;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    TIME_SLOTS.push(`${displayHour}:${minute} ${period}`);
  }
}

interface TimePickerInlineProps {
  onSelect: (time: string) => void;
  disabled?: boolean;
}

export function TimePickerInline({ onSelect, disabled }: TimePickerInlineProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <p className="mb-3 text-xs font-medium text-gray-500">Select a time</p>
      <div className="grid max-h-48 grid-cols-3 gap-2 overflow-y-auto">
        {TIME_SLOTS.map((label) => (
          <button
            key={label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(label)}
            className="rounded-lg border border-gray-200 px-2 py-2 text-xs text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
