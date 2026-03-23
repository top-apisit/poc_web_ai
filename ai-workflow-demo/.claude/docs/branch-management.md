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

---

## Sprint-Aware Branch Management

### Sprint Traceability — 3-Layer Audit Trail

**Problem:** Branch `feature/SCRUM-42-login-flow` doesn't tell you which sprint it is. Why not embed sprint in the branch name? Because tickets move between sprints in Jira — the branch name would become stale/wrong.

**Solution:** Use Jira as the source of truth, with redundant pointers at each layer:

| Layer | Where | Data |
|-------|-------|------|
| **1. Jira Ticket** | Source of truth | `SCRUM-42` has `sprint.name` + `sprint.id` field — always current |
| **2. PR Description** | GitHub PR | Orchestrator appends `Sprint: {name} \| Sprint ID: {id}` to every PR |
| **3. Jira Comment** | Jira ticket | sprint-planner posts `🤖 Branch: feature/SCRUM-42-login-flow \| Sprint: Sprint 12 (id:104)` |

### How to Look Up a Branch's Sprint

Given a branch: `feature/SCRUM-42-login-flow`

```
1. Extract ticket key: SCRUM-42
2. Query Jira: mcp__atlassian__getJiraIssue("SCRUM-42")
3. Read: sprint.name, sprint.id, sprint.state
4. Jira is always authoritative (source of truth)
```

### How to List All Branches for a Specific Sprint

```bash
# Find all tickets in sprint via JQL
jql: project = SCRUM AND sprint = "Sprint 12"

# For each ticket key returned (e.g., SCRUM-42, SCRUM-43, ...):
git branch -r | grep "SCRUM-42"
git branch -r | grep "SCRUM-43"
# ... etc
```

This is exactly what `sprint-release` and `sprint-cleanup` do internally.

### Release Branch Naming — Parallel Sprint Safe

**Pattern:** `release/sprint-{sprint.id}`

Example:
- Team A (Sprint 12): `release/sprint-104`
- Team B (Sprint 5): `release/sprint-98`

**Why sprint.id (not sprint name)?** The `sprint.id` is a Jira integer, globally unique across all teams. Using the name would cause conflicts:
- Team A "Sprint 12" (id: 104) → `release/Sprint-12`
- Team B "Sprint 12" (id: 105) → `release/Sprint-12` ❌ conflict!

Using `sprint.id` prevents naming collisions in parallel sprints.

### Sprint Branch Lifecycle

```
Sprint Start:
  sprint-planner "Sprint 12"
    → Creates: feature/SCRUM-42-login, fix/SCRUM-43-bug, ...
    → Posts Jira comments (traceability layer 3)

Sprint Active (per ticket):
  orchestrator SCRUM-{id}
    → Reads: sprint.name, sprint.id, sprint.state
    → Appends to PR description (traceability layer 2)
    → Agents implement on ticket's branch

Sprint End:
  sprint-release "Sprint 12"
    → JQL for all sprint tickets
    → Finds each branch via SCRUM-{id} lookup
    → Verifies all merged to develop
    → Creates: release/sprint-104 (no naming conflicts)
    → Generates release notes, outputs PR command

Post-Sprint:
  sprint-cleanup
    → Scans all merged branches
    → For each: lookup SCRUM-{id} → query Jira sprint.state
    → Safe-delete only if sprint.state = CLOSED
    → Prevents accidental deletion of active parallel sprint branches
```

### Parallel Sprint Safety

**Multiple teams can run simultaneous sprints:** sprint-planner, sprint-release, and sprint-cleanup are parallel-safe because:

1. **Branch names are ticket-scoped** (not sprint-scoped):
   - Feature branches: `feature/SCRUM-{id}-{slug}` — no sprint in name
   - Release branches: `release/sprint-{id}` — uses Jira integer ID (globally unique)

2. **Jira is the authoritative source for sprint ownership:**
   - Each branch created by sprint-planner posts a comment to Jira with sprint context
   - Each PR includes sprint metadata in description
   - sprint-cleanup queries Jira to check `sprint.state` before deleting

3. **Sprint agents always require explicit sprint name/ID:**
   - `sprint-planner "Sprint 12"` — never auto-selects from `openSprints()`
   - `sprint-release "Sprint 12"` — explicit, never guesses
   - If multiple open sprints: agent lists them and asks

### Sprint Agent Responsibilities

| Agent | Purpose | Input | Output |
|-------|---------|-------|--------|
| **sprint-planner** | Kickoff | Sprint name or ID | Branches created, Jira comments posted |
| **orchestrator** | Ticket implementation | Jira ticket key | Sprint context in output + PR metadata |
| **sprint-release** | Release prep | Sprint name or ID | Release branch + release notes + PR command |
| **sprint-cleanup** | Post-release | (no input) | Cleanup report + safe-to-delete list |

### Sprint PR Rules

| From | To | Sprint State | Requires | Notes |
|------|-----|--------------|----------|-------|
| `feature/*` | `develop` | ACTIVE | 1 reviewer + CI | Normal development |
| `fix/*` | `develop` | ACTIVE | 1 reviewer + CI | Bug fix during sprint |
| `hotfix/*` | `main` | ANY | 2 reviewers + CI | Urgent prod fix, bypasses sprint |
| `release/sprint-{id}` | `main` | CLOSING/CLOSED | 2 reviewers + CI | Sprint end → production |

### JQL Reference for Sprint Operations

| Purpose | JQL |
|---------|-----|
| All open sprints | `project = SCRUM AND sprint in openSprints() ORDER BY sprint ASC` |
| Specific sprint all tickets | `project = SCRUM AND sprint = "{Name}" ORDER BY issuetype ASC, assignee ASC` |
| Sprint tickets (Done only) | `project = SCRUM AND sprint = "{Name}" AND status = Done` |
| Sprint tickets (NOT Done) | `project = SCRUM AND sprint = "{Name}" AND status != Done` |
| Closed sprints | `project = SCRUM AND sprint in closedSprints() ORDER BY updated DESC` |

---
