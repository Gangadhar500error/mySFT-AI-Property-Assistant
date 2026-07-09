"use client";

import type { SiteVisitBookingState } from "@/types";
import { CALL_REQUEST_LABELS } from "@/features/site-visit/utils";
import { Button } from "@/components/ui/Button";

interface SiteVisitSummaryCardProps {
  siteVisit: SiteVisitBookingState;
  onConfirm: () => void;
  onEdit: () => void;
}

export function SiteVisitSummaryCard({
  siteVisit,
  onConfirm,
  onEdit,
}: SiteVisitSummaryCardProps) {
  const fields = [
    { label: "Visit Date", value: siteVisit.visitDateLabel },
    { label: "Visit Time", value: siteVisit.visitTimeLabel },
    {
      label: "Call Request",
      value: siteVisit.callRequest
        ? CALL_REQUEST_LABELS[siteVisit.callRequest]
        : "—",
    },
    { label: "Customer Name", value: siteVisit.name },
    { label: "Mobile Number", value: siteVisit.mobile ? `+91 ${siteVisit.mobile}` : "—" },
    { label: "Email", value: siteVisit.email || "—" },
    { label: "Special Request", value: siteVisit.specialRequest || "—" },
  ];

  if (siteVisit.projectName) {
    fields.unshift({ label: "Project", value: siteVisit.projectName });
  }

  return (
    <div className="mx-4 my-4 animate-slide-up rounded-2xl border border-gray-200 bg-white shadow-soft">
      <div className="border-b border-gray-100 px-5 py-4">
        <h3 className="text-base font-semibold text-gray-900">Site Visit Summary</h3>
        <p className="mt-0.5 text-xs text-gray-500">Review your booking details</p>
      </div>

      <div className="space-y-0 px-5 py-4">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-start justify-between gap-4 border-b border-gray-50 py-3 last:border-0"
          >
            <span className="text-sm text-gray-500">{field.label}</span>
            <span className="max-w-[55%] text-right text-sm font-medium text-gray-900">
              {field.value ?? "—"}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
        <Button variant="primary" size="md" className="flex-1" onClick={onConfirm}>
          Confirm Booking
        </Button>
        <Button variant="secondary" size="md" className="flex-1" onClick={onEdit}>
          Edit Details
        </Button>
      </div>
    </div>
  );
}
