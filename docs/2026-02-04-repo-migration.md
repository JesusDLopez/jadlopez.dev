# Repo Migration Notes - 2026-02-04

## The Problem

While working with Codex on repo cleanup and review fixes, multiple branches were created:
- `chore/repo-cleanup`
- `chore/repo-cleanup-based-on-main`
- `chore/repo-cleanup-final`
- `rescue-bad-state`

These branches had **completely different git histories** from `main` (origin/280625). GitHub couldn't create PRs because there was no common ancestor - they were essentially two separate repos that happened to share a folder.

## What Was Tried

- Cherry-picking commits between branches
- Rebasing attempts
- Creating rescue branches
- Multiple approaches to reconcile the divergent histories

None of these cleanly resolved the "entirely different commit histories" problem.

## The Solution

Instead of fighting the tangled git history, we created a **fresh repo**:

1. Created new GitHub repo: `jadlopez.dev`
2. Copied working files from `chore/repo-cleanup-final` (without `.git`)
3. Initialized fresh git with a single clean commit
4. Pushed to new repo
5. Connected Vercel to the new repo

Commands used:
```bash
cp -r /Users/jesusd.lopez/Desktop/react-card /Users/jesusd.lopez/Desktop/JADLopez
cd /Users/jesusd.lopez/Desktop/JADLopez
rm -rf .git
git init
git add .
git commit -m "Initial commit: portfolio site"
git remote add origin https://github.com/JesusDLopez/jadlopez.dev.git
git branch -M main
git push -u origin main
```

## The Sizing Scare

After setup, elements appeared "bigger and cramped" - banners closer together, protein cards larger, the lab circle stretched horizontally.

Investigation: Running both the old and new repos side by side on different ports showed they looked **identical**. It was perception/fresh eyes, not an actual regression.

## Current State

- **New repo:** `github.com/JesusDLopez/jadlopez.dev`
- **Old repo:** `react-card` (kept as backup)
- **Vercel:** Connected and deploying
- **Build:** Passes (with expected large chunk warning for 1.5MB JS bundle)

## Review Fixes Status

All cleanup work from the Codex sessions was preserved:

| Stage | Item | Status |
|-------|------|--------|
| 1 | robots.txt allows indexing | Done |
| 1 | SEO/OG/Twitter meta tags in index.html | Done |
| 1 | PasswordGate env-only (no hardcoded password) | Done |
| 1 | Contact uses VITE_FORMSPREE_ID env var | Done |
| 2 | Backup files removed | Done |
| 2 | src/data/hearing-loss duplicate removed | Done |
| 2 | console.logs removed from ProteinViewer | Done |
| 2 | Footer year updated to 2026 | Done |
| 3 | Blog uses React Router `<Link>` (no page reload) | Done |

**Stage 4** (performance optimizations - scroll throttling, raycasting, particles) is deferred/optional.

## Reference Documents

- `docs/review-log.md` - Detailed audit with Need/Difficulty scores
- `docs/review-plan.md` - Staged fix plan

## Notes

- Large file warning: `src/assets/RNApol2.glb` is 53.74 MB. Consider Git LFS if adding more large assets.
- No `.env` file locally (gitignored). Vercel has env vars configured in dashboard. Local dev runs without password gate.
