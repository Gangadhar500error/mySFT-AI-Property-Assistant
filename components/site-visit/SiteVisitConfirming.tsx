"use client";

import { useEffect, useState } from "react";
import { SITE_VISIT_CONFIRM_STEPS } from "@/lib/constants";

interface SiteVisitConfirmingProps {
  onComplete: () => void;
}

export function SiteVisitConfirming({ onComplete }: SiteVisitConfirmingProps) {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (visibleSteps < SITE_VISIT_CONFIRM_STEPS.length) {
      const timer = setTimeout(() => setVisibleSteps((v) => v + 1), 700);
      return () => clearTimeout(timer);
    }
    const done = setTimeout(onComplete, 500);
    return () => clearTimeout(done);
  }, [visibleSteps, onComplete]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="mb-6 h-12 w-12 animate-spin rounded-full border-[3px] border-gray-200 border-t-gray-900" />

      <div className="w-full max-w-xs space-y-3">
        {SITE_VISIT_CONFIRM_STEPS.slice(0, visibleSteps).map((step) => (
          <div
            key={step}
            className="flex items-center gap-3 text-sm text-gray-700 animate-slide-up"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-600">
              ✓
            </span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
