"use client";

import { useCallback, useState } from "react";

export type DrawerIntent = "conversation" | "site-visit";

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [intent, setIntent] = useState<DrawerIntent>("conversation");

  const open = useCallback((drawerIntent: DrawerIntent = "conversation") => {
    setIntent(drawerIntent);
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const minimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const restore = useCallback(() => {
    setIsMinimized(false);
  }, []);

  return { isOpen, isMinimized, intent, open, close, minimize, restore };
}
