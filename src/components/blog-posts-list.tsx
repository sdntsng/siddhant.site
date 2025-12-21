"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPostsList({ posts }: { posts: any[] }) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = Array.from(
        new Set(posts.flatMap((post) => post.metadata.tags || [])),
    ).sort() as string[];

    const filteredPosts = selectedTag
        ? posts.filter((post) => post.metadata.tags?.includes(selectedTag))
        : posts;

    return (
        <>
            <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex flex-wrap gap-2 mb-8">
                    <Badge
                        variant={selectedTag === null ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </Badge>
                    {allTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={selectedTag === tag ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </BlurFade>

            <div className="flex flex-col gap-4">
                {filteredPosts
                    .sort((a, b) => {
                        if (
                            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
                        ) {
                            return -1;
                        }
                        return 1;
                    })
                    .map((post, id) => (
                        <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
                            <Link
                                className="flex flex-col space-y-1 mb-4"
                                href={`/blog/${post.slug}`}
                            >
                                <div className="w-full flex flex-col">
                                    <p className="tracking-tight font-medium lowercase italic">{post.metadata.title}</p>
                                    <p className="h-6 text-xs text-muted-foreground">
                                        {post.metadata.publishedAt}
                                    </p>
                                </div>
                            </Link>
                        </BlurFade>
                    ))}
            </div>
        </>
    );
}
