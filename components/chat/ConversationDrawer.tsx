"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { DrawerHeader } from "@/components/chat/DrawerHeader";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ChatInput } from "@/components/chat/ChatInput";
import { LeadSummaryCard } from "@/components/chat/LeadSummaryCard";
import { SuccessScreen } from "@/components/chat/SuccessScreen";
import { DatePickerInline } from "@/components/site-visit/DatePickerInline";
import { TimePickerInline } from "@/components/site-visit/TimePickerInline";
import { SiteVisitSummaryCard } from "@/components/site-visit/SiteVisitSummaryCard";
import { SiteVisitConfirming } from "@/components/site-visit/SiteVisitConfirming";
import { SiteVisitSuccessScreen } from "@/components/site-visit/SiteVisitSuccessScreen";
import { OptionalActionBar } from "@/components/site-visit/OptionalActionBar";
import { useConversation } from "@/hooks/useConversation";
import { useVoice } from "@/hooks/useVoice";

interface ConversationDrawerProps {
  isOpen: boolean;
  isMinimized: boolean;
  intent?: "conversation" | "site-visit";
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
}

export function ConversationDrawer({
  isOpen,
  isMinimized,
  intent = "conversation",
  onClose,
  onMinimize,
  onRestore,
}: ConversationDrawerProps) {
  const {
    messages,
    state,
    siteVisit,
    activeFlow,
    isTyping,
    initialized,
    inputError,
    pendingEmail,
    setPendingEmail,
    pendingSpecialRequest,
    setPendingSpecialRequest,
    sendMessage,
    clickSuggestion,
    selectVisitDate,
    selectCustomTime,
    skipEmail,
    continueEmail,
    skipSpecialRequest,
    continueSpecialRequest,
    confirmBooking,
    completeConfirmation,
    editSiteVisit,
    resetConversation,
    goToSuccess,
    editDetails,
    triggerSiteVisit,
  } = useConversation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intentHandled = useRef(false);

  const { isRecording, startRecording, stopRecording } = useVoice((text) => {
    sendMessage(text);
  });

  useEffect(() => {
    if (isOpen && intent === "site-visit" && initialized && !intentHandled.current) {
      intentHandled.current = true;
      triggerSiteVisit();
    }
    if (!isOpen) {
      intentHandled.current = false;
    }
  }, [isOpen, intent, initialized, triggerSiteVisit]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, state.step, siteVisit?.step]);

  const isSiteVisitFlow = activeFlow === "site-visit" && siteVisit?.active;
  const svStep = siteVisit?.step;

  const showDiscoverySuccess = !isSiteVisitFlow && state.step === "success";
  const showSiteVisitSuccess = isSiteVisitFlow && svStep === "success";
  const showSiteVisitConfirming = isSiteVisitFlow && svStep === "confirming";
  const showSiteVisitSummary = isSiteVisitFlow && svStep === "summary";
  const showDiscoverySummary = !isSiteVisitFlow && state.step === "summary";

  const showDatePicker = isSiteVisitFlow && svStep === "date" && !isTyping;
  const showTimePicker = isSiteVisitFlow && svStep === "custom-time" && !isTyping;

  const showEmailInput = isSiteVisitFlow && svStep === "email" && !isTyping;
  const showSpecialRequestInput = isSiteVisitFlow && svStep === "special-request" && !isTyping;

  const chipOnlySteps =
    svStep === "welcome" ||
    svStep === "date" ||
    svStep === "time" ||
    svStep === "custom-time" ||
    svStep === "call-request";

  const hideChatInput =
    showDiscoverySuccess ||
    showSiteVisitSuccess ||
    showSiteVisitConfirming ||
    showSiteVisitSummary ||
    showDiscoverySummary ||
    (isSiteVisitFlow && chipOnlySteps);

  const inputMode = isSiteVisitFlow && svStep === "mobile" ? "phone" : "text";
  const inputPlaceholder =
    svStep === "name"
      ? "Enter your full name..."
      : svStep === "mobile"
        ? "Enter 10-digit mobile number..."
        : svStep === "email"
          ? "Enter email address..."
          : svStep === "special-request"
            ? "Type your special request..."
            : "Type your message...";

  if (isMinimized) {
    return (
      <button
        onClick={onRestore}
        className="fixed right-6 bottom-24 z-50 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-lg transition-all hover:shadow-xl sm:right-8"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
          AI
        </span>
        Continue Conversation
      </button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] lg:bg-black/10"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-drawer sm:max-w-[480px] sm:rounded-l-2xl"
          >
            <DrawerHeader
              onVoiceCall={startRecording}
              onMinimize={onMinimize}
              onClose={onClose}
            />

            {showDiscoverySuccess ? (
              <SuccessScreen onWhatsAppYes={onClose} onWhatsAppNo={onClose} />
            ) : showSiteVisitSuccess && siteVisit ? (
              <SiteVisitSuccessScreen
                siteVisit={siteVisit}
                onViewProjects={() => {
                  resetConversation();
                }}
                onNewConversation={resetConversation}
                onClose={onClose}
              />
            ) : showSiteVisitConfirming ? (
              <SiteVisitConfirming onComplete={completeConfirmation} />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4">
                  {initialized &&
                    messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        onSuggestionSelect={clickSuggestion}
                        onBookSiteVisit={(project) =>
                          triggerSiteVisit(project)
                        }
                        disabled={isTyping || showSiteVisitSummary || showDiscoverySummary}
                      />
                    ))}

                  {isTyping && <TypingIndicator />}

                  {showDatePicker && (
                    <div className="px-4 py-2 animate-fade-in">
                      <DatePickerInline
                        onSelect={selectVisitDate}
                        disabled={isTyping}
                      />
                    </div>
                  )}

                  {showTimePicker && (
                    <div className="px-4 py-2 animate-fade-in">
                      <TimePickerInline
                        onSelect={selectCustomTime}
                        disabled={isTyping}
                      />
                    </div>
                  )}

                  {showSiteVisitSummary && siteVisit && (
                    <SiteVisitSummaryCard
                      siteVisit={siteVisit}
                      onConfirm={confirmBooking}
                      onEdit={editSiteVisit}
                    />
                  )}

                  {showDiscoverySummary && (
                    <LeadSummaryCard
                      state={state}
                      onCreateEnquiry={goToSuccess}
                      onEditDetails={editDetails}
                    />
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {showEmailInput && (
                  <>
                    <ChatInput
                      onSend={continueEmail}
                      onVoiceStart={startRecording}
                      onVoiceStop={stopRecording}
                      isRecording={isRecording}
                      disabled={isTyping}
                      placeholder="Enter email address..."
                      value={pendingEmail}
                      onChange={setPendingEmail}
                      hideVoice
                      error={inputError}
                    />
                    <OptionalActionBar
                      onSkip={skipEmail}
                      onContinue={continueEmail}
                      disabled={isTyping}
                    />
                  </>
                )}

                {showSpecialRequestInput && (
                  <>
                    <ChatInput
                      onSend={continueSpecialRequest}
                      onVoiceStart={startRecording}
                      onVoiceStop={stopRecording}
                      isRecording={isRecording}
                      disabled={isTyping}
                      placeholder="Type your special request..."
                      value={pendingSpecialRequest}
                      onChange={setPendingSpecialRequest}
                      hideVoice
                      error={inputError}
                    />
                    <OptionalActionBar
                      onSkip={skipSpecialRequest}
                      onContinue={continueSpecialRequest}
                      disabled={isTyping}
                    />
                  </>
                )}

                {!hideChatInput && !showEmailInput && !showSpecialRequestInput && (
                  <ChatInput
                    onSend={sendMessage}
                    onVoiceStart={startRecording}
                    onVoiceStop={stopRecording}
                    isRecording={isRecording}
                    disabled={isTyping}
                    mode={inputMode}
                    placeholder={inputPlaceholder}
                    error={inputError}
                  />
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
