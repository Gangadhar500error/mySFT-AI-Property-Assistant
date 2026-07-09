"use client";

import type { SiteVisitBookingState } from "@/types";
import { Button } from "@/components/ui/Button";

interface SiteVisitSuccessScreenProps {
  siteVisit: SiteVisitBookingState;
  onViewProjects: () => void;
  onNewConversation: () => void;
  onClose: () => void;
}

export function SiteVisitSuccessScreen({
  siteVisit,
  onViewProjects,
  onNewConversation,
  onClose,
}: SiteVisitSuccessScreenProps) {
  const callLabel =
    siteVisit.callRequest === "yes"
      ? "Requested"
      : siteVisit.callRequest === "no"
        ? "Not Requested"
        : "If Required";

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8 animate-fade-in">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mb-4 text-4xl">🎉</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Site Visit Scheduled Successfully
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Thank you, {siteVisit.name}.
          </p>
          <p className="text-sm text-gray-500">
            Your visit has been successfully scheduled. Our property consultant will contact you shortly.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Visit Details</h3>
          <div className="space-y-3 text-sm">
            <DetailRow label="Date" value={siteVisit.visitDateLabel} />
            <DetailRow label="Time" value={siteVisit.visitTimeLabel} />
            <DetailRow label="Property Consultant Call" value={callLabel} />
            <DetailRow label="Reference Number" value={siteVisit.referenceNumber} highlight />
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2.5">
          <Button variant="primary" size="md" onClick={onViewProjects}>
            View Recommended Projects
          </Button>
          <Button variant="secondary" size="md" onClick={onNewConversation}>
            Start New Conversation
          </Button>
          <Button variant="ghost" size="md" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-gray-600">
          <p className="mb-2 font-medium text-gray-800">Before your visit, I&apos;ll also share:</p>
          <ul className="space-y-1">
            <li>✓ Project Brochure</li>
            <li>✓ Google Maps Location</li>
            <li>✓ Sales Executive Contact</li>
            <li>✓ Visit Confirmation</li>
            <li>✓ Reminder Notification</li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">
            on your preferred communication channel.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span
        className={`font-medium ${highlight ? "text-blue-600" : "text-gray-900"}`}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}
