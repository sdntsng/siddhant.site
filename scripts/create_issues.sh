#!/bin/bash

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) could not be found."
    echo "Please install it via Homebrew: brew install gh"
    echo "Then authenticate: gh auth login"
    exit 1
fi

echo "🚀 Creating GitHub Issues..."

create_issue() {
    title="$1"
    body="$2"
    echo "Creating issue: $title"
    gh issue create --title "$title" --body "$body" --label "enhancement"
}

# Issue 1
create_issue "Basic Content CI Pipeline" \
"**Description**: Set up a GitHub Action that triggers only when \`content/*.mdx\` files are modified on \`main\`.

**Acceptance Criteria**:
- Action runs on push.
- Logs \"New post detected: {filename}\"."

# Issue 2
create_issue "Markdown-to-Email Converter Script" \
"**Description**: Create \`scripts/newsletter-gen.ts\`. It should take an MDX file and output HTML with inline CSS.

**Acceptance Criteria**:
- Supports basic Markdown (headers, lists, links).
- Wraps content in \`welcome-email.html\` style structure.
- Outputs \`out/email.html\`."

# Issue 3
create_issue "\"Admin Draft\" Delivery System" \
"**Description**: Integrate Plunk API into the CI pipeline.

**Acceptance Criteria**:
- Takes \`out/email.html\`.
- Sends it to \`PLUNK_ADMIN_EMAIL\` env var.
- Subject line clearly indicates it's a draft."

# Issue 4
create_issue "AI Social Content Generator" \
"**Description**: Add an LLM step to the pipeline.

**Acceptance Criteria**:
- Takes raw MDX text.
- Generates X Thread and LinkedIn text.
- Appends this text to the bottom of the Email Draft."

# Issue 5
create_issue "Dev.to / Hashnode Cross-posting Script" \
"**Description**: Script to push MDX to Dev.to/Medium as Drafts.

**Acceptance Criteria**:
- Injects \`canonical_url\`.
- Maps frontmatter tags.
- Returns draft URLs."

# Issue 6
create_issue "TTS Audio Generator" \
"**Description**: Generate MP3 from post content.

**Acceptance Criteria**:
- Uses OpenAI TTS.
- Uploads to public storage.
- Updates MDX frontmatter."

# Issue 7
create_issue "Webhook \"Click-to-Send\"" \
"**Description**: Secure endpoint to trigger the final newsletter broadcast.

**Acceptance Criteria**:
- Secure token validation.
- Triggers Plunk broadcast."

# Issue 8
create_issue "Link Validator & Unfurler" \
"**Description**: Pre-flight check for broken links and rich media conversion.

**Acceptance Criteria**:
- Fails build on 404s.
- Converts standalone URLs to HTML Table-based Cards."

# Issue 9
create_issue "Admin Shell & Auth" \
"**Description**: Create \`/admin\` route protected by authentication (e.g., Clerk or Auth.js).

**Acceptance Criteria**:
- Secure login, basic layout."

# Issue 10
create_issue "LLM \"Idea-to-Draft\" Interface" \
"**Description**: A chat-like interface where you dump raw thoughts.

**Acceptance Criteria**:
- Input: Text area / Voice recording.
- Process: Sends to Gemini/OpenAI.
- Output: Structured MDX outline."

# Issue 11
create_issue "The \"Polisher\" (AI Editor)" \
"**Description**: Highlighting text in the admin editor offers AI transformations.

**Acceptance Criteria**:
- \"Misfit Tone\" rewrite.
- \"Simplify for non-tech\" rewrite."

# Issue 12
create_issue "Distribution Status Board" \
"**Description**: Dashboard view to track where content has gone.

**Acceptance Criteria**:
- Read valid frontmatter or a persistent DB status.
- Action buttons to trigger the GitHub Workflows from Phase 1 & 2."

echo "✅ All issues created!"
