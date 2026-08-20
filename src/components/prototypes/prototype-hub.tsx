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
            Built using your existing <strong>Inter / sans typography</strong>, lowercase aesthetic, and blog visual DNA — stripping out generic template tropes (staggered BlurFade, bottom dock, nested resume accordions).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Link
            href="/prototype/ledger"
            className="group block p-5 rounded-xl border border-border hover:border-foreground/40 bg-muted/20 hover:bg-muted/40 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium tracking-tight lowercase group-hover:underline">
                1. Minimalist Ledger (`/prototype/ledger`)
              </h2>
              <span className="text-xs font-mono bg-background border px-2 py-0.5 rounded">
                Element Redesign
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Maintains your single-column narrative flow while replacing template widgets with clean ledger lines for work, unboxed card tiles for projects, and authentic blog typography for writing.
            </p>
          </Link>

          <Link
            href="/prototype/synthesis"
            className="group block p-5 rounded-xl border border-border hover:border-foreground/40 bg-muted/20 hover:bg-muted/40 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium tracking-tight lowercase group-hover:underline">
                2. Synthesis Matrix (`/prototype/synthesis`)
              </h2>
              <span className="text-xs font-mono bg-background border px-2 py-0.5 rounded">
                Structural Redesign
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Rethinks the layout into an editorial matrix: pairs what you build (Vinci, Artimech, Open Mool) side-by-side with what you write (essays/analyses), followed by track record and live activity.
            </p>
          </Link>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-background text-xs text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">How to review:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Open each prototype in a tab next to the live homepage at <code>/</code>.</li>
            <li>Note how fast and quiet the interactions feel without BlurFade delays.</li>
            <li>Mix and match pieces: e.g. {`"Ledger's work rows with Synthesis's split grid layout."`}</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
