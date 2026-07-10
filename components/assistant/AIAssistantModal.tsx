"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { AssistantHeader } from "@/components/assistant/AssistantHeader";
import { AssistantProgress } from "@/components/assistant/AssistantProgress";
import { SiteVisitBookingCard } from "@/components/assistant/SiteVisitBookingCard";
import { SiteVisitSuccessCard } from "@/components/assistant/SiteVisitSuccessCard";
import { VoiceModePanel } from "@/components/assistant/VoiceModePanel";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ChatInput } from "@/components/chat/ChatInput";
import { LeadSummaryCard } from "@/components/chat/LeadSummaryCard";
import { SiteVisitConfirming } from "@/components/site-visit/SiteVisitConfirming";
import { useConversation } from "@/hooks/useConversation";
import { useVoice } from "@/hooks/useVoice";
import { getTypingMessage } from "@/lib/chat-ui";

interface AIAssistantModalProps {
  isOpen: boolean;
  isMaximized: boolean;
  intent?: "conversation" | "site-visit";
  onClose: () => void;
  onToggleMaximize: () => void;
}

const OPEN_TRANSITION = {
  duration: 0.24,
  ease: [0.32, 0.72, 0, 1] as const,
};

const SIZE_TRANSITION = {
  duration: 0.32,
  ease: [0.32, 0.72, 0, 1] as const,
};

const WIDGET_SIZE = { width: 420, height: 620, right: 24, bottom: 80, radius: 24 };

const EXPANDED_SIZE = {
  maxWidth: 960,
  sideGap: 24,
  topGap: 28,
  bottomGap: 96,
  radius: 24,
};

type ModalLayout = {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
};

function getWidgetLayout(viewportWidth: number, viewportHeight: number): ModalLayout {
  return {
    top: viewportHeight - WIDGET_SIZE.bottom - WIDGET_SIZE.height,
    left: viewportWidth - WIDGET_SIZE.right - WIDGET_SIZE.width,
    width: WIDGET_SIZE.width,
    height: WIDGET_SIZE.height,
    borderRadius: WIDGET_SIZE.radius,
  };
}

function getExpandedLayout(viewportWidth: number, viewportHeight: number): ModalLayout {
  const sideGap = viewportWidth < 640 ? 16 : EXPANDED_SIZE.sideGap;
  const topGap = viewportWidth < 640 ? 16 : EXPANDED_SIZE.topGap;
  const width = Math.min(viewportWidth - sideGap * 2, EXPANDED_SIZE.maxWidth);
  const height = viewportHeight - topGap - EXPANDED_SIZE.bottomGap;

  return {
    top: topGap,
    left: (viewportWidth - width) / 2,
    width,
    height: Math.max(height, 480),
    borderRadius: EXPANDED_SIZE.radius,
  };
}

function getModalLayout(isMaximized: boolean, viewportWidth: number, viewportHeight: number): ModalLayout {
  return isMaximized
    ? getExpandedLayout(viewportWidth, viewportHeight)
    : getWidgetLayout(viewportWidth, viewportHeight);
}

function useViewportSize() {
  const [size, setSize] = useState(() =>
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1440, height: 900 }
  );

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export function AIAssistantModal({
  isOpen,
  isMaximized,
  intent = "conversation",
  onClose,
  onToggleMaximize,
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

  const viewport = useViewportSize();
  const widgetLayout = useMemo(
    () => getWidgetLayout(viewport.width, viewport.height),
    [viewport.width, viewport.height]
  );
  const modalLayout = useMemo(
    () => getModalLayout(isMaximized, viewport.width, viewport.height),
    [isMaximized, viewport.width, viewport.height]
  );
  const wasMaximizedRef = useRef(isMaximized);
  const isLayoutAnimating = wasMaximizedRef.current !== isMaximized;
  wasMaximizedRef.current = isMaximized;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMaximized ? 0.22 : 0.06 }}
            exit={{ opacity: 0 }}
            transition={SIZE_TRANSITION}
            className="pointer-events-none fixed inset-0 z-40 bg-black"
          />

          <motion.div
            key="assistant-panel"
            initial={{
              opacity: 0,
              scale: 0.96,
              ...widgetLayout,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              ...modalLayout,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
            }}
            transition={isLayoutAnimating ? SIZE_TRANSITION : OPEN_TRANSITION}
            style={{ position: "fixed", zIndex: 50 }}
            className={`flex flex-col overflow-hidden bg-white ${
              isMaximized
                ? "shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                : "shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
            }`}
          >
            <AssistantHeader
              onVoiceCall={() => {
                setVoiceMode(true);
                startRecording();
              }}
              isMaximized={isMaximized}
              onToggleMaximize={onToggleMaximize}
              onClose={onClose}
            />

            <AssistantProgress
              flow={isSiteVisitFlow ? "site-visit" : "discovery"}
              step={state.step}
              siteVisitStep={siteVisit?.step}
            />

            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
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
