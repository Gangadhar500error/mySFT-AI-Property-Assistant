import type {
  CallRequestOption,
  Message,
  SiteVisitBookingState,
  SuggestionChip,
} from "@/types";
import { generateId } from "@/lib/utils";
import {
  CALL_REQUEST_LABELS,
  formatDateLabel,
  generateReferenceNumber,
  getNextSaturday,
  getNextSunday,
  getToday,
  getTomorrow,
  isValidEmail,
  isValidIndianMobile,
  TIME_SLOT_LABELS,
  toISODate,
} from "@/features/site-visit/utils";

export const INITIAL_SITE_VISIT_STATE: SiteVisitBookingState = {
  active: true,
  step: "welcome",
};

export function createSiteVisitAssistantMessage(
  content: string,
  extras?: Partial<Pick<Message, "suggestions">>
): Message {
  return {
    id: generateId(),
    role: "assistant",
    content,
    timestamp: Date.now(),
    ...extras,
  };
}

export function createSiteVisitUserMessage(content: string): Message {
  return {
    id: generateId(),
    role: "user",
    content,
    timestamp: Date.now(),
  };
}

export function getSiteVisitWelcomeMessage(projectName?: string): Message {
  const projectNote = projectName
    ? `\n\nI'll help you schedule a visit to ${projectName}.`
    : "";

  return createSiteVisitAssistantMessage(
    `Great choice! I'd be happy to help you schedule your site visit.${projectNote}\n\nI'll collect a few details to arrange your visit with one of our property consultants.`,
    {
      suggestions: [
        { id: "sv-today", label: "Today's Visit", value: "today" },
        { id: "sv-tomorrow", label: "Tomorrow", value: "tomorrow" },
        { id: "sv-weekend", label: "This Weekend", value: "this-weekend" },
        { id: "sv-custom", label: "Choose Custom Date", value: "choose-date" },
      ],
    }
  );
}

export function getDateQuestionMessage(): Message {
  return createSiteVisitAssistantMessage(
    "When would you like to visit?",
    {
      suggestions: [
        { id: "d-today", label: "Today", value: "today" },
        { id: "d-tom", label: "Tomorrow", value: "tomorrow" },
        { id: "d-sat", label: "Saturday", value: "saturday" },
        { id: "d-sun", label: "Sunday", value: "sunday" },
        { id: "d-choose", label: "Choose Date", value: "choose-date" },
      ],
    }
  );
}

export function getPerfectResponse(): Message {
  return createSiteVisitAssistantMessage("Perfect.");
}

export function getTimeQuestionMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Which time is most convenient for you?",
    {
      suggestions: [
        { id: "t-mor", label: "Morning\n(9:00 AM – 12:00 PM)", value: "morning" },
        { id: "t-aft", label: "Afternoon\n(12:00 PM – 4:00 PM)", value: "afternoon" },
        { id: "t-eve", label: "Evening\n(4:00 PM – 7:00 PM)", value: "evening" },
        { id: "t-custom", label: "Custom Time", value: "custom-time" },
      ],
    }
  );
}

export function getCustomTimeMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Please select your preferred time for the visit."
  );
}

export function getCallRequestMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Would you also like one of our property consultants to call you before your visit?",
    {
      suggestions: [
        { id: "c-yes", label: "✅ Yes, please call me", value: "yes" },
        { id: "c-if", label: "📞 Call only if required", value: "if-required" },
        { id: "c-no", label: "❌ No call required", value: "no" },
      ],
    }
  );
}

export function getCallConfirmMessage(option: CallRequestOption): Message | null {
  if (option === "yes") {
    return createSiteVisitAssistantMessage(
      "Our property consultant will contact you before your scheduled visit."
    );
  }
  return null;
}

export function getSiteVisitNameMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Wonderful! Before I confirm your booking, may I know your full name?"
  );
}

export function getSiteVisitThankNameMessage(name: string): Message {
  return createSiteVisitAssistantMessage(`Thank you, ${name}.`);
}

export function getSiteVisitMobileMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Please share your mobile number so our consultant can reach you."
  );
}

export function getSiteVisitEmailMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Would you like to share your email address? (Optional)"
  );
}

export function getSpecialRequestMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Would you like to add any special requests for your visit?",
    {
      suggestions: [
        { id: "sr-park", label: "Need parking", value: "Need parking" },
        { id: "sr-loan", label: "Loan assistance", value: "Loan assistance" },
        { id: "sr-plan", label: "Bring floor plans", value: "Bring floor plans" },
        { id: "sr-3bhk", label: "Need 3BHK only", value: "Need 3BHK only" },
        { id: "sr-wheel", label: "Wheelchair access", value: "Wheelchair access" },
        { id: "sr-skip", label: "Skip", value: "skip" },
      ],
    }
  );
}

export function getFollowUpMessage(): Message {
  return createSiteVisitAssistantMessage(
    "Before your visit, I'll also share:\n\n✓ Project Brochure\n✓ Google Maps Location\n✓ Sales Executive Contact\n✓ Visit Confirmation\n✓ Reminder Notification\n\non your preferred communication channel."
  );
}

export function resolveDateFromValue(value: string): { iso: string; label: string } | null {
  const map: Record<string, Date> = {
    today: getToday(),
    tomorrow: getTomorrow(),
    saturday: getNextSaturday(),
    sunday: getNextSunday(),
    "this-weekend": getNextSaturday(),
  };
  const date = map[value];
  if (!date) return null;
  return { iso: toISODate(date), label: formatDateLabel(date) };
}

export function startSiteVisitBooking(project?: {
  projectId?: string;
  projectName?: string;
}): {
  siteVisit: SiteVisitBookingState;
  messages: Message[];
} {
  return {
    siteVisit: {
      ...INITIAL_SITE_VISIT_STATE,
      projectId: project?.projectId,
      projectName: project?.projectName,
    },
    messages: [getSiteVisitWelcomeMessage(project?.projectName)],
  };
}

export function processSiteVisitInput(
  input: string,
  siteVisit: SiteVisitBookingState
): {
  siteVisit: SiteVisitBookingState;
  messages: Message[];
  error?: string;
} {
  const messages: Message[] = [createSiteVisitUserMessage(input)];
  let newState = { ...siteVisit };

  switch (siteVisit.step) {
    case "welcome": {
      const date = resolveDateFromValue(input);
      if (date) {
        newState = {
          ...newState,
          step: "time",
          visitDate: date.iso,
          visitDateLabel: date.label,
        };
        messages.push(getPerfectResponse(), getTimeQuestionMessage());
      } else if (input === "choose-date") {
        newState = { ...newState, step: "date" };
        messages.push(getDateQuestionMessage());
      } else {
        newState = { ...newState, step: "date" };
        messages.push(getDateQuestionMessage());
      }
      break;
    }

    case "date": {
      if (input === "choose-date") break;
      const quickDate = resolveDateFromValue(input);
      if (quickDate) {
        newState = {
          ...newState,
          step: "time",
          visitDate: quickDate.iso,
          visitDateLabel: quickDate.label,
        };
        messages.push(getPerfectResponse(), getTimeQuestionMessage());
      }
      break;
    }

    case "time": {
      if (input === "custom-time") {
        newState = { ...newState, step: "custom-time" };
        messages.push(getCustomTimeMessage());
      } else if (TIME_SLOT_LABELS[input]) {
        newState = {
          ...newState,
          step: "call-request",
          visitTime: input,
          visitTimeLabel: TIME_SLOT_LABELS[input],
        };
        messages.push(getCallRequestMessage());
      }
      break;
    }

    case "custom-time": {
      newState = {
        ...newState,
        step: "call-request",
        visitTime: input,
        visitTimeLabel: input,
      };
      messages.push(getCallRequestMessage());
      break;
    }

    case "call-request": {
      const option = input as CallRequestOption;
      newState = { ...newState, step: "name", callRequest: option };
      const confirm = getCallConfirmMessage(option);
      if (confirm) messages.push(confirm);
      messages.push(getSiteVisitNameMessage());
      break;
    }

    case "name": {
      if (input.trim().length < 2) {
        return {
          siteVisit,
          messages: [],
          error: "Please enter your full name.",
        };
      }
      newState = { ...newState, step: "mobile", name: input.trim() };
      messages.push(getSiteVisitThankNameMessage(input.trim()), getSiteVisitMobileMessage());
      break;
    }

    case "mobile": {
      if (!isValidIndianMobile(input)) {
        return {
          siteVisit,
          messages: [],
          error: "Please enter a valid 10-digit Indian mobile number.",
        };
      }
      const cleaned = input.replace(/\D/g, "").slice(-10);
      newState = { ...newState, step: "email", mobile: cleaned };
      messages.push(getSiteVisitEmailMessage());
      break;
    }

    case "email": {
      if (input.toLowerCase() === "skip" || input === "") {
        newState = { ...newState, step: "special-request", email: "" };
        messages.push(getSpecialRequestMessage());
      } else if (!isValidEmail(input)) {
        return {
          siteVisit,
          messages: [],
          error: "Please enter a valid email address or tap Skip.",
        };
      } else {
        newState = { ...newState, step: "special-request", email: input };
        messages.push(getSpecialRequestMessage());
      }
      break;
    }

    case "special-request": {
      const request = input.toLowerCase() === "skip" ? "" : input;
      newState = {
        ...newState,
        step: "summary",
        specialRequest: request,
      };
      break;
    }

    default:
      break;
  }

  return { siteVisit: newState, messages };
}

export function processSiteVisitSuggestion(
  suggestion: SuggestionChip,
  siteVisit: SiteVisitBookingState
) {
  return processSiteVisitInput(suggestion.value, siteVisit);
}

export function processSiteVisitDateSelect(
  date: Date,
  siteVisit: SiteVisitBookingState
): { siteVisit: SiteVisitBookingState; messages: Message[] } {
  const label = formatDateLabel(date);
  const iso = toISODate(date);
  const messages: Message[] = [
    createSiteVisitUserMessage(label),
    getPerfectResponse(),
    getTimeQuestionMessage(),
  ];
  return {
    siteVisit: {
      ...siteVisit,
      step: "time",
      visitDate: iso,
      visitDateLabel: label,
    },
    messages,
  };
}

export function processSiteVisitTimeSelect(
  time: string,
  siteVisit: SiteVisitBookingState
): { siteVisit: SiteVisitBookingState; messages: Message[] } {
  const messages: Message[] = [
    createSiteVisitUserMessage(time),
    getCallRequestMessage(),
  ];
  return {
    siteVisit: {
      ...siteVisit,
      step: "call-request",
      visitTime: time,
      visitTimeLabel: time,
    },
    messages,
  };
}

export function confirmSiteVisitBooking(
  siteVisit: SiteVisitBookingState
): SiteVisitBookingState {
  return {
    ...siteVisit,
    step: "success",
    referenceNumber: generateReferenceNumber(),
  };
}

export function editSiteVisitDetails(
  siteVisit: SiteVisitBookingState
): { siteVisit: SiteVisitBookingState; messages: Message[] } {
  return {
    siteVisit: { ...siteVisit, step: "date" },
    messages: [
      createSiteVisitAssistantMessage(
        "No problem! Let's update your visit details.\n\nWhen would you like to visit?"
      ),
      getDateQuestionMessage(),
    ],
  };
}
