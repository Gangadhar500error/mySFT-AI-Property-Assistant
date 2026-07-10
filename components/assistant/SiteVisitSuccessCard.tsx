"use client";

import { motion } from "framer-motion";
import type { SiteVisitBookingState } from "@/types";

interface SiteVisitSuccessCardProps {
  siteVisit: SiteVisitBookingState;
  onViewProject: () => void;
  onContinue: () => void;
}

export function SiteVisitSuccessCard({
  siteVisit,
  onViewProject,
  onContinue,
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
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[72%] rounded-2xl border border-gray-100 bg-white p-5 shadow-soft"
    >
      <div className="mb-3 text-center text-2xl">🎉</div>
      <h3 className="mb-4 text-center text-[15px] font-semibold text-gray-900">
        Site Visit Scheduled
      </h3>

      <dl className="mb-5 space-y-2.5 text-[13px]">
        <Row label="Reference" value={siteVisit.referenceNumber} highlight />
        <Row label="Date" value={siteVisit.visitDateLabel} />
        <Row label="Time" value={siteVisit.visitTimeLabel} />
        <Row label="Consultant Call" value={callLabel} />
      </dl>

      <div className="flex flex-col gap-2">
        <button
          onClick={onViewProject}
          className="rounded-xl bg-gray-900 py-2.5 text-[14px] font-medium text-white hover:bg-gray-800"
        >
          View Project
        </button>
        <button
          onClick={onContinue}
          className="rounded-xl border border-gray-200 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50"
        >
          Continue Browsing
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
    <div className="flex justify-between gap-3">
      <dt className="text-gray-500">{label}</dt>
      <dd className={`font-medium ${highlight ? "text-blue-600" : "text-gray-900"}`}>
        {value ?? "—"}
      </dd>
    </div>
  );
}
