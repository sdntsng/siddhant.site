import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostItem {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
    tags?: string[];
  };
}

export function RecentBlogList({
  posts,
  showSummary = false,
  limit = 5,
}: {
  posts: PostItem[];
  showSummary?: boolean;
  limit?: number;
}) {
  const displayPosts = posts.slice(0, limit);

  return (
    <div className="flex flex-col space-y-4">
      {displayPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm transition-colors"
        >
          <div className="flex flex-col space-y-0.5">
            <span className="font-medium tracking-tight lowercase text-foreground group-hover:underline">
              {post.metadata.title}
            </span>
            {showSummary && post.metadata.summary && (
              <span className="text-xs text-muted-foreground line-clamp-1">
                {post.metadata.summary}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground font-mono shrink-0">
            {formatDate(post.metadata.publishedAt)}
          </span>
        </Link>
      ))}
    </div>
  );
}
