# Alishba Tanveer — Portfolio Website

A static, animated portfolio site. No build step, no dependencies — just
HTML, CSS and JS.

## How to open it

1. Extract this whole folder into `C:\Users\Alishba\Documents\My Portfolio`.
2. Double-click `index.html` to preview it in your browser, or right-click
   the folder in VS Code and choose "Open with Live Server" for the best
   experience (so relative links behave exactly like a real deploy).

## Structure

```
My Portfolio/
├── index.html        Home
├── portfolio.html     Work — Shopsie case study + GitHub activity
├── about.html          About / journey / skills
├── services.html       Services offered
├── awards.html          Awards & achievements (placeholder — edit this one)
├── contact.html          Contact form
├── admin/index.html       Password-gated admin demo (see warning inside)
├── css/style.css           Shared design system
└── js/main.js               Shared behaviour (nav, animations, form)
```

## Things to edit before going live

- **contact.html — email delivery is already connected**
  The contact form is wired to [Formspree](https://formspree.io) with
  your form endpoint (`xgaenopr`), forwarding submissions straight to
  `alishbatanveer25@gmail.com` — no backend needed. Submit the form once
  from your live site if you haven't already; Formspree sends a one-time
  confirmation email you need to click to activate it. After that, every
  submission lands in your inbox automatically. The free plan covers 50
  submissions/month, which is plenty for a portfolio site.
- **contact.html / about.html footer** — email, phone, and LinkedIn are
  filled in from your resume. Double-check they're still current.
- **awards.html** — has your AI Connect 2026 certificate plus your real
  internship and graduation milestones. Add new ones the same way as they
  come in.
- **about.html** — bio and journey use your resume; feel free to make the
  bio paragraphs sound more like your own voice.
- **assets/** — contains your photo (`alishba-photo.jpeg`) and your AI
  Connect certificate (`ai-connect-2026-certificate.jpeg`). Replace either
  file (keep the same filename) to swap the image without editing HTML.
- **admin/index.html** — change `ADMIN_PASSWORD` in the `<script>` at the
  bottom. Read the orange warning card inside the panel: this is a
  front-end-only demo (password + data live in the browser's
  `localStorage`), fine for previewing the idea, not secure for real use.
  A production admin panel needs a real backend and database — the same
  kind of setup you already built for Shopsie (Node.js + Express + JWT +
  Prisma) would be the natural next step.

## Going live

Any static host works since there's no backend: GitHub Pages, Netlify,
Vercel, or Cloudflare Pages are all free options. Drag-and-drop the whole
folder onto Netlify, or push it to a GitHub repo and enable Pages, and
you're live.
