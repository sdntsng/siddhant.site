import { getPostsWithContent } from "@/data/blog";
import { ContentManager } from "@/components/admin/content-manager";

export default async function AdminContentPage() {
    const posts = await getPostsWithContent();

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
        }
        return 1;
    });

    return <ContentManager posts={sortedPosts} />;
}
