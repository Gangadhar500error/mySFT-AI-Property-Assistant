"use client";

import { useCallback, useRef, useState } from "react";

export function useVoice(onTranscript: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);

    // Simulated speech-to-text — backend integration later
    const mockPhrases = [
      "I'm looking for an apartment in Hyderabad",
      "My budget is around 1 crore",
      "I prefer 3 BHK",
      "I want to schedule a site visit",
    ];
    const phrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];

    intervalRef.current = setTimeout(() => {
      setIsRecording(false);
      onTranscript(phrase);
    }, 2500);
  }, [onTranscript]);

  const stopRecording = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRecording(false);
  }, []);

  return { isRecording, startRecording, stopRecording };
}
