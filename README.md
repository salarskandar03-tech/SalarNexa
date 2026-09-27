ح# SALAR 07

A premium Telegram Mini App for **SALAR 07**, a digital advertising and marketing company. The app gives
members a Persian (Dari), right-to-left dashboard to track ad-viewing earnings, grow their referral network,
and request withdrawals — presented with a black, gold, and dark-navy fintech-style design.

## What's included

The full 9-screen product surface is live, styled, and interactive on realistic stubbed data:

1. **Home Dashboard** — balance summary, key stats, quick links, recent activity
2. **User Profile** — account info, membership level, navigation to secondary screens
3. **Balance (Wallet)** — available balance, earnings source breakdown, recent withdrawals
4. **Referral Program** — personal referral link with copy button, progress bar, reward tiers
5. **Earnings History** — filterable transaction list
6. **Statistics** — weekly ad views, earnings trend, and source-breakdown charts (Chart.js)
7. **Withdrawal Request** — request form with method selection and validation, plus request history
8. **Support Center** — contact channels, FAQ accordion, message form
9. **About Company** — mission, values, and an explicit no-guaranteed-earnings disclosure

Brand imagery (the SALAR 07 mark and wordmark) was generated as static assets and is served through the
Netlify Image CDN.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router, file-based routing)
- Tailwind CSS 4 with a custom glassmorphism/gradient theme
- Chart.js / react-chartjs-2 for the Statistics screen
- lucide-react icons, Vazirmatn Persian webfont
- Deployed on Netlify

## Running locally

```bash
npm install
npm run dev
```

Or, for full Netlify feature emulation:

```bash
netlify dev
```

## Project structure

See `AGENTS.md` for a full directory breakdown and conventions.

## Roadmap

This milestone delivers the complete, polished UI on stubbed data (see `src/lib/fixtures.ts`). `PLAN.md`
describes the remaining milestones — persistence, Telegram authentication, ad-network integration, and
withdrawal processing — needed to turn this into a fully operational product...