"use client";

import { useEffect } from "react";
import { useDrawer } from "@/hooks/useDrawer";
import { FloatingAIButton } from "@/components/chat/FloatingAIButton";
import { AIAssistantModal } from "@/components/assistant/AIAssistantModal";

export function HomePage() {
  const { isOpen, isMinimized, intent, open, close, minimize, restore } = useDrawer();

  useEffect(() => {
    open("conversation");
  }, [open]);

  return (
    <div className="min-h-screen bg-gray-800">
      <FloatingAIButton
        onClick={() => open("conversation")}
        visible={!isMinimized}
        active={isOpen && !isMinimized}
      />
      <AIAssistantModal
        isOpen={isOpen}
        isMinimized={isMinimized}
        intent={intent}
        onClose={close}
        onMinimize={minimize}
        onRestore={restore}
      />
    </div>
  );
}
