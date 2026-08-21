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
import { EmbeddedMenuBar, EmbeddedBottomDock } from "./embedded-menu-bar";

/**
 * Direction 4: Immersive Card Deck
 * Encloses the portfolio inside a tactile, embedded frame with an inset navigation tray.
 * Features the projects carousel right at the top, followed by thinking, background, and embedded dock.
 */
export function VariantImmersive({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12 px-3 sm:px-6 min-h-screen">
      {/* Immersive Canvas Container */}
      <div className="rounded-3xl border border-border/80 bg-background/95 shadow-xl p-6 sm:p-10 space-y-12 backdrop-blur-md">
        {/* Inset Top Control Bar */}
        <EmbeddedMenuBar />

        {/* Identity & Mission */}
        <section id="hero">
          <HeroIdentity />
        </section>

        {/* 1. Featured Projects Carousel */}
        <section id="projects" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              01 / featured projects
            </h2>
            <span className="text-xs font-mono text-muted-foreground/60">
              {DATA.projects.length} builds
            </span>
          </div>
          <ProjectsCarousel projects={DATA.projects} />
        </section>

        {/* 2. Writing & Ideas */}
        <section id="writing" className="space-y-4 pt-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              02 / recent writing
            </h2>
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors lowercase underline"
            >
              all essays →
            </Link>
          </div>
          <RecentBlogList posts={posts} showSummary limit={4} />
        </section>

        {/* 3. About & Summary */}
        <section id="about" className="space-y-3 pt-4 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            03 / about
          </h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-foreground/80 dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
        </section>

        {/* 4. Compact Places Worked & Education */}
        <section id="background">
          <CompactPlacesAndEducation />
        </section>

        {/* 5. Commit Activity */}
        <section id="activity" className="space-y-3 pt-6 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            05 / commit graph
          </h2>
          <GithubActivity />
        </section>

        {/* 6. Contact & Reach Out */}
        <section id="contact" className="space-y-3 pt-6 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            06 / get in touch
          </h2>
          <ContactSection />
        </section>

        {/* Inset Bottom Tray */}
        <EmbeddedBottomDock />
      </div>
    </div>
  );
}
