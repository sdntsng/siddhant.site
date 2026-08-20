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
  ClassicSectionHeading,
  ContactRow,
  PhotoAvatar,
  PostsList,
  type PostPreview,
} from "@/components/prototypes/shared";
import { PrototypeFontScope, protoTypography } from "@/components/prototypes/prototype-fonts";

/** Same structure as live site; calmer type and no BlurFade. */
export default function VariantARefine({ posts }: { posts: any[] }) {
  return (
    <PrototypeFontScope>
      <main className="flex flex-col min-h-[100dvh] space-y-12">
        <section id="hero">
          <div className="flex flex-col-reverse sm:flex-row gap-8 items-start sm:items-center">
            <PhotoAvatar />
            <div className="flex flex-col flex-1 space-y-2">
              <h1
                className={cn(
                  protoTypography.display,
                  "text-3xl sm:text-5xl font-semibold tracking-tight lowercase",
                )}
              >
                {DATA.name}
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground">{DATA.description}</p>
            </div>
          </div>
        </section>

        <section id="about">
          <ClassicSectionHeading>about</ClassicSectionHeading>
          <AboutBlock />
        </section>

        <section id="work">
          <ClassicSectionHeading>work</ClassicSectionHeading>
          <div className="flex flex-col gap-y-3">
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
          <ClassicSectionHeading>education</ClassicSectionHeading>
          <div className="flex flex-col gap-y-3">
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
          <ClassicSectionHeading>interests</ClassicSectionHeading>
          <div className="flex flex-wrap gap-1">
            {DATA.Interests.map((interest) => (
              <Badge key={interest}>{interest}</Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <ClassicSectionHeading>featured projects</ClassicSectionHeading>
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
          <div className="flex justify-between items-center mb-3">
            <ClassicSectionHeading>code activity</ClassicSectionHeading>
            <Link href={DATA.contact.social.GitHub.url} className="text-xs text-muted-foreground hover:underline -mt-3">
              view all
            </Link>
          </div>
          <GithubActivity />
        </section>

        <section id="posts">
          <div className="flex justify-between items-center mb-3">
            <ClassicSectionHeading>recent posts</ClassicSectionHeading>
            <Link href="/blog" className="text-xs text-muted-foreground hover:underline -mt-3">
              view all
            </Link>
          </div>
          <PostsList posts={posts} />
        </section>

        <section id="contact">
          <ClassicSectionHeading>contact</ClassicSectionHeading>
          <ContactRow />
        </section>
      </main>
    </PrototypeFontScope>
  );
}
