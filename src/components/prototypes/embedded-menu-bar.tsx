"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { useTerminal } from "@/context/terminal";
import { DATA } from "@/data/resume";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Inset MenuBar (Embedded into the page card/canvas rather than a floating bottom bubble)
 * Gives a tactile, recessed, integrated hardware/OS feel.
 */
export function EmbeddedMenuBar({ className }: { className?: string }) {
  const { toggleMode } = useTerminal();

  return (
    <div
      className={cn(
        "flex items-center justify-between p-1.5 rounded-2xl bg-muted/40 border border-border/70 shadow-inner backdrop-blur-sm",
        className
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
 * Inset Bottom Bar (Embedded at bottom of content stream instead of screen viewport overlay)
 */
export function EmbeddedBottomDock() {
  const { toggleMode } = useTerminal();

  return (
    <div className="w-full pt-8 pb-4">
      <div className="max-w-md mx-auto p-1.5 rounded-2xl bg-muted/50 border border-border/80 shadow-inner flex items-center justify-between">
        <div className="flex items-center gap-1">
          {DATA.navbar.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background shadow-xs hover:shadow-sm transition-all lowercase"
            >
              <item.icon className="size-3.5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="h-4 w-px bg-border/60 mx-1" />
          <Link
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background shadow-xs hover:shadow-sm transition-all"
            title="GitHub"
          >
            <DATA.contact.social.GitHub.icon className="size-3.5" />
          </Link>
          <Link
            href={DATA.contact.social.X.url}
            target="_blank"
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background shadow-xs hover:shadow-sm transition-all"
            title="X"
          >
            <DATA.contact.social.X.icon className="size-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMode}
            title="Terminal mode (Cmd+K)"
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
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
