"use client";

import { useTheme } from "next-themes";
import Script from "next/script";
import { useEffect } from "react";

interface MermaidAPI {
  initialize: (options: Record<string, unknown>) => void;
  run: (options: { querySelector: string }) => void;
}

function renderMermaid(theme: string | undefined) {
  const mermaid = (window as unknown as { mermaid?: MermaidAPI }).mermaid;
  if (!mermaid) return;

  mermaid.initialize({
    startOnLoad: false,
    theme: theme === "dark" ? "dark" : "default",
  });
  mermaid.run({ querySelector: ".mermaid" });
}

export function MermaidScript() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    renderMermaid(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
      strategy="lazyOnload"
      onLoad={() => renderMermaid(resolvedTheme)}
    />
  );
}
