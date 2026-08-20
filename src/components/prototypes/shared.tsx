"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";
import { protoTypography } from "@/components/prototypes/prototype-fonts";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        protoTypography.mono,
        "text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-3",
      )}
    >
      {children}
    </p>
  );
}

export function ClassicSectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold lowercase mb-3">{children}</h2>;
}

export function PhotoAvatar({ className }: { className?: string }) {
  const [autoFlipped, setAutoFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoFlipped((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const showAlt = autoFlipped !== isHovering;

  return (
    <Avatar
      className={cn("size-32 border bg-muted relative rounded-full", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AvatarImage
        alt={DATA.name}
        src={DATA.avatarUrl}
        className={cn(
          "object-cover transition-opacity duration-700 ease-out absolute inset-0 size-full",
          showAlt ? "opacity-0" : "opacity-100",
        )}
      />
      <AvatarImage
        alt={DATA.name}
        src={DATA.altAvatarUrl}
        className={cn(
          "object-cover transition-opacity duration-700 ease-out absolute inset-0 size-full",
          showAlt ? "opacity-100" : "opacity-0",
        )}
      />
      <AvatarFallback>{DATA.initials}</AvatarFallback>
    </Avatar>
  );
}

export function RectPhotoAvatar({ className }: { className?: string }) {
  const [autoFlipped, setAutoFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoFlipped((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const showAlt = autoFlipped !== isHovering;

  return (
    <div
      className={cn(
        "relative size-28 shrink-0 overflow-hidden rounded-lg border bg-muted",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={DATA.name}
        src={DATA.avatarUrl}
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out",
          showAlt ? "opacity-0" : "opacity-100",
        )}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={DATA.name}
        src={DATA.altAvatarUrl}
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out",
          showAlt ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

export function AboutBlock() {
  return (
    <Markdown className="prose max-w-full text-pretty text-sm text-muted-foreground dark:prose-invert">
      {DATA.summary}
    </Markdown>
  );
}

export function ContactRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col md:flex-row flex-wrap gap-3", className)}>
      <Link
        href={DATA.contact.social.X.url}
        className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm hover:bg-muted/60 transition-colors"
      >
        <DATA.contact.social.X.icon className="size-4" />
        <span>DM on X</span>
      </Link>
      <Link
        href="/meet"
        className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm hover:bg-muted/60 transition-colors"
      >
        <span>Book a session</span>
      </Link>
      <div className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm text-muted-foreground">
        <span>s (at) siddhant.site</span>
      </div>
    </div>
  );
}

export type PostPreview = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    [key: string]: unknown;
  };
};

export function PostsList({ posts }: { posts: PostPreview[] }) {
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="rounded-lg border p-4 hover:bg-muted/40 transition-colors"
        >
          <div className="flex w-full justify-between items-center gap-4 mb-1">
            <h3 className="font-medium text-base lowercase">{post.metadata.title}</h3>
            <p className={cn(protoTypography.mono, "text-[11px] text-muted-foreground shrink-0")}>
              {post.metadata.publishedAt}
            </p>
          </div>
          {post.metadata.summary !== post.metadata.title && (
            <p className="text-sm text-muted-foreground line-clamp-2">{post.metadata.summary}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
