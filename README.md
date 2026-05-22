# Protonyx Vector
 
**Portfolio analytics, answer-driven.**
 
This is the official site for Vector, a fast, local desktop app for Windows that tracks your portfolio and gives you clear, quantitative answers about its health. No payment is required to download and use the free version, and your portfolio data never leaves your machine. A free Protonyx account and an optional Vector Professional subscription unlock the full Lens engine and more.
 
Vector doesn't just show you numbers. It tells you where your portfolio is heading, how much risk you're carrying, whether you're diversified, and what you should actually do about it, all from a modular, drag-and-drop dashboard powered by live market data.
 
## Download
 
Head to the [Releases](https://github.com/Matthew-Goley/Protonyx-Vector-.exe/releases) page to grab the latest `.exe`.
 
**Requirements:** Windows 10+ · x64 · ~45MB
 
## What's in this repo
 
This repository hosts the GitHub Pages site for Vector: the marketing pages, account/login flow, and download page you see at [protonyxdata.com](https://protonyxdata.com/). It is the website only, not the application source code. The account, download, and password/email flows talk to a separate backend API (configured via `API_URL` in `auth/auth.js`); the static pages still load without it.
 
For the full Python source, see [Protonyx-Vector-Python](https://github.com/Matthew-Goley/Protonyx-Vector-Python).
 
## A note on how this was built
 
Vector was developed with the assistance of [Claude Code](https://claude.ai/code), Anthropic's AI coding tool. Most of my projects are not built this way, but part of being a good developer is staying curious and actually trying the tools that are changing the industry, not just reading about them. This project was an experiment in that spirit. The goal was to understand where AI-assisted development genuinely adds value, where it doesn't, and what that means for how I work going forward.