"use client";

import Link from "next/link";
import { HeaderNav } from "./header-nav";

export function PrototypeHub() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 min-h-screen text-foreground font-sans">
      <HeaderNav />

      <main className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-medium tracking-tight lowercase">
            homepage design directions
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Exploring alternative structures, horizontal project carousels, and embedded/inset menus while keeping your authentic Inter/sans typography and magnetic hover cards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Link
            href="/prototype/flow"
            className="group block p-5 rounded-2xl border border-border hover:border-foreground/40 bg-muted/20 hover:bg-muted/40 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium tracking-tight lowercase group-hover:underline">
                1. Projects-First Flow (`/prototype/flow`)
              </h2>
              <span className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                New Structure + Carousel
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Moves featured projects right below the hero with an interactive left-to-right magnetic carousel, highlights recent blog posts, reduces work &amp; education into a compact ledger, and features an embedded inset menu.
            </p>
          </Link>

          <Link
            href="/prototype/immersive"
            className="group block p-5 rounded-2xl border border-border hover:border-foreground/40 bg-muted/20 hover:bg-muted/40 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium tracking-tight lowercase group-hover:underline">
                2. Immersive Card Deck (`/prototype/immersive`)
              </h2>
              <span className="text-xs font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                Inset Frame + Tray Menu
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Encloses the page inside a tactile framed surface with an inset control bar at the top, horizontal project carousel, and embedded bottom dock that feels integrated into the screen.
            </p>
          </Link>

          <Link
            href="/prototype/ledger"
            className="group block p-5 rounded-2xl border border-border/70 hover:border-foreground/40 bg-muted/10 hover:bg-muted/30 transition-all space-y-2 opacity-80"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium tracking-tight lowercase group-hover:underline">
                3. Minimalist Ledger (`/prototype/ledger`)
              </h2>
              <span className="text-xs font-mono bg-background border px-2 py-0.5 rounded">
                Earlier
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Previous single-column ledger variation with quiet vertical lines.
            </p>
          </Link>

          <Link
            href="/prototype/synthesis"
            className="group block p-5 rounded-2xl border border-border/70 hover:border-foreground/40 bg-muted/10 hover:bg-muted/30 transition-all space-y-2 opacity-80"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium tracking-tight lowercase group-hover:underline">
                4. Synthesis Matrix (`/prototype/synthesis`)
              </h2>
              <span className="text-xs font-mono bg-background border px-2 py-0.5 rounded">
                Earlier
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Previous two-column split layout pairing software ventures with writing.
            </p>
          </Link>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-background text-xs text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">What to compare:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Horizontal project carousel with video/gif hover vs vertical grid.</li>
            <li>Compact work &amp; education lines vs large accordion cards.</li>
            <li>Embedded/inset menu bar vs floating bottom dock.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
