# Content

Pillars, cadence, backlog, inventory, posted log. Don’t spawn new docs.

## Order of work (locked)

1. **Trend** — what’s moving globally.
2. **Demo** — build small, public proofs.
3. **Present** — VO-led shorts/cuts that show the demo; film only the **few shots** the edit needs (desk / hands / OTS), not talk-heavy authority pieces.

Filming is **not parked**. Most of the time you are voiceover. Still shoot a short bank of coverage so the VO isn’t a slideshow.

## Series

**Working title** — mostly VO + screen + a few desk shots. Kit + coverage recipe: [FILM.md](FILM.md).

## Pillars (3 only)

1. **Portfolio drops** — Live demos (new builds). Not an archive tour.
2. **Process** — Decisions and fixes on the demo work (VO over screen + light desk coverage).
3. **Client-path** — How to hire you — after demos prove the offer.

No fourth pillar until each has **at least 2 posts**.

**Rules:** No old portfolio builds on camera. No geo-local trend framing. No cheesy talk-only shorts with nothing to show.

## Cadence

- **Minimum:** 1 short (30–90s) per week once Demo 1 can be shown on screen.
- **Miss week:** 30s VO + existing desk coverage over demo progress.
- **CTA:** demo URL on hameli.io · hello@hameli.io

## World trend research (15 Aug 2026)

What is actually shipping / being talked about. Not a letter menu. Sources named.

### 1. What people are launching (Product Hunt)

**August 2026 category rank** ([Hunted.space](https://hunted.space/top-products/2026/August)):

1. Artificial Intelligence  
2. Productivity  
3. Developer Tools  
then GitHub, Open Source, SaaS, Mac, Tech, Menu Bar, API

**August AI leader:** [Wispr Flow Notetaker](https://wisprflow.ai/post/wispr-flow-notetaker) (launched 5 Aug 2026) — meeting capture without a bot invite; transcript → decisions / owners; hooks into Claude/ChatGPT via MCP.

**15 Aug 2026 daily board** ([OrangeBot snapshot of Product Hunt](https://orangebot.ai/product-hunt-today); PH homepage itself is Cloudflare-gated from this environment):

| # | Product | What it is |
|---|---------|------------|
| 1 | Joy | Menu-bar confetti for wins |
| 2 | nenspace | “lo-fi of LLMs” |
| 3 | Clamshell | Close laptop, keep work running |
| 5 | Inferock Bench | Receipt for every LLM API call |
| 6 | Attyn | Intelligence on the cursor |
| 10 | Zetik | Pocket chief of staff |
| 12 | Freebuff | Free coding agents |
| 14 | Outcome | Content → personal outcome per lead |
| 15 | **Openmotion** | **Product screenshots + prompts → motion videos** |
| 17 | Munder Difflin | Clones via Claude Code / Codex |
| 20 | Gemini 3.7 Flash | Coding & agents |
| 21 | BrowserAct Cloud | Scrape any site from one prompt |
| 22 | **isolate.video** | **Screen recordings → product videos** |
| 26 | Suno Studio 2.0 | Browser generative DAW |
| 27 | DeepSeek Harness | Agent harness, everything a plugin |
| 30 | Port22 | Coding agents on your phone |

Also on PH homepage listings the same day: Manus desktop automation, Lightning Rod (data → training sets), Codex subagents.

**Pattern in the launches:** agents that *do* a job (code, scrape, follow up, chief of staff) + tools that turn **screens / screenshots into motion video**.

### 2. What the web platform is betting on (Vercel Ship, June 2026)

Source: [Vercel Ship 2026 recap](https://vercel.com/blog/vercel-ship-2026-recap) (London / Berlin / New York).

- Vercel’s line: **agentic infrastructure** — deploy agents, build agents, let agents run production.
- Stack named on stage: AI SDK, AI Gateway, Workflow SDK, Sandbox, Chat SDK, **Vercel Connect**, open-source agent framework **eve**.
- **Nicolas Le Pallec (AKQA):** AI-native CX **replaces navigation with intent**. Three layers: capture intent → brand brain → **generative UI that composes pages** instead of static ones.
- **Carsten Høyer (AKQA):** Starbucks ChatGPT app as a “generative store” — brand pulled into the conversation, not only visited as a site.
- **Tomas Jansson (Currys/Elkjøp):** storefront → shopping agents; **customer intent replaces navigation**.
- Ivan Zhao (Notion), quoted in the same recap: next customer is human *and* agent; design **API/meaning first, UI last**.

Same idea in Vercel’s own docs: models as routers that **stream UI**, not only text ([AI SDK — generative UI](https://github.com/vercel/ai)).

Products already shipping runtime-composed UI (named in [Mantlr, 2026](https://mantlr.com/blog/generative-ui-patterns-2026)): Claude Design (17 Apr 2026), Notion 3.2 agent views (Jan 2026), Linear Agent (1 Apr 2026), Perplexity dynamic answers, Intercom Fin, ChatGPT Canvas.

### 3. What product *sites* look like if they want to feel current

Source: [Brainy — Web Design Trends 2026: What Actually Ships](https://brainy.ink/paper/web-design-trends-2026) (names Vercel, Linear, Stripe, Arc, Perplexity, Figma).

- **AI-native layouts:** same page surface, cells/copy/CTA composed per visitor (intent / referrer). Not “a new aesthetic.”
- **Bento as a system** (nested, live widgets) — Linear / Vercel cited. Three-column equal feature rows read as dated.
- **Motion that directs** (hover preview, scroll-linked reveal). Scrolljack + full-bleed autoplay hero = dated.
- **Variable type as identity.** **Speed as the premium look** (Linear cited under 400ms). Glassmorphism blobs = “AI template.”

### 4. How product videos are being made (matches Hameli: sites + apps + video)

What’s launching / selling *now*:

- **Openmotion** (PH 15 Aug): screenshots + prompts → motion videos  
- **isolate.video** (PH 15 Aug): screen recordings → product videos  
- **[ScreenCI](https://screenci.com/):** agent writes a walkthrough from a real run of the app; video is code; re-renders when the product changes  
- **[Ultrademo](https://github.com/new-xp/ultrademo):** point an agent at a site → narrated MP4 (Playwright + Remotion)

Short-form pattern (how those get cut for Reels/Shorts): **result on screen in the first seconds**, then how, VO over the UI, 15–60s, vertical. Sources: [Grow Creator — first 3 seconds](https://growcreator.pro/blog/tech-shorts-first-3-seconds), [Versely 60s AI demo](https://www.versely.studio/blog/how-to-make-60-second-ai-product-demo-2026).

### 5. What this means for what we present (not a pick-list)

Three things keep showing up across **launches + platform + site craft + video tools**. A Hameli demo that can sit on screen under VO would be one of these, built new (no archive):

| Cluster | What the world is doing | What a demo would *show* |
|---------|-------------------------|---------------------------|
| **Intent → page** | Generative UI / nav replaced by intent (Vercel Ship, AKQA, Linear, Claude Design) | Type what you want → a real page/UI assembles |
| **Agent that finishes a job** | PH: coding agents, notetakers, scrape-from-prompt, chief of staff | One input → a finished artifact (not a chat dump) |
| **Screen → motion** | Openmotion, isolate.video, ScreenCI, Ultrademo | Stills or a recording become a product film |

Hameli’s stated work is **sites, apps, and video**. Cluster 1 is sites+apps. Cluster 3 is video. Cluster 2 is apps. Those are the trends the demos should prove — then filming is VO + a couple of desk shots of *that* screen.

### Demo slots

| Slot | Cluster | Working title | Status |
|------|---------|---------------|--------|
| Test | Brief | What you can do with AI this week (and what I do) | Live on `/week` — VO in FILM.md |
| Demo 1 | | | not built |
| Demo 2 | | | |

## Film coverage (always available)

Shoot when you have 20–40 min — **does not wait** for Demo 1 finish. Reuse under any VO.

See FILM.md → **Coverage bank** (dual-cam kit, few shots, no full screenplay required).

VO scripts and cut orders get written **per demo** once Demo 1 is real — not invented client-advice monologues.

## Idea backlog (after Demo 1 is showable)

| # | Idea | Notes |
|---|------|-------|
| 1 | Demo walkthrough (VO) | Screen + coverage bank |
| 2 | One decision on the demo | VO + 2–3 desk shots |
| 3 | Ugly → clear on the demo | Screen-first + light coverage |
| 4 | How to send a project | Only after demos exist on the site |

## Portfolio inventory

Source of truth: `app/data/hameli.ts` → `portfolio`.

| # | Project | Type | Show? | Notes |
|---|---------|------|-------|-------|
| 1 | Desert Survivors | game | Archive | Do not film/name. |
| 2 | Fitness Tracker | app | Archive | Do not film/name. |
| 3 | Hameli site | site | Shell | Lists demos when live. |
| 4 | TalkingPhoto AI | app | Archive | Do not film/name. |
| 5 | Ejazty legal pages | site | Ask | Not for launch. |
| — | *(new demos)* | | | Add when shipped. |

## Posted log

| Date | Title | Pillar | Platform | URL |
|------|-------|--------|----------|-----|
| | | | IG / YT Short | |
