"use client";

import { motion } from "framer-motion";
import type { SiteVisitBookingState } from "@/types";

interface SiteVisitSuccessCardProps {
  siteVisit: SiteVisitBookingState;
  onViewProject: () => void;
  onDownloadBrochure?: () => void;
  onNewConversation: () => void;
}

export function SiteVisitSuccessCard({
  siteVisit,
  onViewProject,
  onDownloadBrochure,
  onNewConversation,
}: SiteVisitSuccessCardProps) {
  const callLabel =
    siteVisit.callRequest === "yes"
      ? "Requested"
      : siteVisit.callRequest === "no"
        ? "Not Requested"
        : "If Required";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-2 text-center text-xl">🎉</div>
      <h3 className="mb-3 text-center text-[14px] font-semibold text-gray-900">
        Site Visit Scheduled Successfully
      </h3>

      <dl className="mb-4 space-y-2 text-[13px]">
        <Row label="Visitor" value={siteVisit.name} />
        <Row label="Visit Date" value={siteVisit.visitDateLabel} />
        <Row label="Visit Time" value={siteVisit.visitTimeLabel} />
        <Row label="Reference" value={siteVisit.referenceNumber} highlight />
        <Row label="Consultant Call" value={callLabel} />
      </dl>

      <div className="flex flex-col gap-1.5">
        <button
          onClick={onViewProject}
          className="rounded-xl bg-blue-600 py-2 text-[13px] font-medium text-white hover:bg-blue-700"
        >
          View Recommended Projects
        </button>
        {onDownloadBrochure && (
          <button
            onClick={onDownloadBrochure}
            className="rounded-xl border border-gray-200 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
          >
            Download Brochure
          </button>
        )}
        <button
          onClick={onNewConversation}
          className="rounded-xl py-2 text-[13px] font-medium text-gray-500 hover:text-gray-700"
        >
          Start New Conversation
        </button>
      </div>
    </motion.div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-gray-500">{label}</dt>
      <dd className={`font-medium text-right ${highlight ? "text-blue-600" : "text-gray-900"}`}>
        {value ?? "—"}
      </dd>
    </div>
  );
}
