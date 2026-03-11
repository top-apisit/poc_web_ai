# QA / Testing Prompts

## 1. Unit Test Generation

```markdown
Generate unit tests for [FILE_PATH].

## Test Framework
- Runner: Vitest / Jest
- Assertions: Built-in / Chai
- Mocks: vi.mock / jest.mock

## Code to test:
```typescript
[PASTE_CODE_HERE]
```

## Requirements

### Test Coverage
- All public methods/functions
- All branches (if/else, switch)
- Edge cases
- Error scenarios

### Test Structure
```typescript
describe('[ModuleName]', () => {
  describe('[methodName]', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Mock Setup
- External dependencies to mock
- Database calls
- API calls
- Time-dependent functions

### Edge Cases to cover
- Empty inputs
- Invalid inputs
- Boundary values
- Null/undefined handling
- Concurrent access (if applicable)

### Assertions
- Use specific matchers
- Test return values
- Test side effects
- Test error messages

## Output
- Test file with comprehensive coverage
- Mock setup helpers
- Test utilities (if needed)
```

## 2. Integration Test Generation

```markdown
Generate integration tests for [API_ENDPOINT].

## Test Framework
- Runner: Vitest / Jest
- HTTP: supertest
- Database: Test database / Docker

## Endpoint Details
- Method: [GET/POST/PUT/DELETE]
- Path: /api/[path]
- Auth required: [Yes/No]

## Test Scenarios

### Success Cases
1. [SCENARIO] → [EXPECTED_RESULT]
2. [SCENARIO] → [EXPECTED_RESULT]

### Error Cases
1. [SCENARIO] → [EXPECTED_ERROR]
2. [SCENARIO] → [EXPECTED_ERROR]

### Authorization
1. No token → 401
2. Invalid token → 401
3. Wrong user → 403

### Validation
1. Missing required field → 400
2. Invalid format → 400
3. Business rule violation → 400

## Test Setup
- Database seeding
- Authentication mocking
- External service mocking

## Test Structure
```typescript
describe('POST /api/[resource]', () => {
  beforeEach(async () => {
    // Setup
  });

  afterEach(async () => {
    // Cleanup
  });

  it('should create resource with valid data', async () => {
    const response = await request(app)
      .post('/api/[resource]')
      .set('Authorization', `Bearer ${token}`)
      .send(validData);

    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject({...});
  });
});
```

## Output
- Integration test file
- Test fixtures
- Setup/teardown utilities
```

## 3. E2E Test Generation

```markdown
Create E2E tests for [USER_FLOW].

## Test Framework
- Tool: Playwright
- Browsers: Chromium, Firefox, WebKit

## User Flow
[DESCRIBE_COMPLETE_USER_JOURNEY]

## Test Scenarios

### Happy Path
1. User starts at [PAGE]
2. User [ACTION]
3. User sees [RESULT]
4. User [ACTION]
5. Final state: [OUTCOME]

### Error Paths
1. [SCENARIO] → [EXPECTED_BEHAVIOR]

### Edge Cases
1. [SCENARIO] → [EXPECTED_BEHAVIOR]

## Page Objects
```typescript
class [PageName]Page {
  readonly page: Page;

  // Locators
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

  // Actions
  async fillForm(data: FormData) { ... }

  // Assertions
  async expectSuccess() { ... }
}
```

## Test Structure
```typescript
test.describe('[User Flow Name]', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: login, navigate, etc.
  });

  test('should complete [flow] successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');

    // Steps...
  });
});
```

## Visual Testing
- Screenshots at key points
- Visual comparison

## Accessibility
- Run axe checks
- Keyboard navigation test

## Output
- E2E test file
- Page objects
- Test fixtures
- Screenshot baselines
```

## 4. Test Data Generation

```markdown
Generate test fixtures for [FEATURE_NAME].

## Data Types Needed
1. [EntityName] - [COUNT] records
2. [EntityName] - [COUNT] records

## Requirements

### Realistic Data
- Use realistic names, emails, etc.
- Appropriate value ranges
- Consistent relationships

### Edge Cases
- Minimum values
- Maximum values
- Empty/null where allowed
- Special characters
- Unicode support

### State Variations
- [STATE_1] records: [COUNT]
- [STATE_2] records: [COUNT]

## Format
```typescript
// Factory function approach
import { faker } from '@faker-js/faker';

export function create[Entity](overrides?: Partial<Entity>): Entity {
  return {
    id: faker.string.uuid(),
    // ... other fields
    ...overrides,
  };
}

// Preset fixtures
export const fixtures = {
  valid[Entity]: create[Entity]({ ... }),
  invalid[Entity]: { ... },
  // edge cases
};
```

## Relationships
- [Entity1] has many [Entity2]
- Generate consistent IDs

## Output
- Factory functions
- Preset fixtures
- Seed script (optional)
```

## 5. API Test Suite

```markdown
Generate a complete API test suite for [MODULE_NAME].

## Endpoints to test
[LIST_ALL_ENDPOINTS]

## For each endpoint generate tests for:

### Request Validation
- Missing required fields
- Invalid field types
- Invalid field values
- Extra fields handling

### Authentication
- No token
- Invalid token
- Expired token

### Authorization
- Correct user
- Wrong user
- Admin override (if applicable)

### Business Logic
- Happy path
- Business rule violations
- State transitions

### Response Format
- Correct status codes
- Response body structure
- Error response format

### Performance
- Response time assertions
- Concurrent request handling

## Test Organization
```
tests/
├── api/
│   ├── [module]/
│   │   ├── create.test.ts
│   │   ├── read.test.ts
│   │   ├── update.test.ts
│   │   ├── delete.test.ts
│   │   └── fixtures.ts
```

## Output
- Complete test suite
- Shared fixtures
- Test utilities
- CI configuration
```

## 6. Security Test Cases

```markdown
Generate security test cases for [FEATURE_NAME].

## OWASP Top 10 Coverage

### Injection
- SQL injection attempts
- NoSQL injection
- Command injection
- XSS payloads

### Broken Authentication
- Brute force protection
- Session fixation
- Token leakage

### Sensitive Data Exposure
- Data in URLs
- Data in logs
- Encryption verification

### Broken Access Control
- Horizontal privilege escalation
- Vertical privilege escalation
- IDOR vulnerabilities

### Security Misconfiguration
- Default credentials
- Error message disclosure
- Unnecessary features enabled

### Input Validation
- Boundary testing
- Type confusion
- Encoding attacks

## Test Cases Format
```typescript
describe('Security: [Category]', () => {
  test('[Attack Type] should be prevented', async () => {
    const maliciousInput = '[PAYLOAD]';

    const response = await request(app)
      .post('/api/endpoint')
      .send({ field: maliciousInput });

    expect(response.status).not.toBe(200);
    // Verify no data leakage, etc.
  });
});
```

## Output
- Security test file
- Attack payload library
- Security checklist
```
