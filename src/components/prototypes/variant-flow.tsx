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

export function VariantFlow({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-10 px-4 sm:px-6 min-h-screen text-foreground font-sans space-y-12">
      {/* Morphing Liquid Nav Pill */}
      <LiquidNavPill />

      <main className="space-y-12">
        {/* Hero Identity */}
        <section id="hero">
          <HeroIdentity />
        </section>

        {/* 1. About / Thesis (Moved above Projects) */}
        <section id="about" className="space-y-3 pt-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground lowercase">
            about
          </h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-foreground/80 dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
        </section>

        {/* 2. Projects I'm lately working on (Carousel with single row header) */}
        <section id="projects" className="pt-2 border-t border-border/40">
          <ProjectsCarousel
            projects={DATA.projects}
            title="projects i'm lately working on"
          />
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

        {/* 4. Compact Places Worked & Education */}
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
