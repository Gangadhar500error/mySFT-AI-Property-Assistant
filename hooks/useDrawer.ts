"use client";

import { useCallback, useState } from "react";

export type DrawerIntent = "conversation" | "site-visit";

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [intent, setIntent] = useState<DrawerIntent>("conversation");

  const open = useCallback((drawerIntent: DrawerIntent = "conversation") => {
    setIntent(drawerIntent);
    setIsOpen(true);
    setIsMaximized(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev);
  }, []);

  return { isOpen, isMaximized, intent, open, close, toggleMaximize };
}
