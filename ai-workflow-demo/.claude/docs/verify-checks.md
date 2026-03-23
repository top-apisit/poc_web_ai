# Verification Checks Reference

## VERIFY-1: data-testid Attributes
```bash
grep -rn 'data-testid=' app/<path>/page.tsx components/<Name>/<Name>.tsx 2>/dev/null
```
- All data-testid in spec are in code ✅
- No data-testid in code not in spec ✅
- Format: `kebab-case` (e.g., `login-button-submit`, `dashboard-search-input`) ✅
- **Auto-fix**: wrong format/name → fix immediately

## VERIFY-2: TypeScript Types Complete
```bash
npx tsc --noEmit 2>&1
```
- Zero TypeScript errors ✅
- No `any` types used ✅
- All props have typed interfaces ✅
- Zod schemas derive types (no duplicate manual types) ✅
- **Auto-fix**: missing type annotations → add immediately
- **SPEC GAP**: type conflicts from spec → notify dev

## VERIFY-3: Validation Logic (Zod)
- Zod schema covers all required fields ✅
- Error messages match spec ✅
- Validation trigger matches spec (on submit / on change) ✅
- Error display component matches design ✅
- **Auto-fix**: wrong error messages → fix immediately
- **SPEC GAP**: conflicting rules → notify dev

## VERIFY-4: Navigation/Routing
```bash
grep -rn "useRouter\|router\.push\|Link href\|redirect(" app/<path>/ 2>/dev/null
```
- Success navigation matches Exit Point in spec ✅
- Route exists in app directory structure ✅
- Dynamic segments match expected params ✅
- **Auto-fix**: wrong route path → fix immediately

## VERIFY-5: No Unspecced Features
- No loading states not in spec ✅
- No extra validation not in spec ✅
- No extra state/logic not in spec ✅
- **Auto-fix**: remove unspecced features
- **Skip Mode E** — defect fixes may include workarounds

## VERIFY-6: API Route Contract
```bash
# For service-builder work
grep -n "export async function" app/api/<route>/route.ts
```
- All HTTP methods in spec are implemented ✅
- Request/response types match spec ✅
- Error responses use standard format ✅
- **Auto-fix**: missing method or wrong response format → fix immediately

## VERIFY-7: Figma Visual Fidelity
Compare styles vs Figma: colors, fonts, spacing, dimensions, borders, layout, shadows, responsive breakpoints
- **Auto-fix**: values don't match → fix in Tailwind classes
- **SPEC GAP**: custom component project doesn't have → notify dev

## VERIFY-8: Cross-Source Consistency
- No fallback behavior not in spec ✅
- No format/transform not in spec ✅
- Mock/stub data has no duplicate entries ✅
- **Auto-fix**: remove unspecced behavior
- **SPEC GAP**: removing breaks functionality → notify dev

## VERIFY-9: Next.js Conventions
```bash
# Check 'use client' usage is appropriate
grep -rn '"use client"' app/<path>/ components/<Name>/ 2>/dev/null
```
- Server Components used by default ✅
- `'use client'` only where hooks/event handlers needed ✅
- `next/image` used for all images ✅
- `next/link` used for all internal navigation ✅
- `next/font` used if custom fonts needed ✅
- **Auto-fix**: wrong directive → fix immediately

## VERIFY-10: Regression Check (Mode B/D/E only)
```bash
git diff HEAD -- <changed_files> | grep -E "^[-+].*(zone:|export const|export function|export default)"
```
- No deleted functions/variables outside scope ✅
- No changed return types of existing functions ✅
- Zone boundaries still intact ✅
- **If regression found → block immediately**
