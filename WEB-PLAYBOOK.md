# Artist Website Playbook
Built from the DOMINO / whoisdomino.com project. Use this as the baseline for every new artist site.

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 App Router | File-based routing, RSC, built-in image opt, Vercel-native |
| Language | TypeScript | Catches errors before they ship |
| Styling | Tailwind CSS v4 | Utility-first, no CSS files to maintain |
| Animations | Framer Motion | `motion.div` with `initial/animate/whileInView` — smooth and simple |
| UI primitives | shadcn/ui (Radix) | Accessible Sheet, Dialog, Separator, Button out of the box |
| Icons | Lucide React | Tree-shakable, consistent |
| Deployment | Vercel | Auto-deploys from `main`, env vars in dashboard |
| Email signups | Mailchimp API | `/api/subscribe` route, MD5 hash for member tagging |

---

## Folder Structure

```
src/
  app/
    layout.tsx          ← root layout: fonts, metadata, JSON-LD schema, global providers
    globals.css         ← design tokens (OKLCH colors, fonts, utilities)
    (main)/             ← route group — all user-facing pages share layout
      page.tsx          ← home page (one-page scroll with section anchors)
      layout.tsx        ← (main) layout: Sidebar + MobileNav + padding
      traumatica/       ← album-specific page
      circle/           ← community page
      merch/            ← merch page
      press/            ← press kit / EPK
      support/          ← GoFundMe + merch
      music/            ← streaming links
      videos/           ← video embeds
      legacy-era/       ← redirect / campaign page
      feed/             ← redirect to home
  components/
    layout/
      Sidebar.tsx       ← desktop top navbar
      MobileNav.tsx     ← mobile header + bottom tab bar
      SocialBar.tsx     ← social/streaming icon strip
    ui/                 ← shadcn components + custom (ScrollProgress, CursorGlow)
  hooks/
    use-auth.ts         ← stub auth (returns null until real auth needed)
  lib/
    utils.ts            ← cn() helper
  utils/
    constants.ts        ← NAV_ITEMS, STREAMING_PLATFORMS, SOCIAL_LINKS, SHOPIFY_STORE_URL
  app/api/
    subscribe/route.ts  ← Mailchimp signup endpoint
public/
  logomark.png          ← artist logo (inverted via CSS filter for dark bg)
  logotype.png
  og-image.jpg          ← 1200×630 for social sharing
  dominopressphoto.JPG  ← artist press photo (used in JSON-LD schema)
  traumatica-cover.png  ← album art
  websitebackground.png ← subtle texture
```

---

## Design System (adapt colors per artist)

### Color tokens (in `globals.css` as CSS vars, OKLCH)
```css
--primary: oklch(0.55 0.18 45);   /* burnt orange — replace with artist color */
--background: oklch(0.98 0.01 85); /* near-white warm cream */
--foreground: oklch(0.12 0.02 50); /* near-black warm */
--sidebar: same as background
```

### Fonts (loaded in `layout.tsx` via `next/font/google`)
- **Heading:** Cormorant Garamond — editorial, timeless
- **Body:** Outfit — clean, modern
- **Mono:** JetBrains Mono — data/labels

### Design patterns
- Film grain overlay on `<body>` via CSS `::after` pseudo-element
- `glow-brand` utility class: `box-shadow: 0 0 20px oklch(primary / 0.4)`
- Text gradients: `.text-gradient-brand`, `.text-gradient-gold`
- Section alternation: `.section-alt` gives subtle background shift

---

## Navigation Architecture

The home page is one long scroll with anchor sections (`#hero`, `#music`, `#videos`, `#merch`, `#circle`).

Nav items in `constants.ts` use `href: "#section"` — on the home page they scroll smoothly, on other pages they link to `/#section`.

```ts
// NAV_ITEMS shape
{ label: "Home", href: "#hero", icon: "Home" }
```

**Sidebar** (desktop): fixed top bar, reads `pathname`, uses `IntersectionObserver` to highlight active section.
**MobileNav**: fixed header (hamburger → Sheet) + fixed bottom tab bar (5 quick-access buttons).

Both components handle:
- `isHome` check → scroll behavior vs. link behavior
- `activeSection` state via `IntersectionObserver`
- TRAUMATICA album link hidden with `{false && ...}` until launch

---

## Pages Checklist (for a new artist)

### Required
- [ ] `/` — Home (hero, music, videos, merch, community sections)
- [ ] `/merch` — Product grid (link out to Shopify, no storefront API needed)
- [ ] `/support` — GoFundMe card + merch card
- [ ] `/circle` — Community (email signup, event info, social links)
- [ ] `/press` — EPK (bio, stats, press features, photos, streaming, socials, contact)

### Optional / launch later
- [ ] `/traumatica` (or `/[album-slug]`) — Album page with waterfall track reveal
- [ ] `/music` — Streaming links page
- [ ] `/videos` — Video embeds
- [ ] `/legacy-era` — Campaign/redirect page
- [ ] `/games/*` — Interactive fan experiences

---

## Email Signup (Mailchimp)

`/api/subscribe/route.ts` — accepts `{ email, source }` POST.
- Validates email format
- Adds to Mailchimp audience as `subscribed`
- Tags subscriber with `"DOMINO WEBSITE"` (change tag per artist)
- Returns `{ success, message, alreadySubscribed }`

Required env vars:
```
MAILCHIMP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx-us14
MAILCHIMP_AUDIENCE_ID=xxxxxxxxxx
MAILCHIMP_SERVER_PREFIX=us14
```

Add to `.env.local` AND Vercel dashboard > Project Settings > Environment Variables.

Call pattern in components:
```ts
const res = await fetch("/api/subscribe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, source: "circle" }),  // source = page/context
});
const data = await res.json();
if (res.ok || data.alreadySubscribed) setSubmitted(true);
```

---

## SEO / Schema Markup

In `src/app/layout.tsx`, inject JSON-LD via `<script type="application/ld+json">`.

Use `@graph` with multiple nodes:
1. **`["MusicGroup", "Person"]`** — artist entity (or `["Organization", "Person"]` for other creators)
2. **`WebSite`** — with `publisher` back-ref to artist
3. **`MusicAlbum`** (one per album, nested in artist `album` array)
4. **`Organization`** — for any label/collective the artist founded

Key fields for Google Knowledge Panel:
- `name` + `alternateName` (all handle variants)
- `image` — hosted portrait photo in `/public` (portrait, no text, high res)
- `description` — pulled from real bio copy
- `genre` — include all applicable genres
- `sameAs` — ALL social + streaming profile URLs (Spotify, Apple Music, IG, TikTok, YouTube, SoundCloud, Threads, Twitter)
- `contactPoint` — press/booking email

Validate at: https://validator.schema.org (paste the live URL)
Submit for recrawl: Google Search Console > URL Inspection > Request Indexing

---

## Shopify Integration (no storefront API)

Products are hardcoded in `merch/page.tsx` with Shopify CDN image URLs.
All "Shop Now" buttons link directly to product URLs on `myshopify.com`.
`SHOPIFY_STORE_URL` in `constants.ts` for the store homepage link.

When to use Storefront API instead: only if the artist needs cart functionality, inventory sync, or real-time pricing. For a link-out approach, hardcoding is simpler and has zero API dependencies.

---

## Launch Checklist

- [ ] `og-image.jpg` (1200×630) in `/public`
- [ ] `logomark.png` in `/public`
- [ ] Artist press photo in `/public` (used for JSON-LD `image`)
- [ ] All `href="#"` placeholders replaced with real links
- [ ] All `[PLACEHOLDER]` text replaced in copy
- [ ] Mailchimp env vars set in `.env.local` AND Vercel dashboard
- [ ] Google Search Console: site verified, sitemap submitted (`/sitemap.xml`)
- [ ] `npm run build` passes clean (zero errors, zero warnings)
- [ ] Schema validated at schema.org/validator
- [ ] Hard refresh test on mobile (tab bar, sheet nav, scroll anchors)

---

## Decisions & Lessons Learned

### What worked well
- **One-page scroll architecture** — keeps fans on one URL, bounce rate drops, nav feels native
- **`{false && ...}` pattern** — hide unreleased features without deleting code; easy to restore
- **Hardcoded Shopify product data** — no API, no rate limits, no auth, instant page loads
- **Mailchimp tagging by source** — `source: "circle"` vs `source: "traumatica"` segments the list automatically
- **OKLCH color system** — perceptually uniform, easy to swap artist primary color without cascade problems
- **IntersectionObserver for active nav** — no scroll event listeners, smooth and performant
- **`@graph` JSON-LD** — multiple schema nodes in one script tag, cleaner than separate injections

### What to do differently next time
- **Set up Mailchimp env vars BEFORE launch** — the form silently fails if they're missing; add a visible warning state
- **Verify og-image dimensions early** — 1200×630 is non-negotiable for clean social previews
- **Press photos in `/public` from day one** — the schema `image` field matters for Google; don't use the OG banner
- **Don't over-build before real content exists** — placeholder sections (games, feed, kickstarter tiers) create clutter and confusion; launch lean, add when ready
- **`npm run build` after every batch of changes** — catches TypeScript and import errors before they reach Vercel

### Common pitfalls
- Duplicate named imports (e.g. `ShoppingBag` imported twice) → build fails silently in dev, breaks on Vercel
- `href="#"` left on live buttons → embarrassing dead links; audit before every push
- Browser cache hiding live changes → tell client to Cmd+Shift+R before reporting "it didn't work"
- `KICKSTARTER_TIERS` / dead constants — clean them when the feature is cut, not "later"
