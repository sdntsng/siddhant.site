import Link from "next/link";

interface PostItem {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
    tags?: string[];
  };
}

function formatAgo(dateStr: string): string {
  let date = dateStr;
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const currentDate = new Date().getTime();
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysAgo < 1) {
    return "today";
  } else if (daysAgo < 7) {
    return `${daysAgo}d ago`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${weeksAgo}w ago`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${monthsAgo}mo ago`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo}y ago`;
  }
}

export function RecentBlogList({
  posts,
  showSummary = true,
  limit = 4,
}: {
  posts: PostItem[];
  showSummary?: boolean;
  limit?: number;
}) {
  const displayPosts = posts.slice(0, limit);

  return (
    <div className="flex flex-col space-y-5">
      {displayPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-6 gap-y-1 text-sm transition-colors"
        >
          <div className="flex flex-col space-y-1 flex-1 min-w-0">
            <span className="font-medium tracking-tight lowercase text-foreground group-hover:underline text-sm sm:text-base">
              {post.metadata.title}
            </span>
            {showSummary && post.metadata.summary && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {post.metadata.summary}
              </p>
            )}
          </div>
          <span className="text-xs text-muted-foreground/80 font-mono shrink-0 tabular-nums">
            {formatAgo(post.metadata.publishedAt)}
          </span>
        </Link>
      ))}
    </div>
  );
}
