# Hameli

Portfolio site + social channel for websites, apps, and video — show the work, show how it’s made, ship every week.

**Live:** [hameli.io](https://hameli.io)  
**Repo:** [github.com/hamz1188/Hameli](https://github.com/hamz1188/Hameli)  
**Separate from Kalymeero.** One folder. Stay lean.

## Promise

People who contact you can see finished work and *how* you work. The site is a place to **learn**; contact is calm and easy when someone wants you to build something.

## Format (channel)

Desk cam + screen record + **voiceover**. No on-camera personality show required to start.

## Platforms

| Role | Platform | Use |
|------|----------|-----|
| Landing | [hameli.io](https://hameli.io) | Learn + contact |
| Home / trust | YouTube | 5–12 min process + portfolio walkthroughs |
| Discovery / DMs | Instagram (Reels + grid) | 30–90s cuts |

YouTube + Instagram only until **4 public posts** exist. Then consider LinkedIn/TikTok.

## Links

- Site: https://hameli.io
- Email: hello@hameli.io (setup: [EMAIL.md](EMAIL.md))
- YouTube: _TBD — paste after create_
- Instagram: _TBD — paste after create_

## Channel setup checklist (you click)

### YouTube

- [ ] Create channel named **Hameli** (Google account you control)
- [ ] Custom URL / handle: prefer `@hameli` if free; otherwise closest available
- [ ] Banner + avatar: simple wordmark later — blank/solid OK for day one
- [ ] **About** blurb (paste):

> Hameli — learn how websites, apps, and video get made. I film real work: desk cam + screen recording + voiceover. Based in Abu Dhabi. Site: hameli.io · Work inquiries: hello@hameli.io

- [ ] Add website link: https://hameli.io
- [ ] Paste channel URL into README Links + `app/data/hameli.ts` → `socials.youtube`

### Instagram

- [ ] Create professional/creator account named **Hameli** (same handle if free)
- [ ] Bio (paste):

> Learn in public · websites, apps, video  
> Process on camera + screen  
> 🔗 hameli.io · hello@hameli.io

- [ ] Paste profile URL into README Links + `app/data/hameli.ts` → `socials.instagram`

## How I ship (anti-stall)

1. **Ship before polish** — one public piece beats a perfect plan.
2. **Living ops docs:** `CONTENT.md`, `FILM.md`, this README (+ `EMAIL.md` for one-time mail setup).
3. **Weekly minimum:** 1 short (30–90s) **or** 1 longer process cut. Miss a week → 30s desk/progress VO, not zero.
4. **Work first:** Film real build days. If no build day, cut an existing project with VO.

## Day 1–14 checklist

### Days 1–2 — Setup

- [ ] Finish channel checklist above
- [ ] Follow [EMAIL.md](EMAIL.md) for Zoho → `hello@hameli.io`
- [ ] List **5 portfolio pieces** in `CONTENT.md`
- [ ] Skim `FILM.md` Episode 01 shoot card

### Days 3–5 — Video 1

- [ ] Shoot/cut Episode 01 (FILM.md shoot card)
- [ ] Post YouTube + 1–2 IG shorts
- [ ] Set `ep-01` to `live` + URL in `app/data/hameli.ts`
- [ ] Log in `CONTENT.md`

### Days 6–14

- [ ] Two more shorts or Episode 02
- [ ] Reply to inbound with hameli.io + hello@hameli.io

**Two-week success:** 4 posts + working hello@ + learn-first site — not subscriber count.

## Site (dev)

Next.js 16 + TypeScript + Tailwind + GSAP. Content: `app/data/hameli.ts`.

```bash
npm install
npm run dev
```

Optional contact form backend: set `NEXT_PUBLIC_FORMSPREE_ID` (Formspree). Without it, the form opens a mailto to `hello@hameli.io`.

## Docs

| File | Job |
|------|-----|
| [CONTENT.md](CONTENT.md) | Pillars, cadence, ideas, inventory, posted log |
| [FILM.md](FILM.md) | Capture recipe + Episode 01 shoot card |
| [EMAIL.md](EMAIL.md) | Zoho Mail Lite setup for hello@hameli.io |

## Out of scope (for now)

- Kalymeero migration
- Notion boards beyond CONTENT.md
- Extra platforms, gear deep-dives, fourth content pillar

Ship the first four posts. Expand only after that.
