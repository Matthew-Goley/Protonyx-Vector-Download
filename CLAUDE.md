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
- `products/index.html` — Products listing page (product cards with hover-to-play video preview)
- `products/vector/index.html` — Vector product page (overview, purpose, Vector Lens, features, access model, disclaimer, roadmap, closing CTA)
- `style.css` — Single shared stylesheet (root level), referenced via relative paths from subpages
- `script.js` — Hero video rotation for the home page (cycles through 5 videos every 5s)
- `assets/video/` — MP4 background videos for the home page hero (`1vector_demo.mp4`, `2city.mp4`, `3codingdemo.mp4`, `4stockmarket.mp4`, `5codingdemo.mp4`)
- `assets/company/` — Logo and brand assets (e.g., `protonyx_full_white.png`)
- `assets/product/vector/` — Vector product images (e.g., `vector_full.png`)

## Styling conventions

All design tokens are CSS variables defined in `:root` in `style.css`:

- `--grad` — the signature teal-to-blue gradient (`#3a8c6e → #2a6b9a`), used on text, buttons, accents
- `--bg-base / --bg-surface / --bg-card` — dark background layers
- `--text-primary / --text-muted` — text colors
- `--border` — subtle white border at 7% opacity

Font throughout: IBM Plex Mono, loaded from Google Fonts via a `<link>` tag in every HTML file.

Gradient text is applied with the `.grad-text` utility class or inline via `-webkit-background-clip: text` + `-webkit-text-fill-color: transparent`.

The `.vector-hero-inner` flex column uses `align-items: flex-start` to left-align the logo and action buttons without stretching.

## Page patterns

Every page shares these structural patterns — copy from an existing page when creating a new one:

- **Navbar** — `.navbar` with `.navbar-logo` (img) and `.navbar-menu-button` (hamburger)
- **Menu overlay** — full-screen `.menu-overlay` div with open/close logic driven by a small inline `<script>` at the bottom of `<body>`. Contains `.menu-overlay-header`, `.menu-overlay-brand`, `.menu-close-button`, and `.menu-column` with `.menu-link-reveal` links.
- **Footer** — `.site-footer` with copyright and `.footer-links` nav

The products page (`products/index.html`) uses an inline `<script>` to handle hover-to-play behavior on `.vector-card` — mouseenter plays the video, mouseleave pauses and resets it.

## Adding a new page

1. Create the HTML file in the appropriate subdirectory.
2. Reference `style.css` with the correct relative path (e.g., `../../style.css` from two levels deep).
3. Copy the navbar, menu overlay, and footer pattern from an existing page (update asset paths accordingly).
4. To add it to the products listing, add a `.product-card` inside `products/index.html`.
