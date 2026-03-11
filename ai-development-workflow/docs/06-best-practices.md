# Best Practices for AI-First Development

## 1. Prompt Engineering

### Prompt Structure Template

```markdown
# [ROLE]
You are a [specific role with expertise].

# [CONTEXT]
Project: [Project description]
Tech Stack: [Technologies used]
Current State: [What exists]
Files to Reference: [Relevant files]

# [TASK]
[Clear, specific task description]

# [REQUIREMENTS]
1. [Specific requirement]
2. [Specific requirement]
3. [Specific requirement]

# [CONSTRAINTS]
- [Technical constraint]
- [Style constraint]
- [Business constraint]

# [OUTPUT FORMAT]
[Specify exact format expected]

# [EXAMPLES]
[Provide examples of expected output]

# [VALIDATION]
The output should:
- [ ] Pass criterion 1
- [ ] Pass criterion 2
```

### Bad vs Good Prompts

**❌ Bad Prompt:**
```
Make a login form
```

**✅ Good Prompt:**
```markdown
Create a login form component for our React/Next.js finance app.

Tech Stack:
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- react-hook-form + Zod validation
- NextAuth.js for authentication

Requirements:
1. Email and password fields
2. "Remember me" checkbox
3. "Forgot password" link → /auth/forgot-password
4. Social login buttons (Google, Apple)
5. Loading state during submission
6. Error handling with toast notifications
7. Accessible (ARIA labels, keyboard nav)

Follow the patterns in src/components/auth/SignupForm.tsx

Output: Single TypeScript file with the component
```

### Prompt Tips

1. **Be Specific**: The more detail, the better the output
2. **Provide Context**: Include relevant code, patterns, constraints
3. **Specify Format**: JSON, TypeScript, Markdown, etc.
4. **Include Examples**: Show what good output looks like
5. **Set Boundaries**: What NOT to do is as important as what to do

---

## 2. Preventing Hallucinations

### Strategy Matrix

| Strategy | Implementation | When to Use |
|----------|----------------|-------------|
| **Provide Context** | Include relevant code files | Always |
| **Grounding** | Reference existing patterns | Code generation |
| **Validation Prompts** | Ask AI to verify | Critical decisions |
| **Structured Output** | Request JSON/TypeScript | Data extraction |
| **Multi-Step** | Break into smaller tasks | Complex tasks |
| **Cross-Validation** | Use multiple models | Critical code |

### Implementation Example

```typescript
// Multi-step with validation
async function generateSecureEndpoint(spec: APISpec) {
  // Step 1: Generate code
  const generatedCode = await claude.generate({
    prompt: `Generate API endpoint for: ${JSON.stringify(spec)}`,
    context: await getRelevantFiles(spec)
  });

  // Step 2: Self-validation
  const validation = await claude.generate({
    prompt: `
      Review this generated code for:
      1. Security vulnerabilities (OWASP Top 10)
      2. Error handling completeness
      3. Input validation coverage
      4. Type safety issues

      Code to review:
      ${generatedCode}

      Return JSON: { valid: boolean, issues: string[], suggestions: string[] }
    `
  });

  // Step 3: Fix issues if found
  if (!validation.valid) {
    return await claude.generate({
      prompt: `Fix these issues in the code: ${validation.issues.join('\n')}`,
      code: generatedCode
    });
  }

  return generatedCode;
}
```

### Red Flags to Watch For

- Made-up function/API names
- Non-existent npm packages
- Incorrect syntax for the specified framework
- Outdated patterns (check against current docs)
- Over-complicated solutions

---

## 3. Reviewing AI-Generated Code

### Code Review Checklist

```markdown
## AI Code Review Checklist

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present
- [ ] SQL/NoSQL injection prevention
- [ ] XSS prevention (output encoding)
- [ ] CSRF protection where needed
- [ ] Proper authentication checks
- [ ] Authorization enforcement
- [ ] Sensitive data encryption

### Logic
- [ ] Business logic is correct
- [ ] Edge cases handled
- [ ] Error handling appropriate
- [ ] Null/undefined checks
- [ ] Race conditions considered
- [ ] Transaction boundaries correct

### Quality
- [ ] Follows existing patterns
- [ ] No unnecessary complexity
- [ ] Types are accurate
- [ ] No dead code
- [ ] No console.logs
- [ ] Tests are meaningful

### Performance
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] No memory leaks
- [ ] Pagination for lists
- [ ] Indexes suggested for queries
```

### Review Priorities

1. **Always Review**: Security, auth, payments, data handling
2. **Carefully Review**: Business logic, API contracts, database changes
3. **Quick Review**: UI components, utilities, tests
4. **Trust After Validation**: Formatting, documentation, type definitions

---

## 4. Maintaining Code Quality

### Quality Gates Configuration

```javascript
// quality-gates.config.js
module.exports = {
  // Pre-commit hooks
  preCommit: {
    lint: true,
    typeCheck: true,
    formatCheck: true,
    testAffected: true
  },

  // PR requirements
  pullRequest: {
    coverage: {
      minimum: 80,
      newCode: 90
    },
    reviews: {
      required: 2,
      aiReviewPassing: true
    },
    checks: {
      lint: 'required',
      types: 'required',
      tests: 'required',
      security: 'required',
      aiReview: 'required'
    }
  },

  // Code metrics
  metrics: {
    complexity: {
      max: 15,
      warn: 10
    },
    duplications: {
      max: 3 // percent
    },
    dependencies: {
      outdated: 'warn',
      vulnerable: 'block'
    }
  }
};
```

### Enforcing Consistency

1. **ESLint/Prettier**: Consistent formatting
2. **TypeScript Strict Mode**: Type safety
3. **Husky Pre-commit**: Gate before commit
4. **CI Checks**: Gate before merge
5. **Code Review**: Human oversight

---

## 5. Avoiding Technical Debt

### AI-Assisted Debt Prevention

Before implementing, ask AI to analyze:

```markdown
## Technical Debt Assessment Prompt

Before implementing this feature, analyze the codebase for:

1. **Pattern Consistency**
   - Does similar functionality exist elsewhere?
   - Should this be extracted to a shared utility?
   - Are we following established patterns?

2. **Dependency Analysis**
   - Will this create circular dependencies?
   - Are we adding redundant dependencies?
   - Is the dependency well-maintained?

3. **Abstraction Level**
   - Is this the right abstraction level?
   - Are we over-engineering for future needs?
   - Are we under-engineering for current needs?

4. **Testing Strategy**
   - What test coverage is appropriate?
   - Are there integration points that need testing?
   - Can this be tested in isolation?

5. **Documentation Needs**
   - Is this self-documenting?
   - What documentation is essential?
   - Are there gotchas future developers should know?

Provide recommendations for each area.
```

### Debt Tracking Automation

```yaml
# Weekly tech debt scan
name: Technical Debt Scan

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly Monday

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run analysis
        run: |
          # Find TODOs and FIXMEs
          grep -r "TODO\|FIXME" src/ > todos.txt || true

          # Check for large files
          find src/ -name "*.ts" -size +500k > large-files.txt || true

          # Check for complex functions
          npx complexity-report src/ > complexity.json

      - name: AI Debt Analysis
        uses: anthropic/claude-action@v1
        with:
          prompt: |
            Analyze this codebase for technical debt:
            1. Identify TODO/FIXME comments
            2. Find duplicated code patterns
            3. Detect overly complex functions
            4. Prioritize by impact and effort

      - name: Create tickets
        run: node scripts/create-debt-tickets.js
```

### Prevention Principles

1. **Don't Skip Tests**: AI can generate them fast
2. **Don't Ignore Types**: TypeScript catches errors early
3. **Don't Copy-Paste**: Extract shared utilities
4. **Don't Hardcode**: Use configuration
5. **Don't Over-Engineer**: Keep it simple
6. **Document Decisions**: Future you will thank you
