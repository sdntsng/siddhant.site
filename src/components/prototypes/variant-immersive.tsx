"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { HeroIdentity } from "./hero-identity";
import { ProjectsCarousel } from "./projects-carousel";
import { RecentBlogList } from "./recent-blog-list";
import { CompactPlacesAndEducation } from "./compact-places-and-education";
import { ContactSection } from "./contact-section";
import { LiquidNavPill } from "./liquid-nav-pill";

/**
 * 2. Immersive Card Deck (Refined & Evolved)
 * - Profile avatar placed cleanly next to name on all screen sizes.
 * - Liquid Nav Pill: starts nestled in header, seamlessly morphs into floating bottom pill upon scroll.
 * - Sequence: Hero -> About -> Projects I'm lately working on (Carousel) -> Recent Thoughts -> Places worked / Education -> Activity -> Contact.
 * - Crisp typography, authentic blog styling, zero template clutter.
 */
export function VariantImmersive({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-10 px-3 sm:px-6 min-h-screen">
      {/* Morphing Liquid Nav Pill (starts at top, floats to bottom upon scroll) */}
      <LiquidNavPill />

      {/* Immersive Canvas Container */}
      <div className="rounded-3xl border border-border/70 bg-card/70 shadow-xl p-5 sm:p-10 space-y-12 backdrop-blur-md mt-3">
        {/* Hero Identity (Profile picture next to name on all screens) */}
        <section id="hero">
          <HeroIdentity />
        </section>

        {/* 1. About / Summary (Moved above Projects) */}
        <section id="about" className="space-y-3.5 pt-2 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            01 / about
          </h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-[15px] text-foreground/90 dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {DATA.Interests.map((interest) => (
              <span
                key={interest}
                className="text-[11px] text-muted-foreground/80 bg-muted/60 border border-border/40 px-2 py-0.5 rounded-md font-mono"
              >
                #{interest}
              </span>
            ))}
          </div>
        </section>

        {/* 2. Projects I'm Lately Working On (Left-to-Right Carousel) */}
        <section id="projects" className="space-y-3 pt-2 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              02 / projects i&apos;m lately working on
            </h2>
            <span className="text-[11px] font-mono text-muted-foreground/60">
              {DATA.projects.length} builds
            </span>
          </div>
          <ProjectsCarousel projects={DATA.projects} />
        </section>

        {/* 3. Recent Writing & Thoughts */}
        <section id="writing" className="space-y-4 pt-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              03 / recent thoughts &amp; writing
            </h2>
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors lowercase underline underline-offset-2"
            >
              all essays →
            </Link>
          </div>
          <RecentBlogList posts={posts} showSummary limit={4} />
        </section>

        {/* 4. Places Worked & Education (De-emphasized compact ledger) */}
        <section id="background">
          <CompactPlacesAndEducation />
        </section>

        {/* 5. Commit Activity */}
        <section id="activity" className="space-y-3 pt-6 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              05 / activity
            </h2>
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors lowercase underline"
            >
              github
            </Link>
          </div>
          <GithubActivity />
        </section>

        {/* 6. Contact & Reach Out */}
        <section id="contact" className="space-y-3 pt-6 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            06 / connect
          </h2>
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
