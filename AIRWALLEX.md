# Airwallex Billing — benjisaiempire.com

Migrate new subscriptions from Stripe to [Airwallex Hosted Billing Checkout](https://www.airwallex.com/docs/billing__checkout__hosted-billing-checkout). Stripe code remains until you confirm cutover (`USE_AIRWALLEX=false` keeps Stripe as default).

## 1. Sandbox first

1. Use the Airwallex **demo** environment while testing.
2. In `.env` (local) and Coolify (production when ready):

```env
USE_AIRWALLEX=true
NEXT_PUBLIC_USE_AIRWALLEX=true
AIRWALLEX_SANDBOX=true
AIRWALLEX_CLIENT_ID=your_client_id
AIRWALLEX_API_KEY=your_api_key
```

3. API base URL is chosen automatically:
   - `AIRWALLEX_SANDBOX=true` → `https://api-demo.airwallex.com`
   - `AIRWALLEX_SANDBOX=false` → `https://api.airwallex.com`

## 2. Dashboard IDs (copy into `.env`)

| Variable | Where in Airwallex web app |
|----------|---------------------------|
| `AIRWALLEX_CLIENT_ID` | **Account → Developer → API keys** (sandbox/live web app; Client ID on the key row) |
| `AIRWALLEX_API_KEY` | Same page — create/copy API key (never commit) |
| `AIRWALLEX_LEGAL_ENTITY_ID` | **Settings → Legal entities** — open your entity → ID starts with `le_` |
| `AIRWALLEX_PAYMENT_ACCOUNT_ID` | **Settings → Account details → Account information** — linked payment account ID starts with `acct_` |

Required when you have more than one legal entity or payment account; the checkout API rejects requests without them.

## 3. Create $9 / $49 recurring prices (dashboard)

**Billing vs Payments (do not mix these up)**

| Area | Left menu (typical) | What it is for |
|------|---------------------|----------------|
| **Billing** | **Billing** → **Products**, **Customers**, **Subscriptions** | Catalog (products/prices), recurring subs, invoices |
| **Payments** | **Payments** → **Get started**, payment methods | Card/APMs acceptance — apply separately; not where you create subscription plans |

Official overview: [Get started with billing](https://www.airwallex.com/docs/billing/get-started-with-billing) · [Payments access](https://help.airwallex.com/hc/en-gb/articles/900006304303)

**Open the correct web app**

| Environment | Login URL | API host (for `.env` `AIRWALLEX_SANDBOX`) |
|-------------|-----------|-------------------------------------------|
| Sandbox (test) | https://demo.airwallex.com/app/ | `true` → `https://api-demo.airwallex.com` |
| Live | https://www.airwallex.com/app/ | `false` → `https://api.airwallex.com` |

Products/prices created in sandbox **do not** appear in live (and vice versa). Create both if you test then go live.

**Step-by-step (no code) — two products, monthly recurring**

1. Log in (sandbox or live URL above).
2. In the **left sidebar**, open **Billing** (not **Payments**). If you only see **Payments**, Billing may not be enabled yet — see [Activate Billing](https://help.airwallex.com/hc/en-gb/articles/14622748737039) and contact Airwallex support if there is no Billing section.
3. Click **Products** (docs call this the “products app”).
4. Click **New product** (top right).
5. **Product 1:** Name `AI Empire Insider` → **Create product**.  
   **What you should see:** A table row for the product; clicking it opens a **drawer** on the right with product details.
6. In that drawer, click **New price**.
7. Set: **Recurring** · **USD** · **Monthly** · pricing model **Flat** (or fixed amount) · **$9.00** · billing type **In advance** (default) → **Create price**.
8. Click the new price in the drawer’s price table → copy **Price ID** (`pri_...`) → `AIRWALLEX_PRICE_INSIDER` in `.env` / Coolify.
9. Back to **Products** list → **New product** again.
10. **Product 2:** Name `Wholesale GHL` → **Create product** → **New price** → **$49.00** / month (same settings as step 7) → copy `pri_...` → `AIRWALLEX_PRICE_WHOLESALE`.

Help article (same flow): [Customers, products, and prices](https://help.airwallex.com/hc/en-gb/articles/14622840540943) · API reference: [Products](https://www.airwallex.com/docs/billing/billing-components/products) · [Prices](https://www.airwallex.com/docs/billing/billing-components/prices)

**Optional:** **Billing** → **Billing settings** to set default currency (USD), payment account, and dunning — [Configure billing settings](https://www.airwallex.com/docs/billing/configure-your-billing-settings).

**If Products / New product is missing**

- You are under **Payments** instead of **Billing**.
- Account still in **KYC/KYB review** or Payments not approved — complete **Payments** → **Get started** if you need online collection ([KYC prep](https://help.airwallex.com/hc/en-gb/sections/8352632554767-Preparing-KYC-Documentation)).
- Wrong environment (sandbox login vs live keys).
- Wrong business in the org/account switcher (top of app) — products are per account.
- Sandbox sub-account stuck “In review”: entity name must be **New Business Sandbox** or **Sandbox Business** ([sandbox overview](https://www.airwallex.com/docs/developer-tools/sandbox-environment/sandbox-environment-overview)).

**API fallback (if UI hidden)** — credentials in `.env`; no values in git.

1. `POST /api/v1/authentication/login` — headers `x-client-id`, `x-api-key` (sandbox: `https://api-demo.airwallex.com/...`).
2. `POST /api/v1/products/create` — body `name`, `request_id` (unique).
3. `POST /api/v1/prices/create` — body `product_id`, `currency` `USD`, `pricing_model` `FLAT`, `flat_amount` `9` or `49`, `recurring` `{ "period": 1, "period_unit": "MONTH" }`, `request_id`.
4. `GET /api/v1/prices` — list and copy `pri_...` IDs.

Docs: [Create product](https://www.airwallex.com/docs/api/billing/products/create) · [Create price](https://www.airwallex.com/docs/api/billing/prices/create) · [List prices](https://www.airwallex.com/docs/api/billing/prices/list)

## 4. Webhook

1. **Account → Developer → Webhooks → New webhook** (or `/app/developer` in the web app)
2. **Notification URL:** `https://benjisaiempire.com/api/airwallex/webhook`
3. **API version:** `2025-06-16` or later (Billing events)
4. Subscribe to (minimum):
   - `billing_checkout.completed`
   - `subscription.created`
   - `subscription.active`
   - `subscription.modified`
   - `subscription.cancelled`
   - `subscription.unpaid`
5. Copy the webhook **secret** → `AIRWALLEX_WEBHOOK_SECRET`

Signature: `HMAC-SHA256` over `x-timestamp` + raw JSON body (`x-signature` header). See [Listen for webhook events](https://www.airwallex.com/docs/developer-tools/webhooks/listen-for-webhook-events).

Whitelist Airwallex IPs on your firewall if applicable ([docs](https://www.airwallex.com/docs/developer-tools/webhooks/listen-for-webhook-events)).

## 5. Database

```bash
cd benjisaiempire-app
npx prisma db push
# or: npx prisma migrate dev --name airwallex_billing_fields
```

New `User` fields: `paymentProvider`, `airwallexBillingCustomerId`, `airwallexSubscriptionId` (Stripe columns unchanged for existing subscribers).

## 6. App routes

| Route | Purpose |
|-------|---------|
| `GET/POST /api/airwallex/checkout?tier=INSIDER\|WHOLESALE` | Hosted Billing Checkout redirect |
| `POST /api/airwallex/webhook` | Tier / status sync |
| `GET /api/airwallex/portal` | Redirects to `/portal#manage-billing` |
| `POST /api/airwallex/cancel` | Cancel at period end or immediately |

Portal shows cancel forms when `USE_AIRWALLEX=true` and the user has `airwallexSubscriptionId`.

## 7. Post-payment access (Insider $9)

After successful payment, Airwallex should fire **`billing_checkout.completed`**. The app then:

1. Sets `User.tier` to `INSIDER` and `subscriptionStatus` to `ACTIVE` in Supabase
2. Sends a **magic-link email** (Resend) with redirect to `/portal`
3. After sign-in, `/learn/*` and member features require `INSIDER` (middleware)

**Production checkout verified working** (2026-05-21): `/checkout/insider` → Airwallex hosted URL.

**Required for access to work every time:** webhook in the **live** Airwallex dashboard pointing to `https://benjisaiempire.com/api/airwallex/webhook` with the same `AIRWALLEX_WEBHOOK_SECRET` as Netlify. Test one real $9 payment and confirm magic-link email + `tier=INSIDER` in Supabase.

## 8. Cutover checklist

- [x] Live checkout redirect for Insider (guest email → Airwallex)
- [ ] Sandbox checkout for Insider + Wholesale
- [ ] Webhook delivers `billing_checkout.completed` → user tier `INSIDER` / `WHOLESALE` in DB
- [ ] Cancel at period end + immediate cancel tested
- [ ] Production keys + `AIRWALLEX_SANDBOX=false`
- [ ] Coolify env vars set (no secrets in git)
- [ ] Existing Stripe subscribers: leave `USE_AIRWALLEX` off until migrated, or migrate manually in admin

## 8. Deprecating Stripe

Do **not** remove Stripe until:

1. All active subs are on Airwallex (or churned), and
2. Stripe webhook endpoint can be disabled.

Then set `USE_AIRWALLEX=true` in production and optionally remove Stripe env vars from Coolify (keep webhook route if legacy subs still renew).
