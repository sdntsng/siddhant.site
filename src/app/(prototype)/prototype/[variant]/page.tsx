import { notFound } from "next/navigation";
import { getBlogPosts } from "@/data/blog";
import VariantARefine from "@/components/prototypes/variant-a-refine";
import VariantBChrome from "@/components/prototypes/variant-b-chrome";
import VariantCRhythm from "@/components/prototypes/variant-c-rhythm";
import { getVariant, type PrototypeVariantId } from "@/components/prototypes/variants";

export const metadata = {
  robots: { index: false, follow: false },
};

const VALID: PrototypeVariantId[] = ["a-refine", "b-chrome", "c-rhythm"];

function isVariantId(value: string): value is PrototypeVariantId {
  return VALID.includes(value as PrototypeVariantId);
}

export function generateStaticParams() {
  return VALID.map((variant) => ({ variant }));
}

export default async function PrototypeVariantPage({
  params,
}: {
  params: { variant: string };
}) {
  const { variant: variantId } = params;
  if (!isVariantId(variantId)) notFound();

  const meta = getVariant(variantId);
  if (!meta) notFound();

  const posts = (await getBlogPosts())
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) return -1;
      return 1;
    })
    .slice(0, 3);

  const content =
    variantId === "a-refine" ? (
      <VariantARefine posts={posts} />
    ) : variantId === "b-chrome" ? (
      <VariantBChrome posts={posts} />
    ) : (
      <VariantCRhythm posts={posts} />
    );

  return (
    <>
      <div className="mb-8 rounded-xl border bg-muted/20 p-4 space-y-2">
        <p className="text-sm font-medium">{meta.name}</p>
        <p className="text-sm text-muted-foreground">{meta.summary}</p>
        <p className="text-xs font-mono text-muted-foreground">
          intensity: {meta.intensity} · compare with{" "}
          <a href="/" className="underline underline-offset-2">
            live
          </a>{" "}
          and{" "}
          <a href="/prototype" className="underline underline-offset-2">
            overview
          </a>
        </p>
      </div>
      {content}
    </>
  );
}
