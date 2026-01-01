import { getBlogPosts } from "@/data/blog";
import HomePageContent from "@/components/home-page-content";

export default async function Page() {
  const posts = await getBlogPosts();
  // Filter and sort the posts
  const latestPosts = posts
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .slice(0, 3);

  return <HomePageContent posts={latestPosts} />;
}
