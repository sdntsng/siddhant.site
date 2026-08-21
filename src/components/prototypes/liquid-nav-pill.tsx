"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { useTerminal } from "@/context/terminal";
import { DATA } from "@/data/resume";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Liquid Navigation Pill
 * - Starts nestled inside the header container as a tactile embedded pill.
 * - On first scroll down (> 60px), smoothly lifts, transitions through liquid spring physics,
 *   and becomes a floating pill at the bottom center of the viewport.
 * - Seamlessly glides back up if the user returns to the top.
 */
export function LiquidNavPill() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleMode } = useTerminal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pillContent = (
    <div className="flex items-center justify-between gap-2 p-1.5 rounded-full bg-background/80 dark:bg-zinc-900/80 border border-border/80 shadow-md backdrop-blur-xl">
      <div className="flex items-center gap-1">
        {DATA.navbar.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all lowercase"
          >
            <item.icon className="size-3.5" />
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="h-4 w-px bg-border/60 mx-1" />

        <Link
          href={DATA.contact.social.GitHub.url}
          target="_blank"
          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all"
          title="GitHub"
        >
          <DATA.contact.social.GitHub.icon className="size-3.5" />
        </Link>
        <Link
          href={DATA.contact.social.X.url}
          target="_blank"
          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all"
          title="X"
        >
          <DATA.contact.social.X.icon className="size-3.5" />
        </Link>
        <Link
          href={DATA.contact.social.LinkedIn.url}
          target="_blank"
          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all hidden sm:inline-flex"
          title="LinkedIn"
        >
          <DATA.contact.social.LinkedIn.icon className="size-3.5" />
        </Link>
      </div>

      <div className="flex items-center gap-1 pl-1 border-l border-border/40">
        <button
          onClick={toggleMode}
          title="Terminal mode (Cmd+K)"
          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          type="button"
        >
          <Terminal className="size-3.5" />
        </button>
        <div className="scale-85 origin-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Header Placement (When not scrolled) */}
      <div className="w-full flex justify-center pb-2">
        <motion.div
          animate={{
            opacity: isScrolled ? 0 : 1,
            scale: isScrolled ? 0.95 : 1,
            pointerEvents: isScrolled ? "none" : "auto",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {pillContent}
        </motion.div>
      </div>

      {/* 2. Floating Bottom Pill (Seamlessly activated on scroll with liquid spring motion) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
              mass: 0.6,
            }}
            className="fixed bottom-6 inset-x-0 mx-auto z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto max-w-md shadow-2xl rounded-full">
              {pillContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
