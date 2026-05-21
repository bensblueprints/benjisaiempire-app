---
title: Cloudflare DNS
summary: All records in one place — apex, www, email, and client sites later.
sortOrder: 4
---

## Lesson 4.1 — Add your domain

1. Cloudflare → **Add a site** → enter domain
2. Choose **Free** plan
3. Paste nameservers at Spaceship (Module 2)

**Checklist**
- [ ] Site shows **Active** in Cloudflare
- [ ] SSL/TLS → **Full** or **Full (strict)** once origin is live

## Lesson 4.2 — Records you need today

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A or CNAME | `@` | your landing host | per host |
| CNAME | `www` | same as apex | optional |
| MX | `@` | per email provider | DNS only |
| TXT | `@` | SPF for email | DNS only |

**Checklist**
- [ ] Apex loads your site (or placeholder)
- [ ] `www` redirects or mirrors apex
- [ ] Email still works after DNS cutover

## Lesson 4.3 — Client sites later

When a client pays, you will add **their** domain to Cloudflare or CNAME to Netlify/Coolify.

**Checklist**
- [ ] Document your default hosting target (Netlify, Coolify, etc.)
- [ ] Save a **duplicate DNS template** screenshot for speed
