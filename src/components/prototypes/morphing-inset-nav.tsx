"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";
import { Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Header Inset Menu:
 * Clean, lightweight navigation (home / blog / theme).
 * Intentionally uncluttered with NO social icons in the top header and NO terminal/CLI button.
 */
export function HeaderInsetMenu() {
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

      <div className="flex items-center gap-1 bg-background/60 p-0.5 rounded-xl border border-border/40 shadow-2xs scale-90 origin-right">
        <ModeToggle />
      </div>
    </div>
  );
}

/**
 * Mid-Scroll Floating Inset Tile:
 * Sleek, tactile floating dock with navigation + social channels (GitHub, X, LinkedIn) + theme toggle.
 * No CLI/terminal button.
 */
export function FloatingInsetMenu() {
  return (
    <div className="flex items-center justify-between p-1.5 rounded-2xl bg-background/95 dark:bg-zinc-900/95 border border-border/90 shadow-2xl backdrop-blur-xl ring-1 ring-border/20">
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

      {/* Theme toggle */}
      <div className="flex items-center gap-1 pl-1 border-l border-border/40 scale-90 origin-center">
        <ModeToggle />
      </div>
    </div>
  );
}

/**
 * 2-Line Expanded Inset Footer Dock:
 * Clean 2-row layout providing quick navigation, calendar session action, direct email,
 * and social channels (GitHub, X, LinkedIn, Instagram).
 * WhatsApp, Resume, and Terminal/CLI removed.
 */
export function ExpandedFooterDock() {
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

      {/* Bottom Line: Social Icon Palette + Theme */}
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
        </div>

        <div className="flex items-center gap-1.5 bg-background/80 p-1 rounded-xl border border-border/60 shadow-2xs shrink-0 scale-90 origin-right">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

/**
 * 3-State Master Navigation Controller
 * Reliable pure CSS + scroll position state:
 *   1. Header state: visible at top
 *   2. Floating mid-scroll state: guaranteed fixed bottom-6 overlay
 */
export function MorphingInsetNav() {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const windowHeight = window.innerHeight || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const distanceFromBottom = docHeight - (scrollY + windowHeight);

      // Show floating tile when scrolled down past header (> 50px)
      // and not right at the very bottom dock (< 70px)
      if (scrollY > 50 && distanceFromBottom > 70) {
        setShowFloating(true);
      } else {
        setShowFloating(false);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <>
      {/* 1. Header Position (Embedded at top of card) */}
      <div className="w-full">
        <HeaderInsetMenu />
      </div>

      {/* 2. Floating Inset Menu in Mid-Scroll */}
      <div
        className={cn(
          "fixed bottom-6 inset-x-0 mx-auto z-[100] flex justify-center px-4 transition-all duration-300 ease-out",
          showFloating
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="w-full max-w-md">
          <FloatingInsetMenu />
        </div>
      </div>
    </>
  );
}

/**
 * Footer Inset Dock Container
 */
export function FooterInsetDock() {
  return (
    <div className="w-full pt-4">
      <ExpandedFooterDock />
    </div>
  );
}
