# Deploy benjisaiempire-app to Netlify

Production domain: **https://benjisaiempire.com** (apex on this Netlify site).

## Architecture (one domain)

| Piece | Netlify site | Domain |
|-------|----------------|--------|
| **App** (this repo) | `benjisaiempire-app` | `benjisaiempire.com` (apex) |
| **Static HTML** (`benjisaiempire-site`) | separate site (optional) | `www.benjisaiempire.com` or preview URL only |

The Next.js app already serves `/insider`, `/courses`, `/founders`, `/starter-kit`, `/api/*`, auth, and portal. Point **apex** at the app. Use the static repo for legacy HTML previews or copy assets into `public/` later if you need exact static pages on the same deploy.

**Do not** reuse the `goaiempire` Netlify site ID (`6ce082c1-...`) — that site is `benjis-ai-empire` / `goaiempire.advancedmarketing.co`.

## Build

- Command: `npm run build` (`prisma generate && next build`)
- Plugin: `@netlify/plugin-nextjs`
- Node: 20
- Database: set `DATABASE_URL` to Supabase **transaction pooler** (port 6543, `?pgbouncer=true`). Set `DIRECT_URL` only if you run migrations from CI (not required for runtime).

## Netlify UI — environment variables (names only)

Copy values from 1Password / local `.env` into **Site configuration → Environment variables** (Production + Deploy previews as needed).

### Required (all deployments)

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL` — `https://benjisaiempire.com`
- `AUTH_TRUST_HOST` — `true`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `ADMIN_EMAILS`
- `NEXT_PUBLIC_SITE_URL` — `https://benjisaiempire.com`

### Airwallex (when `USE_AIRWALLEX=true`)

- `USE_AIRWALLEX`
- `NEXT_PUBLIC_USE_AIRWALLEX`
- `AIRWALLEX_CLIENT_ID`
- `AIRWALLEX_API_KEY`
- `AIRWALLEX_WEBHOOK_SECRET`
- `AIRWALLEX_LEGAL_ENTITY_ID`
- `AIRWALLEX_PAYMENT_ACCOUNT_ID`
- `AIRWALLEX_PRICE_INSIDER`
- `AIRWALLEX_PRICE_WHOLESALE`
- `AIRWALLEX_SANDBOX`

**Webhook URL in Airwallex dashboard:** `https://benjisaiempire.com/api/webhooks/airwallex` (production; not Coolify URL).

### Stripe (legacy, optional when Airwallex active)

- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_INSIDER`
- `STRIPE_PRICE_WHOLESALE`

### CI / GitHub Actions only

- `NETLIFY_AUTH_TOKEN` (GitHub secret)
- `NETLIFY_SITE_ID` (GitHub secret — this app’s site, not goaiempire)

## GitHub Actions

Workflow: `.github/workflows/deploy-netlify.yml` on push to `main` (and manual dispatch). Add repo secrets `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.

## Cloudflare DNS (benjisaiempire.com → Netlify)

After adding the custom domain in Netlify:

1. Netlify → **Domain management** → add `benjisaiempire.com` and `www.benjisaiempire.com`.
2. In **Cloudflare** DNS for `benjisaiempire.com`:
   - **Apex** `@`: Netlify load balancer — often `75.2.60.5` (verify in Netlify domain UI).
   - **www**: CNAME to your Netlify site subdomain (e.g. `benjisaiempire-app.netlify.app`) or Netlify DNS target shown in dashboard.
3. SSL: Full (strict) in Cloudflare is fine once Netlify provisions cert.
4. Remove or repoint Coolify/Traefik DNS if apex still points at `server.advancedmarketing.co`.

## Dashboard checklist

1. Create site (or link repo) → **bensblueprints/benjisaiempire-app**
2. Production branch: `main`
3. Paste env vars above
4. Add custom domain `benjisaiempire.com`
5. Deploy; confirm `/api/health` or home page loads
6. Update Airwallex + Stripe webhook endpoints to `https://benjisaiempire.com/api/webhooks/...`
7. Supabase: allow Netlify egress if using IP restrictions (pooler usually does not need this)

## Local CLI

```bash
cd benjisaiempire-app
netlify link    # pick or create site
netlify deploy --build --prod
```

Set `NETLIFY_AUTH_TOKEN` in the shell from `.env` (do not commit).
