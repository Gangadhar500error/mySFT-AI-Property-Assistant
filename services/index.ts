import type {
  AppointmentPayload,
  EnquiryPayload,
  EnquiryResponse,
  LeadCreationPayload,
  PropertyRecommendation,
  PropertySearchParams,
  SiteVisitBookingPayload,
  SiteVisitBookingResponse,
  TenantConfig,
  VoiceTranscriptionRequest,
  VoiceTranscriptionResponse,
} from "@/types";

export interface PropertyService {
  searchProperties(params: PropertySearchParams): Promise<PropertyRecommendation[]>;
}

export interface EnquiryService {
  createEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse>;
}

export interface VoiceService {
  transcribe(request: VoiceTranscriptionRequest): Promise<VoiceTranscriptionResponse>;
}

export interface TenantService {
  getConfig(tenantId: string): Promise<TenantConfig>;
}

export interface SiteVisitService {
  createBooking(payload: SiteVisitBookingPayload): Promise<SiteVisitBookingResponse>;
  createLead(payload: LeadCreationPayload): Promise<{ leadId: string }>;
  createAppointment(payload: AppointmentPayload): Promise<{ appointmentId: string }>;
  sendNotification(referenceNumber: string): Promise<{ status: "sent" | "failed" }>;
}

export class PropertyServiceImpl implements PropertyService {
  async searchProperties(_params: PropertySearchParams): Promise<PropertyRecommendation[]> {
    throw new Error("Backend integration not implemented");
  }
}

export class EnquiryServiceImpl implements EnquiryService {
  async createEnquiry(_payload: EnquiryPayload): Promise<EnquiryResponse> {
    throw new Error("Backend integration not implemented");
  }
}

export class VoiceServiceImpl implements VoiceService {
  async transcribe(_request: VoiceTranscriptionRequest): Promise<VoiceTranscriptionResponse> {
    throw new Error("Backend integration not implemented");
  }
}

export class TenantServiceImpl implements TenantService {
  async getConfig(_tenantId: string): Promise<TenantConfig> {
    throw new Error("Backend integration not implemented");
  }
}

export class SiteVisitServiceImpl implements SiteVisitService {
  async createBooking(_payload: SiteVisitBookingPayload): Promise<SiteVisitBookingResponse> {
    throw new Error("Backend integration not implemented");
  }

  async createLead(_payload: LeadCreationPayload): Promise<{ leadId: string }> {
    throw new Error("Backend integration not implemented");
  }

  async createAppointment(_payload: AppointmentPayload): Promise<{ appointmentId: string }> {
    throw new Error("Backend integration not implemented");
  }

  async sendNotification(_referenceNumber: string): Promise<{ status: "sent" | "failed" }> {
    throw new Error("Backend integration not implemented");
  }
}
