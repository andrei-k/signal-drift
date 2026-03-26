# Plan: Convert Signal Drift to Open Source

## Context

Signal Drift was built for a Concordia University lightning talk. The code is clean and has no secrets, but the README, some references, and stale assets tie it to that presentation. Goal: make it a standalone open-source tool that can live independently.

---

## Files to Remove (move out first)

| Path | Reason |
|------|--------|
| `images/no/` (55 files) | Unused/archived demo images, unreferenced in code |
| `.DS_Store` | macOS metadata, shouldn't be in repo |

---

## Changes

### 1. Add `.DS_Store` to `.gitignore`
- **File:** `.gitignore`
- Add `.DS_Store` and `*.DS_Store` entries

### 2. Add MIT LICENSE file
- **File:** `LICENSE` (new)
- Standard MIT license, author: Andrei Kalamkarov, year 2025

### 3. Rewrite README.md
- **File:** `README.md`
- Remove Concordia/presentation references
- Remove "Behind the Scenes" section (references removed in-app article)
- Remove mention of "interactive easter eggs" (removed feature)
- Update project structure to match current state (remove deleted files: `demo-evolution.js`, `effects/`, `evolution/` images; add `translation.js`, `analysis/`)
- Update live demo URL if needed
- Keep: description, how it works table, tech stack, running locally, AI models used
- Add: brief contributing note, license badge

### 4. Add meta description to index.html
- **File:** `index.html`
- Add `<meta name="description" content="...">` for SEO/social sharing

### 5. Remove `images/no/` directory
- Delete the 55 unreferenced archived images
- These are dead weight — not referenced anywhere in code

### 6. Remove `.DS_Store` from tracking
- `git rm --cached .DS_Store`

---

## What stays as-is

- "Behind the Scenes" button linking to `https://12ak.com/posts/how-i-built-signal-drift/` (author's preference)
- Demo images in `demo-1/` and `demo-2/` (included in release)
- All JS/CSS code (already clean — no debug logs, no secrets, no tracking)
- No package.json (unnecessary for a static site with no deps)
- No CONTRIBUTING.md (lightweight project, README note suffices)

---

## Verification

1. Serve locally: `python3 -m http.server 8080`
2. Verify landing page loads, demo works, "Start Your Own" upload works
3. Verify "Behind the Scenes" button opens external blog link
4. Confirm `images/no/` is gone and no broken references
5. `git status` is clean after all commits
