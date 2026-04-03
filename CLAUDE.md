# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static GitHub Pages site for Protonyx — the marketing/download site for the Vector desktop app. No build step, no package manager, no framework. All pages are plain HTML/CSS/JS served directly.

Live at: `protonyx.dev` (via GitHub Pages)

The app source code is in a separate repo (Protonyx-Vector-Python). This repo is only the website.

## Development

To preview locally, open any HTML file in a browser or use a simple HTTP server:

```bash
python -m http.server 8080
```

Then navigate to `http://localhost:8080`.

## Site structure

- `index.html` — Home page (hero with looping background video, spacer, footer)
- `products/index.html` — Products listing page
- `products/vector/index.html` — Vector product page (features, how it works, pricing)
- `style.css` — Single shared stylesheet (root level), referenced via relative paths from subpages
- `script.js` — Hero video rotation (cycles through 5 videos every 5s)
- `assets/video/` — MP4 background videos for the hero
- `assets/company/` — Logo and brand assets

## Styling conventions

All design tokens are CSS variables defined in `:root` in `style.css`:

- `--grad` — the signature teal-to-blue gradient (`#3a8c6e → #2a6b9a`), used on text, buttons, accents
- `--bg-base / --bg-surface / --bg-card` — dark background layers
- `--text-primary / --text-muted` — text colors
- `--border` — subtle white border at 7% opacity

Font throughout: IBM Plex Mono (loaded from Google Fonts in `index.html` only — subpages inherit via CSS).

Gradient text is applied with the `.grad-text` utility class or inline via `-webkit-background-clip: text` + `-webkit-text-fill-color: transparent`.

## Adding a new page

1. Create the HTML file in the appropriate subdirectory.
2. Reference `style.css` with the correct relative path (e.g., `../../style.css` from two levels deep).
3. Copy the nav and footer pattern from an existing page.
4. Add a link to it from `products/index.html` using a `.feature-card`.
