"use client";

import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { useTerminal } from "@/context/terminal";
import TerminalView from "@/components/terminal-view";
import GithubActivity from "@/components/github-activity";

const BLUR_FADE_DELAY = 0.04;

export default function HomePageContent({ posts }: { posts: any[] }) {
    const { mode } = useTerminal();
    const [autoFlipped, setAutoFlipped] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAutoFlipped((prev) => !prev);
        }, 20000); // 20 seconds

        return () => clearInterval(interval);
    }, []);

    const showAlt = autoFlipped !== isHovering;

    if (mode === "terminal") {
        return <TerminalView />;
    }

    return (
        <main className="flex flex-col min-h-[100dvh] space-y-10">
            <section id="hero">
                <div className="mx-auto w-full max-w-2xl space-y-8">
                    <div className="flex flex-col-reverse sm:flex-row gap-8 items-start sm:items-center">
                        <BlurFade delay={BLUR_FADE_DELAY}>
                            <Avatar
                                className="size-32 border bg-muted relative"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <AvatarImage
                                    alt={DATA.name}
                                    src={DATA.avatarUrl}
                                    className={cn(
                                        "object-cover transition-opacity duration-700 ease-in-out absolute inset-0 size-full",
                                        showAlt ? "opacity-0" : "opacity-100"
                                    )}
                                />
                                <AvatarImage
                                    alt={DATA.name}
                                    src={DATA.altAvatarUrl}
                                    className={cn(
                                        "object-cover transition-opacity duration-700 ease-in-out absolute inset-0 size-full",
                                        showAlt ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <AvatarFallback>{DATA.initials}</AvatarFallback>
                            </Avatar>
                        </BlurFade>
                        <div className="flex-col flex flex-1 space-y-1.5">
                            <BlurFadeText
                                delay={BLUR_FADE_DELAY}
                                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                                yOffset={8}
                                text={DATA.name}
                            />
                            <BlurFadeText
                                className="max-w-[600px] md:text-xl"
                                delay={BLUR_FADE_DELAY}
                                text={DATA.description}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section id="about">
                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                    <h2 className="text-xl font-bold lowercase">about</h2>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 4}>
                    <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                        {DATA.summary}
                    </Markdown>
                </BlurFade>
            </section>
            <section id="work">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 5}>
                        <h2 className="text-xl font-bold lowercase">work</h2>
                    </BlurFade>
                    {DATA.work.map((work, id) => (
                        <BlurFade
                            key={work.company}
                            delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                        >
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
                        </BlurFade>
                    ))}
                </div>
            </section>
            <section id="education">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 7}>
                        <h2 className="text-xl font-bold lowercase">education</h2>
                    </BlurFade>
                    {DATA.education.map((education, id) => (
                        <BlurFade
                            key={education.school}
                            delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                        >
                            <ResumeCard
                                key={education.school}
                                href={education.href}
                                logoUrl={education.logoUrl}
                                altText={education.school}
                                title={education.school}
                                subtitle={education.degree}
                                period={`${education.start} - ${education.end}`}
                            />
                        </BlurFade>
                    ))}
                </div>
            </section>
            <section id="interests">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 9}>
                        <h2 className="text-xl font-bold lowercase">interests</h2>
                    </BlurFade>
                    <div className="flex flex-wrap gap-1">
                        {DATA.Interests.map((interest, id) => (
                            <BlurFade key={interest} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                                <Badge key={interest}>{interest}</Badge>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>
            <section id="projects">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 11}>
                        <h2 className="text-xl font-bold lowercase">featured projects</h2>
                    </BlurFade>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                        {DATA.projects.map((project, id) => (
                            <BlurFade
                                key={project.title}
                                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            >
                                <ProjectCard
                                    href={project.href}
                                    key={project.title}
                                    title={project.title}
                                    description={project.description}
                                    dates={project.dates}
                                    tags={project.technologies}
                                    image={project.image}
                                    video={project.video}
                                    links={project.links}
                                />
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            <section id="open-source">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 13}>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold lowercase">code activity</h2>
                            <Link href={DATA.contact.social.GitHub.url} className="text-xs text-muted-foreground hover:underline">view all</Link>
                        </div>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY * 14}>
                        <GithubActivity />
                    </BlurFade>
                </div>
            </section>

            <section id="posts">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 13}>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold lowercase">recent posts</h2>
                            <Link href="/blog" className="text-xs text-muted-foreground hover:underline">view all</Link>
                        </div>
                    </BlurFade>
                    <div className="flex flex-col gap-2">
                        {posts.map((post, id) => (
                            <BlurFade
                                key={post.slug}
                                delay={BLUR_FADE_DELAY * 14 + id * 0.05}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <Card className="flex flex-col items-start p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex w-full justify-between items-center mb-1">
                                            <h3 className="font-semibold text-base">{post.metadata.title}</h3>
                                            <p className="text-xs text-muted-foreground">{post.metadata.publishedAt}</p>
                                        </div>
                                        {post.metadata.summary !== post.metadata.title && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {post.metadata.summary}
                                            </p>
                                        )}
                                    </Card>
                                </Link>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 16}>
                        <h2 className="text-xl font-bold lowercase">contact</h2>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY * 17}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link href={DATA.contact.social.X.url} className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "gap-2 rounded-xl px-8 text-base shadow-sm border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-800")}>
                                <DATA.contact.social.X.icon className="size-4" />
                                <span>DM on X</span>
                            </Link>
                            <Link href="/meet" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "gap-2 rounded-xl px-8 text-base shadow-sm border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-800")}>
                                <span className="text-lg">📅</span>
                                <span>Book a Session</span>
                            </Link>
                        </div>
                    </BlurFade>
                </div>
            </section>
        </main>
    );
}
