# 🌐 Kódas Website — Workflow Framework

## Overview
This document defines the working framework for this repository.
The purpose is to maintain clear, traceable collaboration between **Jesús** and **Claude Code**, using a lightweight logging and documentation system.

---

## 🧭 Workflow Rules

### 1. **Single Log File**
- The file `DEV_LOG.md` acts as a running chronological log.
- Every coding or design session should end with an update to this log.
- Log entries must include:
  - Date and time
  - Summary of what was done
  - Remaining issues or blockers
  - Next planned steps

### 2. **Branch Strategy**
- All Claude Code work happens on `claude/*` prefixed branches
- Feature branches are merged to `main` via Pull Requests
- Never push directly to `main`
- Vercel automatically creates preview deployments for each branch

### 3. **Mobile-First Development**
- Test on real devices using Vercel preview URLs
- Primary testing device: iPhone (real mobile, not simulator)
- Secondary: Desktop browsers
- Fix mobile issues first, then ensure desktop compatibility

### 4. **Testing Protocol**
- After each significant change:
  1. Push to branch
  2. Wait ~2 minutes for Vercel deployment
  3. Test on actual mobile device
  4. Document issues in DEV_LOG.md
  5. Fix and repeat

### 5. **Documentation Standards**
- Keep docs concise and actionable
- Archive outdated docs to `docs/archive/`
- Session summaries go in `docs/SESSION-YYYY-MM-DD.md`
- Update `DEV_LOG.md` after each session

### 6. **Commit Message Format**
```
type: brief description

- Detailed point 1
- Detailed point 2
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting, CSS changes
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

### 7. **Privacy & Security**
- Portfolio is password-protected (via `PasswordGate` component)
- Password stored in `VITE_ACCESS_PASSWORD` environment variable
- Identifying information obfuscated with underscores (e.g., "Queens_land")
- `robots.txt` blocks search engine indexing

---

## 🎯 Current Project State

**Branch:** `claude/review-feedback-011CUpxmogejHuc8enNfq7Gx`
**Live Preview:** Check Vercel dashboard for latest deployment URL
**Password:** Set via environment variable

**Completed:**
- ✅ Password protection system
- ✅ Privacy obfuscation (institution names)
- ✅ Case-sensitivity fixes (Styles imports)
- ✅ Documentation cleanup and reorganization
- ✅ Profile README with genuine information
- ✅ Workflow shift documentation

**Known Issues:**
- None currently blocking

**Next Steps:**
- Continue with mobile-first development workflow
- Fix any issues discovered during mobile testing
- Log all changes in `DEV_LOG.md`

---

## 📋 Quick Reference

### Starting a Session
1. Review `DEV_LOG.md` for context
2. Check latest commit and branch status
3. Review any open issues or blockers

### Ending a Session
1. Commit all changes with clear messages
2. Push to current branch
3. Update `DEV_LOG.md` with session summary
4. Test on mobile if changes affect UI
5. Note any blockers for next session

### Testing on Mobile
1. Push changes: `git push -u origin <branch-name>`
2. Wait for Vercel deployment (~2 minutes)
3. Open preview URL on iPhone
4. Document any issues immediately
5. Fix and redeploy

---

## 🔗 Important Links

- **Repository:** https://github.com/JesusDLopez/portfolio-kodas
- **Documentation:** `/docs/README.md`
- **Session Logs:** `/docs/SESSION-*.md`
- **Development Log:** `/DEV_LOG.md`
- **Vercel Dashboard:** Check for preview deployments

---

## 💡 Philosophy

> "Test on real devices, document everything, keep it simple."

This workflow prioritizes:
- **Real mobile testing** over simulated responsive mode
- **Lightweight documentation** over heavy planning docs
- **Iterative fixes** over perfect planning
- **Clear communication** through chronological logs
