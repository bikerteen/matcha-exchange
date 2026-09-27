# LMX — The London Matcha Exchange

Tracking London's green economy. Log a matcha, receive one share of absolutely no financial value.

Front-end only for now: seeded demo data plus `localStorage`. There's no backend, no auth, and photos are never uploaded.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

## Where things live

| Path | What |
| --- | --- |
| `app/` | Routes: `/`, `/line`, `/log`, `/portfolio`, `/about` |
| `data/matcha-areas.ts` | Areas, their map positions, label offsets and DEMO baselines |
| `data/matcha-lines.ts` | The fictional network (Ceremonial, Oat, Usucha lines) |
| `data/venues.ts` | Fictional demo cafés with DEMO prices |
| `lib/repositories/` | Check-in, custom-venue and holder-name persistence (swap for a server here) |
| `lib/market.ts` | London Matcha Index calculations |
| `lib/portfolio.ts` | Shares, spend, classification, certificate number |
| `components/retro/` | Windows-98 window, modal dialog and progress bar |
| `components/line/` | Matcha Line SVG, map viewport, area window, station board |
| `components/log/` | The four-step log flow and the verification sequence |
| `components/portfolio/` | Certificate, PNG export controls, ledger |

Design tokens (colours, fonts, bevels, poster buttons) are in `app/globals.css`.

All index figures and venues are demo data and are labelled as such in the UI.
