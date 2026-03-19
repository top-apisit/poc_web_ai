# Branch Management Guide

## Branch Structure

```
main          ← Production. Protected. Never commit directly.
│
develop       ← Integration branch. Protected. Merge features here first.
│
├── feature/SCRUM-{id}-{short-desc}    ← New features from Jira tickets
├── fix/SCRUM-{id}-{short-desc}        ← Bug fixes
├── hotfix/SCRUM-{id}-{short-desc}     ← Urgent production fixes
└── release/v{major}.{minor}.{patch}   ← Release preparation
```

---

## Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/SCRUM-{id}-{desc}` | `feature/SCRUM-1-login-flow` |
| Bug Fix | `fix/SCRUM-{id}-{desc}` | `fix/SCRUM-12-login-error-display` |
| Hotfix | `hotfix/SCRUM-{id}-{desc}` | `hotfix/SCRUM-15-token-expiry` |
| Release | `release/v{version}` | `release/v1.2.0` |

Rules:
- All lowercase, hyphens only (no underscores, no spaces)
- Always include Jira ticket ID
- Keep description short (2–4 words max)

---

## Workflow

### New Feature (Jira ticket)

```bash
# 1. Always branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/SCRUM-{id}-{short-desc}

# 2. Work on the feature
# ... implement ...

# 3. Push and open PR → develop
git push -u origin feature/SCRUM-{id}-{short-desc}
# Open PR: feature/SCRUM-{id} → develop
```

### Release to Production

```bash
# 1. Branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Final testing, version bump
# ...

# 3. Merge to main (production)
# PR: release/v1.2.0 → main
# After merge → tag it
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# 4. Back-merge to develop
# PR: main → develop (keep in sync)
```

### Hotfix (production bug)

```bash
# 1. Branch from main (not develop!)
git checkout main
git pull origin main
git checkout -b hotfix/SCRUM-{id}-{desc}

# 2. Fix the bug

# 3. PR → main AND → develop
# Both PRs needed to keep branches in sync
```

---

## Pull Request Rules

| From | To | Requires |
|------|-----|----------|
| `feature/*` | `develop` | 1 reviewer + CI green |
| `fix/*` | `develop` | 1 reviewer + CI green |
| `hotfix/*` | `main` | 2 reviewers + CI green |
| `hotfix/*` | `develop` | 1 reviewer |
| `release/*` | `main` | 2 reviewers + CI green |

**PR Title Format:** `[SCRUM-{id}] {summary}`
Example: `[SCRUM-1] Add login flow with email and password`

---

## Branch Protection Rules (set in GitHub)

### `main`
- ✅ Require PR before merging
- ✅ Require 2 approving reviews
- ✅ Require status checks: `typecheck`, `lint`, `build`
- ✅ Require branches to be up to date
- ✅ Restrict direct pushes (admins only for hotfix)

### `develop`
- ✅ Require PR before merging
- ✅ Require 1 approving review
- ✅ Require status checks: `typecheck`, `lint`
- ✅ Require branches to be up to date

---

## Agent Branch Rule

When orchestrator dispatches agents to implement a ticket:

```bash
# Orchestrator creates branch before dispatching agents
git checkout develop
git pull origin develop
git checkout -b feature/SCRUM-{ticket_id}-{slug}
```

Agents work only on this branch. Orchestrator opens PR after POST-CHECK passes.

---

## Quick Reference

```bash
# Start new feature
git checkout develop && git pull origin develop
git checkout -b feature/SCRUM-{id}-{desc}

# Keep branch up to date
git fetch origin
git rebase origin/develop

# Done — push and PR
git push -u origin feature/SCRUM-{id}-{desc}
```
