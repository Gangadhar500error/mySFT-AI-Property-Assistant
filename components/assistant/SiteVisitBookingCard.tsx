"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SiteVisitBookingState } from "@/types";
import { DatePickerInline } from "@/components/site-visit/DatePickerInline";
import { TimePickerInline } from "@/components/site-visit/TimePickerInline";

interface SiteVisitBookingCardProps {
  siteVisit: SiteVisitBookingState;
  inputError: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onSuggestion: (value: string, label: string) => void;
  onSubmitName: (name: string) => void;
  onSubmitMobile: (mobile: string) => void;
  onSubmitEmail: (email: string) => void;
  onSkipEmail: () => void;
  onSubmitNotes: (text: string) => void;
  onSkipNotes: () => void;
  onConfirm: () => void;
  isTyping: boolean;
}

export function SiteVisitBookingCard({
  siteVisit,
  inputError,
  onSelectDate,
  onSelectTime,
  onSuggestion,
  onSubmitName,
  onSubmitMobile,
  onSubmitEmail,
  onSkipEmail,
  onSubmitNotes,
  onSkipNotes,
  onConfirm,
  isTyping,
}: SiteVisitBookingCardProps) {
  const [name, setName] = useState(siteVisit.name ?? "");
  const [mobile, setMobile] = useState(siteVisit.mobile ?? "");
  const [email, setEmail] = useState(siteVisit.email ?? "");
  const [notes, setNotes] = useState(siteVisit.specialRequest ?? "");
  const step = siteVisit.step;
  const isSummary = step === "summary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
    >
      <h3 className="mb-1 text-[15px] font-semibold text-gray-900">Book Site Visit</h3>
      {siteVisit.projectName && (
        <p className="mb-4 text-[13px] text-gray-500">{siteVisit.projectName}</p>
      )}

      {inputError && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">{inputError}</p>
      )}

      {isSummary ? (
        <div className="space-y-4">
          <dl className="space-y-2.5 text-[13px]">
            <Row label="Date" value={siteVisit.visitDateLabel} />
            <Row label="Time" value={siteVisit.visitTimeLabel} />
            <Row label="Consultant Call" value={siteVisit.callRequest?.replace("-", " ")} />
            <Row label="Name" value={siteVisit.name} />
            <Row label="Phone" value={siteVisit.mobile} />
            {siteVisit.email && <Row label="Email" value={siteVisit.email} />}
          </dl>
          <button
            onClick={onConfirm}
            disabled={isTyping}
            className="w-full rounded-xl bg-gray-900 py-2.5 text-[14px] font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Field label="Preferred Date" value={siteVisit.visitDateLabel}>
            {!siteVisit.visitDate && (step === "welcome" || step === "date") && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "today", label: "Today" },
                    { value: "tomorrow", label: "Tomorrow" },
                    { value: "this-weekend", label: "Weekend" },
                    { value: "choose-date", label: "Pick Date" },
                  ].map((o) => (
                    <Pill key={o.value} onClick={() => onSuggestion(o.value, o.label)} disabled={isTyping}>
                      {o.label}
                    </Pill>
                  ))}
                </div>
                {step === "date" && <DatePickerInline onSelect={onSelectDate} disabled={isTyping} />}
              </div>
            )}
          </Field>

          {siteVisit.visitDate && (
            <Field label="Preferred Time" value={siteVisit.visitTimeLabel}>
              {!siteVisit.visitTime && (step === "time" || step === "custom-time") && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {["morning", "afternoon", "evening", "custom-time"].map((v) => (
                      <Pill
                        key={v}
                        onClick={() => onSuggestion(v, v)}
                        disabled={isTyping}
                      >
                        {v === "custom-time" ? "Custom" : v.charAt(0).toUpperCase() + v.slice(1)}
                      </Pill>
                    ))}
                  </div>
                  {step === "custom-time" && (
                    <TimePickerInline onSelect={onSelectTime} disabled={isTyping} />
                  )}
                </div>
              )}
            </Field>
          )}

          {siteVisit.visitTime && (
            <Field label="Consultant Call?" value={siteVisit.callRequest?.replace("-", " ")}>
              {step === "call-request" && !siteVisit.callRequest && (
                <div className="flex gap-2">
                  {["yes", "no", "if-required"].map((v) => (
                    <Pill key={v} onClick={() => onSuggestion(v, v)} disabled={isTyping}>
                      {v === "if-required" ? "If needed" : v.charAt(0).toUpperCase() + v.slice(1)}
                    </Pill>
                  ))}
                </div>
              )}
            </Field>
          )}

          {siteVisit.callRequest && step === "name" && !siteVisit.name && (
            <Field label="Your Name">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (name.trim()) onSubmitName(name.trim());
                }}
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="mb-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-[14px] outline-none focus:border-gray-300"
                />
                <Submit disabled={!name.trim() || isTyping} />
              </form>
            </Field>
          )}

          {siteVisit.name && step === "mobile" && !siteVisit.mobile && (
            <Field label="Phone Number">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (mobile.trim()) onSubmitMobile(mobile.trim());
                }}
              >
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit mobile"
                  type="tel"
                  className="mb-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-[14px] outline-none focus:border-gray-300"
                />
                <Submit disabled={!mobile.trim() || isTyping} />
              </form>
            </Field>
          )}

          {siteVisit.mobile && step === "email" && !siteVisit.email && (
            <Field label="Email (optional)">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) onSubmitEmail(email.trim());
                }}
                className="space-y-2"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  type="email"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-[14px] outline-none focus:border-gray-300"
                />
                <div className="flex gap-2">
                  <Submit disabled={isTyping} label="Continue" />
                  <button type="button" onClick={onSkipEmail} className="text-[13px] text-gray-500">
                    Skip
                  </button>
                </div>
              </form>
            </Field>
          )}

          {step === "special-request" && !siteVisit.specialRequest && (
              <Field label="Additional Notes">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (notes.trim()) onSubmitNotes(notes.trim());
                  }}
                  className="space-y-2"
                >
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests..."
                    rows={2}
                    className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-[14px] outline-none focus:border-gray-300"
                  />
                  <div className="flex gap-2">
                    <Submit disabled={isTyping} label="Submit" />
                    <button type="button" onClick={onSkipNotes} className="text-[13px] text-gray-500">
                      Skip
                    </button>
                  </div>
                </form>
              </Field>
            )}
        </div>
      )}
    </motion.div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[13px] font-medium text-gray-600">{label}</p>
      {value && <p className="mb-1 text-[14px] text-gray-900">{value}</p>}
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium capitalize text-gray-900">{value ?? "—"}</dd>
    </div>
  );
}

function Pill({
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
      className="rounded-full border border-gray-200 px-3 py-1.5 text-[14px] text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Submit({ disabled, label = "Continue" }: { disabled?: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-xl bg-gray-900 py-2 text-[14px] font-medium text-white hover:bg-gray-800 disabled:opacity-40"
    >
      {label}
    </button>
  );
}
