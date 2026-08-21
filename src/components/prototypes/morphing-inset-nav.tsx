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
 * Shared Inset Menu Bar Content
 * Uses the tactile, recessed OS/hardware style with inset pill buttons,
 * inner shadow, and subtle borders.
 */
export function InsetNavContent({
  isFloating = false,
}: {
  isFloating?: boolean;
}) {
  const { toggleMode } = useTerminal();

  return (
    <div
      className={cn(
        "flex items-center justify-between p-1.5 rounded-2xl transition-all duration-300",
        isFloating
          ? "bg-background/90 dark:bg-zinc-900/90 border border-border/90 shadow-2xl backdrop-blur-xl ring-1 ring-border/20"
          : "bg-muted/40 border border-border/70 shadow-inner backdrop-blur-sm"
      )}
    >
      <div className="flex items-center gap-1">
        <Link
          href="/"
          className="px-3 py-1.5 rounded-xl text-xs font-medium text-foreground hover:bg-background/80 hover:shadow-xs transition-all lowercase"
        >
          home
        </Link>
        <Link
          href="/blog"
          className="px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs transition-all lowercase"
        >
          blog
        </Link>
        <div className="h-4 w-px bg-border/60 mx-1 hidden sm:block" />
        <Link
          href={DATA.contact.social.GitHub.url}
          target="_blank"
          className="px-2.5 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs transition-all lowercase hidden sm:inline"
        >
          github
        </Link>
        <Link
          href={DATA.contact.social.X.url}
          target="_blank"
          className="px-2.5 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs transition-all lowercase hidden sm:inline"
        >
          x
        </Link>
        <Link
          href={DATA.contact.social.LinkedIn.url}
          target="_blank"
          className="px-2.5 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs transition-all lowercase hidden md:inline"
        >
          linkedin
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
 * 3-State Morphing Inset Menu Bar:
 * 1. At Top: Sits embedded inside the header of the card container.
 * 2. On Scroll: Seamlessly lifts into a floating inset tile near the bottom of viewport.
 * 3. At Bottom (last scroll / reached footer): Seamlessly docks into the card footer container.
 */
export function MorphingInsetNav() {
  const [scrollState, setScrollState] = useState<"top" | "floating" | "bottom">("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - (scrollY + windowHeight);

      if (scrollY < 80) {
        setScrollState("top");
      } else if (distanceFromBottom < 120) {
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
      {/* 1. Header Position (Embedded in canvas) */}
      <div className="w-full">
        <motion.div
          animate={{
            opacity: scrollState === "top" ? 1 : 0.2,
            scale: scrollState === "top" ? 1 : 0.98,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <InsetNavContent isFloating={false} />
        </motion.div>
      </div>

      {/* 2. Floating Tile in Mid-Scroll */}
      <AnimatePresence>
        {scrollState === "floating" && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.5,
            }}
            className="fixed bottom-6 inset-x-0 mx-auto z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-xl">
              <InsetNavContent isFloating={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Footer Inset Dock Container
 * Highlights when the user reaches the bottom and the navigation docks into place.
 */
export function FooterInsetDock() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - (scrollY + windowHeight);

      setIsAtBottom(distanceFromBottom < 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full pt-4">
      <motion.div
        animate={{
          opacity: isAtBottom ? 1 : 0.4,
          scale: isAtBottom ? 1 : 0.98,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <InsetNavContent isFloating={false} />
      </motion.div>
    </div>
  );
}
