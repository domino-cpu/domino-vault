# Tasks

## Active

- [ ] **Connect progress bar to Shopify API** - auto-fill $100K goal bar on home page with real revenue data; needs Shopify API key added to `.env.local` and a Next.js API route built
  - Also connect donation platform once chosen (Ko-fi, PayPal, etc.) so all sources feed the same bar
  - File to update: `src/app/(main)/page.tsx` — replace `CURRENT_SUPPORT` const with live fetch

## Waiting On

- [ ] **Shopify store live + API key** - needed before progress bar auto-fill can be wired up (since [2026-02-28])
- [ ] **Donation platform decision** - Ko-fi, PayPal, or other — needed to connect donation totals to goal bar (since [2026-02-28])

## Someday

- [ ] **Mailchimp env vars** - add `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` to `.env.local` and Vercel
- [ ] **BUY TRAUMATICA button** - replace `href="#"` on /traumatica page with real payment/EVEN platform link
- [ ] **Real product photos** - swap placeholder gradient cards in merch section with actual product photography
- [ ] **Album story copy** - fill in `✏️ EDIT THIS` placeholder sections on /traumatica page
- [ ] **Kickstarter launch** - integrate campaign page/link into site when campaign goes live (~2 months out)
- [ ] **Review and finalize game questions** - go through trivia, lyric-guess, and all game content with DOMINO to make sure questions, answers, and details are accurate and specific to his actual story
- [ ] **Fill in /press page details** - add real Rolling Stone quote (replace placeholder), upload press photos (Primary / Live / Studio), verify all bios read right, and add any other press features/coverage

## Done
