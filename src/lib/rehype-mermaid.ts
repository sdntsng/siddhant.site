import type { Element, Root, Text } from "hast";
import { visit } from "unist-util-visit";

function getText(node: Element): string {
  return node.children
    .map((child) => {
      if (child.type === "text") return (child as Text).value;
      if (child.type === "element") return getText(child as Element);
      return "";
    })
    .join("");
}

export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (
        node.tagName !== "pre" ||
        index === undefined ||
        !parent ||
        !Array.isArray(parent.children)
      ) {
        return;
      }

      const code = node.children[0];
      if (code?.type !== "element" || code.tagName !== "code") return;

      const className = code.properties?.className;
      if (
        !Array.isArray(className) ||
        !className.some((c) => String(c).includes("language-mermaid"))
      ) {
        return;
      }

      parent.children[index] = {
        type: "element",
        tagName: "pre",
        properties: { className: ["mermaid"] },
        children: [{ type: "text", value: getText(code).trim() }],
      };
    });
  };
}
