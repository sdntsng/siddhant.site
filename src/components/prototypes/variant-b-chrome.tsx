"use client";

import Link from "next/link";
import { ResumeCard } from "@/components/resume-card";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import GithubActivity from "@/components/github-activity";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import {
  AboutBlock,
  ContactRow,
  PhotoAvatar,
  PostsList,
  SectionLabel,
  type PostPreview,
} from "@/components/prototypes/shared";
import { PrototypeFontScope, protoTypography } from "@/components/prototypes/prototype-fonts";

/** A + stone palette + mono section labels + wider editorial spacing. */
export default function VariantBChrome({ posts }: { posts: any[] }) {
  return (
    <PrototypeFontScope className="prototype-stone">
      <main className="flex flex-col min-h-[100dvh] gap-16">
        <section id="hero" className="pt-2">
          <p className={cn(protoTypography.mono, "text-[11px] text-muted-foreground mb-6")}>
            dehradun · technologist
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-8 items-start sm:items-end">
            <PhotoAvatar />
            <div className="flex flex-col flex-1 space-y-3 pb-1">
              <h1
                className={cn(
                  protoTypography.display,
                  "text-4xl sm:text-[3.25rem] leading-[1.05] font-semibold tracking-tight lowercase",
                )}
              >
                {DATA.name}
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
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
          <div className="flex flex-col gap-y-2">
            {DATA.work.map((work) => (
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            ))}
          </div>
        </section>

        <section id="education">
          <SectionLabel>education</SectionLabel>
          <div className="flex flex-col gap-y-2">
            {DATA.education.map((education) => (
              <ResumeCard
                key={`${education.school}-${education.degree}`}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            ))}
          </div>
        </section>

        <section id="interests">
          <SectionLabel>interests</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {DATA.Interests.map((interest) => (
              <Badge key={interest} variant="outline" className="rounded-md font-normal">
                {interest}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <SectionLabel>featured projects</SectionLabel>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA.projects.map((project) => (
              <ProjectCard
                key={project.title}
                href={project.href}
                title={project.title}
                description={project.description}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            ))}
          </div>
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
