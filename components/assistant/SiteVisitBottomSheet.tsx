"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteVisitBookingState } from "@/types";
import { DatePickerInline } from "@/components/site-visit/DatePickerInline";
import { TimePickerInline } from "@/components/site-visit/TimePickerInline";

interface SiteVisitBottomSheetProps {
  siteVisit: SiteVisitBookingState;
  isOpen: boolean;
  inputError: string | null;
  pendingEmail: string;
  pendingSpecialRequest: string;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onSuggestion: (value: string, label: string) => void;
  onSubmitName: (name: string) => void;
  onSubmitMobile: (mobile: string) => void;
  onSubmitEmail: (email: string) => void;
  onSkipEmail: () => void;
  onSubmitSpecialRequest: (text: string) => void;
  onSkipSpecialRequest: () => void;
  onConfirm: () => void;
  onEdit: () => void;
  isTyping: boolean;
}

export function SiteVisitBottomSheet({
  siteVisit,
  isOpen,
  inputError,
  pendingEmail,
  pendingSpecialRequest,
  onSelectDate,
  onSelectTime,
  onSuggestion,
  onSubmitName,
  onSubmitMobile,
  onSubmitEmail,
  onSkipEmail,
  onSubmitSpecialRequest,
  onSkipSpecialRequest,
  onConfirm,
  onEdit,
  isTyping,
}: SiteVisitBottomSheetProps) {
  const [name, setName] = useState(siteVisit.name ?? "");
  const [mobile, setMobile] = useState(siteVisit.mobile ?? "");
  const [email, setEmail] = useState(pendingEmail);
  const [notes, setNotes] = useState(pendingSpecialRequest);
  const step = siteVisit.step;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="absolute inset-x-0 bottom-0 z-30 max-h-[70%] overflow-hidden rounded-t-3xl border-t border-gray-100 bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gray-200" />
        <div className="overflow-y-auto px-6 pb-8 pt-4">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">Book Site Visit</h3>
          <p className="mb-6 text-sm text-gray-500">
            {siteVisit.projectName
              ? `Schedule your visit to ${siteVisit.projectName}`
              : "Schedule your property visit"}
          </p>

          {inputError && (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">{inputError}</p>
          )}

          {step === "summary" ? (
            <SummaryView siteVisit={siteVisit} onConfirm={onConfirm} onEdit={onEdit} />
          ) : (
            <div className="space-y-5">
              <FieldGroup label="Preferred Date" done={!!siteVisit.visitDate}>
                {(step === "welcome" || step === "date") && !siteVisit.visitDate && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "today", label: "Today" },
                        { value: "tomorrow", label: "Tomorrow" },
                        { value: "this-weekend", label: "This Weekend" },
                        { value: "choose-date", label: "Choose Date" },
                      ].map((opt) => (
                        <SheetButton
                          key={opt.value}
                          onClick={() => onSuggestion(opt.value, opt.label)}
                          disabled={isTyping}
                        >
                          {opt.label}
                        </SheetButton>
                      ))}
                    </div>
                    {step === "date" && (
                      <DatePickerInline onSelect={onSelectDate} disabled={isTyping} />
                    )}
                  </div>
                )}
                {siteVisit.visitDateLabel && (
                  <p className="text-sm font-medium text-gray-900">{siteVisit.visitDateLabel}</p>
                )}
              </FieldGroup>

              <FieldGroup label="Preferred Time" done={!!siteVisit.visitTime}>
                {(step === "time" || step === "custom-time") && siteVisit.visitDate && !siteVisit.visitTime && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "morning", label: "Morning" },
                        { value: "afternoon", label: "Afternoon" },
                        { value: "evening", label: "Evening" },
                        { value: "custom-time", label: "Custom Time" },
                      ].map((opt) => (
                        <SheetButton
                          key={opt.value}
                          onClick={() => onSuggestion(opt.value, opt.label)}
                          disabled={isTyping}
                        >
                          {opt.label}
                        </SheetButton>
                      ))}
                    </div>
                    {step === "custom-time" && (
                      <TimePickerInline onSelect={onSelectTime} disabled={isTyping} />
                    )}
                  </div>
                )}
                {siteVisit.visitTimeLabel && (
                  <p className="text-sm font-medium text-gray-900">{siteVisit.visitTimeLabel}</p>
                )}
              </FieldGroup>

              <FieldGroup label="Need Consultant Call?" done={!!siteVisit.callRequest}>
                {step === "call-request" && !siteVisit.callRequest && (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "if-required", label: "If Required" },
                    ].map((opt) => (
                      <SheetButton
                        key={opt.value}
                        onClick={() => onSuggestion(opt.value, opt.label)}
                        disabled={isTyping}
                      >
                        {opt.label}
                      </SheetButton>
                    ))}
                  </div>
                )}
                {siteVisit.callRequest && (
                  <p className="text-sm font-medium capitalize text-gray-900">
                    {siteVisit.callRequest.replace("-", " ")}
                  </p>
                )}
              </FieldGroup>

              <FieldGroup label="Visitor Name" done={!!siteVisit.name}>
                {step === "name" && !siteVisit.name && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (name.trim()) onSubmitName(name.trim());
                    }}
                  >
                    <SheetInput
                      value={name}
                      onChange={setName}
                      placeholder="Enter your full name"
                      disabled={isTyping}
                    />
                    <SubmitButton disabled={!name.trim() || isTyping} />
                  </form>
                )}
                {siteVisit.name && (
                  <p className="text-sm font-medium text-gray-900">{siteVisit.name}</p>
                )}
              </FieldGroup>

              <FieldGroup label="Phone Number" done={!!siteVisit.mobile}>
                {step === "mobile" && !siteVisit.mobile && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (mobile.trim()) onSubmitMobile(mobile.trim());
                    }}
                  >
                    <SheetInput
                      value={mobile}
                      onChange={setMobile}
                      placeholder="10-digit mobile number"
                      type="tel"
                      disabled={isTyping}
                    />
                    <SubmitButton disabled={!mobile.trim() || isTyping} />
                  </form>
                )}
                {siteVisit.mobile && (
                  <p className="text-sm font-medium text-gray-900">{siteVisit.mobile}</p>
                )}
              </FieldGroup>

              <FieldGroup label="Email" done={step !== "email"}>
                {step === "email" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email.trim()) onSubmitEmail(email.trim());
                    }}
                    className="space-y-2"
                  >
                    <SheetInput
                      value={email}
                      onChange={setEmail}
                      placeholder="Email address (optional)"
                      type="email"
                      disabled={isTyping}
                    />
                    <div className="flex gap-2">
                      <SubmitButton disabled={isTyping} label="Continue" />
                      <button
                        type="button"
                        onClick={onSkipEmail}
                        className="rounded-xl px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                )}
                {siteVisit.email && (
                  <p className="text-sm font-medium text-gray-900">{siteVisit.email}</p>
                )}
              </FieldGroup>

              <FieldGroup label="Additional Notes" done={step !== "special-request"}>
                {step === "special-request" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (notes.trim()) onSubmitSpecialRequest(notes.trim());
                    }}
                    className="space-y-2"
                  >
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requests..."
                      disabled={isTyping}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm outline-none focus:border-gray-300 focus:bg-white"
                    />
                    <div className="flex gap-2">
                      <SubmitButton disabled={isTyping} label="Submit" />
                      <button
                        type="button"
                        onClick={onSkipSpecialRequest}
                        className="rounded-xl px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                )}
                {siteVisit.specialRequest && (
                  <p className="text-sm text-gray-700">{siteVisit.specialRequest}</p>
                )}
              </FieldGroup>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function FieldGroup({
  label,
  done,
  children,
}: {
  label: string;
  done?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">{label}</span>
        {done && <span className="text-xs text-emerald-600">✓</span>}
      </div>
      {children}
    </div>
  );
}

function SheetButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function SheetInput({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="mb-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 disabled:opacity-50"
    />
  );
}

function SubmitButton({ disabled, label = "Continue" }: { disabled?: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function SummaryView({
  siteVisit,
  onConfirm,
  onEdit,
}: {
  siteVisit: SiteVisitBookingState;
  onConfirm: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="space-y-4">
      <dl className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-sm">
        <SummaryRow label="Date" value={siteVisit.visitDateLabel} />
        <SummaryRow label="Time" value={siteVisit.visitTimeLabel} />
        <SummaryRow label="Consultant Call" value={siteVisit.callRequest?.replace("-", " ")} />
        <SummaryRow label="Name" value={siteVisit.name} />
        <SummaryRow label="Phone" value={siteVisit.mobile} />
        <SummaryRow label="Email" value={siteVisit.email ?? "—"} />
        {siteVisit.specialRequest && (
          <SummaryRow label="Notes" value={siteVisit.specialRequest} />
        )}
      </dl>
      <button
        onClick={onConfirm}
        className="w-full rounded-2xl bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Confirm Site Visit
      </button>
      <button
        onClick={onEdit}
        className="w-full rounded-2xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        Edit Details
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium capitalize text-gray-900">{value ?? "—"}</dd>
    </div>
  );
}
