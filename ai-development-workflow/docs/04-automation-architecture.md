# Automation Architecture

## End-to-End AI Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     AI-POWERED DEVELOPMENT PIPELINE                         │
└─────────────────────────────────────────────────────────────────────────────┘

 STAGE 1: IDEATION                    STAGE 2: SPECIFICATION
 ═══════════════════                  ══════════════════════

 ┌─────────────┐                      ┌─────────────┐
 │   IDEA      │                      │    PRD      │
 │  (Human)    │─────────────────────▶│  (Claude)   │
 └─────────────┘                      └─────────────┘
       │                                    │
       │ Market Research                    │ Requirements
       │ (Perplexity)                       │ Extraction
       ▼                                    ▼
 ┌─────────────┐                      ┌─────────────┐
 │   MARKET    │                      │    USER     │
 │  ANALYSIS   │─────────────────────▶│  STORIES    │
 └─────────────┘                      └─────────────┘
                                            │
                                            │ Auto-sync
                                            ▼
                                      ┌─────────────┐
                                      │   LINEAR/   │
                                      │   JIRA      │
                                      └─────────────┘


 STAGE 3: ARCHITECTURE                STAGE 4: DESIGN
 ════════════════════                 ═══════════════

 ┌─────────────┐                      ┌─────────────┐
 │   SYSTEM    │                      │  WIREFRAMES │
 │  DESIGN     │─────────────────────▶│  (Galileo)  │
 │  (Claude)   │                      └─────────────┘
 └─────────────┘                            │
       │                                    │ Design Tokens
       │ Schema Generation                  ▼
       ▼                              ┌─────────────┐
 ┌─────────────┐                      │   UI KIT    │
 │  DATABASE   │                      │   (v0)      │
 │   SCHEMA    │                      └─────────────┘
 └─────────────┘                            │
       │                                    │ Export
       │ Generate                           ▼
       ▼                              ┌─────────────┐
 ┌─────────────┐                      │   REACT     │
 │   OPENAPI   │─────────────────────▶│ COMPONENTS  │
 │    SPEC     │                      └─────────────┘
 └─────────────┘


 STAGE 5: DEVELOPMENT                 STAGE 6: DEPLOYMENT
 ═══════════════════                  ═══════════════════

 ┌─────────────┐    ┌─────────────┐   ┌─────────────┐
 │   BACKEND   │    │  FRONTEND   │   │    CI/CD    │
 │  (Cursor)   │◀──▶│  (Cursor)   │──▶│  (GitHub    │
 └─────────────┘    └─────────────┘   │   Actions)  │
       │                  │           └─────────────┘
       │                  │                 │
       ▼                  ▼                 ▼
 ┌─────────────┐    ┌─────────────┐   ┌─────────────┐
 │    TESTS    │    │    E2E      │   │   DEPLOY    │
 │  (Vitest)   │    │ (Playwright)│   │  (Vercel)   │
 └─────────────┘    └─────────────┘   └─────────────┘
```

## Automation Flow Details

### Flow 1: PRD → Tickets (n8n)

```json
{
  "name": "PRD to Linear Tickets",
  "nodes": [
    {
      "name": "Notion Trigger",
      "type": "n8n-nodes-base.notion",
      "parameters": {
        "operation": "getPage",
        "filter": {
          "property": "Status",
          "equals": "Ready for Development"
        }
      }
    },
    {
      "name": "Extract with Claude",
      "type": "n8n-nodes-base.anthropic",
      "parameters": {
        "model": "claude-sonnet-4-20250514",
        "prompt": "Extract user stories from this PRD. Return JSON array with: title, description, acceptance_criteria, priority, estimate"
      }
    },
    {
      "name": "Parse JSON",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "code": "return JSON.parse($input.all()[0].json.content)"
      }
    },
    {
      "name": "Create Linear Issues",
      "type": "n8n-nodes-base.linear",
      "parameters": {
        "operation": "create",
        "teamId": "{{ $env.LINEAR_TEAM_ID }}",
        "title": "{{ $json.title }}",
        "description": "{{ $json.description }}"
      }
    },
    {
      "name": "Slack Notification",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#dev-team",
        "text": "New tickets created from PRD"
      }
    }
  ]
}
```

### Flow 2: Schema → API Generation (GitHub Actions)

```yaml
name: Schema to API Pipeline

on:
  push:
    paths:
      - 'drizzle/schema/**'

jobs:
  generate-api:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate Drizzle types
        run: npx drizzle-kit generate

      - name: Generate Zod schemas
        run: npx drizzle-zod generate --output src/schemas/

      - name: Generate OpenAPI spec with AI
        uses: anthropic/claude-action@v1
        with:
          model: claude-sonnet-4-20250514
          prompt: |
            Based on the Drizzle schema files, generate an OpenAPI 3.1 specification.
            Include all CRUD operations for each entity.
          input_files: drizzle/schema/*.ts
          output_file: docs/openapi.yaml

      - name: Generate API client
        run: |
          npx @openapitools/openapi-generator-cli generate \
            -i docs/openapi.yaml \
            -g typescript-fetch \
            -o packages/api-client/src

      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          title: 'feat(api): Auto-generated API from schema changes'
          branch: auto/schema-api-generation
          labels: ai-generated, needs-review
```

### Flow 3: Design Token Sync (Make/n8n)

```javascript
// Design Token Sync Workflow
const workflow = {
  trigger: 'Figma webhook - file updated',

  steps: [
    {
      name: 'Extract design tokens',
      action: 'Figma API - get styles',
      output: 'tokens.json'
    },
    {
      name: 'Transform to Tailwind config',
      action: 'Claude API',
      prompt: 'Convert Figma tokens to tailwind.config.js format',
      output: 'tailwind.config.js'
    },
    {
      name: 'Create PR',
      action: 'GitHub API',
      branch: 'design/update-tokens',
      files: ['tailwind.config.js', 'src/styles/tokens.css']
    },
    {
      name: 'Notify team',
      action: 'Slack',
      message: 'Design tokens updated - PR ready for review'
    }
  ]
};
```

### Flow 4: Auto Documentation

```yaml
# Documentation Generation Workflow
name: Auto-Documentation

triggers:
  - type: github_push
    branches: [main]
    paths:
      - 'src/api/**'
      - 'src/components/**'

steps:
  - name: Extract code documentation
    action: anthropic/claude
    params:
      prompt: |
        Analyze these code files and generate documentation:
        1. API reference for all endpoints
        2. Component documentation with props
        3. Usage examples
      input: "{{ github.changed_files }}"
      output_format: markdown

  - name: Update Mintlify docs
    action: github/write_files
    params:
      files:
        - path: docs/api/reference.mdx
          content: "{{ steps.extract.api_docs }}"
        - path: docs/components/reference.mdx
          content: "{{ steps.extract.component_docs }}"

  - name: Deploy docs
    action: vercel/deploy
    params:
      project: docs
      prod: true
```

### Flow 5: Weekly Analytics Report

```yaml
name: Weekly Product Analytics

on:
  schedule:
    - cron: '0 9 * * MON'  # Every Monday 9am

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch analytics data
        run: |
          curl -X POST "$POSTHOG_API/api/projects/$PROJECT_ID/insights/trend" \
            -H "Authorization: Bearer $POSTHOG_API_KEY" \
            -d '{"events": [...], "date_from": "-7d"}' \
            > analytics-data.json

      - name: Generate AI insights
        uses: anthropic/claude-action@v1
        with:
          prompt: |
            Analyze this week's product analytics and provide:
            1. Key metrics summary
            2. Notable trends
            3. Anomalies or concerns
            4. Recommendations for next sprint
          input_file: analytics-data.json
          output_file: weekly-report.md

      - name: Send to Slack
        uses: slackapi/slack-github-action@v1
        with:
          channel-id: 'product-analytics'
          payload-file-path: weekly-report.md
```

## Integration Points

### Connecting Tools Together

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│    Notion      │────▶│      n8n       │────▶│    Linear      │
│  (PRD Storage) │     │  (Automation)  │     │   (Tickets)    │
└────────────────┘     └────────────────┘     └────────────────┘
                              │
                              ▼
                       ┌────────────────┐
                       │   Claude API   │
                       │  (Processing)  │
                       └────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
       ┌────────────┐  ┌────────────┐  ┌────────────┐
       │   GitHub   │  │   Slack    │  │  Vercel    │
       │    (Code)  │  │  (Notify)  │  │  (Deploy)  │
       └────────────┘  └────────────┘  └────────────┘
```

### Webhook Connections

| Source | Event | Target | Action |
|--------|-------|--------|--------|
| Figma | Design updated | n8n | Extract tokens |
| GitHub | PR opened | Claude | Code review |
| GitHub | Push to main | Vercel | Deploy |
| Linear | Issue created | Slack | Notify team |
| Sentry | Error spike | PagerDuty | Alert on-call |
| PostHog | Funnel drop | Claude | Analyze & report |
