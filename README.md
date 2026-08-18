# Hameli

Development repository for the **Hameli portfolio website** at [hameli.io](https://hameli.io).

**Live:** [hameli.io](https://hameli.io)  
**Repo:** [github.com/hamz1188/Hameli](https://github.com/hamz1188/Hameli)

## Repository scope

This repository is the source of truth for the Hameli website code, configuration, tests, and deployment-related files.

Project knowledge, research, content strategy, planning, and creative documentation belong in **Notion (Hameli HQ)** rather than in this repository.

Kalymeero application/technical development remains in its separate repository: [`hamz1188/kalymeero`](https://github.com/hamz1188/kalymeero).

## Stack

- Next.js 16.3
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP

Site content/data used by the application lives in `app/data/hameli.ts`.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm test
npm run lint
npm run outdated
```

GitHub Actions runs test, lint, and build checks on pushes.

## Deployment

The site is deployed through Vercel from this repository. `vercel.json` prevents documentation-only changes from unnecessarily rebuilding the production website.

## Links

- Website: https://hameli.io
- Email: hello@hameli.io
- GitHub: https://github.com/hamz1188
- YouTube: https://www.youtube.com/@Hameli-yt
