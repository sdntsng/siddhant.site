"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

async function renderDiagrams(theme: string | undefined) {
  const mermaid = (await import("mermaid")).default;

  mermaid.initialize({
    startOnLoad: false,
    theme: theme === "dark" ? "dark" : "default",
    securityLevel: "loose",
  });

  const nodes = Array.from(document.querySelectorAll("pre.mermaid"));

  for (const node of nodes) {
    const code = node.textContent?.trim();
    if (!code) continue;

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

    try {
      const { svg } = await mermaid.render(id, code);
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-diagram not-prose";
      wrapper.innerHTML = svg;
      node.replaceWith(wrapper);
    } catch (error) {
      console.error("Mermaid render failed:", error);
      node.classList.add("mermaid-error");
    }
  }
}

export function MermaidRenderer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    void renderDiagrams(resolvedTheme);
  }, [mounted, resolvedTheme]);

  return null;
}
