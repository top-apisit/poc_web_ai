#!/bin/bash
# ╔══════════════════════════════════════════════════════════════╗
# ║  done-screen.sh                                               ║
# ║  Archive completed page/component manifest                    ║
# ╚══════════════════════════════════════════════════════════════╝
#
# Usage: bash .claude/scripts/done-screen.sh <Name>
# Example: bash .claude/scripts/done-screen.sh Dashboard

NAME=${1:-""}

if [ -z "$NAME" ]; then
  echo "❌ Error: Name required"
  echo "Usage: done-screen.sh <PageOrComponentName>"
  exit 1
fi

ACTIVE_DIR=".claude/tasks/active"
ARCHIVE_DIR=".claude/tasks/archive"

# Create archive dir if needed
mkdir -p "$ARCHIVE_DIR"

# Find manifest file
MANIFEST_FILE=""
for ext in ".manifest.json" ".manifest.md"; do
  if [ -f "$ACTIVE_DIR/${NAME}${ext}" ]; then
    MANIFEST_FILE="$ACTIVE_DIR/${NAME}${ext}"
    break
  fi
done

if [ -z "$MANIFEST_FILE" ]; then
  echo "⚠️  No manifest found for: $NAME"
  echo "   Looked in: $ACTIVE_DIR/${NAME}.manifest.json"
  echo "   Creating archive entry anyway..."

  # Create a minimal archive entry
  cat > "$ARCHIVE_DIR/${NAME}-$(date +%Y%m%d).manifest.json" << EOF
{
  "name": "$NAME",
  "archived_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "note": "Manual archive — no active manifest found"
}
EOF
  echo "✅ Archive entry created: $ARCHIVE_DIR/${NAME}-$(date +%Y%m%d).manifest.json"
  exit 0
fi

# Archive with timestamp
ARCHIVE_NAME="${NAME}-$(date +%Y%m%d-%H%M%S)"
cp "$MANIFEST_FILE" "$ARCHIVE_DIR/${ARCHIVE_NAME}.manifest.json"
rm "$MANIFEST_FILE"

echo "✅ Archived: $NAME"
echo "   From: $MANIFEST_FILE"
echo "   To:   $ARCHIVE_DIR/${ARCHIVE_NAME}.manifest.json"

# List remaining active manifests
ACTIVE_COUNT=$(ls "$ACTIVE_DIR"/*.json 2>/dev/null | wc -l | tr -d ' ')
if [ "$ACTIVE_COUNT" -gt 0 ]; then
  echo ""
  echo "📋 Remaining active: $ACTIVE_COUNT"
  ls "$ACTIVE_DIR"/*.json 2>/dev/null | xargs -I{} basename {} .manifest.json
else
  echo ""
  echo "🎉 No active manifests remaining — sprint clean!"
fi
