export const CONVERSATION_STORAGE_KEY = "mysft-ai-conversation";

export const DEFAULT_TENANT_CONFIG = {
  tenantId: "demo-tenant",
  apiKey: "demo-api-key",
  language: "en",
  theme: {
    primaryColor: "#111827",
    accentColor: "#2563eb",
  },
} as const;

export const CITIES = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Pune",
  "Mumbai",
] as const;

export const CITY_AREAS: Record<string, string[]> = {
  Hyderabad: [
    "Gachibowli",
    "Kondapur",
    "Kokapet",
    "Financial District",
    "Madhapur",
    "Tell me more locations",
  ],
  Bengaluru: [
    "Whitefield",
    "Sarjapur Road",
    "Electronic City",
    "Hebbal",
    "Yelahanka",
    "Tell me more locations",
  ],
  Chennai: [
    "OMR",
    "Velachery",
    "Porur",
    "Tambaram",
    "Anna Nagar",
    "Tell me more locations",
  ],
  Pune: [
    "Hinjewadi",
    "Kharadi",
    "Baner",
    "Wakad",
    "Hadapsar",
    "Tell me more locations",
  ],
  Mumbai: [
    "Andheri",
    "Powai",
    "Thane",
    "Navi Mumbai",
    "Bandra",
    "Tell me more locations",
  ],
};

export const BUDGET_OPTIONS = [
  { label: "Under ₹50 Lakhs", value: "under-50l" },
  { label: "₹50L – ₹75L", value: "50l-75l" },
  { label: "₹75L – ₹1Cr", value: "75l-1cr" },
  { label: "₹1Cr – ₹2Cr", value: "1cr-2cr" },
  { label: "Above ₹2Cr", value: "above-2cr" },
  { label: "Custom Budget", value: "custom" },
] as const;

export const SUCCESS_CHECKLIST = [
  "Customer Profile Created",
  "Lead Created",
  "Property Interest Saved",
  "AI Lead Score Calculated",
  "Matching Projects Identified",
  "Site Visit Scheduled",
  "Sales Executive Assignment Ready",
  "WhatsApp Ready",
  "Email Ready",
  "CRM Integration Ready",
] as const;

export const HERO_CHIPS = [
  { icon: "🏢", label: "Apartments" },
  { icon: "🏡", label: "Villas" },
  { icon: "🌳", label: "Plots" },
  { icon: "🏢", label: "Commercial" },
  { icon: "🎤", label: "Voice Assistant" },
  { icon: "⚡", label: "Instant Recommendations" },
  { icon: "🌍", label: "Multi Language" },
  { icon: "📅", label: "Site Visit Booking" },
] as const;

export const SITE_VISIT_CONFIRM_STEPS = [
  "Booking Site Visit...",
  "Checking Consultant Availability...",
  "Preparing Confirmation...",
  "Creating Lead...",
  "Scheduling Visit...",
  "Sending Notification...",
] as const;

export const SPECIAL_REQUEST_OPTIONS = [
  { label: "Need parking", value: "Need parking" },
  { label: "Loan assistance", value: "Loan assistance" },
  { label: "Bring floor plans", value: "Bring floor plans" },
  { label: "Need 3BHK only", value: "Need 3BHK only" },
  { label: "Wheelchair access", value: "Wheelchair access" },
] as const;

export const WELCOME_QUICK_ACTIONS = [
  { icon: "🏢", label: "Find Apartment", value: "apartment" },
  { icon: "🏡", label: "Find Villa", value: "villa" },
  { icon: "🌳", label: "Find Plot", value: "plot" },
  { icon: "🏢", label: "Commercial Space", value: "commercial" },
  { icon: "🏠", label: "Book Site Visit", value: "site-visit" },
  { icon: "💰", label: "Investment Advice", value: "investment" },
] as const;
