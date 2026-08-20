"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { HeaderNav } from "./header-nav";
import { HeroIdentity } from "./hero-identity";
import { WorkLedger } from "./work-ledger";
import { ProjectStream } from "./project-stream";
import { RecentBlogList } from "./recent-blog-list";
import { ContactSection } from "./contact-section";

/**
 * Direction 1: Minimalist Ledger
 * Focuses on pure, unadorned typography aligned with the /blog layout.
 * Removes heavy BlurFade animations and dock, replacing them with clean semantic blocks.
 */
export function VariantLedger({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-16 px-6 min-h-screen text-foreground font-sans">
      <HeaderNav />

      <main className="space-y-12">
        <section id="hero">
          <HeroIdentity />
        </section>

        <section id="about" className="space-y-3">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">
            about
          </h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-foreground/80 dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </section>

        <section id="work" className="space-y-4">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">
            work & ventures
          </h2>
          <WorkLedger />
        </section>

        <section id="projects" className="space-y-4">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">
            selected builds
          </h2>
          <ProjectStream />
        </section>

        <section id="writing" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">
              recent thoughts
            </h2>
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors lowercase underline"
            >
              all posts
            </Link>
          </div>
          <RecentBlogList posts={posts} showSummary limit={4} />
        </section>

        <section id="code" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">
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

        <section id="contact" className="space-y-4 pt-4 border-t border-border/40">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">
            connect
          </h2>
          <ContactSection />
        </section>
      </main>
    </div>
  );
}
