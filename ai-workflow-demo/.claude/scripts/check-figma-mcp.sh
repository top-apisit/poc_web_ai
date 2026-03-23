#!/bin/bash
# ╔══════════════════════════════════════════════════════════════╗
# ║  check-figma-mcp.sh                                          ║
# ║  Check Figma MCP is ready — run before starting UI work      ║
# ╚══════════════════════════════════════════════════════════════╝
#
# Usage: bash .claude/scripts/check-figma-mcp.sh
# Exit 0 = ready, Exit 1 = needs setup

set -euo pipefail

ERRORS=0
error() { echo "❌ $1"; ERRORS=$((ERRORS + 1)); }
ok()    { echo "✅ $1"; }
warn()  { echo "⚠️  $1"; }

echo "═══════════════════════════════════════════"
echo "Figma MCP Connection Check"
echo "═══════════════════════════════════════════"
echo ""

# ─── CHECK 1: .mcp.json exists ──────────────────────────────
if [ -f ".mcp.json" ]; then
  ok ".mcp.json found"
else
  error ".mcp.json not found — must create .mcp.json first"
fi

# ─── CHECK 2: Figma MCP configured in .mcp.json ─────────────
if [ -f ".mcp.json" ]; then
  if grep -q "figma" ".mcp.json" 2>/dev/null; then
    ok "Figma MCP configured in .mcp.json"
  else
    error "Figma MCP not configured in .mcp.json — add figma-remote-mcp server"
  fi
fi

# ─── CHECK 3: Claude settings has Figma plugin ──────────────
SETTINGS_FILE=".claude/settings.json"
if [ -f "$SETTINGS_FILE" ]; then
  if grep -q "figma" "$SETTINGS_FILE" 2>/dev/null; then
    ok "Figma plugin enabled in .claude/settings.json"
  else
    warn "Figma plugin may not be enabled in .claude/settings.json"
  fi
else
  warn ".claude/settings.json not found"
fi

echo ""
echo "═══════════════════════════════════════════"
if [ "$ERRORS" -gt 0 ]; then
  echo "❌ BLOCKED — ${ERRORS} issues found"
  echo ""
  echo "🛑 Do not start UI work until above issues are resolved"
  echo ""
  echo "Setup steps:"
  echo "  1. Create .mcp.json with figma-remote-mcp server config"
  echo "  2. Run /mcp in Claude Code to connect"
  echo "  3. Run this script again to verify"
  exit 1
else
  echo "✅ Figma MCP ready"
  exit 0
fi
