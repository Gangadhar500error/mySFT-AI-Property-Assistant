"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AssistantHeader } from "@/components/assistant/AssistantHeader";
import { SiteVisitBookingCard } from "@/components/assistant/SiteVisitBookingCard";
import { SiteVisitSuccessCard } from "@/components/assistant/SiteVisitSuccessCard";
import { VoiceModePanel } from "@/components/assistant/VoiceModePanel";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ChatInput } from "@/components/chat/ChatInput";
import { LeadSummaryCard } from "@/components/chat/LeadSummaryCard";
import { SiteVisitConfirming } from "@/components/site-visit/SiteVisitConfirming";
import { AIAvatar } from "@/components/chat/AIAvatar";
import { useConversation } from "@/hooks/useConversation";
import { useVoice } from "@/hooks/useVoice";
import { getTypingMessage } from "@/lib/chat-ui";

interface AIAssistantModalProps {
  isOpen: boolean;
  isMinimized: boolean;
  intent?: "conversation" | "site-visit";
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
}

const WIDGET_ANIMATION = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
  transition: { duration: 0.22, ease: "easeOut" as const },
};

export function AIAssistantModal({
  isOpen,
  isMinimized,
  intent = "conversation",
  onClose,
  onMinimize,
  onRestore,
}: AIAssistantModalProps) {
  const {
    messages,
    state,
    siteVisit,
    activeFlow,
    isTyping,
    initialized,
    inputError,
    sendMessage,
    clickSuggestion,
    selectVisitDate,
    selectCustomTime,
    skipEmail,
    skipSpecialRequest,
    confirmBooking,
    completeConfirmation,
    resetConversation,
    goToSuccess,
    editDetails,
    triggerSiteVisit,
  } = useConversation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intentHandled = useRef(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>();
  const { isRecording, startRecording, stopRecording } = useVoice((text) => {
    setLastTranscript(text);
    sendMessage(text);
  });

  useEffect(() => {
    if (isOpen && intent === "site-visit" && initialized && !intentHandled.current) {
      intentHandled.current = true;
      triggerSiteVisit();
    }
    if (!isOpen) {
      intentHandled.current = false;
      setVoiceMode(false);
    }
  }, [isOpen, intent, initialized, triggerSiteVisit]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, state.step, siteVisit?.step, isOpen]);

  const isSiteVisitFlow = activeFlow === "site-visit" && siteVisit?.active;
  const svStep = siteVisit?.step;

  const showDiscoverySuccess = !isSiteVisitFlow && state.step === "success";
  const showSiteVisitSuccess = isSiteVisitFlow && svStep === "success";
  const showSiteVisitConfirming = isSiteVisitFlow && svStep === "confirming";
  const showDiscoverySummary = !isSiteVisitFlow && state.step === "summary";
  const showSiteVisitBooking =
    isSiteVisitFlow && svStep !== "success" && svStep !== "confirming";

  const singleFocusMode =
    showDiscoverySuccess ||
    showSiteVisitSuccess ||
    showSiteVisitConfirming ||
    showDiscoverySummary ||
    showSiteVisitBooking;

  const hideChatInput = singleFocusMode || isTyping;

  const inputMode = isSiteVisitFlow && svStep === "mobile" ? "phone" : "text";

  const typingMessage = isSiteVisitFlow
    ? "Preparing your site visit..."
    : getTypingMessage(state.step);

  const latestAssistantIndex = messages.reduce(
    (acc, m, i) => (m.role === "assistant" ? i : acc),
    -1
  );

  const handleSheetSuggestion = (value: string, label: string) => {
    clickSuggestion({ id: `sv-${value}`, label, value });
  };

  if (isMinimized) {
    return (
      <button
        onClick={onRestore}
        className="fixed right-6 bottom-24 z-50 flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm text-gray-700 shadow-lg"
      >
        <AIAvatar size="sm" showOnline />
        Continue chat
      </button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Light overlay — page stays visible & interactive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-none fixed inset-0 z-40 bg-black/[0.06]"
          />

          <motion.div
            {...WIDGET_ANIMATION}
            className="fixed right-6 bottom-6 z-50 flex w-[420px] max-h-[720px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
          >
            <AssistantHeader
              onVoiceCall={() => {
                setVoiceMode(true);
                startRecording();
              }}
              onMinimize={onMinimize}
              onClose={onClose}
            />

            <div className="relative flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
                {initialized &&
                  !singleFocusMode &&
                  messages.map((message, index) => {
                    const isAnswered =
                      message.role === "assistant" &&
                      messages[index + 1]?.role === "user";

                    return (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        userName={state.name ?? siteVisit?.name}
                        showAvatar={
                          message.role === "assistant" &&
                          (index === 0 || messages[index - 1].role === "user")
                        }
                        isLatestAssistant={index === latestAssistantIndex}
                        isAnswered={isAnswered}
                        onSuggestionSelect={clickSuggestion}
                        onBookSiteVisit={triggerSiteVisit}
                        disabled={isTyping || isAnswered}
                      />
                    );
                  })}

                {isTyping && !singleFocusMode && (
                  <TypingIndicator message={typingMessage} />
                )}

                {showDiscoverySummary && (
                  <div className="px-4 py-3">
                    <LeadSummaryCard
                      state={state}
                      onCreateEnquiry={goToSuccess}
                      onEditDetails={editDetails}
                    />
                  </div>
                )}

                {showSiteVisitBooking && siteVisit && (
                  <div className="px-4 py-3">
                    <SiteVisitBookingCard
                      siteVisit={siteVisit}
                      inputError={inputError}
                      onSelectDate={selectVisitDate}
                      onSelectTime={selectCustomTime}
                      onSuggestion={handleSheetSuggestion}
                      onSubmitName={sendMessage}
                      onSubmitMobile={sendMessage}
                      onSubmitEmail={sendMessage}
                      onSkipEmail={skipEmail}
                      onSubmitNotes={sendMessage}
                      onSkipNotes={skipSpecialRequest}
                      onConfirm={confirmBooking}
                      isTyping={isTyping}
                    />
                  </div>
                )}

                {showSiteVisitConfirming && (
                  <div className="px-4 py-4">
                    <SiteVisitConfirming onComplete={completeConfirmation} />
                  </div>
                )}

                {showSiteVisitSuccess && siteVisit && (
                  <div className="px-4 py-3">
                    <SiteVisitSuccessCard
                      siteVisit={siteVisit}
                      onViewProject={() => resetConversation()}
                      onDownloadBrochure={onClose}
                      onNewConversation={() => {
                        resetConversation();
                      }}
                    />
                  </div>
                )}

                {showDiscoverySuccess && (
                  <div className="px-4 py-4">
                    <div className="rounded-2xl bg-white p-5 text-center shadow-soft">
                      <div className="mb-2 text-2xl">🎉</div>
                      <h3 className="mb-1 text-[15px] font-semibold text-gray-900">
                        Enquiry Submitted
                      </h3>
                      <p className="mb-4 text-[13px] text-gray-500">
                        Our consultant will contact you shortly.
                      </p>
                      <button
                        onClick={onClose}
                        className="w-full rounded-xl bg-blue-600 py-2.5 text-[14px] font-medium text-white hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {!hideChatInput && (
                <ChatInput
                  onSend={sendMessage}
                  onVoiceStart={() => {
                    setVoiceMode(true);
                    startRecording();
                  }}
                  onVoiceStop={stopRecording}
                  isRecording={isRecording}
                  disabled={isTyping}
                  mode={inputMode}
                  error={inputError}
                />
              )}

              <AnimatePresence>
                {voiceMode && (
                  <VoiceModePanel
                    isRecording={isRecording}
                    transcript={lastTranscript}
                    onStart={startRecording}
                    onStop={stopRecording}
                    onEnd={() => {
                      stopRecording();
                      setVoiceMode(false);
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
