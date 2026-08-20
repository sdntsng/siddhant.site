"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { HeaderNav } from "./header-nav";
import { HeroIdentity } from "./hero-identity";
import { RecentBlogList } from "./recent-blog-list";
import { ContactSection } from "./contact-section";
import { ArrowUpRight, Github } from "lucide-react";

/**
 * Direction 2: Synthesis / Two-Column Hybrid
 * Puts active software ventures alongside deep-dive thinking front and center.
 * Eliminates the template feel by pairing building with writing in an editorial grid.
 */
export function VariantSynthesis({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-16 px-6 min-h-screen text-foreground font-sans">
      <HeaderNav />

      <main className="space-y-14">
        <section id="hero">
          <HeroIdentity />
        </section>

        {/* Bio / Summary & Interests */}
        <section id="about" className="space-y-4">
          <Markdown className="prose max-w-full text-pretty font-sans text-base text-foreground/90 dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {DATA.Interests.map((interest) => (
              <span
                key={interest}
                className="text-xs text-muted-foreground bg-muted/50 border border-border/50 px-2 py-0.5 rounded-md font-mono"
              >
                #{interest}
              </span>
            ))}
          </div>
        </section>

        {/* Two-Column Matrix: Building on the Left, Writing on the Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-border/40">
          {/* Active Ventures & Projects */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border/30">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                01 / what i build
              </h2>
            </div>
            <div className="space-y-5">
              {DATA.projects.map((p) => {
                const websiteLink = p.links.find((l) => l.type === "Website")?.href || p.href;
                const sourceLink = p.links.find((l) => l.type === "Source")?.href;

                return (
                  <div key={p.title} className="group flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Link
                        href={websiteLink}
                        target="_blank"
                        className="font-medium tracking-tight text-foreground hover:underline inline-flex items-center gap-1 lowercase text-base"
                      >
                        {p.title.toLowerCase()}
                        <ArrowUpRight className="size-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      {sourceLink && (
                        <Link
                          href={sourceLink}
                          target="_blank"
                          className="text-muted-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Github className="size-3" />
                        </Link>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono text-muted-foreground/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Writing & Notes */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border/30">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                02 / what i think
              </h2>
              <Link
                href="/blog"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors lowercase underline"
              >
                all essays
              </Link>
            </div>
            <RecentBlogList posts={posts} showSummary limit={5} />
          </div>
        </div>

        {/* Career & Track Record */}
        <section id="experience" className="space-y-6 pt-6 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            03 / track record
          </h2>
          <div className="space-y-5">
            {DATA.work.map((w) => (
              <div key={w.company} className="flex flex-col space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="font-medium text-foreground lowercase">
                    {w.company.toLowerCase()}
                    <span className="text-muted-foreground font-normal ml-2">({w.title})</span>
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {w.start} — {w.end || "Present"}
                  </span>
                </div>
                {w.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {w.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Code activity */}
        <section id="activity" className="space-y-4 pt-6 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              04 / commit history
            </h2>
          </div>
          <GithubActivity />
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-4 pt-6 border-t border-border/40">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            05 / get in touch
          </h2>
          <ContactSection />
        </section>
      </main>
    </div>
  );
}
