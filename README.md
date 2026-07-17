# La Fiera Deportiva Sports Blog

Astro static site for [lafieradeportiva.com](https://lafieradeportiva.com), deployed to GitHub Pages.

Articles and videos are managed in **Sanity CMS** so a non-developer can publish without GitHub access. See **[CMS.md](./CMS.md)** for full setup (Studio, editor invite, publish webhook).

## Quick start

```bash
npm install
cp .env.example .env   # optional until Sanity is connected
npm run dev
```

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local site |
| `npm run build` | Production build |
| `npm run preview` | Preview `dist/` |
| `npm run studio` | Local Sanity Studio (`studio/`) |
| `npm run seed:sanity` | Push seed articles/videos into Sanity |

Without Sanity credentials, the site falls back to seed content in `src/data/seed-content.json`.

## Content model

- **Articles** → `/articles/[slug]`
- **Videos** → `/videos/[slug]` and `/videos`
- Homepage hero + “Videos destacados” use documents with a `homepageOrder`
- MLS standings on the homepage remain hardcoded for now
