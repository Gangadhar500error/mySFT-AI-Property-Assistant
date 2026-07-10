"use client";

import { useEffect } from "react";
import { useDrawer } from "@/hooks/useDrawer";
import { FloatingAIButton } from "@/components/chat/FloatingAIButton";
import { AIAssistantModal } from "@/components/assistant/AIAssistantModal";

export function HomePage() {
  const { isOpen, isMaximized, intent, open, close, toggleMaximize } = useDrawer();

  useEffect(() => {
    open("conversation");
  }, [open]);

  const handleToggleChat = () => {
    if (isOpen) {
      close();
    } else {
      open("conversation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <FloatingAIButton onClick={handleToggleChat} visible active={isOpen} />
      <AIAssistantModal
        isOpen={isOpen}
        isMaximized={isMaximized}
        intent={intent}
        onClose={close}
        onToggleMaximize={toggleMaximize}
      />
    </div>
  );
}
