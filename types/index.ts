export type PropertyType = "apartment" | "villa" | "plot" | "commercial";

export type PurchasePurpose = "self-use" | "investment" | "rental" | "not-sure";

export type PurchaseTimeline =
  | "immediately"
  | "within-1-month"
  | "within-3-months"
  | "within-6-months"
  | "just-exploring";

export type HomeLoanOption = "yes" | "no" | "not-sure";

export type SiteVisitTiming = "today" | "tomorrow" | "this-weekend" | "choose-date" | "later";

export type PreferredTime = "morning" | "afternoon" | "evening" | "flexible";

export type ConversationStep =
  | "welcome"
  | "property-type"
  | "city"
  | "area"
  | "budget"
  | "budget-response"
  | "bedrooms"
  | "purpose"
  | "timeline"
  | "home-loan"
  | "site-visit"
  | "preferred-time"
  | "name"
  | "mobile"
  | "email"
  | "summary"
  | "success";

export interface TenantConfig {
  tenantId: string;
  apiKey: string;
  projectId?: string;
  organizationId?: string;
  language: string;
  theme: TenantTheme;
}

export interface TenantTheme {
  primaryColor: string;
  accentColor: string;
  fontFamily?: string;
  borderRadius?: string;
}

export interface ConversationState {
  step: ConversationStep;
  propertyType?: PropertyType;
  city?: string;
  area?: string;
  budget?: string;
  bedrooms?: string;
  purpose?: PurchasePurpose;
  timeline?: PurchaseTimeline;
  homeLoan?: HomeLoanOption;
  siteVisit?: SiteVisitTiming;
  preferredTime?: PreferredTime;
  name?: string;
  mobile?: string;
  email?: string;
  isComplete: boolean;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  suggestions?: SuggestionChip[];
  propertyCards?: PropertyRecommendation[];
  isTyping?: boolean;
}

export interface SuggestionChip {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface PropertyRecommendation {
  id: string;
  name: string;
  location: string;
  configuration: string;
  price: string;
  availability: string;
  matchScore: number;
  reasons: string[];
  imageUrl: string;
}

export interface LeadSummary {
  name: string;
  location: string;
  property: string;
  budget: string;
  bedrooms: string;
  purpose: string;
  timeline: string;
  siteVisit: string;
  phone: string;
  email: string;
}

export interface EnquiryPayload {
  tenantId: string;
  apiKey: string;
  projectId?: string;
  organizationId?: string;
  lead: LeadSummary;
  conversationState: ConversationState;
  recommendedProperties: PropertyRecommendation[];
}

export interface EnquiryResponse {
  success: boolean;
  leadId?: string;
  message?: string;
}

export interface VoiceTranscriptionRequest {
  tenantId: string;
  apiKey: string;
  audioBlob: Blob;
  language: string;
}

export interface VoiceTranscriptionResponse {
  text: string;
  confidence: number;
}

export interface PropertySearchParams {
  tenantId: string;
  propertyType?: PropertyType;
  city?: string;
  area?: string;
  budget?: string;
  bedrooms?: string;
}

export interface StoredConversation {
  messages: Message[];
  state: ConversationState;
  siteVisit?: SiteVisitBookingState | null;
  activeFlow?: ConversationFlow;
  savedAt: number;
}

export type ConversationFlow = "discovery" | "site-visit";

export type SiteVisitStep =
  | "welcome"
  | "date"
  | "time"
  | "custom-time"
  | "call-request"
  | "name"
  | "mobile"
  | "email"
  | "special-request"
  | "summary"
  | "confirming"
  | "success";

export type CallRequestOption = "yes" | "if-required" | "no";

export interface SiteVisitBookingState {
  active: boolean;
  step: SiteVisitStep;
  projectId?: string;
  projectName?: string;
  visitDate?: string;
  visitDateLabel?: string;
  visitTime?: string;
  visitTimeLabel?: string;
  callRequest?: CallRequestOption;
  name?: string;
  mobile?: string;
  email?: string;
  specialRequest?: string;
  referenceNumber?: string;
}

export interface SiteVisitBookingPayload {
  tenantId: string;
  apiKey: string;
  projectId?: string;
  organizationId?: string;
  visitDate: string;
  visitTime: string;
  callRequest: CallRequestOption;
  customerName: string;
  phoneNumber: string;
  email?: string;
  specialRequest?: string;
}

export interface SiteVisitBookingResponse {
  success: boolean;
  referenceNumber?: string;
  leadId?: string;
  appointmentId?: string;
  notificationStatus?: "pending" | "sent" | "failed";
  message?: string;
}

export interface AppointmentPayload {
  tenantId: string;
  referenceNumber: string;
  visitDate: string;
  visitTime: string;
  consultantId?: string;
  status: "scheduled" | "confirmed" | "cancelled";
}

export interface LeadCreationPayload {
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  source: "site-visit-booking";
  projectId?: string;
  specialRequest?: string;
}
