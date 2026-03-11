# System Architecture Document

## Document Info
| Field | Value |
|-------|-------|
| Product | [Product Name] |
| Version | 1.0 |
| Author | [Author Name] |
| Date | [Date] |
| Status | Draft / Review / Approved |

---

## 1. Overview

### Purpose
[Brief description of what this architecture supports]

### Scope
[What is included and excluded]

### Constraints
- [Constraint 1]
- [Constraint 2]

### Assumptions
- [Assumption 1]
- [Assumption 2]

---

## 2. High-Level Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │    Web App       │    │   Mobile App     │               │
│  │   (Next.js)      │    │ (React Native)   │               │
│  └────────┬─────────┘    └────────┬─────────┘               │
└───────────┼───────────────────────┼─────────────────────────┘
            │                       │
            └───────────┬───────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                      API GATEWAY                             │
│                     (Kong / ALB)                             │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    SERVICE LAYER                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Auth   │  │   API    │  │  Worker  │  │  Notif   │    │
│  │ Service  │  │  Server  │  │ Service  │  │ Service  │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
└───────┼─────────────┼─────────────┼─────────────┼───────────┘
        │             │             │             │
┌───────▼─────────────▼─────────────▼─────────────▼───────────┐
│                      DATA LAYER                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │PostgreSQL│  │  Redis   │  │    S3    │  │  Queue   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Summary
| Component | Purpose | Technology |
|-----------|---------|------------|
| Web App | User interface | Next.js 15 |
| Mobile App | Mobile interface | React Native |
| API Gateway | Routing, rate limiting | Kong |
| API Server | Business logic | Node.js + Hono |
| Worker Service | Background jobs | BullMQ |
| Database | Data persistence | PostgreSQL |
| Cache | Session, caching | Redis |
| Storage | File storage | S3 |

---

## 3. Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Tanstack Query | 5.x | Server state |
| Zustand | 4.x | Client state |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22.x | Runtime |
| Hono | 4.x | Web framework |
| Drizzle | 0.3x | ORM |
| Zod | 3.x | Validation |
| BullMQ | 5.x | Job queue |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| Vercel | Frontend hosting |
| Railway | Backend hosting |
| Supabase | PostgreSQL database |
| Upstash | Redis cache |
| AWS S3 | File storage |

### DevOps
| Technology | Purpose |
|------------|---------|
| GitHub Actions | CI/CD |
| Docker | Containerization |
| Terraform | IaC |

---

## 4. Data Architecture

### Database Schema (ERD)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users     │     │   accounts   │     │ transactions │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │──┐  │ id (PK)      │──┐  │ id (PK)      │
│ email        │  │  │ user_id (FK) │◀─┘  │ account_id   │◀─┘
│ name         │  │  │ name         │     │ amount       │
│ created_at   │  │  │ balance      │     │ date         │
└──────────────┘  │  │ created_at   │     │ category     │
                  │  └──────────────┘     │ created_at   │
                  │                       └──────────────┘
                  │
                  │  ┌──────────────┐
                  │  │   budgets    │
                  │  ├──────────────┤
                  └─▶│ id (PK)      │
                     │ user_id (FK) │
                     │ name         │
                     │ amount       │
                     │ category     │
                     └──────────────┘
```

### Data Flow

1. **User Authentication**
   - Client → API Gateway → Auth Service → Database
   - Token returned to client

2. **Data Operations**
   - Client → API Gateway → API Server → Database
   - Response with data

3. **Background Jobs**
   - API Server → Queue → Worker Service → External API → Database

---

## 5. API Architecture

### API Design Principles
- RESTful endpoints
- JSON responses
- JWT authentication
- Rate limiting per user
- Versioned (/api/v1/...)

### Endpoint Structure
```
Base URL: https://api.product.com/v1

Authentication
  POST   /auth/signup
  POST   /auth/signin
  POST   /auth/signout
  POST   /auth/refresh

Users
  GET    /users/me
  PUT    /users/me
  DELETE /users/me

Resources
  GET    /resources
  POST   /resources
  GET    /resources/:id
  PUT    /resources/:id
  DELETE /resources/:id
```

### Response Format
```json
// Success
{
  "data": { ... },
  "meta": {
    "pagination": { "page": 1, "total": 100 }
  }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

---

## 6. Security Architecture

### Authentication
- Provider: Clerk / Auth0 / Custom JWT
- Token type: JWT
- Token expiry: 15 minutes
- Refresh token: 7 days

### Authorization
- Model: RBAC (Role-Based Access Control)
- Roles: user, admin
- Resource-level permissions

### Data Protection
| Data Type | At Rest | In Transit |
|-----------|---------|------------|
| User data | AES-256 | TLS 1.3 |
| Credentials | bcrypt/argon2 | TLS 1.3 |
| Files | AES-256 | TLS 1.3 |

### Security Controls
- [ ] Input validation (all inputs)
- [ ] Output encoding (XSS prevention)
- [ ] Parameterized queries (SQL injection)
- [ ] CSRF tokens
- [ ] Rate limiting
- [ ] Audit logging

---

## 7. Infrastructure Architecture

### Environments
| Environment | Purpose | URL |
|-------------|---------|-----|
| Development | Local dev | localhost |
| Staging | Testing | staging.product.com |
| Production | Live | product.com |

### Scaling Strategy
| Component | Strategy | Trigger |
|-----------|----------|---------|
| API Server | Horizontal | CPU > 70% |
| Database | Vertical / Read replicas | Connections > 80% |
| Cache | Cluster | Memory > 80% |

### Disaster Recovery
- Database backups: Daily
- Retention: 30 days
- RTO: 4 hours
- RPO: 1 hour

---

## 8. Integration Architecture

### External Services
| Service | Purpose | Integration |
|---------|---------|-------------|
| [Service] | [Purpose] | REST API |

### Webhook Handling
- Signature verification
- Idempotency keys
- Retry handling
- Dead letter queue

---

## 9. Monitoring & Observability

### Metrics
| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| Error rate | Sentry | > 1% |
| Response time | Datadog | p99 > 2s |
| Uptime | BetterStack | < 99.9% |

### Logging
- Format: JSON structured
- Levels: debug, info, warn, error
- Retention: 30 days

### Tracing
- Distributed tracing enabled
- Correlation IDs
- Performance profiling

---

## 10. Decision Log

| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| [Decision] | [Options] | [Choice] | [Why] |

---

## 11. Open Items

| Item | Owner | Due | Status |
|------|-------|-----|--------|
| [Item] | [Name] | [Date] | [Status] |
