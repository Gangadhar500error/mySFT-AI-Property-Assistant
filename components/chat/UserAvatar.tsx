"use client";

import { getUserInitials } from "@/lib/chat-ui";

interface UserAvatarProps {
  name?: string;
  className?: string;
}

export function UserAvatar({ name, className = "" }: UserAvatarProps) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-xs font-semibold text-white shadow-sm ${className}`}
    >
      {getUserInitials(name)}
    </div>
  );
}
