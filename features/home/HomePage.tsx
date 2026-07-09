"use client";

import { useDrawer } from "@/hooks/useDrawer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { FloatingAIButton } from "@/components/chat/FloatingAIButton";
import { ConversationDrawer } from "@/components/chat/ConversationDrawer";

export function HomePage() {
  const { isOpen, isMinimized, intent, open, close, minimize, restore } = useDrawer();

  return (
    <>
      <Header onTalkToSales={() => open("conversation")} />
      <main>
        <HeroSection
          onStartConversation={() => open("conversation")}
          onBookSiteVisit={() => open("site-visit")}
        />
      </main>
      <FloatingAIButton onClick={() => open("conversation")} />
      <ConversationDrawer
        isOpen={isOpen}
        isMinimized={isMinimized}
        intent={intent}
        onClose={close}
        onMinimize={minimize}
        onRestore={restore}
      />
    </>
  );
}
