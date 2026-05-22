# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static GitHub Pages site for Protonyx — the marketing site, account portal, and download page for the Vector desktop app. No build step, no package manager, no framework. All pages are plain HTML/CSS/JS served directly.

Unlike a pure brochure site, this frontend now talks to a **separate backend API** for accounts, profile, and download tracking. The auth/account/download/password/verify flows all `fetch()` against `API_URL` (defined once in `auth/auth.js`, currently `http://localhost:3000`). Those pages still load and degrade gracefully when the backend is down — the network calls just report "Unable to reach server."

- Repo: `Matthew-Goley/Protonyx-Vector-Download`, deployed via GitHub Pages. There is no `CNAME` in the repo, so Pages serves at `matthew-goley.github.io/Protonyx-Vector-Download/`. The legal and contact pages reference the production domain `protonyxdata.com`.
- The app source code is in a separate repo (`Protonyx-Vector-Python`). This repo is only the website.

## Development

To preview locally, serve the directory and open it in a browser:

```bash
python -m http.server 8080
```

Then navigate to `http://localhost:8080`. (VS Code Live Server is also configured — port 5501, see `.vscode/settings.json`.)

To exercise the auth, account, download, password-reset, and email-verify flows, the backend must be running at `API_URL`. Update `API_URL` at the top of `auth/auth.js` to point at the deployed API before shipping.

## Site structure

Pages (each `*/index.html` is its own route):

- `index.html` — Home / landing page. Dark two-column hero with a Lens demo video, a three-step "Discovery" video walkthrough, a light trust strip, and a Free vs. Professional pricing section with a monthly/annual toggle.
- `about/index.html` — About page (currently a stub: header + empty intro section).
- `contact/index.html` — Contact details (email/phone).
- `download/index.html` — Download page; "Download Vector" button (records a download via the API, then triggers the file). Logic in `download/download.js`.
- `account/index.html` — Signed-in profile page (username, email, plan, member-since, beta access, download count). Redirects to `/auth` if no token. Reads from `GET /me`.
- `auth/index.html` — Combined Sign in / Create account page (tabbed). Logic in `auth/auth.js`. `?mode=signup` opens the Create-account tab.
- `forgot-password/index.html` — Request a password-reset email (`POST /forgot-password`).
- `reset-password/index.html` — Set a new password from an emailed `?token=` link (`POST /reset-password`).
- `verify-email/index.html` — Confirms an email from a `?token=` link (`GET /verify-email`).
- `tos/index.html`, `privacy/index.html` — Legal pages (long-form content styled with `.tos-content`).

JS:

- `script.js` — Site-wide chrome behaviors (loaded on every non-auth page): navbar logo color swap, menu overlay open/close, pricing billing-interval toggle, and a scroll fade-in `IntersectionObserver`.
- `auth/auth.js` — Auth + backend integration (see below). Loaded on every page that needs auth state.
- `download/download.js` — Download button handler (loaded after `auth.js`, reuses its `API_URL`).

Assets:

- `assets/video/` — MP4s. `1vector_demo.mp4` is the hero demo; `discovery_enter.mp4` / `discovery_read.mp4` / `discovery_act.mp4` drive the three-step walkthrough. (`2city.mp4`, `3codingdemo.mp4`, `4stockmarket.mp4`, `5codingdemo.mp4` remain from the old hero rotation and are no longer referenced by any page.)
- `assets/company/` — Brand logos (`protonyx_full_white.png`, `protonyx_full_black.png`) and legal source docs (`tos.pdf`/`tosmd.md`, `pp.pdf`/`ppmd.md`).
- `assets/product/vector/` — Vector product images and favicon (`vector_small.png` is the favicon; also `vector_full.png`, `dashboard.png`, `lens_preview.png`).

## CSS architecture

Pages link **`style.css`**, which is just an entry point that `@import`s four files in cascade order (order matters — later files layer overrides):

1. `base.css` — resets, design tokens (`:root`), typography, and shared button primitives (`.btn-primary`, `.btn-ghost`, `.btn-grad`, `.btn-outline-gray`).
2. `chrome.css` — site shell present on every non-auth page: floating navbar, full-screen menu overlay, footer, and the auth-state visibility toggles.
3. `pages.css` — page-specific layouts: the `.products-hero` page header (reused by about/contact/account/privacy/tos), the account page, legal `.tos-content`, and leftover product-card styles.
4. `auth.css` — auth-flow shells, activated by the `auth-body` class on `<body>` (sign in/up, forgot, reset, verify).

**`landing.css`** is separate and is **not** imported by `style.css`. The home page links it explicitly *after* `style.css` (`landing-hero`, `discovery-grid`, `trust-strip`, `pricing-*`, `lp-section`, etc.). Only `index.html` loads it.

## Styling conventions

Design tokens are CSS variables in `:root` in `base.css` (this is the source of truth):

- `--grad` — the signature teal-to-blue gradient (`135deg, #3a8c6e → #2a6b9a`), used on accents, paid-plan text, and CTA buttons.
- `--bg-base` (`#f2f1ee`) / `--bg-surface` (`#d7d4d4`) — the site is **light-based**; dark hero/section backgrounds (e.g. `#0c0f16`) are set per-section in `landing.css` and `auth.css`, not via a token.
- `--text-primary` (`#1f2230`) — primary text. `--border` — mid-gray section borders.

Font throughout: IBM Plex Mono, loaded from Google Fonts via a `<link>` in every HTML file (weight 600; some pages also load 400).

Gradient text is applied inline via `background: var(--grad)` + `-webkit-background-clip: text` + `-webkit-text-fill-color: transparent` (e.g. the Pro plan label, `.plan-pro`).

The navbar logo auto-swaps white↔black as you scroll: `script.js` keeps it white whenever a `.landing-hero`, `.products-hero`, or `.lp-section.dark` is under the navbar, and black otherwise.

## Auth + backend integration

`auth/auth.js` defines `API_URL` and global functions used across pages. Auth is **JWT-in-localStorage**: a successful login stores `token`, and `loadProfile()` mirrors the profile fields into localStorage so pages can paint instantly before the network round-trip resolves.

Backend endpoints this frontend calls:

| Function / page | Request | Endpoint |
| --- | --- | --- |
| `login()` | `POST` `{ username, password }` → `{ token }` | `/login` |
| `signup()` | `POST` `{ username, email, password }` | `/signup` |
| `loadProfile()` | `GET` (Bearer) → `{ user: {...} }` | `/me` |
| `download/download.js` | `POST` (Bearer) | `/download` |
| forgot-password page | `POST` `{ email }` | `/forgot-password` |
| reset-password page | `POST` `{ token, newPassword }` → `{ success }` | `/reset-password` |
| verify-email page | `GET` `?token=` → `{ success }` | `/verify-email` |

`localStorage` keys set by `loadProfile()`: `token`, `username`, `email`, `plan`, `member_since`, `beta_access`, `download_count`. `logout()` clears them all and returns to `/auth`.

**Auth-state UI toggles** (handled by `checkAuth()`, which most pages call at the bottom of `<body>`):

- `.auth-only` — shown only when logged in (e.g. profile icon, Logout button). `checkAuth()` toggles the `.visible` class.
- `.guest-only` — shown only when logged out (e.g. "Create Account", "Login").
- `[data-username]` — text set to the current username.
- `[data-logout]` — bound to `logout()` on click.

## Shared page patterns

Every page shares these structural patterns — copy from an existing page when creating a new one:

- **Navbar** — `.navbar` with `.navbar-logo` (img `id="navbarLogo"`), `.navbar-actions` containing the `.guest-only` "Create Account" link, the `.auth-only` profile icon, and the `.navbar-menu-button` hamburger.
- **Menu overlay** — full-screen `.menu-overlay` driven by `script.js`. Two `.menu-column`s (Navigation + Account) with `.menu-link-reveal` links plus `.guest-only`/`.auth-only` variants and a `[data-logout]` button.
- **Footer** — `.site-footer` with copyright and `.footer-links` (TOS, Privacy, Contact, About).
- **Page header** — content pages use a `.products-hero` band with a `.products-label` title (a holdover name; it's the generic page header now).
- Auth-flow pages instead use `<body class="auth-body">` and an `.auth-card`/`.verify-card` with no navbar or footer.

## Adding a new page

1. Create `<dir>/index.html` in a new subdirectory.
2. Link `../style.css` (one level deep) — every content page uses the same single stylesheet entry point. Only the home page additionally links `landing.css`.
3. Copy the navbar, menu overlay, and footer from an existing content page (fix the relative asset paths).
4. Load `../script.js` and `../auth/auth.js`, then call `checkAuth();` at the end of `<body>` so auth-state toggles work.
5. Use absolute paths (`/about`, `/auth/index.html`, `/assets/...`) for in-site links and `script.js`'s logo URLs, matching the rest of the site.

## Known placeholders / gaps

These are intentionally unfinished — don't treat them as bugs unless asked to wire them up:

- Pricing "Get Professional" button → `href="#"` (TODO: real Stripe checkout URL).
- Download button → anchor `href="#"` (TODO: real S3 / GitHub Releases URL).
- `download/index.html` links to `/legal/terms.html` and `/legal/eula.html`, but there is no `legal/` directory; the live legal pages are at `/tos` and `/privacy`.
- `API_URL` in `auth/auth.js` points at `http://localhost:3000` and must be repointed for production.
