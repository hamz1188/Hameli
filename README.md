# Hameli

Hameli is the main source-of-truth repository for the content ecosystem, projects, research, and the Hameli portfolio site.

**Live:** [hameli.io](https://hameli.io)  
**Repo:** [github.com/hamz1188/Hameli](https://github.com/hamz1188/Hameli)

## Repository model

Hameli is the umbrella. Individual brands/projects live under `projects/`, and each project can publish to its own platform folders.

```text
Hameli/
├── projects/
│   └── kalymeero/
│       ├── strategy/
│       ├── research/
│       ├── recipes/
│       ├── ideas/
│       ├── branding/
│       ├── analytics/
│       └── platforms/
│           ├── youtube/
│           ├── tiktok/
│           └── instagram-reels/
├── shared/
├── app/
├── CONTENT.md
├── FILM.md
└── EMAIL.md
```

### Working rule

Organize knowledge **project-first**, not platform-first. Shared research, recipes, ideas, branding, and strategy live once inside the project. Only platform-specific adaptations belong under YouTube, TikTok, or Instagram Reels.

Local Mac material does not need to be copied here automatically. Move it into GitHub when it becomes useful or necessary for the project source of truth.

## Projects

### Kalymeero

Cooking content project. Project hub: [`projects/kalymeero/`](projects/kalymeero/).

The implementation/application repository remains separate at [`hamz1188/kalymeero`](https://github.com/hamz1188/kalymeero). Hameli holds the wider project knowledge, content planning, research, and channel material.

Current distribution platforms:

- YouTube
- TikTok
- Instagram Reels

More platforms or projects can be added when there is a real need.

## Hameli portfolio site

Hameli also contains the portfolio site and Hameli's own content operations.

**Series: Working title** — start with shorts (30–90s) + voiceover. Natural desk filming + screen recording. Longer YouTube only after shorts are shipping. See [FILM.md](FILM.md).

### Links

- Site: https://hameli.io
- Email: hello@hameli.io
- GitHub: https://github.com/hamz1188
- YouTube: https://www.youtube.com/@Hameli-yt

### Existing operating docs

| File | Job |
|------|-----|
| [CONTENT.md](CONTENT.md) | Hameli content pillars, cadence, ideas, inventory, posted log |
| [FILM.md](FILM.md) | Hameli filming/capture workflow |
| [EMAIL.md](EMAIL.md) | Email setup for hello@hameli.io |

## Site development

Next.js 16.3 + React 19 + TypeScript + Tailwind CSS 4 + GSAP. Site content is in `app/data/hameli.ts`.

```bash
npm install
npm run dev
```

```bash
npm test
npm run lint
npm run outdated
```

GitHub Actions runs test, lint, and build on pushes.
