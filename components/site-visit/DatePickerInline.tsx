"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getToday } from "@/features/site-visit/utils";

interface DatePickerInlineProps {
  onSelect: (date: Date) => void;
  disabled?: boolean;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePickerInline({ onSelect, disabled }: DatePickerInlineProps) {
  const today = getToday();
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const { days, monthLabel } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }

    return {
      days: cells,
      monthLabel: viewDate.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      }),
    };
  }, [viewDate]);

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isPast = (date: Date) => date < today;
  const isToday = (date: Date) => date.getTime() === today.getTime();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          disabled={disabled}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-900">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          disabled={disabled}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1 text-center text-[10px] font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const past = isPast(date);
          const todayCell = isToday(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled || past}
              onClick={() => onSelect(date)}
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-lg text-sm transition-colors",
                past && "cursor-not-allowed text-gray-300",
                !past && "text-gray-700 hover:bg-gray-100",
                todayCell && !past && "bg-gray-900 font-semibold text-white hover:bg-gray-800"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
