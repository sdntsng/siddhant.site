# Agent instructions for siddhant.site

## Cloudflare Pages preview links (required)

Whenever you push changes that trigger a Cloudflare Pages deploy, **always include the direct preview URL(s) in your response** so Siddhant can open them from chat without hunting in GitHub or the Cloudflare dashboard.

The dashboard build link is not enough — send the clickable `*.pages.dev` preview.

### How to get preview URLs

After pushing to a branch with an open PR:

1. **GitHub PR comment** (fastest): Cloudflare's bot posts Preview URL and Branch Preview URL.
   ```bash
   gh pr view <number> --repo sdntsng/siddhant.site --comments
   ```
2. **Commit status**:
   ```bash
   gh api repos/sdntsng/siddhant.site/commits/<sha>/status --jq '.statuses[] | {context, target_url, description}'
   ```

### URL patterns

- **Commit preview**: `https://<deployment-id>.siddhant-site.pages.dev`
- **Branch preview**: `https://<branch-slug>.siddhant-site.pages.dev` (slashes → hyphens, lowercase)

When sharing previews for UI work, include:

- Branch preview URL (stable for the branch)
- Direct paths to the relevant pages (e.g. `/prototype/a-refine`)
- Production `/` for side-by-side comparison when useful

## Homepage prototype gallery (in progress)

Branch: `pr/homepage-prototypes-9fc4` (draft PR #26). **Live `/` is unchanged** until explicitly approved.

| Route | What it explores |
|-------|------------------|
| `/prototype` | Overview hub + links |
| `/prototype/a-refine` | Subtle: Source Serif/Sans, no BlurFade, same layout |
| `/prototype/b-chrome` | Moderate: stone palette, mono labels, top bar (dock replacement preview) |
| `/prototype/c-rhythm` | Structural: flat work timeline, compact education, inline interests, featured project |

Workflow:

1. User compares variants vs live `/` in tabs and gives mix-and-match feedback.
2. Run `/impeccable init` with the chosen direction.
3. Apply **only chosen pieces** to the production homepage (`home-page-content.tsx`).

Impeccable is installed (`.cursor/skills/impeccable/`) but `/impeccable init`, `PRODUCT.md`, and `DESIGN.md` stay deferred until a direction is picked.

Do not merge prototype changes to `/` without explicit user approval.
