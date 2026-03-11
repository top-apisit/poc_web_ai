# Solution Architect Prompts

## 1. System Architecture Design

```markdown
Design a system architecture for [PRODUCT_NAME].

## Context
Product: [BRIEF_DESCRIPTION]
Expected Scale: [USER_COUNT] users in Year 1
Key Features: [LIST_FEATURES]

## Requirements
- Platform: [Web / Mobile / Both]
- Real-time features: [Yes/No - describe]
- Third-party integrations: [LIST]
- Compliance: [GDPR, SOC2, HIPAA, etc.]
- Budget constraints: [Low/Medium/High]

## Provide:

### 1. High-Level Architecture
- Component diagram (describe for Mermaid generation)
- Layer descriptions (Client, API, Services, Data)
- Communication patterns (REST, GraphQL, WebSocket)

### 2. Component Breakdown
For each component:
- Name and responsibility
- Technology choice with justification
- Scaling considerations
- Dependencies

### 3. Data Flow
For key user journeys:
- Step-by-step data flow
- Latency considerations
- Caching strategy

### 4. Security Architecture
- Authentication approach
- Authorization model
- Data encryption (at rest, in transit)
- Secret management

### 5. Infrastructure
- Cloud provider recommendation
- Compute resources
- Storage solutions
- Networking

### 6. Scalability Plan
- Horizontal vs vertical scaling
- Database scaling strategy
- Caching layers
- CDN usage

Output with Mermaid diagrams where applicable.
```

## 2. Technology Stack Selection

```markdown
Recommend a technology stack for [PRODUCT_NAME].

## Requirements
- Product type: [WEB/MOBILE/BOTH]
- Team size: [NUMBER]
- Team expertise: [LANGUAGES/FRAMEWORKS]
- Timeline: [AGGRESSIVE/NORMAL/FLEXIBLE]
- Budget: [STARTUP/GROWTH/ENTERPRISE]
- Scale: [USERS] expected

## Constraints
- Must integrate with: [SYSTEMS]
- Compliance requirements: [LIST]
- Performance requirements: [DESCRIBE]

## Evaluate and recommend:

### Frontend
| Option | Pros | Cons | Fit Score |
|--------|------|------|-----------|
Compare: Next.js, Remix, SvelteKit, etc.

### Backend
| Option | Pros | Cons | Fit Score |
Compare: Node.js, Go, Python, etc.

### Database
| Option | Pros | Cons | Fit Score |
Compare: PostgreSQL, MongoDB, etc.

### Infrastructure
| Option | Pros | Cons | Fit Score |
Compare: AWS, GCP, Vercel, Railway, etc.

### Final Recommendation
- Stack summary
- Justification
- Risk factors
- Learning curve estimate
- Cost estimate (monthly)
```

## 3. Database Schema Design

```markdown
Design a database schema for [PRODUCT_NAME].

## Context
Product: [DESCRIPTION]
Database: [PostgreSQL/MySQL/MongoDB/etc.]
ORM: [Drizzle/Prisma/TypeORM/etc.]

## Entities needed:
[LIST_ENTITIES_WITH_DESCRIPTIONS]

## Requirements:
- Multi-tenancy: [Yes/No]
- Soft delete: [Yes/No]
- Audit trails: [Yes/No]
- Full-text search: [Yes/No]

## Provide:

### 1. Entity-Relationship Diagram
Mermaid ERD syntax

### 2. Table Definitions
For each table:
- Column name, type, constraints
- Primary key strategy (UUID vs auto-increment)
- Foreign key relationships
- Indexes (and why)

### 3. Relationships
- One-to-one
- One-to-many
- Many-to-many (junction tables)

### 4. Enums/Types
Define as TypeScript types

### 5. Common Queries
- List with pagination
- Search/filter
- Aggregations

### 6. Migration Strategy
- Initial migration
- Versioning approach
- Rollback plan

### 7. Seed Data
Sample data for development
```

## 4. API Design (OpenAPI)

```markdown
Design a RESTful API for [MODULE_NAME] in [PRODUCT_NAME].

## Context
Backend: [FRAMEWORK]
Auth: [METHOD - JWT, Session, etc.]
Existing patterns: [DESCRIBE or paste example]

## Endpoints needed:
[LIST_OPERATIONS]

## Generate OpenAPI 3.1 specification:

### For each endpoint include:
- Method + Path (following REST conventions)
- Operation ID
- Summary and description
- Request parameters (path, query, header)
- Request body schema (with examples)
- Response schemas (200, 400, 401, 403, 404, 500)
- Authentication requirements
- Rate limiting headers

### Additional requirements:
- Use consistent naming (snake_case for JSON)
- Include pagination for list endpoints
- Include filtering/sorting parameters
- Use ISO 8601 for dates
- Include HATEOAS links where appropriate

### Output format:
OpenAPI 3.1 YAML specification
```

## 5. Integration Architecture

```markdown
Design integration architecture for [PRODUCT_NAME] with [SERVICE_NAME].

## Integration details:
- Service: [SERVICE_NAME] (e.g., Plaid, Stripe, SendGrid)
- Purpose: [WHAT_IT_DOES]
- Data flow: [INBOUND/OUTBOUND/BOTH]

## Provide:

### 1. Integration Overview
- Connection type (REST, WebSocket, SDK)
- Authentication method
- Data synchronization approach

### 2. Data Flow Diagram
Sequence diagram in Mermaid

### 3. Implementation Components
- API client wrapper
- Webhook handlers
- Background sync jobs
- Error handling

### 4. Error Handling Strategy
- Retry logic (exponential backoff)
- Circuit breaker pattern
- Dead letter queue
- Alerting

### 5. Security Considerations
- Credential management
- Data encryption
- Audit logging
- Compliance

### 6. Testing Strategy
- Sandbox/test environment
- Mock data
- Integration tests

### 7. Monitoring
- Health checks
- Performance metrics
- Error tracking

### 8. Code Structure
Suggested file/folder organization
```

## 6. Microservices Design

```markdown
Design microservices architecture for [PRODUCT_NAME].

## Current State
- Monolith: [Yes/No]
- Team size: [NUMBER]
- Current pain points: [LIST]

## Services to design:
[LIST_SERVICES_WITH_RESPONSIBILITIES]

## Provide:

### 1. Service Catalog
| Service | Responsibility | Team Owner | Tech Stack |
|---------|---------------|------------|------------|

### 2. Service Boundaries
For each service:
- Domain scope
- Data ownership
- API surface

### 3. Communication Patterns
- Sync (REST, gRPC)
- Async (events, queues)
- Service mesh needs

### 4. Data Management
- Database per service
- Event sourcing needs
- CQRS patterns

### 5. Deployment Architecture
- Container orchestration
- Service discovery
- Load balancing

### 6. Cross-Cutting Concerns
- Authentication/Authorization
- Logging
- Tracing
- Monitoring

### 7. Migration Strategy
If from monolith:
- Strangler pattern
- Data migration
- Phased rollout
```
