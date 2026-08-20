import { getBlogPosts } from "@/data/blog";
import { VariantLedger } from "@/components/prototypes/variant-ledger";
import { VariantSynthesis } from "@/components/prototypes/variant-synthesis";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ variant: "ledger" }, { variant: "synthesis" }];
}

export async function generateMetadata({
  params,
}: {
  params: { variant: string };
}) {
  const titles: Record<string, string> = {
    ledger: "Ledger Prototype",
    synthesis: "Synthesis Prototype",
  };

  return {
    title: titles[params.variant] || "Prototype",
  };
}

export default async function PrototypeVariantPage({
  params,
}: {
  params: { variant: string };
}) {
  const posts = await getBlogPosts();
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  if (params.variant === "ledger") {
    return <VariantLedger posts={sortedPosts} />;
  }

  if (params.variant === "synthesis") {
    return <VariantSynthesis posts={sortedPosts} />;
  }

  notFound();
}
