# Project: AI Workflow Demo (Next.js)

## Figma MCP Gate (Required)
When user gives a SCRUM ticket related to UI (has Figma link, labels include `page`/`component`) → **run this check first before anything:**
```bash
bash .claude/scripts/check-figma-mcp.sh
```
**If it fails → do NOT start work** — tell user to setup Figma MCP first, do not dispatch agents, do not read spec

## Pipeline Enforcement (Required — do not skip)
- **SCRUM ticket work** → must dispatch orchestrator agent — main agent must not write code directly
- **PRE-CHECK + POST-CHECK must not be skipped** — must dispatch impl-verifier every time
- **"done" trigger** → do Time Tracking immediately (ask review time → log worklog → summarize)

## Usage
Just type the Jira ticket number, e.g.:
AUTH-001
DASHBOARD-002
PROFILE-003

orchestrator will pull all data from Jira and dispatch agents automatically

## Agent Roster
- orchestrator    ← receives ticket → dispatches agents
- ui-builder      ← Figma → Next.js Page/Component UI
- service-builder ← Jira/Confluence → API Routes & Types
- logic-builder   ← User Story → Hooks & Business Logic
- impl-verifier   ← PRE-CHECK + POST-CHECK quality gate

## Sprint Agents
- sprint-planner  ← Sprint kickoff → creates branches
- sprint-release  ← Sprint end → creates release branch + notes
- sprint-cleanup  ← Post-release → safe branch cleanup

## UI Stack (Required)
- **Button** → `<Button>` from `@/components/ui/button` (shadcn)
- **Input** → `<Input>` from `@/components/ui/input` (shadcn)
- **Card** → `<Card>` from `@/components/ui/card` (shadcn)
- **Typography** → standard HTML elements with Tailwind classes
- Do NOT use custom styled divs when a shadcn component exists

## Styling (Required)
- Use Tailwind CSS utility classes — no inline styles
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Mobile-first responsive: `md:`, `lg:`, `xl:` breakpoints
- Component variants via `cva()` from `class-variance-authority`

## TypeScript (Required)
- All props must have typed interfaces
- Use Zod schemas for form validation and API input validation
- Use `z.infer<typeof Schema>` for type derivation — no duplicated types
- Run `npx tsc --noEmit` before completing — must pass

## Testing (Required)
- Components: `@testing-library/react`
- API routes: `NextRequest` mock pattern
- Hooks: `renderHook` from `@testing-library/react`
- Use `data-testid` attributes for test selectors

## Implementation Rules (Required)

### 1. Pre-Implementation — must do before writing code
- **Figma first**: pull Figma screenshot + design context before writing JSX/styles — never write UI without Figma reference
- **Figma all states**: must `get_screenshot` for every state (empty, has data, loading, error, success) and compare which components/icons differ per state
- **Cross-check sources**: read main Jira ticket + linked/subtask tickets
- **Audit shared dependencies**: before using shared hook/component → read source code, check for memoization, side effects
- **SPEC GAP Checklist (CRITICAL — do not skip — check before writing code)**:
  Check every item → unclear points → collect into SPEC GAP list → tell dev once → **do NOT implement until dev answers**
  1. **API path parameters** → where do values come from? (e.g., `{id}` in `/users/{id}` — from auth context? URL params?)
  2. **Field empty/null fallback** → if field is empty/null what to display?
  3. **Data format** → what format does API return? (e.g., dates as ISO string or timestamp?)
  4. **Client-side vs API logic** → is this feature client-side or calls new API?
  5. **Navigation/routing** → which route? does it exist already?
  6. **Error handling per status** → different UI per error code?
  7. **Loading states** → skeleton or spinner? component already exists?
  8. **Figma states complete** → does every Figma state use different components?
  - **If agent skips spec gap and hardcodes/assumes → rule violation**
- **Summarize checklist for dev review before coding**: flag differences between Figma / Jira / API spec

### 2. Implementation — while writing code
- **Never hardcode / assume values not in spec or not yet answered by dev**
- **Mock data per AC only**: mock must cover only cases specified in Acceptance Criteria — no extra logic
- **Check existing components first**: check `components/` and `components/ui/` before creating new ones

### 3. Post-Implementation — after writing code
- **Compare Figma point by point**: screenshot from Figma vs code — check font size, weight, color, spacing, icon, layout position
- **Verify mock data**: no duplicates, no extra logic beyond spec, response shape matches TypeScript types
- **Verify spec gap answers**: if dev answered spec gaps → compare code vs answers 1:1 before finishing
- **Run TypeScript check**: `npx tsc --noEmit` must pass before handover
- **Run build check**: `npm run build` must pass (no type errors, no missing imports)

## Lessons Learned (Required reading)
See real issues encountered + prevention: `.claude/docs/lessons-learned.md`

## Reference Docs
- Branch management: `.claude/docs/branch-management.md`
- Next.js conventions: `.claude/docs/nextjs-conventions.md`
- Agent pipeline flow: `.claude/docs/agent-pipeline-flow.md`
- Figma rules: `.claude/docs/figma-rules.md`
- Pre-flight checks: `.claude/docs/pre-flight-checks.md`
- Time tracking: `.claude/docs/time-tracking.md`
- Verify checks: `.claude/docs/verify-checks.md`
