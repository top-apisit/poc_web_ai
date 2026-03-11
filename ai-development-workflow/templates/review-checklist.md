# Code Review Checklist

## AI-Generated Code Review

Use this checklist when reviewing AI-generated code to ensure quality and safety.

---

## Security Review

### Authentication & Authorization
- [ ] No hardcoded credentials or API keys
- [ ] Authentication checks on protected routes
- [ ] Authorization checks for resource access
- [ ] Token validation is correct
- [ ] Session handling is secure

### Input Validation
- [ ] All user inputs are validated
- [ ] Validation uses allowlists, not blocklists
- [ ] File uploads are validated (type, size)
- [ ] SQL/NoSQL injection prevention
- [ ] XSS prevention (output encoding)
- [ ] Command injection prevention

### Data Protection
- [ ] Sensitive data is encrypted
- [ ] PII is handled correctly
- [ ] No sensitive data in logs
- [ ] No sensitive data in URLs
- [ ] Proper error messages (no stack traces to users)

---

## Logic Review

### Business Logic
- [ ] Logic matches requirements
- [ ] Edge cases are handled
- [ ] Boundary conditions are correct
- [ ] Error handling is appropriate
- [ ] Null/undefined checks present

### Data Handling
- [ ] Data transformations are correct
- [ ] Type conversions are safe
- [ ] Date/time handling is correct
- [ ] Currency calculations use appropriate precision
- [ ] Arrays/objects are properly cloned when needed

### State Management
- [ ] State updates are atomic
- [ ] Race conditions are prevented
- [ ] Side effects are controlled
- [ ] Cleanup on unmount/disconnect

---

## Code Quality

### Patterns & Conventions
- [ ] Follows existing code patterns
- [ ] Naming conventions are consistent
- [ ] File/folder structure is correct
- [ ] Import order is consistent
- [ ] No unnecessary comments

### TypeScript
- [ ] Types are accurate
- [ ] No `any` types without justification
- [ ] Interfaces/types are well-defined
- [ ] Generics are used appropriately
- [ ] Type guards are correct

### React (if applicable)
- [ ] Components are properly typed
- [ ] Props have sensible defaults
- [ ] useEffect dependencies are correct
- [ ] Memoization is appropriate (not excessive)
- [ ] Keys are stable and unique

### Error Handling
- [ ] Errors are caught appropriately
- [ ] Error messages are helpful
- [ ] Errors are logged correctly
- [ ] User-facing errors are friendly
- [ ] Recovery paths exist where needed

---

## Performance

### Database
- [ ] No N+1 queries
- [ ] Appropriate indexes suggested
- [ ] Pagination for large datasets
- [ ] Transactions used correctly
- [ ] Connection pooling considered

### API
- [ ] Response sizes are reasonable
- [ ] Caching headers are set
- [ ] Rate limiting considered
- [ ] Timeout handling present

### Frontend
- [ ] No unnecessary re-renders
- [ ] Images are optimized
- [ ] Bundle size impact considered
- [ ] Lazy loading where appropriate
- [ ] Memory leaks prevented

---

## Testing

### Test Coverage
- [ ] Unit tests for business logic
- [ ] Integration tests for API
- [ ] Edge cases are tested
- [ ] Error scenarios are tested

### Test Quality
- [ ] Tests are meaningful (not just coverage)
- [ ] Assertions are specific
- [ ] Mocks are appropriate
- [ ] Tests are maintainable

---

## Documentation

### Code Documentation
- [ ] Complex logic is explained
- [ ] Public APIs are documented
- [ ] TODO comments have context
- [ ] No outdated comments

### External Documentation
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Changelog entry added

---

## Deployment

### Database Changes
- [ ] Migrations are reversible
- [ ] Data migration is safe
- [ ] Backward compatible

### Environment
- [ ] Environment variables documented
- [ ] No environment-specific code
- [ ] Feature flags used appropriately

### Monitoring
- [ ] Logging is appropriate
- [ ] Errors are tracked
- [ ] Metrics are captured

---

## Quick Reference

### Must Check (Always)
1. Security (auth, input validation)
2. Business logic correctness
3. Error handling
4. Type safety

### Should Check (Usually)
1. Performance implications
2. Test coverage
3. Code patterns
4. Documentation

### Nice to Check (If Time)
1. Code style consistency
2. Naming improvements
3. Refactoring opportunities
4. Future extensibility

---

## Red Flags to Watch For

### AI-Specific Issues
- [ ] Made-up function/library names
- [ ] Incorrect API usage
- [ ] Outdated patterns
- [ ] Over-complicated solutions
- [ ] Inconsistent with codebase style

### Common Mistakes
- [ ] Missing error handling
- [ ] Hardcoded values
- [ ] Console.log statements
- [ ] Commented-out code
- [ ] TODO without context

---

## Approval Criteria

### Can Merge
- All "Must Check" items pass
- No security issues
- Tests pass
- Code builds

### Needs Changes
- Any security issue
- Logic errors
- Missing tests for critical paths
- Breaking changes not flagged

### Cannot Merge
- Security vulnerabilities
- Hardcoded secrets
- Breaking production
- Data integrity risks
