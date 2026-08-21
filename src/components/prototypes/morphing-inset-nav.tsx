"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { useTerminal } from "@/context/terminal";
import { DATA } from "@/data/resume";
import { Terminal, Mail, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Header Inset Menu:
 * Clean, lightweight navigation (home / blog / terminal / theme).
 * Intentionally uncluttered with NO social icons at the top.
 */
export function HeaderInsetMenu() {
  const { toggleMode } = useTerminal();

  return (
    <div className="flex items-center justify-between p-1.5 rounded-2xl bg-muted/40 border border-border/70 shadow-inner backdrop-blur-sm">
      <div className="flex items-center gap-1">
        <Link
          href="/"
          className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-foreground hover:bg-background/80 hover:shadow-2xs transition-all lowercase"
        >
          home
        </Link>
        <Link
          href="/blog"
          className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-2xs transition-all lowercase"
        >
          blog
        </Link>
      </div>

      <div className="flex items-center gap-1 bg-background/60 p-0.5 rounded-xl border border-border/40 shadow-2xs">
        <button
          onClick={toggleMode}
          title="Terminal (Cmd+K)"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
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
}

/**
 * Mid-Scroll Floating Inset Tile:
 * Sleek, tactile floating dock with navigation + social channels + utilities.
 */
export function FloatingInsetMenu() {
  const { toggleMode } = useTerminal();

  return (
    <div className="flex items-center justify-between p-1.5 rounded-2xl bg-background/90 dark:bg-zinc-900/90 border border-border/90 shadow-2xl backdrop-blur-xl ring-1 ring-border/20">
      {/* Primary Links */}
      <div className="flex items-center gap-1">
        <Link
          href="/"
          className="px-3 py-1.5 rounded-xl text-xs font-medium text-foreground hover:bg-muted/80 transition-all lowercase"
        >
          home
        </Link>
        <Link
          href="/blog"
          className="px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all lowercase"
        >
          blog
        </Link>

        <div className="h-4 w-px bg-border/60 mx-1" />

        {/* Social Icons that reveal on scroll */}
        <Link
          href={DATA.contact.social.GitHub.url}
          target="_blank"
          className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
          title="GitHub"
        >
          <DATA.contact.social.GitHub.icon className="size-3.5" />
        </Link>
        <Link
          href={DATA.contact.social.X.url}
          target="_blank"
          className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
          title="X (Twitter)"
        >
          <DATA.contact.social.X.icon className="size-3.5" />
        </Link>
        <Link
          href={DATA.contact.social.LinkedIn.url}
          target="_blank"
          className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
          title="LinkedIn"
        >
          <DATA.contact.social.LinkedIn.icon className="size-3.5" />
        </Link>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-1 pl-1 border-l border-border/40">
        <button
          onClick={toggleMode}
          title="Terminal (Cmd+K)"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
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
}

/**
 * 2-Line Expanded Inset Footer Dock:
 * Fattened, sleek 2-row layout providing rich navigation, all social presences,
 * direct action buttons (Email, Meet, WhatsApp, Resume), and system controls.
 */
export function ExpandedFooterDock() {
  const { toggleMode } = useTerminal();

  return (
    <div className="w-full p-4 rounded-3xl bg-muted/30 border border-border/70 shadow-inner space-y-3 backdrop-blur-sm">
      {/* Top Line: Navigation & Direct Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/40">
        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-foreground bg-background/80 border border-border/50 shadow-2xs hover:bg-background transition-all lowercase"
          >
            home
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all lowercase"
          >
            blog
          </Link>
          <Link
            href="/meet"
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all lowercase flex items-center gap-1"
          >
            <Calendar className="size-3" />
            <span>book a session</span>
          </Link>
        </div>

        {/* Action button */}
        <a
          href={`mailto:${DATA.contact.email}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-foreground bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-all lowercase font-mono"
        >
          <Mail className="size-3" />
          <span>{DATA.contact.email}</span>
        </a>
      </div>

      {/* Bottom Line: Rich Social Icon Grid + Terminal/Theme */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background/80 border border-transparent hover:border-border/60 transition-all shadow-2xs"
            title="GitHub"
          >
            <DATA.contact.social.GitHub.icon className="size-4" />
          </Link>
          <Link
            href={DATA.contact.social.X.url}
            target="_blank"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background/80 border border-transparent hover:border-border/60 transition-all shadow-2xs"
            title="X (Twitter)"
          >
            <DATA.contact.social.X.icon className="size-4" />
          </Link>
          <Link
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background/80 border border-transparent hover:border-border/60 transition-all shadow-2xs"
            title="LinkedIn"
          >
            <DATA.contact.social.LinkedIn.icon className="size-4" />
          </Link>
          <Link
            href={DATA.contact.social.Instagram.url}
            target="_blank"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background/80 border border-transparent hover:border-border/60 transition-all shadow-2xs"
            title="Instagram"
          >
            <DATA.contact.social.Instagram.icon className="size-4" />
          </Link>
          <Link
            href={DATA.contact.social.WhatsApp.url}
            target="_blank"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background/80 border border-transparent hover:border-border/60 transition-all shadow-2xs"
            title="WhatsApp"
          >
            <DATA.contact.social.WhatsApp.icon className="size-4" />
          </Link>
          <Link
            href="/resume"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background/80 border border-transparent hover:border-border/60 transition-all shadow-2xs"
            title="Resume"
          >
            <DATA.contact.social.Resume.icon className="size-4" />
          </Link>
        </div>

        <div className="flex items-center gap-1.5 bg-background/80 p-1 rounded-xl border border-border/60 shadow-2xs shrink-0">
          <button
            onClick={toggleMode}
            title="Terminal Mode (Cmd+K)"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            type="button"
          >
            <Terminal className="size-3.5" />
          </button>
          <div className="scale-85 origin-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3-State Master Navigation Controller
 * Tracks window scroll position and smoothly transitions across the 3 states:
 *   1. 'top' -> Embeds HeaderInsetMenu (No social icons)
 *   2. 'floating' -> Renders FloatingInsetMenu with liquid physics
 *   3. 'bottom' -> Integrates with ExpandedFooterDock
 */
export function MorphingInsetNav() {
  const [scrollState, setScrollState] = useState<"top" | "floating" | "bottom">("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - (scrollY + windowHeight);

      if (scrollY < 60) {
        setScrollState("top");
      } else if (distanceFromBottom < 180) {
        setScrollState("bottom");
      } else {
        setScrollState("floating");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Top Header State (Fades smoothly if scrolled) */}
      <div className="w-full">
        <motion.div
          animate={{
            opacity: scrollState === "top" ? 1 : 0.15,
            scale: scrollState === "top" ? 1 : 0.98,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <HeaderInsetMenu />
        </motion.div>
      </div>

      {/* 2. Mid-Scroll Floating Inset Tile */}
      <AnimatePresence>
        {scrollState === "floating" && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 24,
              mass: 0.5,
            }}
            className="fixed bottom-6 inset-x-0 mx-auto z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md">
              <FloatingInsetMenu />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Footer Inset Dock Container
 * Smoothly activates when the user scrolls near the bottom.
 */
export function FooterInsetDock() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - (scrollY + windowHeight);

      setIsAtBottom(distanceFromBottom < 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full pt-4">
      <motion.div
        animate={{
          opacity: isAtBottom ? 1 : 0.45,
          scale: isAtBottom ? 1 : 0.98,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ExpandedFooterDock />
      </motion.div>
    </div>
  );
}
