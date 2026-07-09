"use client";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

interface HeaderProps {
  onTalkToSales: () => void;
}

export function Header({ onTalkToSales }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />
        <Button variant="primary" size="sm" onClick={onTalkToSales}>
          Talk to Sales
        </Button>
      </div>
    </header>
  );
}
