#!/bin/bash
# ╔══════════════════════════════════════════════════════════════╗
# ║  verify-structural.sh                                         ║
# ║  Structural checks for Next.js implementation                 ║
# ╚══════════════════════════════════════════════════════════════╝
#
# Usage: bash .claude/scripts/verify-structural.sh <file_or_dir>
# Example: bash .claude/scripts/verify-structural.sh app/dashboard/page.tsx

TARGET=${1:-"."}
ERRORS=0
WARNINGS=0

error() { echo "❌ S$1: $2"; ERRORS=$((ERRORS + 1)); }
warn()  { echo "⚠️  W$1: $2"; WARNINGS=$((WARNINGS + 1)); }
ok()    { echo "✅ S$1: $2"; }

echo "═══════════════════════════════════════════"
echo "Structural Verification: $TARGET"
echo "═══════════════════════════════════════════"
echo ""

# ─── S1: TypeScript check ────────────────────────────────────
echo "S1: TypeScript check..."
if npx tsc --noEmit 2>/dev/null; then
  ok "1" "TypeScript — 0 errors"
else
  error "1" "TypeScript errors found — run npx tsc --noEmit to see details"
fi

# ─── S2: No 'any' types in target ───────────────────────────
echo "S2: Checking for 'any' types..."
if [ -f "$TARGET" ]; then
  ANY_COUNT=$(grep -c ": any\b\|as any\b" "$TARGET" 2>/dev/null || echo 0)
  if [ "$ANY_COUNT" -eq 0 ]; then
    ok "2" "No 'any' types found"
  else
    warn "2" "'any' type used ${ANY_COUNT} time(s) in $TARGET"
  fi
fi

# ─── S3: Banned patterns ─────────────────────────────────────
echo "S3: Checking banned patterns..."
BANNED_ERRORS=0
if [ -f "$TARGET" ]; then
  # console.log in production code
  if grep -n "console\.log" "$TARGET" 2>/dev/null | grep -v "\.test\." | grep -v "\.spec\." > /dev/null 2>&1; then
    warn "3" "console.log found — remove before shipping"
    BANNED_ERRORS=$((BANNED_ERRORS + 1))
  fi
  # TODO comments
  if grep -n "TODO\|FIXME\|HACK" "$TARGET" 2>/dev/null > /dev/null 2>&1; then
    warn "3" "TODO/FIXME/HACK comments found"
    BANNED_ERRORS=$((BANNED_ERRORS + 1))
  fi
fi
if [ "$BANNED_ERRORS" -eq 0 ]; then
  ok "3" "No banned patterns"
fi

# ─── S4: 'use client' directive check ────────────────────────
echo "S4: Checking 'use client' usage..."
if [ -f "$TARGET" ]; then
  HAS_USE_CLIENT=$(grep -c '"use client"' "$TARGET" 2>/dev/null || echo 0)
  HAS_HOOKS=$(grep -c "useState\|useEffect\|useCallback\|useMemo\|useRef\|useContext" "$TARGET" 2>/dev/null || echo 0)
  HAS_EVENTS=$(grep -c "onClick\|onChange\|onSubmit\|onBlur\|onFocus" "$TARGET" 2>/dev/null || echo 0)

  if [ "$HAS_USE_CLIENT" -gt 0 ] && [ "$HAS_HOOKS" -gt 0 ]; then
    ok "4" "'use client' + hooks — correct"
  elif [ "$HAS_USE_CLIENT" -eq 0 ] && [ "$HAS_HOOKS" -gt 0 ]; then
    error "4" "Has hooks but missing 'use client' directive"
  elif [ "$HAS_USE_CLIENT" -eq 0 ] && [ "$HAS_EVENTS" -gt 0 ]; then
    error "4" "Has event handlers but missing 'use client' directive"
  elif [ "$HAS_USE_CLIENT" -gt 0 ] && [ "$HAS_HOOKS" -eq 0 ] && [ "$HAS_EVENTS" -eq 0 ]; then
    warn "4" "'use client' present but no hooks/events found — may be unnecessary"
  else
    ok "4" "Server Component — no 'use client' needed"
  fi
fi

# ─── S5: next/image usage ─────────────────────────────────────
echo "S5: Checking image optimization..."
if [ -f "$TARGET" ]; then
  HAS_IMG_TAG=$(grep -c "<img " "$TARGET" 2>/dev/null || echo 0)
  if [ "$HAS_IMG_TAG" -gt 0 ]; then
    warn "5" "<img> tag found — use next/image <Image> instead for optimization"
  else
    ok "5" "No unoptimized <img> tags"
  fi
fi

# ─── S6: next/link usage ──────────────────────────────────────
echo "S6: Checking navigation..."
if [ -f "$TARGET" ]; then
  HAS_A_TAG=$(grep -c "<a href=" "$TARGET" 2>/dev/null || echo 0)
  if [ "$HAS_A_TAG" -gt 0 ]; then
    warn "6" "<a href=...> found — use next/link <Link> for internal navigation"
  else
    ok "6" "No unoptimized <a> tags"
  fi
fi

# ─── S7: Zone boundaries ──────────────────────────────────────
echo "S7: Checking zone boundaries..."
if [ -f "$TARGET" ]; then
  ZONE_STARTS=$(grep -c "@zone:start:" "$TARGET" 2>/dev/null || echo 0)
  ZONE_ENDS=$(grep -c "@zone:end:" "$TARGET" 2>/dev/null || echo 0)

  if [ "$ZONE_STARTS" -eq "$ZONE_ENDS" ]; then
    ok "7" "Zone boundaries balanced ($ZONE_STARTS start/$ZONE_ENDS end)"
  else
    error "7" "Zone boundaries unbalanced: $ZONE_STARTS starts, $ZONE_ENDS ends"
  fi
fi

# ─── S8: Export check ────────────────────────────────────────
echo "S8: Checking exports..."
if [ -f "$TARGET" ]; then
  # Page files should have default export
  if echo "$TARGET" | grep -q "page\.tsx$\|layout\.tsx$\|loading\.tsx$\|error\.tsx$"; then
    if grep -q "export default" "$TARGET" 2>/dev/null; then
      ok "8" "Default export present in page/layout file"
    else
      error "8" "Page/layout file missing default export"
    fi
  # Component files should have named export
  elif echo "$TARGET" | grep -q "\.tsx$"; then
    if grep -q "export function\|export const\|export default" "$TARGET" 2>/dev/null; then
      ok "8" "Export present"
    else
      warn "8" "No export found in component file"
    fi
  else
    ok "8" "Export check skipped (not a tsx file)"
  fi
fi

echo ""
echo "═══════════════════════════════════════════"
echo "Structural Check Summary"
echo "  Target:   $TARGET"
echo "  Errors:   $ERRORS"
echo "  Warnings: $WARNINGS"

if [ "$ERRORS" -gt 0 ]; then
  echo "❌ BLOCKED — Fix errors before proceeding"
  exit 1
elif [ "$WARNINGS" -gt 0 ]; then
  echo "⚠️  PASSED with warnings"
  exit 0
else
  echo "✅ All structural checks passed"
  exit 0
fi
