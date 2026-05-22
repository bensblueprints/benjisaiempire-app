---
title: Professional Email (~$1)
summary: Set up hello@yourdomain.com so prospects reply to a real business address.
sortOrder: 3
---

## Lesson 3.1 — Create the mailbox

**Watch:** [Setting Up Space Mail Email](https://www.youtube.com/watch?v=qyrj-SILyB8)

Use Spaceship email, Cloudflare Email Routing, or forward to Gmail — pick one stack and finish it today.

**Minimum**
- `hello@` or `ben@` on your domain
- Display name: your real name + agency name

**Checklist**
- [ ] Send test email to yourself
- [ ] Receive test from Gmail/Outlook — not spam folder

## Lesson 3.2 — Signature that converts

```
Your Name
Website Redesigns · Free Mockup, $500 if you love it
(757) xxx-xxxx
yourdomain.com
```

**Checklist**
- [ ] Signature on all outbound mail
- [ ] Phone number matches what you dial from (or GHL tracking number)

## Lesson 3.3 — SPF / DKIM sanity check

Follow your registrar's DNS wizard so Gmail trusts your domain.

**Checklist**
- [ ] SPF record present in Cloudflare DNS
- [ ] DKIM enabled if your host provides it
- [ ] "Send as" configured if using Gmail with custom domain
