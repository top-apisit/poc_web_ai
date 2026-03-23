# Spec Manifest Reference — Output Formats

> **Note:** `.spec.json` is created by `impl-verifier PRE-CHECK`

## Spec Manifest Output (Required every time PRE-CHECK passes)

After PRE-CHECK passes → extract key data and save as compact file:

**Path**: `.claude/tasks/active/<PageOrComponentName>.spec.json`

**Structure**:
```json
{
  "ticket_id": "<TICKET>",
  "page_name": "<Name>",
  "mode": "<A|B|C|D>",
  "figma_node_id": "<node-id>",
  "confluence_page_id": "<id>",
  "route_path": "/dashboard/users",
  "testids": ["login-button-submit", "dashboard-search-input"],
  "types": {
    "UserSchema": "Zod schema required",
    "LoginRequest": "interface required"
  },
  "validation": {
    "trigger": "on_submit",
    "schema": "UserLoginSchema",
    "fields": {
      "email": ["Required", "Must be valid email"],
      "password": ["Required", "Min 8 characters"]
    }
  },
  "navigation": {
    "success": { "route": "/dashboard", "method": "push" }
  },
  "api_endpoints": [
    { "method": "POST", "path": "/api/auth/login", "service": "authService.login" }
  ],
  "shared_components": ["Button", "Input", "Card"],
  "dev_answers": {}
}
```

## PRE-CHECK Output Format

```
PRE-CHECK Results for SCRUM-{id} — {PageName}

  Spec Validation:
  ✅ CHECK-1: All required sections present
  ✅ CHECK-2: Component interfaces defined
  ✅ CHECK-3: Figma node-id verified (12:345)
  ✅ CHECK-4: No spec contradictions
  ⚠️ CHECK-5: Missing TypeScript type for UserProfile
  ✅ CHECK-6: Validation rules complete
  ✅ CHECK-7: Conventions match (App Router, Tailwind, shadcn)

  Code Audit:
  ✅ Button component found at components/ui/button.tsx
  ✅ Input component found at components/ui/input.tsx
  ⚠️ No existing useAuth hook — will be created

  SPEC GAP List (must answer before implementing):
  1. [API-PARAM] Where does userId come from? (session? URL param?)
  2. [FIELD-NULL] What to display if profileImage is null?

  → Sending SPEC GAP to dev. Agents will not be dispatched until answers received.
```

## POST-CHECK Output Format

```
POST-CHECK Results for SCRUM-{id} — {PageName}

  TypeScript:
  ✅ npx tsc --noEmit — 0 errors

  Structural:
  ✅ All zone boundaries intact
  ✅ All exports correct

  Semantic Verification:
  ✅ VERIFY-1: All data-testid present and correct format
  ✅ VERIFY-2: TypeScript types complete, no any
  ✅ VERIFY-3: Zod validation matches spec
  ✅ VERIFY-4: Navigation routes correct
  ✅ VERIFY-5: No unspecced features
  ✅ VERIFY-6: API route contracts correct
  🔧 VERIFY-7: Fixed — button color was #3B82F6, should be #2563EB (auto-fixed)
  ✅ VERIFY-8: No unspecced behavior

  Spec Gap Verification:
  ✅ userId from session.user.id — matches dev answer

  → POST-CHECK PASSED — ready for time tracking
```
