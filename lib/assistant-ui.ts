import type { ConversationState, ConversationStep, SiteVisitStep } from "@/types";

export const THINKING_MESSAGES = [
  "Thinking...",
  "Checking inventory...",
  "Matching projects...",
  "Finding best offers...",
  "Analysing your preferences...",
];

export const WELCOME_FEATURES = [
  { icon: "🏠", label: "Property Recommendations" },
  { icon: "💰", label: "Budget Matching" },
  { icon: "⚖️", label: "Compare Projects" },
  { icon: "📅", label: "Schedule Site Visits" },
  { icon: "🎤", label: "Voice Conversation" },
  { icon: "🏦", label: "Loan Assistance" },
  { icon: "⚡", label: "Instant Answers" },
] as const;

export const PROGRESS_STEPS = [
  { key: "property-type", label: "Property Type", icon: "🏠", color: "#3b82f6" },
  { key: "city", label: "Location", icon: "📍", color: "#14b8a6" },
  { key: "budget", label: "Budget", icon: "💰", color: "#f59e0b" },
  { key: "bedrooms", label: "Configuration", icon: "🛏️", color: "#8b5cf6" },
  { key: "purpose", label: "Preferences", icon: "✨", color: "#ec4899" },
  { key: "site-visit", label: "Site Visit", icon: "📅", color: "#f97316" },
  { key: "name", label: "Your Details", icon: "👤", color: "#10b981" },
] as const;

export const COLORFUL_STEPS = PROGRESS_STEPS;

export const SITE_VISIT_PROGRESS_STEPS = [
  { key: "date", label: "Visit Date", color: "#3b82f6" },
  { key: "time", label: "Visit Time", color: "#14b8a6" },
  { key: "details", label: "Your Details", color: "#8b5cf6" },
  { key: "confirm", label: "Confirm", color: "#10b981" },
] as const;

const STEP_INDEX: Partial<Record<ConversationStep, number>> = {
  welcome: 0,
  "property-type": 1,
  city: 2,
  area: 2,
  budget: 3,
  "budget-response": 3,
  bedrooms: 4,
  purpose: 5,
  timeline: 5,
  "home-loan": 5,
  "site-visit": 6,
  "preferred-time": 6,
  name: 7,
  mobile: 7,
  email: 7,
  summary: 7,
  success: 7,
};

export function getConversationProgress(step: ConversationStep) {
  const total = PROGRESS_STEPS.length;

  if (step === "welcome") {
    return {
      current: 1,
      total,
      label: "Getting Started",
      percent: Math.round((1 / total) * 100),
    };
  }

  const current = STEP_INDEX[step] ?? 1;
  const index = Math.min(Math.max(current - 1, 0), total - 1);
  return {
    current: Math.min(current, total),
    total,
    label: PROGRESS_STEPS[index]?.label ?? "Getting Started",
    percent: Math.round((current / total) * 100),
  };
}

const SITE_VISIT_STEP_INDEX: Partial<Record<SiteVisitStep, number>> = {
  welcome: 1,
  date: 1,
  time: 2,
  "custom-time": 2,
  "call-request": 3,
  name: 3,
  mobile: 3,
  email: 3,
  "special-request": 3,
  summary: 4,
  confirming: 4,
  success: 4,
};

export function getSiteVisitProgress(step: SiteVisitStep) {
  const current = SITE_VISIT_STEP_INDEX[step] ?? 1;
  const total = SITE_VISIT_PROGRESS_STEPS.length;
  const index = Math.min(Math.max(current - 1, 0), total - 1);
  return {
    current: Math.min(current, total),
    total,
    label: SITE_VISIT_PROGRESS_STEPS[index]?.label ?? "Site Visit",
    percent: Math.round((current / total) * 100),
  };
}

export const PROPERTY_TYPE_CARDS: Record<
  string,
  { icon: string; title: string; subtitle: string }
> = {
  apartment: { icon: "🏢", title: "Apartment", subtitle: "2 / 3 / 4 BHK" },
  villa: { icon: "🏡", title: "Villa", subtitle: "Luxury Villas" },
  plot: { icon: "🏘", title: "Plot", subtitle: "Residential" },
  commercial: { icon: "🏢", title: "Commercial", subtitle: "Office Spaces" },
  "site-visit": { icon: "📅", title: "Book Site Visit", subtitle: "Schedule a tour" },
  investment: { icon: "💰", title: "Investment Advice", subtitle: "Expert guidance" },
};

export const BUDGET_CARD_LABELS: Record<string, string> = {
  "under-50l": "Under ₹50 Lakhs",
  "50l-75l": "₹50L – ₹75L",
  "75l-1cr": "₹75L – ₹1Cr",
  "1cr-2cr": "₹1Cr – ₹2Cr",
  "above-2cr": "₹2Cr+",
  custom: "Custom Budget",
};

export const HYDERABAD_AREAS = [
  "HITEC City",
  "Kokapet",
  "Gachibowli",
  "Financial District",
  "Madhapur",
  "Narsingi",
  "Tellapur",
] as const;

export function inferSuggestionVariant(
  suggestions: { value: string; label: string }[],
  step?: ConversationStep
): "property-type" | "budget" | "location" | "default" {
  if (step === "property-type" || step === "welcome") {
    const values = suggestions.map((s) => s.value);
    if (values.some((v) => ["apartment", "villa", "plot", "commercial"].includes(v))) {
      return "property-type";
    }
  }
  if (step === "budget" || suggestions.some((s) => s.value in BUDGET_CARD_LABELS)) {
    return "budget";
  }
  if (step === "area" || step === "city") {
    return "location";
  }
  return "default";
}

export function getBuilderName(projectName: string): string {
  const builders: Record<string, string> = {
    "Skyline Residences": "Skyline Developers",
    "Emerald Heights": "Emerald Constructions",
    "Prestige Park Grove": "Prestige Group",
  };
  return builders[projectName] ?? "Premium Builder";
}

export function filterPropertiesForState<T extends { configuration: string; location: string }>(
  properties: T[],
  state: ConversationState
): T[] {
  let filtered = [...properties];
  if (state.area) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes(state.area!.toLowerCase().split(" ")[0])
    );
    if (filtered.length === 0) filtered = [...properties];
  }
  if (state.bedrooms && state.bedrooms !== "not-sure") {
    const bhk = state.bedrooms.replace("-bhk", "").toUpperCase();
    const match = filtered.filter((p) => p.configuration.includes(bhk));
    if (match.length > 0) filtered = match;
  }
  return filtered;
}
