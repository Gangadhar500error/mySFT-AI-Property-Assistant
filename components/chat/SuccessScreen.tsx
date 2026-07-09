"use client";

import { useEffect, useState } from "react";
import { SUCCESS_CHECKLIST } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface SuccessScreenProps {
  onWhatsAppYes: () => void;
  onWhatsAppNo: () => void;
}

export function SuccessScreen({ onWhatsAppYes, onWhatsAppNo }: SuccessScreenProps) {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (visibleItems < SUCCESS_CHECKLIST.length) {
      const timer = setTimeout(() => setVisibleItems((v) => v + 1), 300);
      return () => clearTimeout(timer);
    }
  }, [visibleItems]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 animate-fade-in">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h2 className="mb-2 text-xl font-semibold text-gray-900">Thank you!</h2>
      <p className="mb-8 text-center text-sm text-gray-500">
        Our property consultant will contact you shortly.
      </p>

      <div className="mb-8 w-full max-w-sm space-y-2.5">
        {SUCCESS_CHECKLIST.slice(0, visibleItems).map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-2.5 text-sm animate-slide-up"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
              ✓
            </span>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      <p className="mb-4 text-center text-sm font-medium text-gray-700">
        Would you like to receive the brochure on WhatsApp?
      </p>

      <div className="flex gap-3">
        <Button variant="primary" size="md" onClick={onWhatsAppYes}>
          Yes
        </Button>
        <Button variant="secondary" size="md" onClick={onWhatsAppNo}>
          No
        </Button>
      </div>
    </div>
  );
}
