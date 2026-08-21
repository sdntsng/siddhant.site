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
import { EmbeddedMenuBar } from "./embedded-menu-bar";

/**
 * Direction 3: Flow (Projects First + Left-to-Right Carousel + Inset Menu)
 * - Move everything upwards and start with featured projects right below identity
 * - Interactive left-to-right magnetic project carousel with video/gif hover cards
 * - Recent thoughts & essays in the spotlight
 * - Reduced prominence for work & education (compact ledger at bottom)
 * - Embedded inset card navigation rather than a floating screen dock
 */
export function VariantFlow({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-14 px-4 sm:px-6 min-h-screen text-foreground font-sans space-y-12">
      {/* Inset Embedded Header Menu */}
      <EmbeddedMenuBar />

      <main className="space-y-12">
        {/* Hero Identity */}
        <section id="hero">
          <HeroIdentity />
        </section>

        {/* 1. Featured Projects Carousel (Moved Upwards) */}
        <section id="projects" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-foreground lowercase flex items-center gap-2">
              featured projects
              <span className="text-[11px] font-mono font-normal text-muted-foreground bg-muted px-1.5 py-0.2 rounded-full">
                {DATA.projects.length}
              </span>
            </h2>
          </div>
          <ProjectsCarousel projects={DATA.projects} />
        </section>

        {/* 2. About / Thesis */}
        <section id="about" className="space-y-3 pt-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground lowercase">
            about
          </h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-foreground/80 dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {DATA.Interests.map((interest) => (
              <span
                key={interest}
                className="text-xs text-muted-foreground bg-muted/40 border border-border/40 px-2 py-0.5 rounded-md font-mono"
              >
                #{interest}
              </span>
            ))}
          </div>
        </section>

        {/* 3. Recent Thoughts & Writing */}
        <section id="posts" className="space-y-4 pt-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-foreground lowercase">
              recent thoughts
            </h2>
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors lowercase underline underline-offset-2"
            >
              view all posts →
            </Link>
          </div>
          <RecentBlogList posts={posts} showSummary limit={4} />
        </section>

        {/* 4. Compact Places Worked & Education (De-emphasized, concise) */}
        <section id="background">
          <CompactPlacesAndEducation />
        </section>

        {/* 5. Activity & Code */}
        <section id="code" className="space-y-4 pt-6 border-t border-border/40">
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

        {/* 6. Contact & Links */}
        <section id="contact" className="space-y-3 pt-6 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            contact
          </h2>
          <ContactSection />
        </section>
      </main>
    </div>
  );
}
