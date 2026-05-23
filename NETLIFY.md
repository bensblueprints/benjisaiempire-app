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
- `AIRWALLEX_PRICE_DONE_WITH_YOU_MONTHLY` — `pri_sgpdzdfflhirqw5zhu7` ($599/mo; product `prd_sgpd22q4dhirqvi7yhx`)
- `AIRWALLEX_PRICE_DONE_WITH_YOU_YEARLY` — `pri_sgpd22q4dhirqxtq9cr` ($4,997/yr; product `prd_sgpdc77rchirqwwy9eg`)
- `AIRWALLEX_PRICE_STORYBOARD` — `pri_sgpd22q4dhit1y8xhdf` ($9.99 one-time Storyboard Batch Cropper)
- `NEXT_PUBLIC_STORYBOARD_APP_URL` — `https://storyboard.benjisaiempire.com`
- `AIRWALLEX_SANDBOX`

**Storyboard software webhooks** (same secret as membership; handled in `/api/airwallex/webhook` when `metadata.product=storyboard-batch-cropper`):

- Checkout API: `https://benjisaiempire.com/api/v1/checkout/create`
- Dedicated webhook (optional duplicate): `https://benjisaiempire.com/api/v1/webhooks/airwallex`
- Store pages: `https://benjisaiempire.com/software/`
- App: `https://storyboard.benjisaiempire.com` (separate Netlify site `5a0467b0-90ef-4ed0-8b93-e15e279fa721`)

**Webhook URL in Airwallex dashboard:** `https://benjisaiempire.com/api/airwallex/webhook` (production; not Coolify URL).

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

### Storyboard app subdomain (`storyboard.benjisaiempire.com`)

Separate Netlify site: **storyboard-batch-cropper** (`5a0467b0-90ef-4ed0-8b93-e15e279fa721`).

1. Netlify → storyboard-batch-cropper site → **Domain management** → add `storyboard.benjisaiempire.com`.
2. Cloudflare DNS:
   - **CNAME** `storyboard` → `storyboard-batch-cropper.netlify.app` (or Netlify’s shown target).
   - Gray cloud (DNS only) recommended until SSL is active.
3. License API stays on apex: `https://benjisaiempire.com/api/v1/*` (CORS allows the storyboard subdomain).

## Dashboard checklist

1. Create site (or link repo) → **bensblueprints/benjisaiempire-app**
2. Production branch: `main`
3. Paste env vars above
4. Add custom domain `benjisaiempire.com`
5. Deploy; confirm `/api/health` or home page loads
6. Update Airwallex + Stripe webhook endpoints to `https://benjisaiempire.com/api/webhooks/...`
7. Supabase: allow Netlify egress if using IP restrictions (pooler usually does not need this)

## Local CLI

**Do not** run `netlify deploy` from Windows without `--build` — that uploads raw source (Netlify default 404). **Do not** use `netlify deploy --prod` on Windows at all if possible; use Linux zip API below.

```bash
cd benjisaiempire-app
git archive -o /tmp/benjisaiempire-deploy.zip HEAD
curl -X POST "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/builds?title=Linux+API+rebuild" \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @/tmp/benjisaiempire-deploy.zip
```

Set `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` (`9a9f0daa-40ec-4baf-b855-e5ed6b22510f`) from `.env` (do not commit).
