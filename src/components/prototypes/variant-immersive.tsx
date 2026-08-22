"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { HeroIdentity } from "./hero-identity";
import { ProjectsCarousel } from "./projects-carousel";
import { RecentBlogList } from "./recent-blog-list";
import { CompactPlacesAndEducation } from "./compact-places-and-education";
import { HeaderInsetMenu, FloatingInsetMenu, ExpandedFooterDock } from "./morphing-inset-nav";

/**
 * 2. Immersive Card Deck (Clutter-Free, Pure Tactile Design)
 * - Clean aligned vertical rhythm & grid padding
 * - Floating menu always rendered fixed at bottom-6 when scrolled
 */
export function VariantImmersive({ posts }: { posts: any[] }) {
  return (
    <div className="relative max-w-3xl mx-auto py-4 sm:py-8 px-3 sm:px-6 min-h-screen">
      {/* Mid-Scroll Floating Inset Menu (Fixed at viewport bottom when scrolled past header) */}
      <FloatingInsetMenu />

      {/* Immersive Canvas Container */}
      <div className="rounded-3xl border border-border/70 bg-card/70 shadow-xl p-5 sm:p-8 space-y-10 backdrop-blur-md">
        {/* Inset Header Menu */}
        <section id="nav-header">
          <HeaderInsetMenu />
        </section>

        {/* Hero Identity */}
        <section id="hero">
          <HeroIdentity />
        </section>

        {/* About / Summary */}
        <section id="about" className="space-y-3 pt-2 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            about
          </h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-[15px] text-foreground/90 dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
        </section>

        {/* Projects I'm Lately Working On (Carousel with Title + Arrows in single row) */}
        <section id="projects" className="pt-2 border-t border-border/40">
          <ProjectsCarousel
            projects={DATA.projects}
            title="projects i'm lately working on"
          />
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

        {/* Places Worked & Education */}
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

        {/* Expanded 2-Line Footer Dock */}
        <section id="nav-footer" className="pt-4 border-t border-border/40">
          <ExpandedFooterDock />
        </section>
      </div>
    </div>
  );
}
