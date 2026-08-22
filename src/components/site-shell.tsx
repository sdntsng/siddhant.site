"use client";

import React, { useRef } from "react";
import { HeaderInsetMenu, FloatingInsetMenu, ExpandedFooterDock } from "@/components/prototypes/morphing-inset-nav";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative max-w-3xl mx-auto py-4 sm:py-8 px-3 sm:px-6 min-h-screen">
      {/* Mid-Scroll Floating Inset Menu (Fixed at viewport bottom when scrolled past header, hides near footer) */}
      <FloatingInsetMenu footerRef={footerRef} />

      {/* Immersive Canvas Container */}
      <div className="rounded-3xl border border-border/70 bg-card/70 shadow-xl p-5 sm:p-8 space-y-10 backdrop-blur-md">
        {/* Inset Header Menu */}
        <section id="nav-header">
          <HeaderInsetMenu />
        </section>

        {/* Page Content Stream */}
        <div className="min-h-[50vh]">
          {children}
        </div>

        {/* Expanded 2-Line Footer Dock */}
        <section id="nav-footer" className="pt-4 border-t border-border/40">
          <ExpandedFooterDock footerRef={footerRef} />
        </section>
      </div>
    </div>
  );
}
