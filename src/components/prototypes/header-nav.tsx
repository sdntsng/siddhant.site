"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { useTerminal } from "@/context/terminal";
import { DATA } from "@/data/resume";
import { Terminal } from "lucide-react";

export function HeaderNav() {
  const { toggleMode } = useTerminal();

  return (
    <header className="flex items-center justify-between pb-8 mb-8 border-b border-border/40 text-sm">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-medium tracking-tight text-foreground hover:text-foreground/80 lowercase"
        >
          {DATA.name.toLowerCase()}
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <nav className="flex items-center gap-4 text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors lowercase">
            home
          </Link>
          <Link href="/blog" className="hover:text-foreground transition-colors lowercase">
            blog
          </Link>
          <Link
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            className="hover:text-foreground transition-colors lowercase hidden sm:inline"
          >
            github
          </Link>
          <Link
            href={DATA.contact.social.X.url}
            target="_blank"
            className="hover:text-foreground transition-colors lowercase hidden sm:inline"
          >
            x
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-1 text-muted-foreground">
        <button
          onClick={toggleMode}
          title="Terminal mode (Cmd+K)"
          className="p-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors"
          type="button"
        >
          <Terminal className="size-4" />
        </button>
        <ModeToggle />
      </div>
    </header>
  );
}
