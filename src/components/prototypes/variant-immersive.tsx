"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { HeroIdentity } from "./hero-identity";
import { ProjectsCarousel } from "./projects-carousel";
import { RecentBlogList } from "./recent-blog-list";
import { CompactPlacesAndEducation } from "./compact-places-and-education";
import { MorphingInsetNav, FooterInsetDock } from "./morphing-inset-nav";

/**
 * 2. Immersive Card Deck (Clutter-Free, Pure Tactile Design)
 * - Section titles without numbers or noise: `about`, `projects i'm lately working on`, `recent thoughts`, etc.
 * - No hashtags under About.
 * - No arrow / count subtitle clutter above carousel.
 * - Sleek work/education ledger with company & college logos, IIM Indore listed once.
 * - 3-State Morphing Inset Menu:
 *     1. Header: clean, minimal nav (no social icons).
 *     2. On Scroll: lifts into a floating inset tile (social icons revealed).
 *     3. At Bottom: smoothly merges into the 2-line expanded footer dock with rich icon palette & direct actions.
 */
export function VariantImmersive({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-10 px-3 sm:px-6 min-h-screen">
      {/* Immersive Canvas Container */}
      <div className="rounded-3xl border border-border/70 bg-card/70 shadow-xl p-5 sm:p-10 space-y-12 backdrop-blur-md">
        {/* Inset Morphing Header Menu */}
        <section id="nav-header">
          <MorphingInsetNav />
        </section>

        {/* Hero Identity (Profile picture next to name on all screens) */}
        <section id="hero">
          <HeroIdentity />
        </section>

        {/* About / Summary (Clean, no hashtags, no section numbering) */}
        <section id="about" className="space-y-3 pt-2 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            about
          </h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-[15px] text-foreground/90 dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
        </section>

        {/* Projects I'm Lately Working On (Left-to-Right Carousel, no clutter copy) */}
        <section id="projects" className="space-y-3 pt-2 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              projects i&apos;m lately working on
            </h2>
          </div>
          <ProjectsCarousel projects={DATA.projects} />
        </section>

        {/* Recent Thoughts & Writing */}
        <section id="writing" className="space-y-4 pt-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              recent thoughts &amp; writing
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

        {/* Places Worked & Education (Sleek logo grid, IIM Indore once) */}
        <section id="background">
          <CompactPlacesAndEducation />
        </section>

        {/* Commit Activity */}
        <section id="activity" className="space-y-3 pt-6 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              activity
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

        {/* Expanded 2-Line Footer Dock (Seamless final docking position with rich actions) */}
        <section id="nav-footer" className="pt-4 border-t border-border/40">
          <FooterInsetDock />
        </section>
      </div>
    </div>
  );
}
