# Cloudflare Functions

This directory contains serverless functions for the admin panel authentication and API proxying.

## Security Architecture

All sensitive operations are now handled server-side via Cloudflare Functions:

- **Authentication**: Admin password verification happens server-side
- **API Keys**: Plunk and LLM API keys are stored in Cloudflare environment variables
- **Session Management**: Uses HTTP-only cookies for secure session handling

## Environment Variables

Configure these in your Cloudflare Pages dashboard under **Settings > Environment Variables**:

### Required Variables

- `ADMIN_PASSWORD` - Password for admin portal access
- `PLUNK_SECRET_KEY` - Your Plunk Secret API key (from https://useplunk.com/settings/api)

### Optional Variables (for AI features)

- `LLM_API_KEY` - API key for OpenAI-compatible LLM service
- `LLM_BASE_URL` - Base URL for LLM API (default: https://api.openai.com/v1)
- `LLM_MODEL_ID` - Model ID to use (default: gpt-4o)

## API Routes

### Authentication
- `POST /api/admin/auth/login` - Login with password
- `GET /api/admin/auth/verify` - Verify current session
- `POST /api/admin/auth/logout` - Logout and clear session

### Plunk Newsletter API (requires authentication)
- `GET /api/admin/plunk/segments` - List audience segments
- `GET /api/admin/plunk/contacts` - List contacts
- `POST /api/admin/plunk/campaigns` - Create campaign
- `POST /api/admin/plunk/campaigns/:id/send` - Send/schedule campaign
- `POST /api/admin/plunk/send` - Send transactional email

### AI/LLM API (requires authentication)
- `POST /api/admin/llm/generate` - Generate content with LLM

## Local Development

For local development with Wrangler:

1. Create a `.dev.vars` file in the project root:
   ```
   ADMIN_PASSWORD=your-password
   PLUNK_SECRET_KEY=sk_...
   LLM_API_KEY=sk-...
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

Note: The `.dev.vars` file is gitignored and should never be committed.

## Deployment

Environment variables are automatically loaded from Cloudflare Pages environment settings when deployed.

Make sure to set all required environment variables in the Cloudflare Pages dashboard before deploying.
