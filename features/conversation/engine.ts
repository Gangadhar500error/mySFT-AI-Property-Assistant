import type {
  ConversationState,
  Message,
  PropertyRecommendation,
  PropertyType,
  PurchasePurpose,
  SuggestionChip,
} from "@/types";
import { BUDGET_OPTIONS, CITY_AREAS } from "@/lib/constants";
import { generateId } from "@/lib/utils";

export const INITIAL_STATE: ConversationState = {
  step: "welcome",
  isComplete: false,
};

export function createAssistantMessage(
  content: string,
  extras?: Partial<Pick<Message, "suggestions" | "propertyCards">>
): Message {
  return {
    id: generateId(),
    role: "assistant",
    content,
    timestamp: Date.now(),
    ...extras,
  };
}

export function createUserMessage(content: string): Message {
  return {
    id: generateId(),
    role: "user",
    content,
    timestamp: Date.now(),
  };
}

export function getWelcomeMessage(): Message {
  return createAssistantMessage(
    "👋 Welcome to mySFT.\n\nI'm your AI Property Assistant.\n\nI'll help you find the perfect property based on your budget, preferred location and lifestyle.\n\nYou can type your answers or simply speak.",
    {
      suggestions: [
        { id: "1", label: "🏢 Find Apartment", value: "apartment" },
        { id: "2", label: "🏡 Find Villa", value: "villa" },
        { id: "3", label: "🌳 Find Plot", value: "plot" },
        { id: "4", label: "🏢 Commercial Space", value: "commercial" },
        { id: "5", label: "🏠 Book Site Visit", value: "site-visit" },
        { id: "6", label: "💰 Investment Advice", value: "investment" },
      ],
    }
  );
}

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: "Apartment",
  villa: "Villa",
  plot: "Plot",
  commercial: "Commercial Space",
};

export function getPropertyTypeQuestion(): Message {
  return createAssistantMessage(
    "What type of property are you looking for?",
    {
      suggestions: [
        { id: "apt", label: "Apartment", value: "apartment" },
        { id: "vil", label: "Villa", value: "villa" },
        { id: "plot", label: "Plot", value: "plot" },
        { id: "com", label: "Commercial", value: "commercial" },
      ],
    }
  );
}

export function getCityQuestion(propertyType: PropertyType): Message {
  const typeLabel = PROPERTY_TYPE_LABELS[propertyType];
  return createAssistantMessage(
    `Excellent choice.\n\n${typeLabel}s are currently available in multiple locations.\n\nLet's find the best one for you.\n\nWhich city are you interested in?`,
    {
      suggestions: [
        { id: "hyd", label: "Hyderabad", value: "Hyderabad" },
        { id: "blr", label: "Bengaluru", value: "Bengaluru" },
        { id: "chn", label: "Chennai", value: "Chennai" },
        { id: "pun", label: "Pune", value: "Pune" },
        { id: "mum", label: "Mumbai", value: "Mumbai" },
        { id: "oth", label: "Other City", value: "other" },
      ],
    }
  );
}

export function getAreaQuestion(city: string): Message {
  const areas = CITY_AREAS[city] ?? ["Central Area", "Suburbs", "Tell me more locations"];
  return createAssistantMessage(
    `Great choice.\n\n${city} has several premium residential communities.\n\nWhich area would you like to explore?`,
    {
      suggestions: areas.map((area, i) => ({
        id: `area-${i}`,
        label: area,
        value: area,
      })),
    }
  );
}

export function getBudgetQuestion(): Message {
  return createAssistantMessage("What's your approximate budget?", {
    suggestions: BUDGET_OPTIONS.map((b, i) => ({
      id: `budget-${i}`,
      label: b.label,
      value: b.value,
    })),
  });
}

export function getBudgetResponseMessage(budget: string): Message {
  const budgetLabel = BUDGET_OPTIONS.find((b) => b.value === budget)?.label ?? budget;
  return createAssistantMessage(
    `Great choice.\n\nWithin ${budgetLabel}, I can recommend:\n\n• 2 BHK Premium\n• 3 BHK Standard\n• Luxury Apartments`,
    {
      suggestions: [
        { id: "2bhk", label: "2 BHK Premium", value: "2-bhk-premium" },
        { id: "3bhk", label: "3 BHK Standard", value: "3-bhk-standard" },
        { id: "lux", label: "Luxury Apartments", value: "luxury" },
      ],
    }
  );
}

export function getBedroomsQuestion(): Message {
  return createAssistantMessage("How many bedrooms do you prefer?", {
    suggestions: [
      { id: "1", label: "1 BHK", value: "1-bhk" },
      { id: "2", label: "2 BHK", value: "2-bhk" },
      { id: "3", label: "3 BHK", value: "3-bhk" },
      { id: "4", label: "4 BHK", value: "4-bhk" },
      { id: "ns", label: "Not Sure", value: "not-sure" },
    ],
  });
}

export function getPurposeQuestion(): Message {
  return createAssistantMessage("What is the purpose of your purchase?", {
    suggestions: [
      { id: "su", label: "Self Use", value: "self-use" },
      { id: "inv", label: "Investment", value: "investment" },
      { id: "rent", label: "Rental Income", value: "rental" },
      { id: "ns", label: "Not Sure", value: "not-sure" },
    ],
  });
}

export function getPurposeResponse(purpose: PurchasePurpose): Message {
  const responses: Record<PurchasePurpose, string> = {
    "self-use":
      "Perfect. I'll focus on properties with excellent livability, amenities, and community features for your family.",
    investment:
      "Smart move. I'll prioritize projects with strong appreciation potential and high rental demand.",
    rental:
      "Great strategy. I'll highlight properties with proven rental yields and tenant demand in your area.",
    "not-sure":
      "No worries. I'll show you versatile options that work well for both living and investment.",
  };
  return createAssistantMessage(responses[purpose]);
}

export function getTimelineQuestion(): Message {
  return createAssistantMessage("When are you planning to buy?", {
    suggestions: [
      { id: "imm", label: "Immediately", value: "immediately" },
      { id: "1m", label: "Within 1 Month", value: "within-1-month" },
      { id: "3m", label: "Within 3 Months", value: "within-3-months" },
      { id: "6m", label: "Within 6 Months", value: "within-6-months" },
      { id: "exp", label: "Just Exploring", value: "just-exploring" },
    ],
  });
}

export function getHomeLoanQuestion(): Message {
  return createAssistantMessage("Will you require a Home Loan?", {
    suggestions: [
      { id: "yes", label: "Yes", value: "yes" },
      { id: "no", label: "No", value: "no" },
      { id: "ns", label: "Not Sure", value: "not-sure" },
    ],
  });
}

export function getSiteVisitQuestion(): Message {
  return createAssistantMessage("Would you like to schedule a Site Visit?", {
    suggestions: [
      { id: "today", label: "Today", value: "today" },
      { id: "tom", label: "Tomorrow", value: "tomorrow" },
      { id: "we", label: "This Weekend", value: "this-weekend" },
      { id: "date", label: "Choose Date", value: "choose-date" },
      { id: "later", label: "Later", value: "later" },
    ],
  });
}

export function getPreferredTimeQuestion(): Message {
  return createAssistantMessage("What is your preferred time?", {
    suggestions: [
      { id: "mor", label: "Morning", value: "morning" },
      { id: "aft", label: "Afternoon", value: "afternoon" },
      { id: "eve", label: "Evening", value: "evening" },
      { id: "flex", label: "Flexible", value: "flexible" },
    ],
  });
}

export function getNameQuestion(): Message {
  return createAssistantMessage("May I know your name?");
}

export function getMobileQuestion(name: string): Message {
  return createAssistantMessage(
    `Thank you, ${name}.\n\nCould you share your mobile number so our consultant can reach you?`
  );
}

export function getEmailQuestion(): Message {
  return createAssistantMessage("Email address? (Optional — you can skip by typing 'skip')");
}

export function getMockRecommendations(
  state: ConversationState
): PropertyRecommendation[] {
  const city = state.city ?? "Hyderabad";
  const area = state.area ?? "Gachibowli";
  const type = state.propertyType ?? "apartment";

  const configs: Record<PropertyType, string[]> = {
    apartment: ["2 BHK", "3 BHK", "4 BHK"],
    villa: ["3 BHK Villa", "4 BHK Villa", "5 BHK Villa"],
    plot: ["200 Sq.Yd", "300 Sq.Yd", "500 Sq.Yd"],
    commercial: ["Office Space", "Retail Unit", "Showroom"],
  };

  const prices = ["₹65 Lakhs", "₹1.2 Cr", "₹1.8 Cr"];
  const names = [
    "Skyline Residences",
    "Emerald Heights",
    "Prestige Park Grove",
  ];

  return names.map((name, i) => ({
    id: `prop-${i}`,
    name,
    location: `${area}, ${city}`,
    configuration: configs[type][i],
    price: prices[i],
    availability: i === 0 ? "Ready to Move" : "Under Construction",
    matchScore: 93 - i * 4,
    reasons: [
      "Budget Match",
      "Preferred Location",
      "Inventory Available",
      i === 0 ? "Near Metro" : "Premium Amenities",
    ],
    imageUrl: `https://images.unsplash.com/photo-${
      ["1564013799919-ab600027ffc6", "1512917774080-9991f1c4c750", "1600596542815-ffad4c1539a9"][i]
    }?w=400&h=280&fit=crop`,
  }));
}

export function shouldShowRecommendations(state: ConversationState): boolean {
  return !!(state.propertyType && state.city && state.budget);
}

export function getNextStep(
  currentStep: ConversationState["step"],
  state: ConversationState
): ConversationState["step"] | null {
  const flow: Record<ConversationState["step"], ConversationState["step"] | null> = {
    welcome: "property-type",
    "property-type": "city",
    city: "area",
    area: "budget",
    budget: "budget-response",
    "budget-response": state.propertyType === "plot" ? "purpose" : "bedrooms",
    bedrooms: "purpose",
    purpose: "timeline",
    timeline: "home-loan",
    "home-loan": "site-visit",
    "site-visit": state.siteVisit === "later" ? "name" : "preferred-time",
    "preferred-time": "name",
    name: "mobile",
    mobile: "email",
    email: "summary",
    summary: "success",
    success: null,
  };
  return flow[currentStep];
}

export function processUserInput(
  input: string,
  state: ConversationState
): { newState: ConversationState; messages: Message[] } {
  const messages: Message[] = [createUserMessage(input)];
  let newState = { ...state };

  switch (state.step) {
    case "welcome": {
      const value = normalizePropertyType(input);
      if (value === "site-visit") {
        newState = { ...newState, step: "site-visit" };
        messages.push(getSiteVisitQuestion());
      } else if (value === "investment") {
        newState = { ...newState, step: "purpose", purpose: "investment" };
        messages.push(
          createAssistantMessage(
            "Investment is a great choice. Let me help you find properties with strong returns.\n\nWhat type of property are you looking for?"
          ),
          getPropertyTypeQuestion()
        );
      } else if (value) {
        newState = { ...newState, step: "city", propertyType: value };
        messages.push(getCityQuestion(value));
      } else {
        messages.push(getPropertyTypeQuestion());
        newState.step = "property-type";
      }
      break;
    }
    case "property-type": {
      const value = normalizePropertyType(input);
      if (value && value !== "site-visit" && value !== "investment") {
        newState = { ...newState, step: "city", propertyType: value };
        messages.push(getCityQuestion(value));
      }
      break;
    }
    case "city": {
      newState = { ...newState, step: "area", city: input };
      messages.push(getAreaQuestion(input));
      break;
    }
    case "area": {
      newState = { ...newState, step: "budget", area: input };
      messages.push(getBudgetQuestion());
      break;
    }
    case "budget": {
      newState = { ...newState, step: "budget-response", budget: input };
      messages.push(getBudgetResponseMessage(input));
      if (shouldShowRecommendations(newState)) {
        const recs = getMockRecommendations(newState);
        messages.push(
          createAssistantMessage(
            "Based on your preferences, here are my top recommendations:",
            { propertyCards: recs }
          )
        );
      }
      break;
    }
    case "budget-response": {
      newState = {
        ...newState,
        step: newState.propertyType === "plot" ? "purpose" : "bedrooms",
      };
      if (newState.propertyType === "plot") {
        messages.push(getPurposeQuestion());
      } else {
        messages.push(getBedroomsQuestion());
      }
      break;
    }
    case "bedrooms": {
      newState = { ...newState, step: "purpose", bedrooms: input };
      messages.push(getPurposeQuestion());
      break;
    }
    case "purpose": {
      const purpose = normalizePurpose(input);
      newState = { ...newState, step: "timeline", purpose: purpose ?? "not-sure" };
      if (purpose) messages.push(getPurposeResponse(purpose));
      messages.push(getTimelineQuestion());
      break;
    }
    case "timeline": {
      newState = { ...newState, step: "home-loan", timeline: input as ConversationState["timeline"] };
      messages.push(getHomeLoanQuestion());
      break;
    }
    case "home-loan": {
      newState = { ...newState, step: "site-visit", homeLoan: input as ConversationState["homeLoan"] };
      messages.push(getSiteVisitQuestion());
      break;
    }
    case "site-visit": {
      newState = { ...newState, step: input === "later" ? "name" : "preferred-time", siteVisit: input as ConversationState["siteVisit"] };
      if (input === "later") {
        messages.push(getNameQuestion());
      } else {
        messages.push(getPreferredTimeQuestion());
      }
      break;
    }
    case "preferred-time": {
      newState = { ...newState, step: "name", preferredTime: input as ConversationState["preferredTime"] };
      messages.push(getNameQuestion());
      break;
    }
    case "name": {
      newState = { ...newState, step: "mobile", name: input };
      messages.push(getMobileQuestion(input));
      break;
    }
    case "mobile": {
      newState = { ...newState, step: "email", mobile: input };
      messages.push(getEmailQuestion());
      break;
    }
    case "email": {
      const email = input.toLowerCase() === "skip" ? "" : input;
      newState = { ...newState, step: "summary", email, isComplete: true };
      break;
    }
    default:
      break;
  }

  return { newState, messages };
}

export function processSuggestionClick(
  suggestion: SuggestionChip,
  state: ConversationState
): { newState: ConversationState; messages: Message[] } {
  return processUserInput(suggestion.value, state);
}

function normalizePropertyType(input: string): PropertyType | "site-visit" | "investment" | null {
  const lower = input.toLowerCase();
  if (lower.includes("apartment") || lower === "apartment") return "apartment";
  if (lower.includes("villa") || lower === "villa") return "villa";
  if (lower.includes("plot") || lower === "plot") return "plot";
  if (lower.includes("commercial") || lower === "commercial") return "commercial";
  if (lower.includes("site visit") || lower === "site-visit") return "site-visit";
  if (lower.includes("investment")) return "investment";
  return null;
}

function normalizePurpose(input: string): PurchasePurpose | null {
  const map: Record<string, PurchasePurpose> = {
    "self use": "self-use",
    "self-use": "self-use",
    investment: "investment",
    "rental income": "rental",
    rental: "rental",
    "not sure": "not-sure",
    "not-sure": "not-sure",
  };
  return map[input.toLowerCase()] ?? null;
}
