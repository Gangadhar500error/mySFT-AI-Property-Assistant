"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  ConversationFlow,
  ConversationState,
  Message,
  SiteVisitBookingState,
  SuggestionChip,
} from "@/types";
import { CONVERSATION_STORAGE_KEY } from "@/lib/constants";
import {
  getWelcomeMessage,
  INITIAL_STATE,
  processSuggestionClick,
  processUserInput,
} from "@/features/conversation/engine";
import {
  confirmSiteVisitBooking,
  editSiteVisitDetails,
  processSiteVisitDateSelect,
  processSiteVisitInput,
  processSiteVisitSuggestion,
  processSiteVisitTimeSelect,
  startSiteVisitBooking,
} from "@/features/site-visit/engine";

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, setState] = useState<ConversationState>(INITIAL_STATE);
  const [siteVisit, setSiteVisit] = useState<SiteVisitBookingState | null>(null);
  const [activeFlow, setActiveFlow] = useState<ConversationFlow>("discovery");
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingSpecialRequest, setPendingSpecialRequest] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed.messages ?? []);
        setState(parsed.state ?? INITIAL_STATE);
        setSiteVisit(parsed.siteVisit ?? null);
        setActiveFlow(parsed.activeFlow ?? "discovery");
      } else {
        setMessages([getWelcomeMessage()]);
      }
    } catch {
      setMessages([getWelcomeMessage()]);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(
      CONVERSATION_STORAGE_KEY,
      JSON.stringify({ messages, state, siteVisit, activeFlow, savedAt: Date.now() })
    );
  }, [messages, state, siteVisit, activeFlow, initialized]);

  const addMessagesWithDelay = useCallback(async (newMessages: Message[]) => {
    if (newMessages.length === 0) return;
    setIsTyping(true);
    const delay = 800 + Math.random() * 700;
    await new Promise((r) => setTimeout(r, delay));
    setIsTyping(false);
    setMessages((prev) => [...prev, ...newMessages]);
  }, []);

  const beginSiteVisitFlow = useCallback(
    async (
      project?: { projectId?: string; projectName?: string },
      userLabel = "🏠 Book Site Visit"
    ) => {
      const { siteVisit: sv, messages: svMessages } = startSiteVisitBooking(project);
      setActiveFlow("site-visit");
      setSiteVisit(sv);
      setMessages((prev) => [
        ...prev,
        {
          id: `sv-user-${Date.now()}`,
          role: "user",
          content: userLabel,
          timestamp: Date.now(),
        },
      ]);
      await addMessagesWithDelay(svMessages);
    },
    [addMessagesWithDelay]
  );

  const handleSiteVisitInput = useCallback(
    async (input: string) => {
      if (!siteVisit) return;
      setInputError(null);

      const { siteVisit: newSv, messages: newMessages, error } = processSiteVisitInput(
        input,
        siteVisit
      );

      if (error) {
        setInputError(error);
        return;
      }

      setMessages((prev) => [...prev, ...newMessages]);
      setSiteVisit(newSv);

      if (newSv.step === "summary") {
        setIsTyping(true);
        await new Promise((r) => setTimeout(r, 800));
        setIsTyping(false);
      }
    },
    [siteVisit]
  );

  const sendMessage = useCallback(
    async (input: string) => {
      if (!input.trim() || isTyping) return;

      if (activeFlow === "site-visit" && siteVisit) {
        await handleSiteVisitInput(input.trim());
        return;
      }

      const lower = input.trim().toLowerCase();
      if (
        lower === "site-visit" ||
        lower.includes("book site visit")
      ) {
        await beginSiteVisitFlow();
        return;
      }

      const { newState, messages: newMessages } = processUserInput(input.trim(), state);

      if (state.step === "site-visit" && newState.step === "preferred-time") {
        setMessages((prev) => [...prev, newMessages[0]]);
        setState(newState);
        const dateValue = input.trim().toLowerCase();
        const dateMap: Record<string, string> = {
          today: "today",
          tomorrow: "tomorrow",
          "this weekend": "this-weekend",
          "this-weekend": "this-weekend",
        };
        const mapped = dateMap[dateValue] ?? dateValue;
        const { siteVisit: sv, messages: svMessages } = startSiteVisitBooking();
        const { siteVisit: withDate, messages: dateMessages } = processSiteVisitInput(
          mapped,
          { ...sv, step: "welcome" }
        );
        setActiveFlow("site-visit");
        setSiteVisit(withDate);
        await addMessagesWithDelay(dateMessages.slice(1));
        return;
      }

      setMessages((prev) => [...prev, newMessages[0]]);
      setState(newState);
      if (newMessages.length > 1) {
        await addMessagesWithDelay(newMessages.slice(1));
      }
    },
    [state, isTyping, activeFlow, siteVisit, handleSiteVisitInput, beginSiteVisitFlow, addMessagesWithDelay]
  );

  const clickSuggestion = useCallback(
    async (suggestion: SuggestionChip) => {
      if (isTyping) return;

      if (activeFlow === "site-visit" && siteVisit) {
        setInputError(null);
        const { siteVisit: newSv, messages: newMessages, error } =
          processSiteVisitSuggestion(suggestion, siteVisit);

        if (error) {
          setInputError(error);
          return;
        }

        setMessages((prev) => [...prev, ...newMessages]);
        setSiteVisit(newSv);

        if (newSv.step === "summary") {
          setIsTyping(true);
          await new Promise((r) => setTimeout(r, 800));
          setIsTyping(false);
        }
        return;
      }

      if (suggestion.value === "site-visit") {
        await beginSiteVisitFlow();
        return;
      }

      const { newState, messages: newMessages } = processSuggestionClick(suggestion, state);

      if (state.step === "site-visit" && suggestion.value !== "later") {
        setMessages((prev) => [...prev, newMessages[0]]);
        const { siteVisit: sv, messages: svMessages } = startSiteVisitBooking();
        const { siteVisit: withDate, messages: dateMessages } = processSiteVisitInput(
          suggestion.value,
          { ...sv, step: "welcome" }
        );
        setActiveFlow("site-visit");
        setSiteVisit(withDate);
        await addMessagesWithDelay(dateMessages.slice(1));
        return;
      }

      setMessages((prev) => [...prev, newMessages[0]]);
      setState(newState);
      if (newMessages.length > 1) {
        await addMessagesWithDelay(newMessages.slice(1));
      }
    },
    [state, isTyping, activeFlow, siteVisit, beginSiteVisitFlow, addMessagesWithDelay]
  );

  const selectVisitDate = useCallback(
    async (date: Date) => {
      if (!siteVisit || isTyping) return;
      const { siteVisit: newSv, messages: newMessages } = processSiteVisitDateSelect(
        date,
        siteVisit
      );
      setMessages((prev) => [...prev, newMessages[0]]);
      setSiteVisit(newSv);
      await addMessagesWithDelay(newMessages.slice(1));
    },
    [siteVisit, isTyping, addMessagesWithDelay]
  );

  const selectCustomTime = useCallback(
    async (time: string) => {
      if (!siteVisit || isTyping) return;
      const { siteVisit: newSv, messages: newMessages } = processSiteVisitTimeSelect(
        time,
        siteVisit
      );
      setMessages((prev) => [...prev, newMessages[0]]);
      setSiteVisit(newSv);
      await addMessagesWithDelay(newMessages.slice(1));
    },
    [siteVisit, isTyping, addMessagesWithDelay]
  );

  const skipEmail = useCallback(async () => {
    await handleSiteVisitInput("skip");
    setPendingEmail("");
  }, [handleSiteVisitInput]);

  const continueEmail = useCallback(async () => {
    if (pendingEmail.trim()) {
      await handleSiteVisitInput(pendingEmail.trim());
      setPendingEmail("");
    }
  }, [pendingEmail, handleSiteVisitInput]);

  const skipSpecialRequest = useCallback(async () => {
    await handleSiteVisitInput("skip");
    setPendingSpecialRequest("");
  }, [handleSiteVisitInput]);

  const continueSpecialRequest = useCallback(async () => {
    if (pendingSpecialRequest.trim()) {
      await handleSiteVisitInput(pendingSpecialRequest.trim());
      setPendingSpecialRequest("");
    }
  }, [pendingSpecialRequest, handleSiteVisitInput]);

  const confirmBooking = useCallback(async () => {
    if (!siteVisit) return;
    setSiteVisit((prev) => (prev ? { ...prev, step: "confirming" } : prev));
  }, [siteVisit]);

  const completeConfirmation = useCallback(async () => {
    if (!siteVisit) return;
    const confirmed = confirmSiteVisitBooking(siteVisit);
    setSiteVisit(confirmed);
  }, [siteVisit]);

  const editSiteVisit = useCallback(async () => {
    if (!siteVisit) return;
    const { siteVisit: newSv, messages: newMessages } = editSiteVisitDetails(siteVisit);
    setSiteVisit(newSv);
    await addMessagesWithDelay(newMessages);
  }, [siteVisit, addMessagesWithDelay]);

  const resetConversation = useCallback(() => {
    localStorage.removeItem(CONVERSATION_STORAGE_KEY);
    setMessages([getWelcomeMessage()]);
    setState(INITIAL_STATE);
    setSiteVisit(null);
    setActiveFlow("discovery");
    setInputError(null);
    setPendingEmail("");
    setPendingSpecialRequest("");
  }, []);

  const goToSuccess = useCallback(() => {
    setState((prev) => ({ ...prev, step: "success" }));
  }, []);

  const editDetails = useCallback(() => {
    setState((prev) => ({ ...prev, step: "name" }));
    setMessages((prev) => [
      ...prev,
      {
        id: `edit-${Date.now()}`,
        role: "assistant",
        content: "Let's update your details. May I know your name?",
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const triggerSiteVisit = useCallback(
    async (project?: { projectId?: string; projectName?: string }) => {
      const label = project?.projectName
        ? `🏠 Book Site Visit — ${project.projectName}`
        : "🏠 Book Site Visit";
      await beginSiteVisitFlow(project, label);
    },
    [beginSiteVisitFlow]
  );

  return {
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
  };
}
