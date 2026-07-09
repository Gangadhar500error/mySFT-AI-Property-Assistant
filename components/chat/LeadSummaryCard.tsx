"use client";

import type { ConversationState } from "@/types";
import { BUDGET_OPTIONS } from "@/lib/constants";
import { formatLabel } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface LeadSummaryCardProps {
  state: ConversationState;
  onCreateEnquiry: () => void;
  onEditDetails: () => void;
}

function getDisplayValue(key: string, value?: string): string {
  if (!value) return "—";
  if (key === "budget") {
    return BUDGET_OPTIONS.find((b) => b.value === value)?.label ?? value;
  }
  if (key === "purpose" || key === "timeline" || key === "homeLoan" || key === "siteVisit" || key === "preferredTime") {
    return formatLabel(value);
  }
  if (key === "propertyType") {
    return formatLabel(value);
  }
  if (key === "bedrooms") {
    return value === "not-sure" ? "Not Sure" : value.toUpperCase().replace("-", " ");
  }
  return value;
}

export function LeadSummaryCard({ state, onCreateEnquiry, onEditDetails }: LeadSummaryCardProps) {
  const fields = [
    { label: "Customer Name", value: state.name },
    { label: "Location", value: state.area && state.city ? `${state.area}, ${state.city}` : state.city },
    { label: "Property", value: getDisplayValue("propertyType", state.propertyType) },
    { label: "Budget", value: getDisplayValue("budget", state.budget) },
    { label: "Bedrooms", value: state.propertyType === "plot" ? "N/A" : getDisplayValue("bedrooms", state.bedrooms) },
    { label: "Purpose", value: getDisplayValue("purpose", state.purpose) },
    { label: "Purchase Timeline", value: getDisplayValue("timeline", state.timeline) },
    {
      label: "Site Visit",
      value: state.siteVisit === "later"
        ? "Later"
        : `${getDisplayValue("siteVisit", state.siteVisit)}${state.preferredTime ? ` • ${getDisplayValue("preferredTime", state.preferredTime)}` : ""}`,
    },
    { label: "Phone", value: state.mobile },
    { label: "Email", value: state.email || "—" },
  ];

  return (
    <div className="mx-4 my-4 animate-slide-up rounded-2xl border border-gray-200 bg-white p-5 shadow-soft">
      <h3 className="mb-4 text-base font-semibold text-gray-900">Lead Summary</h3>

      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.label} className="flex items-start justify-between gap-4 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-gray-500">{field.label}</span>
            <span className="text-right text-sm font-medium text-gray-900">{field.value ?? "—"}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="primary" size="md" className="flex-1" onClick={onCreateEnquiry}>
          Create Enquiry
        </Button>
        <Button variant="secondary" size="md" className="flex-1" onClick={onEditDetails}>
          Edit Details
        </Button>
      </div>
    </div>
  );
}
