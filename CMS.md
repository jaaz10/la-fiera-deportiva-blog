# CMS setup (Sanity)

Editors use **Sanity Studio** — they never need GitHub access. You keep the repo; they get a Sanity invite.

## One-time setup (you)

### 1. Create a Sanity project

1. Sign up / log in at [sanity.io/manage](https://www.sanity.io/manage)
2. Create a project (e.g. **La Fiera Deportiva**), dataset `production`
3. Copy the **Project ID**

### 2. Configure this repo locally

```bash
cp .env.example .env
# Edit .env — set PUBLIC_SANITY_PROJECT_ID and SANITY_STUDIO_PROJECT_ID
```

Also put the same project ID in `studio/.env` (or export `SANITY_STUDIO_PROJECT_ID` when running the studio).

### 3. Install and run the Studio

```bash
cd studio
npm install
cp ../.env.example .env   # or create .env with SANITY_STUDIO_PROJECT_ID
npm run dev
```

Open the local Studio URL (usually `http://localhost:3333`), log in with your Sanity account, and confirm the Article / Video schemas appear.

### 4. Seed existing content

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **Tokens**, create a token with **Editor** permissions. Add it to `.env` as `SANITY_API_WRITE_TOKEN`.

From the repo root:

```bash
npm run seed:sanity
```

This uploads the current 3 articles and 3 videos.

### 5. Deploy Studio for the editor (no GitHub)

From `studio/`:

```bash
npm run deploy
```

Sanity hosts it at something like `https://lafieradeportiva.sanity.studio` (hostname is set in `studio/sanity.cli.ts`).

### 6. Invite the non-admin editor

In [sanity.io/manage](https://www.sanity.io/manage) → project → **Members**:

- Invite their email
- Role: **Editor** (can create/edit/publish; cannot manage billing/API)

They only need that Studio URL + their Sanity login.

### 7. GitHub Actions secrets (rebuild on publish)

In the GitHub repo → **Settings** → **Secrets and variables** → **Actions**, add:

| Secret | Value |
|--------|--------|
| `PUBLIC_SANITY_PROJECT_ID` | your project ID |
| `PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | optional; only if the dataset is not public |

Create a **Fine-grained** or classic GitHub PAT with `contents: write` / ability to trigger `repository_dispatch` on this repo. Keep it private.

### 8. Sanity → GitHub webhook

In Sanity manage → **API** → **Webhooks** → Create webhook:

- **URL:** `https://api.github.com/repos/<OWNER>/<REPO>/dispatches`
- **Trigger:** Create / Update / Delete on `article` and `video` (and Publish if using drafts)
- **HTTP method:** POST
- **Headers:**
  - `Authorization: Bearer <GITHUB_PAT>`
  - `Accept: application/vnd.github+json`
  - `Content-Type: application/json`
- **Projection / body:**

```json
{
  "event_type": "sanity-publish",
  "client_payload": {
    "source": "sanity"
  }
}
```

When the editor publishes in Studio, GitHub Actions rebuilds and redeploys GitHub Pages.

## Day-to-day for the editor

1. Open the hosted Studio URL
2. Create or edit an **Article** or **Video**
3. Set **Homepage order** (1 = main card, 2–3 = secondary / video slots) if it should appear on the homepage
4. Publish
5. Wait a few minutes for the site rebuild

## Local site development

```bash
npm install
npm run dev
```

Without Sanity env vars, the site uses local seed content in `src/data/seed-content.json` so pages still work offline.

With Sanity configured, builds fetch live content from the Content Lake.

### Tip: keep the project out of iCloud “Optimize Mac Storage”

If this folder lives in Desktop/Documents with iCloud optimization on, `node_modules` can become “dataless” stubs and Astro/npm will hang. Prefer a local non-iCloud path, or mark the project folder as **Keep Downloaded**.
