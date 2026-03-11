# System Architecture: FinanceFlow

## Overview

FinanceFlow is a personal finance management application built with a modern, scalable architecture optimized for small teams using AI-assisted development.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│                                                                              │
│  ┌────────────────────────────┐    ┌────────────────────────────┐          │
│  │       Web Application      │    │     Mobile (Future)        │          │
│  │        (Next.js 15)        │    │    (React Native)          │          │
│  │   - React 19 + TypeScript  │    │                            │          │
│  │   - Tailwind + shadcn/ui   │    │                            │          │
│  │   - Tanstack Query         │    │                            │          │
│  └─────────────┬──────────────┘    └──────────────┬─────────────┘          │
│                │                                   │                         │
└────────────────┼───────────────────────────────────┼─────────────────────────┘
                 │                                   │
                 └───────────────┬───────────────────┘
                                 │ HTTPS
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EDGE LAYER                                      │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │                         Vercel Edge                                 │    │
│  │   - CDN / Static Assets                                            │    │
│  │   - Edge Functions (Middleware)                                     │    │
│  │   - Rate Limiting                                                   │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SERVICE LAYER                                      │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │  Auth Service  │  │   API Server   │  │ Worker Service │                │
│  │    (Clerk)     │  │  (Hono + Bun)  │  │   (BullMQ)     │                │
│  │                │  │                │  │                │                │
│  │  - OAuth 2.0   │  │  - REST API    │  │  - Sync Jobs   │                │
│  │  - JWT Tokens  │  │  - Validation  │  │  - AI Tasks    │                │
│  │  - MFA        │  │  - Business    │  │  - Webhooks    │                │
│  │               │  │    Logic       │  │  - Alerts      │                │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘                │
│          │                   │                   │                          │
└──────────┼───────────────────┼───────────────────┼──────────────────────────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                        │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │   PostgreSQL   │  │     Redis      │  │    S3 (R2)     │                │
│  │   (Supabase)   │  │   (Upstash)    │  │  (Cloudflare)  │                │
│  │                │  │                │  │                │                │
│  │  - User Data   │  │  - Sessions    │  │  - Exports     │                │
│  │  - Transactions│  │  - Cache       │  │  - Backups     │                │
│  │  - Budgets     │  │  - Rate Limits │  │  - Documents   │                │
│  │  - Goals       │  │  - Job Queues  │  │                │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                                     │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │     Plaid      │  │   SendGrid     │  │  Claude API    │                │
│  │                │  │                │  │                │                │
│  │  - Bank Link   │  │  - Emails      │  │  - Categorize  │                │
│  │  - Sync        │  │  - Alerts      │  │  - Insights    │                │
│  │  - Webhooks    │  │                │  │                │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | latest | Component library |
| Tanstack Query | 5.x | Server state management |
| Zustand | 4.x | Client state management |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Validation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Bun | 1.x | JavaScript runtime |
| Hono | 4.x | Web framework |
| Drizzle ORM | 0.30.x | Database ORM |
| Zod | 3.x | Validation |
| BullMQ | 5.x | Job queue |
| Plaid SDK | 22.x | Banking integration |

### Infrastructure
| Service | Provider | Purpose |
|---------|----------|---------|
| Frontend Hosting | Vercel | Web app deployment |
| Backend Hosting | Railway | API deployment |
| Database | Supabase | PostgreSQL database |
| Cache/Queue | Upstash | Redis for caching & queues |
| Object Storage | Cloudflare R2 | File storage |
| Auth | Clerk | Authentication |
| Monitoring | Sentry | Error tracking |
| Analytics | PostHog | Product analytics |

---

## Database Schema

```
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│      users        │       │  bank_connections │       │     accounts      │
├───────────────────┤       ├───────────────────┤       ├───────────────────┤
│ id            PK  │───┐   │ id            PK  │───┐   │ id            PK  │
│ clerk_id      UK  │   │   │ user_id       FK  │◀──┘   │ user_id       FK  │◀─┐
│ email         UK  │   │   │ plaid_item_id     │   ┌──▶│ connection_id FK  │  │
│ name              │   │   │ institution_name  │   │   │ plaid_account_id  │  │
│ avatar_url        │   │   │ institution_logo  │   │   │ name              │  │
│ preferences  JSON │   │   │ status        ENUM│   │   │ type          ENUM│  │
│ created_at        │   │   │ last_sync_at      │   │   │ balance           │  │
│ updated_at        │   │   │ error_message     │   │   │ currency          │  │
└───────────────────┘   │   │ created_at        │   │   │ is_hidden         │  │
                        │   └───────────────────┘   │   └───────────────────┘  │
                        │                           │                          │
                        │   ┌───────────────────┐   │   ┌───────────────────┐  │
                        │   │   transactions    │   │   │     budgets       │  │
                        │   ├───────────────────┤   │   ├───────────────────┤  │
                        │   │ id            PK  │   │   │ id            PK  │  │
                        └──▶│ user_id       FK  │   │   │ user_id       FK  │◀─┤
                            │ account_id    FK  │◀──┘   │ category_id   FK  │  │
                            │ plaid_txn_id      │       │ name              │  │
                            │ date              │       │ amount            │  │
                            │ amount            │       │ currency          │  │
                            │ currency          │       │ period        ENUM│  │
                            │ name              │       │ start_date        │  │
                            │ merchant_name     │       │ end_date          │  │
                            │ category_id   FK  │───┐   │ is_active         │  │
                            │ pending           │   │   └───────────────────┘  │
                            │ created_at        │   │                          │
                            └───────────────────┘   │   ┌───────────────────┐  │
                                                    │   │      goals        │  │
                            ┌───────────────────┐   │   ├───────────────────┤  │
                            │    categories     │   │   │ id            PK  │  │
                            ├───────────────────┤   │   │ user_id       FK  │◀─┘
                            │ id            PK  │◀──┘   │ name              │
                            │ parent_id     FK  │───┐   │ target_amount     │
                            │ name              │   │   │ current_amount    │
                            │ icon              │◀──┘   │ currency          │
                            │ color             │       │ deadline          │
                            │ is_system         │       │ status        ENUM│
                            └───────────────────┘       └───────────────────┘
```

---

## API Design

### Base URL
```
Production: https://api.financeflow.app/v1
Staging:    https://api-staging.financeflow.app/v1
```

### Authentication
All API requests require a valid JWT token from Clerk:
```
Authorization: Bearer <token>
```

### Core Endpoints

#### Accounts
```
GET    /accounts              # List user's accounts
POST   /accounts/link         # Get Plaid link token
POST   /accounts/exchange     # Exchange public token
DELETE /accounts/:id          # Remove account link
```

#### Transactions
```
GET    /transactions          # List transactions (paginated)
GET    /transactions/:id      # Get transaction details
PATCH  /transactions/:id      # Update category/notes
GET    /transactions/search   # Search transactions
```

#### Budgets
```
GET    /budgets               # List budgets with spending
POST   /budgets               # Create budget
GET    /budgets/:id           # Get budget with transactions
PUT    /budgets/:id           # Update budget
DELETE /budgets/:id           # Delete budget
```

#### Goals
```
GET    /goals                 # List goals
POST   /goals                 # Create goal
GET    /goals/:id             # Get goal details
PUT    /goals/:id             # Update goal
DELETE /goals/:id             # Delete goal
```

#### Insights
```
GET    /insights              # Get personalized insights
GET    /insights/spending     # Spending analysis
GET    /insights/trends       # Trend analysis
```

### Response Format
```json
// Success
{
  "data": { ... },
  "meta": {
    "pagination": {
      "page": 1,
      "per_page": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "amount", "message": "Must be positive" }
    ]
  }
}
```

---

## Security Architecture

### Authentication Flow
```
┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐
│ Client │────▶│ Clerk  │────▶│  API   │────▶│   DB   │
└────────┘     └────────┘     └────────┘     └────────┘
     │              │              │
     │  1. Login    │              │
     │─────────────▶│              │
     │              │              │
     │  2. JWT      │              │
     │◀─────────────│              │
     │              │              │
     │  3. API Request (Bearer)    │
     │────────────────────────────▶│
     │              │              │
     │              │  4. Verify   │
     │              │◀────────────▶│
     │              │              │
     │  5. Response │              │
     │◀────────────────────────────│
```

### Data Protection
| Data Type | At Rest | In Transit |
|-----------|---------|------------|
| User credentials | N/A (Clerk handles) | TLS 1.3 |
| Bank tokens | AES-256 (Plaid) | TLS 1.3 |
| Transactions | AES-256 | TLS 1.3 |
| Personal data | AES-256 | TLS 1.3 |

---

## Deployment Architecture

### Environments
| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | localhost:3000 | Local development |
| Preview | *.vercel.app | PR previews |
| Staging | staging.financeflow.app | Pre-production testing |
| Production | financeflow.app | Live application |

### CI/CD Pipeline
```
Push to PR    ─▶  Lint + Test  ─▶  Preview Deploy
Push to develop ─▶  Lint + Test + E2E  ─▶  Staging Deploy
Push to main    ─▶  Lint + Test + E2E + Security  ─▶  Production Deploy
```

---

## Monitoring & Observability

### Metrics
| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| Error rate | Sentry | > 1% |
| API latency (p95) | Vercel Analytics | > 500ms |
| Sync failures | Custom + Slack | > 5 per hour |
| Active users | PostHog | - |

### Logging
- **Format**: JSON structured logs
- **Levels**: debug, info, warn, error
- **Retention**: 30 days
- **PII**: Redacted from logs

---

## Cost Estimates (Monthly)

| Service | Free Tier | Growth ($500 MRR) |
|---------|-----------|-------------------|
| Vercel | $0 | $20 |
| Railway | $5 | $25 |
| Supabase | $0 | $25 |
| Upstash | $0 | $10 |
| Clerk | $0 | $25 |
| Plaid | $0 (dev) | $100 |
| Sentry | $0 | $26 |
| PostHog | $0 | $0 |
| **Total** | **$5** | **~$230** |
