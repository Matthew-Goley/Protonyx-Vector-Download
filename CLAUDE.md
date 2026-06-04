# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static GitHub Pages site for Protonyx — the marketing site, account portal, and download entry point for the Vector desktop app. No build step, no package manager, no framework. All pages are plain HTML/CSS/JS served directly.

Unlike a pure brochure site, this frontend talks to a **separate backend API** for accounts, profile, downloads, email verification, password reset, legal acceptance, and beta status. Those flows all `fetch()` against `API_URL` (defined once at the top of `auth/auth.js`, currently the deployed Railway backend `https://protonyx-monorepo-production.up.railway.app`). The pages still load and degrade gracefully when the backend is down — the network calls just report "Unable to reach server" (and the beta status dot stays in its default "offline" state).

- Repo: `Matthew-Goley/Protonyx-Vector-Download`, deployed via GitHub Pages. There is no `CNAME` in the repo, so Pages serves at `matthew-goley.github.io/Protonyx-Vector-Download/`. The legal, contact, and EULA pages reference the production domain `protonyxdata.com`.
- The app source code is in a separate repo (`Protonyx-Vector-Python`). This repo is only the website.

## Development

To preview locally, serve the directory and open it in a browser:

```bash
python -m http.server 8080
```

Then navigate to `http://localhost:8080`. (VS Code Live Server is also configured — port 5501, see `.vscode/settings.json`.)

To exercise the auth, profile, download-counter, password-reset, email-verify, and legal-acceptance flows, the backend must be running at `API_URL`. `API_URL` currently points at the deployed Railway backend; repoint it at the top of `auth/auth.js` if you need to test against a local backend.

## Site structure

Pages (each `*/index.html` is its own route):

- `index.html` — Home / landing page. Beta-focused: a top **beta banner** with a live status dot (polls `GET /beta/status` via `fetchBetaStatus()`), a dark two-column hero with a Lens demo video and a "Download for Windows" CTA, a three-step "Discovery" video walkthrough (Enter / Read / Act), a light trust strip, and a single-card **pricing** section (Vector Professional, "$0 / during beta", "Join Beta Free"). This is the only page that loads `landing.css`. The banner dot defaults to red "Beta Offline" and flips to green "Open Beta" when the beta is open or red "Beta Full" when closed; when full, the hero's "join the beta" note also reads "Beta Full". The download button stays live regardless of beta status (only account creation is gated, on the auth page).
- `about/index.html` — About page. Fully built out: company blurb (Protonyx LLC, founded 2026 by Michael Goley and Matthew Goley), mission, philosophy list, and Vector / Lens engine descriptions.
- `contact/index.html` — Contact details (`admin@protonyxdata.com`, phone `314-330-1843`).
- `account/index.html` — Signed-in profile page. Redirects to `/auth` if no token. Reads from `GET /me`. Shows username, email (with a verified/unverified badge + "Send Verification Email"), a masked password row with "Change Password", plan (gradient-styled when Pro), member-since, beta access, and download count. Footer row has **Delete Account** (two-click confirm → `DELETE /account`) and **Logout**. Also runs `checkLegalAcceptance()` to surface the blocking TOS modal.
- `auth/index.html` — Combined Sign in / Create account page (tabbed). Logic in `auth/auth.js` plus an inline tab-switching script. `?mode=signup` opens the Create-account tab. On load it calls `fetchBetaStatus()` (`GET /beta/status`) and shows a small status indicator below the logo (green dot "Open Beta" / red dot "Beta Full"). **Signup is gated on beta openness; login never is.** When the beta is full the Create-account tab renders a "The open beta is currently full. Check back soon." message in place of the form (via the `#betaFull` panel and the `betaClosed` flag in the inline script); the login form still works. When open and `spots_remaining <= 20`, a muted "X spots remaining" note appears under the signup submit button. The check **fails open**: a network/parse error leaves the signup form usable and the indicator green. If the beta closes while a user is mid-signup, the backend rejects `POST /signup` and the returned error is shown in the form's error state (no extra handling needed).
- `forgot-password/index.html` — Request a password-reset email (`POST /forgot-password`).
- `reset-password/index.html` — Set a new password from an emailed `?token=` link (`POST /reset-password`). Renders an "invalid link" state when the token is missing.
- `verify-email/index.html` — Confirms an email from a `?token=` link (`GET /verify-email`).
- `tos/index.html`, `privacy/index.html`, `eula/index.html` — Legal pages (long-form content styled with `.tos-content`, each with a "Download PDF" button pointing at the matching file in `/legal/`).

JS:

- `script.js` — Site-wide chrome behaviors (loaded on every non-auth page): navbar logo color swap, menu overlay open/close, pricing billing-interval toggle, scroll fade-in `IntersectionObserver`, **and the download buttons** — it is the single source of truth for the installer URL (`DOWNLOAD_URL`), pointing every `[data-download]` link's `href` at the pinned GitHub release asset and firing `POST /download` on click to bump the counter.
- `auth/auth.js` — Auth + backend integration (see below). Loaded on every page that needs auth state. Defines `API_URL`, used by the other scripts.
- `legal-modal.js` — Defines `showTosModal()`, a blocking, non-dismissable TOS-acceptance modal (built entirely in JS with inline styles). Loaded after `auth.js` on pages that gate on legal acceptance (currently the account page). The only way out is a successful `POST /legal/accept`.

> Note: there is no longer a `download/` page or `download.js`. Download buttons are `[data-download]` links anywhere on the site. `script.js` rewrites each one's `href` to the pinned GitHub release asset (`DOWNLOAD_URL`) so a single click downloads the `.exe` directly — GitHub serves release assets with an attachment disposition, so the browser downloads without navigating away. The HTML buttons carry a `/releases/latest` fallback `href` for the no-JS case. To ship a new Vector version, change `DOWNLOAD_URL` in `script.js` — nothing in the HTML needs editing.

Assets:

- `assets/video/` — MP4s. `1vector_demo.mp4` is the hero demo; `discovery_enter.mp4` / `discovery_read.mp4` / `discovery_act.mp4` drive the three-step walkthrough. (`2city.mp4`, `3codingdemo.mp4`, `4stockmarket.mp4`, `5codingdemo.mp4` remain from the old hero rotation and are no longer referenced by any page.)
- `assets/company/` — Brand logos (`protonyx_full_white.png`, `protonyx_full_black.png`) and legacy legal source docs (`tos.pdf`/`tosmd.md`, `pp.pdf`/`ppmd.md`). The legal pages now serve their PDFs from `/legal/`, not here.
- `assets/product/vector/` — Vector product images and favicon (`vector_small.png` is the favicon; also `vector_full.png`, `dashboard.png`, `lens_preview.png`).
- `legal/` — Current legal source/served docs: `tos.pdf`/`tosmd.md`, `pp.pdf`/`ppmd.md`, `eula.pdf`/`eulamd.md`. The "Download PDF" buttons on the legal pages link here.

## CSS architecture

Pages link **`style.css`**, which is just an entry point that `@import`s four files in cascade order (order matters — later files layer overrides):

1. `base.css` — resets, design tokens (`:root`), typography, and shared button primitives (`.btn-primary`, `.btn-ghost`, `.btn-grad`, `.btn-outline-gray`).
2. `chrome.css` — site shell present on every non-auth page: floating navbar, full-screen menu overlay, footer, and the auth-state visibility toggles.
3. `pages.css` — page-specific layouts: the `.products-hero` page header (reused by about/contact/account/privacy/tos/eula), the account page, legal `.tos-content`, the about page, and leftover product/landing styles.
4. `auth.css` — auth-flow shells, activated by the `auth-body` class on `<body>` (sign in/up, forgot, reset, verify).

**`landing.css`** is separate and is **not** imported by `style.css`. The home page links it explicitly *after* `style.css` (`landing-hero`, `beta-banner`, `discovery-grid`, `trust-strip`, `pricing-*`, `lp-section`, etc.). Only `index.html` loads it.

Several pages (`account`, `verify-email`, `forgot-password`, `reset-password`) also include a small inline `<style>` block for page-specific tweaks that don't warrant a shared rule.

## Styling conventions

Design tokens are CSS variables in `:root` in `base.css` (this is the source of truth):

- `--grad` — the signature teal-to-blue gradient (`135deg, #3a8c6e → #2a6b9a`), used on accents, paid-plan text, and CTA buttons.
- `--bg-base` (`#f2f1ee`) / `--bg-surface` (`#d7d4d4`) — the site is **light-based**; dark hero/section backgrounds (e.g. `#0c0f16`) are set per-section in `landing.css` and `auth.css`, not via a token.
- `--text-primary` (`#1f2230`) — primary text. `--border` — mid-gray section borders.

Font throughout: IBM Plex Mono, loaded from Google Fonts via a `<link>` in every HTML file. Most pages load weight 600 only; the auth-flow pages (`verify-email`, `forgot-password`, `reset-password`) load `400;600`.

Gradient text is applied via `background: var(--grad)` + `-webkit-background-clip: text` + `-webkit-text-fill-color: transparent` (e.g. the account page's Pro plan label, `.plan-pro`).

The navbar logo auto-swaps white↔black as you scroll: `script.js` keeps it white whenever a `.landing-hero`, `.products-hero`, or `.lp-section.dark` is under the navbar, and black otherwise (it also toggles `.navbar--light` on the navbar for the light state).

## Auth + backend integration

`auth/auth.js` defines `API_URL` and global functions used across pages. Auth is **JWT-in-localStorage**: a successful login stores `token`, and `loadProfile()` mirrors the profile fields into localStorage so pages can paint instantly before the network round-trip resolves.

Backend endpoints this frontend calls:

| Function / page | Request | Endpoint |
| --- | --- | --- |
| `login()` | `POST` `{ username, password }` → `{ token }` | `/login` |
| `signup()` | `POST` `{ username, email, password }` | `/signup` |
| `loadProfile()` | `GET` (Bearer) → `{ user: {...} }` | `/me` |
| `checkLegalAcceptance()` | `GET` (Bearer) → `{ success, tos_accepted }` | `/legal/status` |
| `legal-modal.js` (I Agree) | `POST` (Bearer) `{ document: "tos" }` → `{ success }` | `/legal/accept` |
| download counter (`script.js`) | `POST` (Bearer) | `/download` |
| `fetchBetaStatus()` (home banner + auth page) | `GET` → `{ success, open, spots_remaining }` | `/beta/status` |
| forgot-password page / account "Change Password" | `POST` `{ email }` | `/forgot-password` |
| reset-password page | `POST` `{ token, newPassword }` → `{ success }` | `/reset-password` |
| verify-email page | `GET` `?token=` → `{ success }` | `/verify-email` |
| account "Send Verification Email" | `POST` (Bearer) | `/resend-verification` |
| account "Delete Account" | `DELETE` (Bearer) | `/account` |

`localStorage` keys set by `loadProfile()`: `token`, `username`, `email`, `plan`, `member_since`, `beta_access`, `download_count`. The account page additionally caches `email_verified` itself (`loadProfile()` does **not** mirror that field). `logout()` clears them all and redirects to `/auth/index.html`.

**Auth-state UI toggles** (handled by `checkAuth()`, which most pages call at the bottom of `<body>`):

- `.auth-only` — shown only when logged in (e.g. profile icon, Logout button). `checkAuth()` toggles the `.visible` class.
- `.guest-only` — shown only when logged out (e.g. "Create Account", "Login").
- `.pro-only` — shown only when the cached `plan` is `pro` (e.g. the navbar "Professional" badge).
- `[data-username]` — text set to the current username.
- `[data-logout]` — bound to `logout()` on click.

`checkAuth()` also re-runs on `storage` events so auth state stays in sync across tabs.

## Shared page patterns

Every content page shares these structural patterns — copy from an existing page when creating a new one:

- **Navbar** — `.navbar` with `.navbar-logo` (img `id="navbarLogo"`), `.navbar-actions` containing the `.guest-only` "Create Account" link, the `.pro-only` "Professional" badge, the `.auth-only` profile icon, and the `.navbar-menu-button` hamburger.
- **Menu overlay** — full-screen `.menu-overlay` driven by `script.js`. Two `.menu-column`s (Navigation + Account) with `.menu-link-reveal` links plus `.guest-only`/`.auth-only` variants, a `[data-logout]` button, and a `data-download` Download link.
- **Footer** — `.site-footer` with copyright and `.footer-links` (TOS, Privacy, EULA, Contact, About).
- **Page header** — content pages use a `.products-hero` band with a `.products-label` title (a holdover name; it's the generic page header now).
- Auth-flow pages instead use `<body class="auth-body">` and an `.auth-card` / `.reset-card` / `.verify-card` with no navbar or footer.

## Adding a new page

1. Create `<dir>/index.html` in a new subdirectory.
2. Link `../style.css` (one level deep) — every content page uses the same single stylesheet entry point. Only the home page additionally links `landing.css`.
3. Copy the navbar, menu overlay, and footer from an existing content page (fix the relative asset paths).
4. Load `../script.js` and `../auth/auth.js`, then call `checkAuth();` at the end of `<body>` so auth-state toggles work. Add `../legal-modal.js` and call `checkLegalAcceptance()` only on pages that should gate signed-in users on TOS acceptance.
5. Use absolute paths (`/about`, `/auth/index.html`, `/assets/...`) for in-site links and `script.js`'s logo URLs, matching the rest of the site.

## Known placeholders / gaps

These are intentionally unfinished — don't treat them as bugs unless asked to wire them up:

- The legacy legal source docs in `assets/company/` (`tos.pdf`/`tosmd.md`, `pp.pdf`/`ppmd.md`) are stale duplicates; the live legal pages serve their PDFs from `/legal/`.
- `API_URL` in `auth/auth.js` points at the Railway backend; repoint it for local backend testing.
