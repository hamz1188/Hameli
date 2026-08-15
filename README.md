# Hameli

Portfolio site + social channel for websites, apps, and video — show the work, show how it’s made, ship every week.

**Live:** [hameli.io](https://hameli.io)  
**Repo:** [github.com/hamz1188/Hameli](https://github.com/hamz1188/Hameli)  
**Separate from Kalymeero.** One folder. Stay lean.

## Promise

People who contact you can watch how the work is made. The site is a **working title** — still in progress on purpose. Write when you need something built.

## Format (channel)

**Series: Working title** — start with **shorts** (30–90s) + voiceover. Natural desk filming (phone propped while working) + screen record. Longer YouTube only after shorts are shipping. Details: [FILM.md](FILM.md).

## Platforms

| Role | Platform | Use |
|------|----------|-----|
| Landing | [hameli.io](https://hameli.io) | Learn + contact |
| Discovery | Instagram Reels + YouTube Shorts | Primary — 30–90s |
| Home / depth | YouTube long-form | Later, from the same sessions |

Shorts on IG + YT until **4 public posts** exist. Then consider LinkedIn/TikTok.

## Links

- Site: https://hameli.io
- Email: hello@hameli.io (live — [EMAIL.md](EMAIL.md))
- GitHub: https://github.com/hamz1188
- LinkedIn: https://www.linkedin.com/in/ahmed-ali-406489394
- YouTube: _TBD — create your channel first; do not paste a public `@hameli` that isn’t yours_
- Instagram: _TBD — create your account first_

## Channel setup checklist (you click)

### YouTube

- [ ] Create channel named **Hameli** (Google account you control)
- [ ] Custom URL / handle: prefer `@hameli` if free; otherwise closest available
- [ ] Banner + avatar: simple wordmark later — blank/solid OK for day one
- [ ] **About** blurb (paste):

> Hameli — Working title. Short films from the desk: websites, apps, video. Watch how it’s made. hameli.io · hello@hameli.io

- [ ] Add website link: https://hameli.io
- [ ] Paste channel URL into README Links + `app/data/hameli.ts` → `socials.youtube`

### Instagram

- [ ] Create professional/creator account named **Hameli** (same handle if free)
- [ ] Bio (paste):

> Working title · websites, apps, video  
> Desk shorts + voiceover  
> hameli.io · hello@hameli.io

- [ ] Paste profile URL into README Links + `app/data/hameli.ts` → `socials.instagram`

## How I ship (anti-stall)

1. **Ship before polish** — one public piece beats a perfect plan.
2. **Living ops docs:** `CONTENT.md`, `FILM.md`, this README (+ `EMAIL.md` for one-time mail setup).
3. **Weekly minimum:** 1 short (30–90s). Miss a week → 30s desk/progress VO, not zero.
4. **Work first:** Natural filming while building. Cut shorts with VO the same day when you can.

## Day 1–14 checklist

### Days 1–2 — Setup

- [ ] Finish channel checklist above
- [x] Follow [EMAIL.md](EMAIL.md) for Zoho → `hello@hameli.io`
- [x] List **5 portfolio pieces** in `CONTENT.md` (+ `app/data/hameli.ts` → `portfolio`)
- [ ] Skim `FILM.md` Short 01 shoot card

### Days 3–5 — Short 01

- [ ] Shoot/cut Short 01 (FILM.md shoot card — 45–75s)
- [ ] Post IG Reel + YouTube Short
- [ ] Set `ep-01` to `live` + URL in `app/data/hameli.ts`
- [ ] Log in `CONTENT.md`

### Days 6–14

- [ ] Two more shorts (Short 02, Short 03)
- [ ] Reply to inbound with hameli.io + hello@hameli.io

**Two-week success:** 4 posts + working hello@ + learn-first site — not subscriber count.

## Site (dev)

Next.js 16.3 + React 19 + TypeScript + Tailwind CSS 4 + GSAP. Content: `app/data/hameli.ts`.

```bash
npm install
npm run dev
```

```bash
npm test
npm run lint
npm run outdated
```

GitHub Actions runs test, lint, and build on every push. Dependabot opens a weekly PR for npm patches/minors — merge those when CI is green.

Optional contact form backend: set `NEXT_PUBLIC_FORMSPREE_ID` (Formspree). Without it, the form opens a mailto to `hello@hameli.io`.

## Docs

| File | Job |
|------|-----|
| [CONTENT.md](CONTENT.md) | Pillars, cadence, ideas, inventory, posted log |
| [FILM.md](FILM.md) | Capture recipe + Short 01 shoot card |
| [EMAIL.md](EMAIL.md) | Zoho Mail Lite setup for hello@hameli.io |

## Out of scope (for now)

- Kalymeero migration
- Notion boards beyond CONTENT.md
- Extra platforms, gear deep-dives, fourth content pillar

Ship the first four posts. Expand only after that.
