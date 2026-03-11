# Human-in-the-Loop Checkpoints

## Critical Decision Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HUMAN-IN-THE-LOOP DECISION MATRIX                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Risk Level     │ AI Autonomy        │ Human Involvement   │ Examples      │
│  ═══════════════╪════════════════════╪═════════════════════╪═══════════════│
│                 │                    │                     │               │
│  LOW            │ Full automation    │ Async review        │ Formatting    │
│  (Reversible)   │ Auto-merge         │ Weekly audit        │ Lint fixes    │
│                 │                    │                     │ Doc updates   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  MEDIUM         │ Auto-generate      │ PR review           │ New features  │
│  (Testable)     │ Auto-test          │ Before merge        │ Bug fixes     │
│                 │                    │                     │ Refactoring   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  HIGH           │ Draft only         │ Required approval   │ Auth changes  │
│  (Security)     │ Suggestions        │ Security review     │ Payments      │
│                 │                    │                     │ Data handling │
│  ─────────────────────────────────────────────────────────────────────────  │
│  CRITICAL       │ Human-first        │ Multiple approvers  │ Prod deploy   │
│  (Business)     │ AI assists         │ Stakeholder sign-off│ Architecture  │
│                 │                    │                     │ Major pivots  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Checkpoint Categories

### 1. Product Decisions

| Decision | AI Role | Human Role | Process |
|----------|---------|------------|---------|
| Feature prioritization | Analyze data, suggest ranking | Final decision | AI provides analysis → PM decides |
| User persona definition | Generate drafts | Validate realism | AI drafts → User research validates |
| Pricing strategy | Market analysis | Strategic decision | AI researches → Leadership decides |
| Pivot decisions | Data analysis | Strategic judgment | AI presents data → Team decides |

### 2. Architecture Validation

| Component | AI Role | Human Role | Gate |
|-----------|---------|------------|------|
| Tech stack | Research, compare | Final selection | Architecture Review Board |
| Database design | Generate schema | Validate integrity | Senior Engineer |
| Security architecture | Suggest patterns | Verify compliance | Security Team |
| Third-party selection | Compare options | Risk assessment | Tech Lead |

### 3. UX Validation

| Element | AI Role | Human Role | Method |
|---------|---------|------------|--------|
| User flows | Generate options | Test with users | User testing sessions |
| Visual design | Create variations | Brand alignment | Design review |
| Accessibility | Audit, fix | Final verification | A11y specialist |
| Copy/Content | Draft text | Tone, accuracy | Content review |

### 4. Security Review

| Area | AI Role | Human Role | Requirement |
|------|---------|------------|-------------|
| Auth implementation | Generate code | Verify security | Security review before merge |
| Data encryption | Implement patterns | Audit compliance | Security sign-off |
| Input validation | Generate validators | Penetration testing | External audit |
| Secret management | Setup automation | Audit access | Regular access review |

### 5. Code Review

| Code Type | AI Review | Human Review | Merge Policy |
|-----------|-----------|--------------|--------------|
| Documentation | Auto-approve | Spot check | Auto-merge |
| Tests | Auto-validate | Review logic | 1 approval |
| Feature code | Security scan, style | Logic, architecture | 2 approvals |
| Security code | Flag concerns | Deep review | Security team + 2 |
| Infrastructure | Validate syntax | Cost, security | DevOps + Security |

## Implementation

### GitHub CODEOWNERS

```plaintext
# .github/CODEOWNERS

# Low risk - AI can auto-approve
/docs/ @ai-bot
/src/**/*.test.ts @ai-bot

# Medium risk - 1 human reviewer
/src/components/ @frontend-team
/src/features/ @frontend-team

# High risk - security review required
/src/auth/ @security-team @frontend-team
/src/api/payments/ @security-team @backend-team

# Critical - multiple approvers
/infrastructure/ @devops-team @security-team @tech-lead
/.github/workflows/ @devops-team @security-team
```

### AI Review Workflow

```yaml
# .github/workflows/ai-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Determine risk level
        id: risk
        run: |
          if echo "$CHANGED_FILES" | grep -E "(auth|payment|security)"; then
            echo "level=high" >> $GITHUB_OUTPUT
          elif echo "$CHANGED_FILES" | grep -E "(infrastructure|workflow)"; then
            echo "level=critical" >> $GITHUB_OUTPUT
          else
            echo "level=medium" >> $GITHUB_OUTPUT
          fi

      - name: AI Security Scan
        if: steps.risk.outputs.level == 'high' || steps.risk.outputs.level == 'critical'
        uses: anthropic/claude-security-review@v1
        with:
          focus: |
            - Authentication vulnerabilities
            - Injection attacks
            - Data exposure risks

      - name: AI Code Review
        uses: anthropic/claude-code-review@v1
        with:
          review_level: ${{ steps.risk.outputs.level }}

      - name: Block merge for critical
        if: steps.risk.outputs.level == 'critical'
        run: |
          echo "Critical changes detected. Manual review required."
          exit 1
```

## Review Process Flowchart

```
                    ┌─────────────────┐
                    │   PR Created    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  AI Code Scan   │
                    │  - Lint         │
                    │  - Types        │
                    │  - Security     │
                    └────────┬────────┘
                             │
               ┌─────────────┼─────────────┐
               │             │             │
               ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │   LOW    │  │  MEDIUM  │  │   HIGH   │
        │   Risk   │  │   Risk   │  │   Risk   │
        └────┬─────┘  └────┬─────┘  └────┬─────┘
             │             │             │
             ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │   Auto   │  │  1 Human │  │ Security │
        │  Merge   │  │  Review  │  │  Review  │
        └────┬─────┘  └────┬─────┘  └────┬─────┘
             │             │             │
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                    ┌─────────────────┐
                    │     Merge       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Deploy      │
                    └─────────────────┘
```

## Checkpoint Triggers

### When to Pause for Human Review

1. **Security-sensitive changes detected**
   - Auth/authorization code modified
   - Encryption/hashing changes
   - API key or secret handling
   - User data processing changes

2. **Architecture changes**
   - New database tables/migrations
   - API contract changes
   - New external integrations
   - Infrastructure modifications

3. **Business logic changes**
   - Payment/billing code
   - User-facing calculations
   - Compliance-related features
   - Multi-tenant boundaries

4. **High-impact changes**
   - > 500 lines changed
   - > 10 files modified
   - Core module changes
   - Breaking changes

### Automated Notifications

```yaml
# Slack notification for critical reviews
- name: Notify Critical Review Needed
  if: steps.risk.outputs.level == 'critical'
  uses: slackapi/slack-github-action@v1
  with:
    channel-id: 'security-reviews'
    payload: |
      {
        "text": "🚨 Critical review needed",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*PR:* ${{ github.event.pull_request.title }}\n*Author:* ${{ github.actor }}\n*Risk Level:* Critical"
            }
          }
        ]
      }
```
