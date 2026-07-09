export function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getTomorrow(): Date {
  const d = getToday();
  d.setDate(d.getDate() + 1);
  return d;
}

export function getNextWeekday(targetDay: number): Date {
  const d = getToday();
  const current = d.getDay();
  let diff = targetDay - current;
  if (diff <= 0) diff += 7;
  d.setDate(d.getDate() + diff);
  return d;
}

export function getNextSaturday(): Date {
  return getNextWeekday(6);
}

export function getNextSunday(): Date {
  return getNextWeekday(0);
}

export function isValidIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function formatIndianMobile(phone: string): string {
  const cleaned = phone.replace(/\D/g, "").slice(-10);
  return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
}

export function generateReferenceNumber(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `SV-2026-${num}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const TIME_SLOT_LABELS: Record<string, string> = {
  morning: "Morning (9:00 AM – 12:00 PM)",
  afternoon: "Afternoon (12:00 PM – 4:00 PM)",
  evening: "Evening (4:00 PM – 7:00 PM)",
};

export const CALL_REQUEST_LABELS: Record<string, string> = {
  yes: "Yes, please call me",
  "if-required": "Call only if required",
  no: "No call required",
};
