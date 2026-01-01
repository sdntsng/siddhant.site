import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import BlogPostsList from "@/components/blog-posts-list";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">thoughts on biz, tech, and life</h1>
      </BlurFade>
      <BlogPostsList posts={posts} />
    </section>
  );
}
