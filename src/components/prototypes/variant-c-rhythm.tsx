"use client";

import Link from "next/link";
import Image from "next/image";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import {
  AboutBlock,
  ContactRow,
  PostsList,
  RectPhotoAvatar,
  SectionLabel,
  type PostPreview,
} from "@/components/prototypes/shared";
import { PrototypeFontScope, protoTypography } from "@/components/prototypes/prototype-fonts";
import { WorkTimelineRow } from "@/components/prototypes/work-timeline-row";

/** B chrome + editorial list rhythm (largest structural shift in the set). */
export default function VariantCRhythm({ posts }: { posts: any[] }) {
  const [featured, ...restProjects] = DATA.projects;
  const educationLine = DATA.education
    .map((e) => `${e.degree}, ${e.school} (${e.start}–${e.end})`)
    .join(" · ");

  return (
    <PrototypeFontScope className="prototype-stone">
      <main className="flex flex-col min-h-[100dvh] gap-16">
        <section id="hero" className="border-b border-border/60 pb-12">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <RectPhotoAvatar />
            <div className="flex flex-col flex-1 space-y-4 min-w-0">
              <div>
                <p className={cn(protoTypography.mono, "text-[11px] text-muted-foreground mb-2")}>
                  siddhant.site
                </p>
                <h1
                  className={cn(
                    protoTypography.display,
                    "text-4xl sm:text-5xl font-semibold tracking-tight lowercase leading-[1.05]",
                  )}
                >
                  {DATA.name}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {DATA.description}
              </p>
            </div>
          </div>
        </section>

        <section id="about">
          <SectionLabel>about</SectionLabel>
          <AboutBlock />
        </section>

        <section id="work">
          <SectionLabel>work</SectionLabel>
          <div>
            {DATA.work.map((work) => (
              <WorkTimelineRow
                key={work.company}
                company={work.company}
                title={work.title}
                period={`${work.start} – ${work.end ?? "Present"}`}
                description={work.description}
                href={work.href}
              />
            ))}
          </div>
        </section>

        <section id="education">
          <SectionLabel>education</SectionLabel>
          <p className="text-sm text-muted-foreground leading-relaxed">{educationLine}</p>
        </section>

        <section id="interests">
          <SectionLabel>interests</SectionLabel>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {DATA.Interests.join(" · ")}
          </p>
        </section>

        <section id="projects">
          <SectionLabel>projects</SectionLabel>
          {featured && (
            <Link
              href={featured.href}
              className="group block rounded-xl border overflow-hidden mb-6 hover:border-foreground/20 transition-colors"
            >
              {featured.image && (
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="p-5 space-y-2">
                <h3 className={cn(protoTypography.display, "text-xl lowercase")}>{featured.title}</h3>
                <p className="text-sm text-muted-foreground">{featured.description}</p>
              </div>
            </Link>
          )}
          <ul className="space-y-2">
            {restProjects.map((project) => (
              <li key={project.title}>
                <Link
                  href={project.href}
                  className="flex items-baseline justify-between gap-4 py-2 border-b border-border/50 last:border-0 hover:text-foreground text-muted-foreground transition-colors"
                >
                  <span className="lowercase">{project.title}</span>
                  <span className={cn(protoTypography.mono, "text-[10px] shrink-0")}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="open-source">
          <div className="flex justify-between items-end mb-4">
            <SectionLabel>code activity</SectionLabel>
            <Link href={DATA.contact.social.GitHub.url} className="text-xs text-muted-foreground hover:underline pb-1">
              view all
            </Link>
          </div>
          <GithubActivity />
        </section>

        <section id="posts">
          <div className="flex justify-between items-end mb-4">
            <SectionLabel>recent posts</SectionLabel>
            <Link href="/blog" className="text-xs text-muted-foreground hover:underline pb-1">
              view all
            </Link>
          </div>
          <PostsList posts={posts} />
        </section>

        <section id="contact">
          <SectionLabel>contact</SectionLabel>
          <ContactRow />
        </section>
      </main>
    </PrototypeFontScope>
  );
}
