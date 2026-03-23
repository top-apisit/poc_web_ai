# Agent Pipeline Flow — Summary

## Full Pipeline (Mode A — NEW Page)

```
┌─────────────────────────────────────────────────────────────┐
│                     orchestrator                             │
│  receives Jira ticket → fetches data → decides type/mode → dispatches agents │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   CHECK-A/B/C         CHECK-E          CHECK-F
   MCP + Figma +     Linked Ticket    Existing Branch
   files exist       Component IF      ask dev
          │                │                │
          └────────────────┼────────────────┘
                           │ all checks pass
                           ▼
                    Figma Cache
                  get_screenshot + get_design_context
                           │
                           ▼
  ┌────────────────────────────────────────────────────┐
  │            impl-verifier PRE-CHECK                  │
  │                                                     │
  │  Step 1: Spec Validation (CHECK-1~7)               │
  │    ├── CHECK-1: Sections complete                   │
  │    ├── CHECK-2: Component interfaces defined        │
  │    ├── CHECK-3: Figma link has node-id              │
  │    ├── CHECK-4: No spec contradictions              │
  │    ├── CHECK-5: TypeScript types defined            │
  │    ├── CHECK-6: Validation rules complete           │
  │    └── CHECK-7: Conventions match codebase          │
  │                                                     │
  │  Step 2: Code Audit (read real code)                │
  │    ├── components/ui/ (shadcn components)           │
  │    ├── lib/utils.ts (cn utility)                    │
  │    ├── Shared hooks (useCallback/useMemo)           │
  │    └── Existing page patterns (layout etc.)         │
  │                                                     │
  │  Step 3: Cross-Source ANALYZE                       │
  │    ├── UI: Figma vs User Story                      │
  │    ├── Service: API endpoint + types + errors       │
  │    ├── Logic: validation + navigation + states      │
  │    └── Cross-domain: Figma field vs API field       │
  │                                                     │
  │  Step 4: Output .spec.json + audit_results          │
  └──────────────────────┬─────────────────────────────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         ✅ PASSED   ⚠️ SPEC GAP  ❌ ISSUES
         go implement   ask dev     stop — fix spec
                         │
                         ▼
                    dev answers
                    Log Jira comment
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
  ┌──────────────┐ ┌──────────┐ ┌──────────────┐
  │  ui-builder  │ │ service- │ │ logic-builder│
  │              │ │ builder  │ │              │
  │ Figma → JSX  │ │ API →    │ │ US → hooks   │
  │ + Tailwind   │ │ types +  │ │ + validation │
  │ + shadcn     │ │ routes + │ │ + navigation │
  │              │ │ services │ │              │
  │ receives:    │ │ receives:│ │ receives:    │
  │ • figma_cache│ │ • spec   │ │ • spec       │
  │ • audit_res  │ │ • audit  │ │ • audit      │
  │ • spec       │ │ • dev ans│ │ • dev ans    │
  │ • dev ans    │ │          │ │              │
  └──────┬───────┘ └────┬─────┘ └──────┬───────┘
         │              │              │
         └──────────────┼──────────────┘
                        │
                        ▼
  ┌────────────────────────────────────────────────────┐
  │            impl-verifier POST-CHECK                 │
  │                                                     │
  │  Step 1: TypeScript Check                           │
  │    npx tsc --noEmit                                 │
  │                                                     │
  │  Step 2: Structural Check (verify-structural.sh)    │
  │    S1~S8: imports/exports/zones/types/tests        │
  │                                                     │
  │  Step 3: Semantic (VERIFY-1~8)                      │
  │    ├── VERIFY-1: data-testid attributes             │
  │    ├── VERIFY-2: TypeScript types complete          │
  │    ├── VERIFY-3: Validation logic (Zod)             │
  │    ├── VERIFY-4: Navigation/routing                 │
  │    ├── VERIFY-5: No unspecced features              │
  │    ├── VERIFY-6: API route contracts                │
  │    ├── VERIFY-7: Figma visual fidelity              │
  │    └── VERIFY-8: Cross-source consistency           │
  │                                                     │
  │  + Verify Spec Gap Answers 1:1                      │
  └──────────────────────┬─────────────────────────────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         ✅ PASSED   🔧 FIXED    ❌ BLOCKED
                    auto-fix     SPEC GAP → ask dev
                         │
                         ▼
                  Time Tracking
                  Worklog → Jira
                  Archive manifest
```

## Mode Summary

```
Mode A (NEW page):       PRE-CHECK → [ui + svc + logic] → POST-CHECK
Mode B (UPDATE page):    PRE-CHECK → [agents by scope]  → POST-CHECK
Mode C (NEW component):  PRE-CHECK → [ui-builder]       → POST-CHECK
Mode D (UPDATE comp):    PRE-CHECK → [ui-builder]       → POST-CHECK
Mode E (DEFECT):         skip PRE  → [agent by layer]   → POST-CHECK
```

## Agent Count

```
PRE-CHECK + 3×IMPLEMENT + POST-CHECK = 5 spawns
```

## Agent Roster

| Agent | Responsibility | When |
|-------|---------------|------|
| **orchestrator** | receives ticket, pre-flight checks, dispatches agents, time tracking | every ticket |
| **impl-verifier** (PRE-CHECK) | spec validation + code audit + cross-source analyze | before implement (except Mode E) |
| **ui-builder** | Figma → JSX + Tailwind + shadcn | IMPLEMENT phase |
| **service-builder** | API → types + route handlers + services | IMPLEMENT phase |
| **logic-builder** | User Story → hooks + validation + routing | IMPLEMENT phase |
| **impl-verifier** (POST-CHECK) | verify code vs spec, auto-fix, verify spec gap answers | after implement |

## Data Flow

```
orchestrator
  │
  ├── figma_cache ──────────────────┬──→ PRE-CHECK
  │                                 └──→ ui-builder
  │
  ├── confluence_page_id ──────────────→ PRE-CHECK
  │
  ├── shared_components ───────────────→ PRE-CHECK + implement agents
  │
  PRE-CHECK returns:
  │
  ├── .spec.json ──────────────────────→ implement agents + POST-CHECK
  │
  ├── audit_results ───────────────────→ implement agents
  │
  └── dev_answers (if spec gap) ───────→ implement agents + POST-CHECK
```
