# Stop Using Netlify. Here's the Stack I Run Every Web Project On.

> Empire OS — Fulfillment & Ops · After You Get A Client

Netlify is "free" until someone spams your contact form for 6 hours and you wake up to a $400 bill. I've watched it happen to clients more than once. Serverless function invocations and bandwidth overages do not care that you're a small business.

Here's the stack I deploy every site on now. Predictable monthly cost, no surprise overages, full root access, no vendor lock-in.

## The stack

- **Contabo VPS**, around $5 to $7 a month for 4 vCPU and 8 GB RAM. The hardware budget VPS providers can't touch.
- **Coolify**, free and open source. Self-hosted Vercel/Heroku replacement. Git push to deploy, automatic SSL, 280+ one-click services.
- **Spaceship** for the domain, around $9 a year for a .com. Owned by Namecheap, cheaper than Namecheap.
- **Spacemail** for business email, $0.59 to $1 a month per mailbox. IMAP, SMTP, calendar, aliases.
- **Cloudflare** for DNS, free. DDoS protection, WAF, caching, the whole thing.
- **Database** runs on the same VPS through Coolify. Postgres, MySQL, Redis, Mongo, all one click. No external bill.

## What it actually costs

One VPS at around $6 a month hosts dozens of client sites, their databases, their staging environments, and Coolify itself. Domain $9 a year. Email $12 a year per mailbox. That's it. Compare that to Netlify Pro at $19 per site per month plus per-seat charges plus bandwidth overages plus form submission limits.

## What you give up

You're now responsible for your server. Updates, backups, basic Linux comfort. If that scares you, stay on Netlify. If it doesn't, you save thousands a year and own your infrastructure.

Below is the exact step-by-step I follow to take a fresh Contabo VPS to "Claude Code can ship to it" in about 45 minutes.

---

## Phase 1: Provision the VPS (5 minutes)

1. Buy a **Contabo Cloud VPS 10** or larger. Pick **Ubuntu 24.04 LTS**. Pick a region close to your customers (US for US clients).
2. When the email arrives with your root password, SSH in:
   ```
   ssh root@YOUR_VPS_IP
   ```
3. First thing, change the root password:
   ```
   passwd
   ```

## Phase 2: Lock down the server (10 minutes)

You don't want bots brute-forcing your root login on day one.

1. Update the system: `apt update && apt upgrade -y`
2. Create a non-root user: `adduser ben` then `usermod -aG sudo ben`
3. Set up SSH keys from your local machine: `ssh-copy-id ben@YOUR_VPS_IP`
4. Disable password login and root SSH. Edit `/etc/ssh/sshd_config`:
   ```
   PermitRootLogin no
   PasswordAuthentication no
   ```
   Then: `systemctl restart ssh`
5. Open a new terminal and verify you can SSH in as your user before closing the root session.
6. Set up the firewall (UFW):
   ```
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 8000/tcp
   sudo ufw allow 6001/tcp
   sudo ufw allow 6002/tcp
   sudo ufw enable
   ```
7. Install fail2ban: `sudo apt install fail2ban -y && sudo systemctl enable --now fail2ban`

## Phase 3: Install Coolify (5 minutes)

```
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Wait for it to finish. Open `http://YOUR_VPS_IP:8000`. Register your admin account immediately — anyone who hits that URL first becomes admin.

## Phase 4: Buy and connect the domain (5 minutes)

1. Buy your domain at spaceship.com (~$9 for a .com).
2. In Spaceship: Domain Manager → open domain → Nameservers → switch to Custom.
3. Sign up for Cloudflare, click Add a site, paste your domain.
4. Cloudflare gives you two nameservers. Paste those into Spaceship's custom nameserver fields.
5. Wait 5–30 minutes for propagation. Cloudflare emails when it's active.

## Phase 5: Point DNS at your VPS (2 minutes)

In Cloudflare → DNS → Records:

- A `@` → YOUR_VPS_IP — Proxied (orange)
- A `www` → YOUR_VPS_IP — Proxied
- A `coolify` → YOUR_VPS_IP — DNS only (gray)
- A `*` → YOUR_VPS_IP — Proxied

The wildcard `*` means every subdomain you spin up later resolves automatically. The `coolify` subdomain stays gray-cloud so Coolify can issue Let's Encrypt certs without proxy interference.

In Cloudflare, set SSL/TLS mode to **Full (strict)**.

## Phase 6: Secure the Coolify dashboard (5 minutes)

1. In Coolify → Settings → Instance's Domain: `https://coolify.yourdomain.com`
2. Save. Coolify issues a Let's Encrypt cert and reloads on the new URL.
3. `http://YOUR_VPS_IP:8000` now redirects to your secure dashboard.

## Phase 7: Set up Spacemail (5 minutes)

1. Spaceship → Spacemail section. Pick a plan ($1/mo Starter is fine).
2. Spaceship gives you the MX, SPF, and DKIM records to add.
3. Add to Cloudflare DNS:

| Type | Name | Content | Priority |
|------|------|---------|----------|
| MX | @ | mx1.spacemail.com | 10 |
| MX | @ | mx2.spacemail.com | 20 |
| TXT | @ | `v=spf1 include:spf.spacemail.com ~all` | n/a |
| TXT | spacemail._domainkey | (DKIM key from Spaceship) | n/a |

4. Send a test email.

## Phase 8: Deploy your first app (10 minutes)

1. Coolify → Sources → Add New → GitHub App. Install on your account.
2. + New → Application → pick repo + branch.
3. Coolify auto-detects the framework. Confirm.
4. Set the domain (e.g., `myapp.yourdomain.com`). Wildcard DNS handles it. SSL is automatic.
5. Add env vars in the Coolify UI.
6. Click Deploy.

Every git push from now on auto-deploys. PRs can preview-deploy. Rollback is one click.

## Phase 9: Add a database (2 minutes)

1. + New → Database → pick Postgres / MySQL / Redis / Mongo.
2. Coolify generates credentials. Internal hostname = container name. Accessible from your app on the Docker network. No public exposure, no extra bill.
3. Reference it: `DATABASE_URL=postgres://user:pass@postgresql-xyz:5432/db`

## Phase 10: Make it ready for Claude Code (5 minutes)

1. **Coolify API token**: Dashboard → Keys & Tokens → API Tokens → Create. Save in your password manager + project's `.env.local`.
2. **Deploy webhook**: Application → Webhooks tab. Copy the URL. After build/push, hit it: `curl -X POST $COOLIFY_DEPLOY_WEBHOOK`.
3. **Drop a CLAUDE.md** at the repo root:
   ```
   # Deployment
   This project deploys to Coolify on Contabo VPS via GitHub.
   - Production URL: https://myapp.yourdomain.com
   - Deployment: auto on push to main
   - Manual redeploy: curl -X POST $COOLIFY_DEPLOY_WEBHOOK
   - Env vars: managed in Coolify UI, not in repo
   - Database: Postgres, internal hostname postgresql-xyz
   - Logs: Coolify dashboard > Application > Logs tab
   ```

## Phase 11: Backups

Coolify does not back up automatically until you turn it on.

1. Coolify → Settings → Backups.
2. Connect S3-compatible bucket. Cloudflare R2 is cheapest (no egress).
3. Set daily backups for databases + Coolify config.
4. Test a restore once before you need it.

## Phase 12: What you now have

- VPS hosting unlimited apps for one flat fee
- Auto-deploy on git push
- Free SSL on every subdomain forever
- Wildcard DNS — every new project is one Coolify click
- Business email on your custom domain
- DDoS protection + WAF via Cloudflare
- Private databases at no extra cost
- Full root access, real logs, SSH any time
- Claude Code can ship straight to it via webhook

**When traffic grows:** spin up a second Contabo VPS, add it to the same Coolify instance as a remote server, pin the heavy app to the new node. Horizontal scaling without changing the workflow.

**When contact form spam hits:** nothing. You're not paying per request. Add Cloudflare Turnstile (free), problem solved.

That's the whole stack. Build it once, deploy on it for years.
