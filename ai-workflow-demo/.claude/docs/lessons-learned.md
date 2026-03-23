# Lessons Learned — AI Implementation Issues

Real issues encountered from AI implementation + how to prevent them.
All team members can read — committed to git.

---

## Template for New Entries

```
## SCRUM-{id}: {Feature Name} ({date})

**Total: AI {x}m + Dev review {y}m = {total}m | Tokens: ~{n}k**

### Issue 1: {short title} (~{pct}% of review time)

**Symptom:** {describe what was wrong}
**Root cause:** {why it happened — what agent failed to check}
**Prevention:** {rule/check to add or strengthen}
```

---

## Key Recurring Patterns to Watch

### 1. Figma not fetched before implementing UI
**Symptom:** Colors, font sizes, layout, spacing wrong throughout
**Root cause:** Figma MCP expired or not checked → agent implements from spec text only
**Prevention:** orchestrator must get_screenshot successfully before dispatching ui-builder — if Figma unavailable → STOP notify dev

### 2. Not reading existing code before implementing
**Symptom:**
- Not using existing shadcn components from `components/ui/`
- Re-creating utilities that already exist in `lib/utils.ts`
- Hooks missing memoization causing re-render loops

**Root cause:** Agent did not audit shared code before implementing
**Prevention:**
- Read `components/ui/` before using any UI element
- Read `lib/` before implementing utilities
- Read source of hooks/contexts before using — check useCallback/useMemo

### 3. TypeScript type errors at the end
**Symptom:** `npx tsc --noEmit` fails after implementation
**Root cause:** Agent used `any` types or didn't wire up Zod schemas correctly
**Prevention:**
- Define all types before implementing
- Run `npx tsc --noEmit` periodically during implementation
- Use `z.infer<typeof Schema>` for derived types

### 4. Hardcoding values without spec basis
**Symptom:** Mock data doesn't match API spec, hardcoded IDs, wrong field names
**Root cause:** Spec gaps not identified in PRE-CHECK
**Prevention:** PRE-CHECK SPEC GAP checklist must be completed — never assume or hardcode

### 5. Next.js App Router confusion
**Symptom:** Using wrong data fetching pattern, missing 'use client' directive, wrong file conventions
**Root cause:** Agent applying Pages Router patterns in App Router project
**Prevention:**
- Always check if component needs 'use client' before adding hooks/event handlers
- Use Server Components by default, Client Components only when needed
- Check `.claude/docs/nextjs-conventions.md` before implementing pages
