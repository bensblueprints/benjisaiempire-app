---
name: website-redesign
description: >
  Triggered when the user asks to redesign, rebuild, or remake a website (usually with a URL).
  Executes a full autonomous pipeline: creates a GitHub repo first, deploys blank code to Netlify so
  the deployment pipeline is wired before any building begins, then builds a stunning frontend using
  Framer Motion, the frontend-design skill, premium UX/UI craft, and components pulled from the
  21st.dev MCP server. If the client offers any kind of bookings, appointments, sessions, classes,
  consultations, or reservations, also builds a complete booking backend with calendar views, time
  slot management, availability rules, and admin controls. Do not ask for clarification, execute the
  full pipeline end to end.
allowed-tools: Read, Write, Bash, Glob, WebFetch, WebSearch
---

# Website Redesign Pipeline

## Trigger

Any of the following triggers this skill:
- `/redesign <url>`
- "rebuild this site"
- "redesign this website"
- "remake this for me"
- User pastes a URL and asks for a new version of it

Execute the full pipeline below autonomously. Make all creative and technical decisions independently. Report progress at the end of each phase. Do not stop to ask questions unless the site is completely inaccessible.

---

## Pipeline Order (Strict)

```
Phase 1 → GitHub repo creation (FIRST, before anything else)
Phase 2 → Netlify blank deploy (deployment wired up before building)
Phase 3 → Scrape source site and audit
Phase 4 → Design strategy lock-in
Phase 5 → Frontend build (Framer Motion + frontend-design skill + 21st.dev MCP)
Phase 6 → Booking backend (only if client takes bookings of any kind)
Phase 7 → Push, redeploy, final report
```

The order matters. GitHub and Netlify come BEFORE building so the deployment pipeline is ready, every commit auto-deploys, and the client sees progress live as the site is built.

---

## Phase 1: GitHub Repo Creation

This runs first. Before scraping, before designing, before any code generation.

### 1A. Determine project name

Slugify the business name (or the domain if business name not yet known) into a kebab-case repo name:
`smith-plumbing-redesign`, `northstar-dental-redesign`, etc.

### 1B. Create the local project folder

```bash
mkdir -p project/site
cd project/site
git init
git branch -M main
```

### 1C. Drop in a minimal placeholder

Create a temporary `index.html` and `README.md` so the first commit has content and Netlify has something to deploy:

```bash
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Coming Soon</title>
<style>
  body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; background: #0a0a0a; color: #fafafa; }
  h1 { font-weight: 300; letter-spacing: 0.02em; }
</style>
</head>
<body>
<h1>Building something new.</h1>
</body>
</html>
EOF

cat > README.md << 'EOF'
# Website Redesign

In progress. Deploy pipeline wired to Netlify before frontend build begins.
EOF

git add .
git commit -m "init: deployment placeholder"
```

### 1D. Create the GitHub repo via gh CLI

```bash
gh repo create <project-slug> \
  --private \
  --source=. \
  --remote=origin \
  --push
```

If `gh` is not authenticated or not installed, output the exact manual commands the user needs to run and continue. Do not stop the pipeline.

### 1E. Capture the repo URL

Store the GitHub repo URL. You'll need it for the Netlify connection in Phase 2 and the final report.

---

## Phase 2: Netlify Blank Deploy

The point of this phase: wire up the entire deployment pipeline before writing a single component. Every git push from here on auto-deploys. The client can see the site evolve in real time.

### 2A. Check for Netlify CLI

```bash
netlify --version || npm install -g netlify-cli
```

### 2B. Authenticate (if needed)

```bash
netlify status || netlify login
```

If running headless and login is interactive, output the manual login command for the user and pause that specific step. Continue the rest of the pipeline locally.

### 2C. Link and deploy the placeholder

From inside `project/site`:

```bash
# Initialize Netlify site linked to the GitHub repo
netlify init --manual

# Or if already linked, deploy the placeholder
netlify deploy --prod --dir=.
```

When prompted, choose:
- Create and configure a new site
- Team: the user's default team
- Site name: same as the GitHub repo slug
- Build command: leave blank for now (placeholder is static)
- Publish directory: `.`

### 2D. Capture the live URL

Store the `*.netlify.app` URL. The placeholder is now live. From this point on, every push to `main` auto-deploys.

### 2E. Add a netlify.toml for the upcoming Next.js build

Pre-write the config so Phase 5's first push deploys cleanly:

```bash
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
EOF

git add netlify.toml
git commit -m "chore: add netlify config for next.js"
git push origin main
```

---

## Phase 3: Scrape Source Site and Audit

### 3A. Fetch the target

Use WebFetch on the root URL. Discover internal pages from the nav and footer. Fetch up to 10 internal pages.

For each page, extract:
- Headings, body copy, CTAs
- Nav and footer items
- Phone, email, address, business hours
- All image URLs
- Color values from inline styles and linked CSS
- Font families from CSS and Google Fonts links
- Social media links
- Service or product list
- Testimonials
- **Booking indicators** (look for: "book now", "schedule", "appointment", "reservation", "calendly", "acuity", "calendar", "consultation", "session", "class schedule")

### 3B. Download images

```bash
mkdir -p project/scraped/images
mkdir -p project/site/public/images
# For each discovered image URL:
curl -L -o "project/scraped/images/image-N.ext" "<image_url>"
```

Skip tracking pixels and icons under 100px. Copy everything usable into `project/site/public/images/`.

### 3C. Build the content inventory

Write `project/scraped/content-inventory.json` with the full content map including a `takes_bookings: true|false` flag and a `booking_type` field (appointment, class, table reservation, consultation, rental, etc.).

### 3D. Write the audit

Write `project/scraped/audit.md` covering:
- What the business does (1 paragraph)
- Strengths and weaknesses of the current site
- UX problems observed
- Whether they accept bookings and how (Calendly, phone, contact form, in-person)
- Opportunities the redesign should capitalize on
- Design quality rating 1-10 with reasoning

---

## Phase 4: Design Strategy Lock-In

Before writing any frontend code, commit to a full design direction. Write to `project/site/DESIGN.md`.

### 4A. Load the frontend-design skill

This is mandatory. Read `/mnt/skills/public/frontend-design/SKILL.md` and follow it for all visual decisions. The frontend-design skill is the authority on:
- Avoiding generic AI aesthetic
- Production-grade craft level
- Color system construction
- Type pairing
- Layout signature choices

### 4B. Lock in the aesthetic direction

Pick ONE and commit fully. Do not blend:
- `luxury-refined` — dark palette, serif headings, gold accents, generous whitespace
- `bold-editorial` — oversized type, asymmetric layout, strong contrast
- `warm-organic` — earthy tones, rounded forms, approachable
- `technical-precision` — clean grid, monospace accents, data-forward
- `energetic-modern` — vivid color pops, kinetic layout
- `minimal-premium` — white space dominant, one accent, Swiss
- `industrial-utilitarian` — raw materials, heavy type, no-nonsense
- `retro-character` — nostalgic palette, hand-crafted

### 4C. Typography

Pick two Google Fonts that fit the aesthetic. NEVER use Inter, Roboto, Arial, Helvetica, Open Sans, Lato, or Space Grotesk.

Good display options: Playfair Display, Fraunces, DM Serif Display, Syne, Bebas Neue, Clash Display, Cabinet Grotesk, Instrument Serif, Cormorant, Unbounded.

Good body options: DM Sans, Plus Jakarta Sans, Outfit, Figtree, Nunito, Jost, Raleway, Source Serif 4.

### 4D. Color system

Define 5 CSS variables: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-surface`, `--color-text`. No generic Tailwind defaults. Derive from the business and the aesthetic.

### 4E. Motion strategy (Framer Motion)

Plan the animation language up front. Document which sections use:
- Stagger fade-up on entry
- Slide-in from side
- Scale reveal
- Parallax scroll
- Hover lift on cards
- Underline draw on links
- Path-draw on SVG accents
- Section pin and scrub for storytelling sections

### 4F. Layout signature

The one structural choice that makes the design memorable. Options: diagonal section breaks, full-bleed hero with text overlay, split-screen hero, offset grid cards, oversized number counters, sticky side nav, horizontal scroll section, magazine-style asymmetric columns.

Document all decisions in DESIGN.md before proceeding.

---

## Phase 5: Frontend Build

### 5A. Scaffold the Next.js project

Replace the placeholder with a real Next.js app. From inside `project/site`:

```bash
# Move placeholder out of the way
mkdir -p ../_placeholder_backup
mv index.html ../_placeholder_backup/ 2>/dev/null || true

# Scaffold Next.js in place
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-interactive \
  --use-npm

# Install the build dependencies
npm install \
  framer-motion \
  lucide-react \
  next-themes \
  sharp \
  react-hook-form \
  zod \
  @hookform/resolvers \
  sonner \
  clsx \
  tailwind-merge \
  date-fns

# shadcn/ui base
npx shadcn@latest init --defaults
npx shadcn@latest add button card input label textarea badge separator navigation-menu sheet dialog toast calendar popover select
```

### 5B. Pull components from the 21st.dev MCP server

The 21st.dev MCP server gives access to a large library of high-quality, pre-built React components. Use it heavily during this phase.

For every major section of the site, search the 21st.dev MCP for the best matching component before writing one from scratch:

- Hero sections: search "hero", "landing hero", "split hero"
- Feature grids: search "features", "bento grid"
- Testimonials: search "testimonials", "social proof"
- Pricing: search "pricing"
- FAQ: search "faq", "accordion"
- CTA blocks: search "cta", "call to action"
- Footers: search "footer"
- Navigation: search "navbar", "header"
- Stats: search "stats", "metrics"
- Team: search "team grid"
- Logo clouds: search "logo cloud"
- Booking widgets: search "booking", "appointment", "calendar"

Pull the component, drop it into `src/components/site/`, then customize:
1. Replace all dummy content with real scraped content from `content-inventory.json`
2. Replace placeholder images with the actual downloaded images
3. Recolor to match the locked design system (CSS variables only, no hardcoded hex)
4. Swap fonts to match the locked typography choices
5. Add Framer Motion animations per the motion strategy

Never use a 21st.dev component as-is. Every component must be re-skinned to the design system and re-populated with real content.

### 5C. Framer Motion — apply everywhere

Every major section gets motion. Use these patterns:

**Stagger fade-up on scroll:**
```tsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

<motion.div
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-80px" }}
>
  <motion.h2 variants={item}>...</motion.h2>
  <motion.p variants={item}>...</motion.p>
</motion.div>
```

**Hover lift on cards:**
```tsx
<motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: "easeOut" }}>
  ...
</motion.div>
```

**Scroll-linked parallax for hero images:**
```tsx
import { useScroll, useTransform, motion } from "framer-motion";

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 100]);

<motion.div style={{ y }}>
  <Image src="/images/hero.jpg" ... />
</motion.div>
```

**Path-draw on SVG accents:**
```tsx
<motion.path
  initial={{ pathLength: 0 }}
  whileInView={{ pathLength: 1 }}
  transition={{ duration: 1.4, ease: "easeInOut" }}
  viewport={{ once: true }}
/>
```

### 5D. Pages to build

Use the real scraped content. No lorem ipsum anywhere.

- `/` — Homepage with hero, services preview, social proof, CTA, footer
- `/about` — Story, team, values
- `/services` — Full services list
- `/services/[slug]` — One page per service with detail, FAQ, CTA
- `/contact` — Contact form (with Zod validation + API route), map, hours
- `/book` — Booking page (only if Phase 6 is active)

### 5E. Project structure

```
project/site/
  src/
    app/
      (site)/
        page.tsx
        about/page.tsx
        services/page.tsx
        services/[slug]/page.tsx
        contact/page.tsx
        book/page.tsx          ← only if bookings
      (admin)/
        admin/page.tsx          ← only if bookings
        admin/bookings/page.tsx
        admin/availability/page.tsx
        admin/login/page.tsx
      api/
        contact/route.ts
        bookings/route.ts       ← only if bookings
        availability/route.ts   ← only if bookings
    components/
      site/
      admin/
      ui/
    lib/
      utils.ts
      supabase.ts               ← only if bookings
  public/
    images/
  netlify.toml
  DESIGN.md
```

### 5F. Quality bar

Before moving on, every page must:
- Use real scraped content
- Pass mobile responsiveness at 375px
- Have Framer Motion on every major section
- Use only CSS variables for color (no inline hex)
- Use the locked Google Fonts (no Inter, Roboto, Arial, Helvetica, etc.)
- Have at least one signature layout moment from the design phase

---

## Phase 6: Booking Backend (Conditional)

Run this phase ONLY if `content-inventory.json` has `takes_bookings: true`. This applies to: appointment-based businesses (salons, dentists, lawyers, consultants), classes (yoga, fitness, music lessons), reservations (restaurants, tours), rentals (equipment, venues), sessions (therapists, coaches, tutors).

If the business does NOT take bookings, skip to Phase 7.

### 6A. Set up Supabase

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Create `src/lib/supabase.ts` with both server and client helpers.

### 6B. Schema — write to `supabase/schema.sql`

```sql
-- Admins
create table profiles (
  id uuid references auth.users primary key,
  role text default 'admin',
  name text,
  email text,
  created_at timestamptz default now()
);

-- Services or session types that can be booked
create table booking_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  duration_minutes integer not null,
  price_cents integer,
  buffer_before_minutes integer default 0,
  buffer_after_minutes integer default 0,
  active boolean default true,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Weekly recurring availability (e.g. Mon-Fri 9-5)
create table availability_rules (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  active boolean default true
);

-- One-off available slots (manually added by admin)
create table available_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  service_id uuid references booking_services(id) on delete cascade,
  created_at timestamptz default now()
);

-- Blocked time (holidays, vacations, lunch breaks)
create table blocked_times (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_at timestamptz default now()
);

-- Actual bookings made by customers
create table bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references booking_services(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  notes text,
  status text default 'confirmed', -- confirmed | cancelled | completed | no_show
  reference_code text unique,
  created_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table booking_services enable row level security;
alter table availability_rules enable row level security;
alter table available_slots enable row level security;
alter table blocked_times enable row level security;
alter table bookings enable row level security;

-- Public can read services and check availability
create policy "public_read_services" on booking_services for select using (active = true);
create policy "public_insert_bookings" on bookings for insert with check (true);

-- Admins can do everything
create policy "admin_all_services" on booking_services for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
-- Repeat the admin_all pattern for availability_rules, available_slots, blocked_times, bookings
```

### 6C. Customer-facing booking flow at `/book`

Three steps, single page, smooth transitions between them using Framer Motion's `AnimatePresence`.

**Step 1 — Pick a service:**
Grid of available booking_services. Each card shows name, duration, price. Hover lift animation. Click selects and advances.

**Step 2 — Pick a date and time:**
- Left side: calendar component (shadcn/ui calendar) showing the current month
- Days with available slots are highlighted; days fully booked or blocked are dimmed
- Click a day → right side reveals available time slots for that day
- Time slots animate in with a stagger fade
- Click a slot → advances to step 3

The availability for any given day is computed by:
1. Get the day's `availability_rules` for that `day_of_week`
2. Subtract any `blocked_times` that overlap
3. Subtract any existing `bookings` that overlap
4. Subtract any `buffer_before_minutes` and `buffer_after_minutes` from the selected service
5. Return slots in increments of the service duration

**Step 3 — Customer details:**
Form: name, email, phone, optional notes. Zod validation. On submit:
- POST `/api/bookings` with service_id, starts_at, customer details
- Backend re-validates that the slot is still available (race condition guard)
- Inserts the booking with a generated short reference code (e.g. `BK-7F3A2K`)
- Returns success → show confirmation screen with reference code and details
- Send confirmation email (optional, via Resend or similar; stub the integration if no key configured)

### 6D. Admin booking system at `/admin`

Auth-gate everything under `/admin` with Supabase auth middleware.

**Admin dashboard `/admin`:**
- Stats: bookings this week, bookings today, revenue this month, no-show rate
- Today's schedule (chronological list of today's bookings with customer name, service, time)
- Quick links to Bookings, Availability, Services

**Bookings manager `/admin/bookings`:**
- Calendar view (month/week/day toggle) showing all bookings
- Click a booking to open a side panel: full details, change status (confirmed/cancelled/completed/no_show), edit notes, cancel booking
- List view fallback with sortable columns, status filter, search by customer name/email
- Manual booking creation (admin adds a booking on behalf of a phone-in customer)

**Availability manager `/admin/availability`:**
Three tabs:

1. **Weekly rules** — set recurring availability per day of week. Add rule (Monday 9am-5pm). Add lunch break exception (Monday 12pm-1pm via blocked_times). Save → updates `availability_rules`.

2. **Custom time slots** — manually add one-off available slots that fall outside normal hours. Pick date, start time, end time, which service it's for. Save → inserts into `available_slots`.

3. **Blocked time** — calendar view where admin clicks and drags to block off time (holiday, vacation, sick day, lunch break). Save → inserts into `blocked_times`. Color-coded: red for blocked, gray for outside-availability.

**Services manager `/admin/services`:**
- List of booking_services with drag-to-reorder
- Add new service: name, description, duration, price, buffers, active toggle
- Edit/delete existing

### 6E. API routes

- `GET /api/availability?service_id=X&date=YYYY-MM-DD` → returns array of available time slot start times for that date
- `POST /api/bookings` → create a booking (with race-condition guard)
- `GET /api/bookings` → admin only, list all bookings with filters
- `PATCH /api/bookings/:id` → admin only, update status/notes
- `DELETE /api/bookings/:id` → admin only

### 6F. Admin login `/admin/login`

Clean email + password form. Supabase `signInWithPassword`. On success redirect to `/admin`. First admin user is created manually in Supabase Auth dashboard, then a row added to `profiles` with `role = 'admin'`.

---

## Phase 7: Push, Redeploy, Final Report

### 7A. Commit everything and push

```bash
cd project/site
git add .
git commit -m "feat: complete redesign with frontend, motion, and booking system"
git push origin main
```

Netlify auto-deploys. Wait for the build to complete.

### 7B. Set Netlify environment variables

If bookings were built, the user needs to add Supabase env vars to Netlify:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Output the exact commands or dashboard steps for the user to do this.

### 7C. Write the final report

Write `project/REDESIGN-REPORT.md`:

```markdown
# Redesign Report — {Business Name}

## Links
- Live site: {netlify url}
- GitHub repo: {repo url}
- Admin (if bookings): {netlify url}/admin

## What Was Scraped
- Pages scraped: {n}
- Images downloaded: {n}
- Booking system detected: {yes/no, type}

## Design Decisions
- Aesthetic: {choice}
- Display font: {font}
- Body font: {font}
- Primary color: {hex}
- Accent color: {hex}
- Layout signature: {choice}
- Motion language: {summary}

## Frontend Built
- [ ] Homepage
- [ ] About
- [ ] Services index
- [ ] {n} individual service pages
- [ ] Contact
- [ ] Book (if applicable)

## Components Sourced from 21st.dev
- {list of section types pulled and customized}

## Booking Backend (if built)
- [ ] Customer booking flow at /book
- [ ] Admin dashboard
- [ ] Booking calendar manager
- [ ] Weekly availability rules
- [ ] Custom time slots
- [ ] Blocked time
- [ ] Service manager
- [ ] Admin auth

## Deployment
- [ ] GitHub repo created
- [ ] Netlify site connected
- [ ] Auto-deploy on push to main
- [ ] netlify.toml configured for Next.js

## Next Steps for the Client
1. If bookings: create Supabase project, run supabase/schema.sql, add env vars to Netlify
2. Create the first admin user in Supabase Auth, then insert into profiles with role='admin'
3. Log into /admin and add booking services, set weekly availability
4. Review all scraped content on the live site, edit anything that needs adjustment
5. Connect a custom domain in Netlify
6. Replace any placeholder images with professional photography
```

### 7D. Summary output to user

After writing the report, output to the user:
- Live URL (clickable)
- GitHub repo URL
- Whether bookings were built
- The 3 most important next steps

---

## Error Handling

**Site blocks scraping (Cloudflare, 403, etc.):**
Tell the user: "The site at {url} is blocking automated access. Paste the homepage HTML directly into the chat and I'll continue from there." Then continue with whatever content they provide.

**gh CLI not authenticated:**
Output `gh auth login` instructions, complete the rest locally, give the user the exact commands to push manually later.

**Netlify CLI not authenticated:**
Output `netlify login` instructions, skip the deploy step, complete everything else, give the user the exact commands to deploy manually.

**21st.dev MCP server not available:**
Build components from scratch using the frontend-design skill. Note in the final report which sections were custom-built vs sourced.

**Image download fails:**
Log it, use a CSS gradient placeholder, continue.

**Always complete every phase, even with partial failures. A partial build is better than a stopped build.**

---

## Quality Checklist (run before Phase 7)

- [ ] GitHub repo exists with at least 2 commits
- [ ] Netlify site is live and auto-deploying
- [ ] netlify.toml configured for Next.js
- [ ] Every page uses real scraped content, zero lorem ipsum
- [ ] All downloaded images referenced with next/image
- [ ] CSS variables used consistently, no hardcoded hex
- [ ] All forms have Zod validation and API routes
- [ ] Framer Motion animations on every major section
- [ ] No generic fonts (Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Space Grotesk)
- [ ] At least 3 sections sourced and customized from 21st.dev MCP
- [ ] Mobile responsive at 375px
- [ ] If bookings: customer flow works end to end, admin can manage availability, race-condition guard in place
- [ ] REDESIGN-REPORT.md written and complete

---

## Example Invocation

```
/redesign https://northstardental.com
```

Claude executes:
1. Creates GitHub repo `northstar-dental-redesign`
2. Pushes a placeholder, deploys to Netlify, captures the live URL
3. Scrapes the site, downloads images, detects bookings (dental = yes, appointments)
4. Writes audit and content inventory
5. Locks in design direction (likely `minimal-premium` for a dental practice)
6. Scaffolds Next.js, installs Framer Motion + shadcn/ui
7. Pulls hero, features, testimonials, FAQ, footer from 21st.dev MCP, re-skins each
8. Builds all pages with real content and Framer Motion throughout
9. Builds the full booking backend: customer flow at /book, admin at /admin
10. Pushes to GitHub, Netlify rebuilds
11. Writes the final report
12. Hands the client the live URL, repo URL, and next steps
```
