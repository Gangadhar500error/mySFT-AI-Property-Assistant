"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col overflow-y-auto px-8 py-10"
    >
      <div className="mx-auto w-full max-w-md text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.1 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-2xl font-semibold text-gray-900"
        >
          Site Visit Scheduled Successfully
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-sm leading-relaxed text-gray-500"
        >
          Thank you, {siteVisit.name}. Our property consultant will contact you shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-left"
        >
          <div className="space-y-4 text-sm">
            <DetailRow label="Visit Date" value={siteVisit.visitDateLabel} />
            <DetailRow label="Visit Time" value={siteVisit.visitTimeLabel} />
            <DetailRow label="Reference Number" value={siteVisit.referenceNumber} highlight />
            <DetailRow label="Consultant Call" value={callLabel} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col gap-2.5"
        >
          <Button variant="primary" size="md" onClick={onViewProjects}>
            View Recommended Projects
          </Button>
          <Button variant="secondary" size="md" onClick={onClose}>
            Download Brochure
          </Button>
          <Button variant="outline" size="md" onClick={onNewConversation}>
            Start New Conversation
          </Button>
          <Button variant="ghost" size="md" onClick={onClose}>
            Close
          </Button>
        </motion.div>
      </div>
    </motion.div>
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
      <span className={`font-semibold ${highlight ? "text-blue-600" : "text-gray-900"}`}>
        {value ?? "—"}
      </span>
    </div>
  );
}
