# Backend Engineer Prompts

## 1. API Endpoint Implementation

```markdown
Create a complete CRUD API for [RESOURCE_NAME] in our [PRODUCT_NAME].

## Tech Stack
- Runtime: Node.js / Bun
- Framework: Hono / Express / Fastify
- ORM: Drizzle / Prisma
- Database: PostgreSQL
- Validation: Zod
- Auth: JWT / Clerk middleware

## Endpoints to implement
- POST /api/[resources] - Create
- GET /api/[resources] - List (paginated)
- GET /api/[resources]/:id - Get single
- PUT /api/[resources]/:id - Update
- DELETE /api/[resources]/:id - Soft delete

## Requirements per endpoint

### Input Validation
- Use Zod schemas
- Validate all inputs
- Return meaningful error messages

### Authorization
- Users can only access their own resources
- Check ownership on single-resource operations

### Response Format
```typescript
// Success
{ data: T, meta?: { pagination } }

// Error
{ error: { code: string, message: string, details?: any } }
```

### Error Handling
- 400: Validation errors
- 401: Not authenticated
- 403: Not authorized
- 404: Not found
- 500: Server error (logged, generic message to client)

## Existing Patterns
Follow patterns from: [EXISTING_FILE_PATH]

## Output
- Route handler file
- Zod validation schemas
- Service layer (business logic)
- Unit tests (Vitest)
```

## 2. Database Migration

```markdown
Create database migrations for [FEATURE_NAME].

## ORM
- Tool: Drizzle / Prisma
- Database: PostgreSQL

## Changes needed
[DESCRIBE_SCHEMA_CHANGES]

## Generate

### 1. Schema Definition
```typescript
// Drizzle schema
export const tableName = pgTable('table_name', {
  // columns
});
```

### 2. Migration File
- Up migration
- Down migration (rollback)

### 3. Indexes
- Query patterns to optimize
- Index definitions

### 4. Foreign Keys
- Relationships
- Cascade behavior

### 5. Seed Data
Sample data for development/testing

### 6. Type Exports
TypeScript types for the models

## Considerations
- Backward compatibility
- Zero-downtime migration
- Data transformation (if needed)
```

## 3. Service Layer Implementation

```markdown
Implement [SERVICE_NAME]Service for [PRODUCT_NAME].

## Purpose
[WHAT_THIS_SERVICE_DOES]

## Dependencies
- Database: [TABLES_USED]
- External APIs: [IF_ANY]
- Other services: [IF_ANY]

## Methods to implement

### method1(params): ReturnType
- **Purpose**: [WHAT_IT_DOES]
- **Business logic**: [RULES]
- **Error cases**: [LIST]

### method2(params): ReturnType
[Same structure]

## Requirements

### Transaction Handling
- Multi-table operations
- Rollback on failure

### Caching
- What to cache
- Cache invalidation strategy

### Logging
- Info: Key operations
- Error: Failures with context
- Debug: Development details

### Error Handling
Custom error classes with codes

## Testing Requirements
- Unit tests for each method
- Mock external dependencies
- Test edge cases

## Output
- Service class/module
- Types/interfaces
- Unit tests
- Integration tests (optional)
```

## 4. Background Job Implementation

```markdown
Create a background job for [JOB_NAME].

## Job Details
- Purpose: [WHAT_IT_DOES]
- Trigger: [SCHEDULE/EVENT/MANUAL]
- Frequency: [IF_SCHEDULED]

## Tech Stack
- Queue: BullMQ / Inngest / Trigger.dev
- Database: PostgreSQL

## Implementation

### Job Definition
```typescript
// Job payload type
interface [JobName]Payload {
  // fields
}

// Job options
const jobOptions = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  timeout: 60000,
};
```

### Job Logic
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

### Error Handling
- Retryable errors: [LIST]
- Fatal errors: [LIST]
- Dead letter handling

### Monitoring
- Progress reporting
- Completion logging
- Failure alerting

### Testing
- Unit tests
- Integration tests
- Manual trigger endpoint

## Output
- Job definition file
- Worker implementation
- Tests
```

## 5. Third-Party Integration

```markdown
Implement [SERVICE_NAME] integration for [PRODUCT_NAME].

## Service Details
- Service: [NAME] (e.g., Plaid, Stripe, SendGrid)
- API Version: [VERSION]
- Documentation: [URL]

## Features to implement
1. [FEATURE_1]
2. [FEATURE_2]
3. [FEATURE_3]

## Implementation

### API Client
```typescript
// Wrapper class/module
class [ServiceName]Client {
  // Methods
}
```

### Error Handling
- Map service errors to app errors
- Retry logic for transient failures
- Rate limit handling

### Webhook Handler
If applicable:
- Signature verification
- Event processing
- Idempotency

### Environment Variables
```
SERVICE_API_KEY=
SERVICE_SECRET=
SERVICE_WEBHOOK_SECRET=
```

### Testing
- Mock responses
- Sandbox environment usage
- Error scenario tests

## Security
- Credential storage
- Request signing
- Audit logging

## Output
- Client wrapper
- Webhook handlers
- Types/interfaces
- Tests
- Environment variable documentation
```

## 6. Authentication Implementation

```markdown
Implement authentication for [PRODUCT_NAME].

## Auth Provider
- Type: [JWT / Session / OAuth / Clerk / Auth0]
- Providers: [Email, Google, Apple, etc.]

## Features

### Sign Up
- Email/password registration
- Email verification
- Social OAuth

### Sign In
- Credential validation
- Token generation
- Remember me

### Session Management
- Token refresh
- Session invalidation
- Multi-device support

### Password Reset
- Reset request
- Token validation
- Password update

## Implementation

### Middleware
```typescript
// Auth middleware
export const authMiddleware = (req, res, next) => {
  // Validate token
  // Attach user to request
};
```

### Routes
- POST /auth/signup
- POST /auth/signin
- POST /auth/signout
- POST /auth/refresh
- POST /auth/forgot-password
- POST /auth/reset-password

### Security
- Password hashing (bcrypt/argon2)
- Rate limiting
- CSRF protection
- Secure cookies

## Output
- Auth routes
- Middleware
- Token utilities
- Tests
```
