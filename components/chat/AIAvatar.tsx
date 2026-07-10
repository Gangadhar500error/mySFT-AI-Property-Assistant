"use client";

import Image from "next/image";
import { AI_AVATAR_URL } from "@/lib/chat-ui";

interface AIAvatarProps {
  size?: "sm" | "md" | "lg";
  showOnline?: boolean;
  bare?: boolean;
  className?: string;
}

const SIZES = {
  sm: "h-9 w-9",
  md: "h-9 w-9 sm:h-10 sm:w-10",
  lg: "h-10 w-10",
} as const;

export function AIAvatar({ size = "md", showOnline = false, bare = false, className = "" }: AIAvatarProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        className={`${SIZES[size]} overflow-hidden rounded-full ${bare ? "" : "ring-2 ring-white shadow-sm"}`}
      >
        <Image
          src={AI_AVATAR_URL}
          alt="AI Property Assistant"
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>
      {showOnline && (
        <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
        </span>
      )}
    </div>
  );
}
