# pokelocals-app

A small Next.js application for managing Pokémon TCG tournament pairings, decklists, and related organizer workflows.

## Getting Started

Install dependencies and start the development server using `pnpm`:

```bash
pnpm install
```

If you haven't setup your database yet, do it now.

```bash
pnpm db:push
```

Start application in dev mode

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Environment variables

The project relies on a number of environment variables (see `.env.ci`). Common variables used in development and deployments include:

- `NEXT_PUBLIC_DEPLOYMENT`: Deployment environment identifier (e.g., `local`, `staging`, `production`).
- `BLOB_STORAGE`: Storage backend (e.g., `r2`).
- `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`: Discord OAuth credentials (if Discord auth is enabled).
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`: Clerk (authentication) keys.
- `NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN`, `ROLLBAR_SERVER_TOKEN`: Rollbar tokens for client and server error reporting.
- `CLOUDFLARE_R2_BUCKET_NAME`, `CLOUDFLARE_R2_ACCOUNT_ID`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`: Cloudflare R2 credentials for object storage.
- `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`: PostHog analytics configuration.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis connection for caching/queues.
- `FEEDBACK_DISCORD_WEBHOOK_URL`, `WAITLIST_DISCORD_WEBHOOK_URL`: Webhook URLs used for feedback and waitlist notifications.
- `POSTGRES_DB_URL`: Postgres connection string used by the server/database layer.
- `CRON_SECRET`: Secret used to secure scheduled cron endpoints.

Keep sensitive values out of source control and provide them to your deployment environment via your hosting provider's secrets/config. Example local workflow: create a `.env.local` from `.env.ci` (omitting secret values) or set values in your development environment.

## Deploy on Vercel

Deploying to Vercel is straightforward — see the Next.js deployment docs for details: https://nextjs.org/docs/app/building-your-application/deploying
