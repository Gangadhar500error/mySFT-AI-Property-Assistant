"use client";

import { Button } from "@/components/ui/Button";
import { HERO_CHIPS } from "@/lib/constants";
import { HeroIllustration } from "@/components/hero/HeroIllustration";

interface HeroSectionProps {
  onStartConversation: () => void;
  onBookSiteVisit: () => void;
}

export function HeroSection({ onStartConversation, onBookSiteVisit }: HeroSectionProps) {
  return (
    <section className="flex min-h-screen items-center pt-16 ">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Left */}
        <div className="flex flex-col gap-8 animate-fade-in">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-700">
            <span>✨</span>
            <span className="font-medium">AI Powered Property Assistant</span>
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Find Your Perfect Property Using AI
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-gray-500">
              Talk naturally with our AI Property Assistant through chat or voice.
              The AI understands your requirements, recommends matching properties,
              schedules site visits, and automatically creates qualified enquiries.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {HERO_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-600 shadow-sm"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={onStartConversation}>
              Start AI Conversation
            </Button>
            <Button variant="secondary" size="lg" onClick={onBookSiteVisit}>
              Book Site Visit
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600">✓</span> No Signup Required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600">✓</span> Available 24×7
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600">✓</span> Instant Responses
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="relative animate-slide-up lg:pl-4">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
