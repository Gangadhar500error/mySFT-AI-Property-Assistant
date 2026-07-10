"use client";

import { motion } from "framer-motion";
import { AIAvatar } from "@/components/chat/AIAvatar";

interface SuccessScreenProps {
  onWhatsAppYes: () => void;
  onWhatsAppNo: () => void;
  onBookSiteVisit?: () => void;
  onClose?: () => void;
}

const FOLLOW_UP_ACTIONS = [
  { id: "brochure", label: "Send Project Brochure" },
  { id: "site-visit", label: "Book Site Visit" },
  { id: "maps", label: "Share Google Maps" },
  { id: "consultant", label: "Talk to Consultant" },
] as const;

const chipVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, delay: 0.4 + i * 0.08 },
  }),
};

export function SuccessScreen({
  onWhatsAppYes,
  onWhatsAppNo,
  onBookSiteVisit,
  onClose,
}: SuccessScreenProps) {
  const handleAction = (id: string) => {
    switch (id) {
      case "brochure":
        onWhatsAppYes();
        break;
      case "site-visit":
        onBookSiteVisit?.();
        break;
      case "maps":
      case "consultant":
        if (onClose) onClose();
        else onWhatsAppNo();
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col overflow-y-auto px-6 py-8"
    >
      <div className="mx-auto w-full max-w-[340px] space-y-6">
        <div className="flex flex-col items-center text-center">
          <AIAvatar size="lg" className="mb-4" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="mb-3 text-3xl"
            aria-hidden
          >
            🎉
          </motion.div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Excellent!</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            I&apos;ve successfully prepared your enquiry.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Our property consultant will contact you shortly.
          </p>
        </div>

        <div className="rounded-[18px] border border-gray-100/80 bg-white p-4 shadow-soft">
          <p className="mb-3.5 text-center text-sm font-medium text-gray-800">
            Meanwhile, would you like me to
          </p>
          <div className="flex flex-col gap-2">
            {FOLLOW_UP_ACTIONS.map((action, index) => (
              <motion.button
                key={action.id}
                custom={index}
                variants={chipVariants}
                initial="hidden"
                animate="visible"
                onClick={() => handleAction(action.id)}
                className="group flex w-full items-center gap-3 rounded-full border border-gray-200/80 bg-white px-4 py-2.5 text-left text-sm text-gray-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/60 hover:text-gray-900 active:scale-[0.98]"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors group-hover:border-blue-400" />
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
