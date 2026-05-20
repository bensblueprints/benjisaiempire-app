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
| `AIRWALLEX_CLIENT_ID` | **Settings → Developer → API keys** (Client ID on the key row) |
| `AIRWALLEX_API_KEY` | Same page — create/copy API key (never commit) |
| `AIRWALLEX_LEGAL_ENTITY_ID` | **Settings → Legal entities** — open your entity → ID starts with `le_` |
| `AIRWALLEX_PAYMENT_ACCOUNT_ID` | **Settings → Account details → Account information** — linked payment account ID starts with `acct_` |

Required when you have more than one legal entity or payment account; the checkout API rejects requests without them.

## 3. Create $9 / $49 recurring prices

1. **Billing → Products** → **Create product**
   - **AI Empire Insider** — description optional
   - **Wholesale GHL** — description optional
2. On each product, **Add price**:
   - **Recurring**, **USD**, **Monthly**
   - Insider: **$9.00** / month
   - Wholesale: **$49.00** / month
3. Open each price → copy **Price ID** (`pri_...`) into:
   - `AIRWALLEX_PRICE_INSIDER`
   - `AIRWALLEX_PRICE_WHOLESALE`

List prices via API: `GET /api/v1/prices` (with bearer token) if you prefer CLI over the UI.

## 4. Webhook

1. **Settings → Developer → Webhooks → New webhook**
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

## 7. Cutover checklist

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
