# Database: Supabase Postgres

## Required environment variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | 1Password, local `.env`, Coolify | App runtime — Supabase **Transaction** pooler (port **6543**, `pgbouncer=true`) |
| `DIRECT_URL` | Same | Prisma migrations, `db push`, Studio — **Session** pooler or direct (port **5432**) |

Copy URI strings from **[Supabase → Database settings](https://supabase.com/dashboard/project/awjfvgvppggwqjtfaswk/settings/database)** (project `awjfvgvppggwqjtfaswk`). Do not commit real passwords.

Other app env vars are unchanged (see `.env.example`). For Airwallex subscriptions instead of Stripe, see **[AIRWALLEX.md](./AIRWALLEX.md)**.

## First-time setup checklist

1. **Supabase** — Project `awjfvgvppggwqjtfaswk` is ready. Save the database password in 1Password.
2. **Connection strings** — In [Database settings](https://supabase.com/dashboard/project/awjfvgvppggwqjtfaswk/settings/database), copy:
   - **Transaction pooler** → `DATABASE_URL` (port 6543; ensure `?pgbouncer=true`)
   - **Direct connection** → `DIRECT_URL` (`db.awjfvgvppggwqjtfaswk.supabase.co:5432`)
3. **Local `.env`** — `cp .env.example .env`, replace `[YOUR-PASSWORD]` and `[REGION]` (pooler hostname from dashboard) in both URLs.
4. **Apply schema** (no migration history yet):
   ```bash
   cd benjisaiempire-app
   npm install
   npx prisma db push
   ```
   Or create tracked migrations (recommended before production data):
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Seed** (optional): `npm run seed-curriculum`
6. **Coolify** — Add `DATABASE_URL` and `DIRECT_URL` to the app service environment; redeploy. The container runs `prisma db push` on start (uses `DIRECT_URL` via `directUrl` in `schema.prisma`).
7. **Retire local DB password** — If `docker-compose.yml` ever committed `POSTGRES_PASSWORD: b3njiL0cked!42`, rotate that password anywhere it was used and prefer Supabase only.

## Local dev without Supabase

```bash
docker compose --profile local-db up
```

Set both `DATABASE_URL` and `DIRECT_URL` to the local URL (see commented lines in `.env.example`). Set `POSTGRES_PASSWORD` in `.env` for the `db` service.

## Useful commands

```bash
npm run db:push      # sync schema (uses DIRECT_URL)
npm run db:migrate   # deploy migrations (production)
npm run db:studio    # Prisma Studio
```
