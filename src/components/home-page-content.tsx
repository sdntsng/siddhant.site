"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { HeroIdentity } from "@/components/prototypes/hero-identity";
import { ProjectsCarousel } from "@/components/prototypes/projects-carousel";
import { RecentBlogList } from "@/components/prototypes/recent-blog-list";
import { CompactPlacesAndEducation } from "@/components/prototypes/compact-places-and-education";

export default function HomePageContent({ posts }: { posts: any[] }) {
  return (
    <div className="space-y-10">
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

      {/* Places Worked & Education (Interactive on-hover/click details + IPM) */}
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
    </div>
  );
}
