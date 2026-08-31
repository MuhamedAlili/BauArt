# BauArt Stein & Garten

Next.js (App Router) site for BauArt Stein & Garten — Pinneberg.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel — recommended)

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. No environment variables or build settings are needed — Vercel auto-detects Next.js. Click **Deploy**.

Every push to the main branch redeploys automatically.

You can also deploy straight from the CLI without a git repo:

```bash
npm i -g vercel
vercel
```

## How content is managed

There is no database or backend — everything an admin edits is stored in the
visitor's browser (`localStorage`), keeping the app fully static/serverless-friendly:

- **Project locations** (the map + grid on the homepage): added, edited, deleted,
  and reset from **/admin** → *Projektstandorte*. Default seed data lives in
  `lib/projects.js`.
- **Project photos**: chosen as a PNG/JPG/JPEG/WEBP file in the admin form, resized
  and compressed in the browser, and embedded directly into the project record —
  no server upload, no filesystem writes, so it works unchanged on Vercel/Netlify.
- **Contact messages**: submissions from `/contact` land in **/admin** → *Nachrichten*.
- **Texts (DE/EN)**: `lib/i18n.js`.
- **Company details** (address, phone, email, map coordinates): `lib/site-config.js`.

## Admin login

`/admin` — demo-only credentials, hardcoded in `components/pages/AdminContent.js`:

```
Username: admin
Password: bauart2026
```

This is client-side only (no real auth) — fine for a content demo, but replace it
with a real backend/auth check before handling anything sensitive.
