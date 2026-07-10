/** UI-only helpers for parsing assistant message layout. Does not alter conversation data. */

export const AI_AVATAR_URL =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face";

export function getUserInitials(name?: string): string {
  if (!name?.trim()) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function parseAssistantMessage(content: string, hasSuggestions: boolean) {
  const parts = content.split("\n\n").filter((p) => p.trim());

  if (!hasSuggestions || parts.length <= 1) {
    return { acknowledgment: content, question: null as string | null };
  }

  const last = parts[parts.length - 1].trim();
  if (last.endsWith("?")) {
    return {
      acknowledgment: parts.slice(0, -1).join("\n\n"),
      question: last,
    };
  }

  return { acknowledgment: content, question: null as string | null };
}

export type MessageBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** Splits message text into neat paragraphs and bullet lists for display. */
export function parseMessageBlocks(content: string): MessageBlock[] {
  const blocks: MessageBlock[] = [];
  const sections = content.split("\n\n").filter((s) => s.trim());

  for (const section of sections) {
    const lines = section.split("\n").map((l) => l.trim()).filter(Boolean);
    const bulletLines = lines.filter((l) => /^[•✓✔\-–]/.test(l));
    const plainLines = lines.filter((l) => !/^[•✓✔\-–]/.test(l));

    if (plainLines.length > 0) {
      blocks.push({ type: "paragraph", text: plainLines.join("\n") });
    }

    if (bulletLines.length > 0) {
      blocks.push({
        type: "list",
        items: bulletLines.map((l) => l.replace(/^[•✓✔\-–]\s*/, "")),
      });
    }
  }

  if (blocks.length === 0 && content.trim()) {
    blocks.push({ type: "paragraph", text: content.trim() });
  }

  return blocks;
}

export function getTypingMessage(step?: string): string {
  const messages: Record<string, string> = {
    welcome: "AI is analysing your requirements...",
    "property-type": "Understanding your property preferences...",
    city: "Exploring cities that match your needs...",
    area: "Finding the best matching neighbourhoods...",
    budget: "Analysing properties within your budget...",
    "budget-response": "Finding the best matching projects...",
    bedrooms: "Shortlisting configurations for you...",
    purpose: "Tailoring recommendations to your goals...",
    timeline: "Checking availability for your timeline...",
    "home-loan": "Reviewing financing options...",
    "site-visit": "Preparing site visit options...",
    "preferred-time": "Checking consultant availability...",
    name: "Preparing your enquiry details...",
    mobile: "Almost there...",
    email: "Finalising your profile...",
    summary: "Preparing your enquiry summary...",
  };

  return messages[step ?? ""] ?? "AI is analysing your requirements...";
}
