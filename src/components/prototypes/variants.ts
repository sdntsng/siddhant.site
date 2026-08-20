export type PrototypeVariantId = "a-refine" | "b-chrome" | "c-rhythm";

export type PrototypeVariant = {
  id: PrototypeVariantId;
  name: string;
  tagline: string;
  intensity: "subtle" | "moderate" | "structural";
  summary: string;
  changes: string[];
  keeps: string[];
};

export const PROTOTYPE_VARIANTS: PrototypeVariant[] = [
  {
    id: "a-refine",
    name: "A · Refine",
    tagline: "Typography and motion only",
    intensity: "subtle",
    summary:
      "Same sections and components as today, but Inter and BlurFade are gone. Content is visible immediately with a quieter type pairing.",
    changes: [
      "Source Serif 4 display + Source Sans 3 body (prototype-scoped)",
      "Remove blur-fade stagger; static or opacity-only reveal",
      "Softer section spacing rhythm",
    ],
    keeps: [
      "Circular avatar + photo swap",
      "Resume cards with logos",
      "2-column project grid",
      "Interest badges",
      "All current sections",
    ],
  },
  {
    id: "b-chrome",
    name: "B · Chrome",
    tagline: "Navigation and surface tone",
    intensity: "moderate",
    summary:
      "Everything in A, plus a top status bar instead of the macOS dock silhouette. Cool stone palette instead of default zinc.",
    changes: [
      "Top bar: site · blog · terminal · theme (see prototype shell)",
      "Stone/ink background tokens (prototype-scoped)",
      "Section labels in mono, smaller caps rhythm",
    ],
    keeps: [
      "Resume cards and project grid",
      "Photo swap and SiddhantOS affordance",
      "Same content order",
    ],
  },
  {
    id: "c-rhythm",
    name: "C · Rhythm",
    tagline: "Editorial list flow",
    intensity: "structural",
    summary:
      "B’s chrome, but work becomes a flat timeline, education compacts, interests become inline copy, and projects lead with one featured piece.",
    changes: [
      "Work as year + role list (hover expands note)",
      "Single education line instead of duplicate logo cards",
      "Interests as a sentence, not badge pills",
      "One featured project + simple links for the rest",
    ],
    keeps: [
      "About copy, posts, GitHub activity, contact",
      "Photo swap",
      "Lowercase voice",
    ],
  },
];

export function getVariant(id: string): PrototypeVariant | undefined {
  return PROTOTYPE_VARIANTS.find((v) => v.id === id);
}
