# Blog Content Standardization Guide

## Overview
This document guides the formatting and structure of MDX blog posts in `content/`. The goal is to move away from legacy WordPress-exported HTML/comments and use clean, standard MDX/Markdown.

## 1. Frontmatter
Every file must start with YAML frontmatter:

```yaml
---
title: "Article Title"
publishedAt: "YYYY-MM-DD"
summary: "Brief summary..."
image: "/blog/images/..."
tags: ["tag1", "tag2"]
---
```

## 2. General Formatting
- **No WP Comments**: Remove all `<!-- wp:... -->` comments.
- **Use Markdown**: Prefer standard Markdown over HTML tags where possible.
  - `## Heading 2` instead of `<h2>Heading 2</h2>`
  - `**Bold**` instead of `<strong>Bold</strong>`
  - `- List item` instead of `<ul><li>List item</li></ul>`
  - `[Link](url)` instead of `<a href="url">Link</a>`
- **Paragraphs**: specific `<p>` tags are not usually needed in MDX. Just use blank lines between paragraphs.

## 3. HTML & JSX
- **MDX Compatibility**: Any remaining HTML must be valid JSX.
  - **Self-close tags**: `<br />`, `<hr />`, `<img />`.
  - **Styles**: Use objects, not strings. `style={{ color: 'red' }}` NOT `style="color:red"`.
  - **Class Names**: Use `className` instead of `class`.

## 4. Images
Preferred format is standard Markdown if no special styling is needed:
`![Alt Text](/path/to/image.png)`

If captions or specific classes are needed, use `<figure>` but ensure valid JSX:
```jsx
<figure className="... " >
  <img src="..." alt="..." />
  <figcaption>Caption</figcaption>
</figure>
```

## 5. Cleanup Script/Regex
When refactoring existing content:
1. Remove `<!-- wp:paragraph -->`, `<!-- /wp:paragraph -->`, etc.
2. Convert simple `<p>...</p>` blocks to plain text separated by newlines.
3. Convert `<hX>...</hX>` to corresponding `#` headers.
4. Ensure all `<br>` are `<br />`.

## 6. Quotes & Callouts
- **Gyan / Alerts**: Use the `<Callout>` component.
  ```jsx
  <Callout title="Gyan">
    Your content here. Can use [markdown links](...).
  </Callout>
  ```
- **Standard Quotes**: Use standard Markdown `>` for regular quotes.
