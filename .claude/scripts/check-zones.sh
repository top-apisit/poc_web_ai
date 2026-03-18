#!/bin/bash

# Check Zone Integrity
# Usage: bash .claude/scripts/check-zones.sh <file_path> <agent_name>

FILE_PATH=$1
AGENT_NAME=$2

if [ -z "$FILE_PATH" ] || [ -z "$AGENT_NAME" ]; then
  echo "❌ Error: File path and agent name required"
  echo "Usage: check-zones.sh <file_path> <agent_name>"
  exit 1
fi

if [ ! -f "$FILE_PATH" ]; then
  echo "❌ Error: File not found: $FILE_PATH"
  exit 1
fi

echo "🔍 Checking zones in: $FILE_PATH"
echo "👤 Agent: $AGENT_NAME"
echo ""

# Check for zone violations
VIOLATIONS=0

# Define agent zones
case $AGENT_NAME in
  "ui-builder")
    ALLOWED_ZONES=("UI_IMPORTS" "UI_COMPONENTS" "JSX" "STYLES")
    FORBIDDEN_ZONES=("SERVICE_LAYER" "API_ROUTES" "HOOKS" "STATE_MANAGEMENT" "BUSINESS_LOGIC")
    ;;
  "service-builder")
    ALLOWED_ZONES=("SERVICE_IMPORTS" "SERVICE_LAYER" "API_ROUTES" "TYPES")
    FORBIDDEN_ZONES=("UI_COMPONENTS" "JSX" "STYLES" "HOOKS" "STATE_MANAGEMENT")
    ;;
  "logic-builder")
    ALLOWED_ZONES=("LOGIC_IMPORTS" "HOOKS" "STATE_MANAGEMENT" "BUSINESS_LOGIC")
    FORBIDDEN_ZONES=("UI_COMPONENTS" "JSX" "STYLES" "SERVICE_LAYER" "API_ROUTES")
    ;;
  *)
    echo "⚠️  Unknown agent: $AGENT_NAME"
    exit 1
    ;;
esac

# Check for forbidden zone usage
echo "🚫 Checking for forbidden zone usage..."
for zone in "${FORBIDDEN_ZONES[@]}"; do
  if grep -q "@zone:start:.*:$zone" "$FILE_PATH"; then
    echo "❌ VIOLATION: $AGENT_NAME used forbidden zone: $zone"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

# Check for proper zone structure
echo "📋 Checking zone structure..."

# Find all zone starts
zone_starts=$(grep -n "@zone:start:" "$FILE_PATH" || true)
if [ -n "$zone_starts" ]; then
  echo "$zone_starts" | while read -r line; do
    line_num=$(echo "$line" | cut -d: -f1)
    zone_tag=$(echo "$line" | cut -d: -f3-)

    # Extract agent and zone name
    zone_agent=$(echo "$zone_tag" | cut -d: -f1)
    zone_name=$(echo "$zone_tag" | cut -d: -f2)

    # Check if this agent should be using this zone
    if [ "$zone_agent" != "$AGENT_NAME" ]; then
      echo "❌ VIOLATION: Line $line_num - $AGENT_NAME using $zone_agent zone"
      VIOLATIONS=$((VIOLATIONS + 1))
    fi

    # Check if zone has matching end
    zone_end_pattern="@zone:end:$zone_agent:$zone_name"
    if ! grep -q "$zone_end_pattern" "$FILE_PATH"; then
      echo "❌ VIOLATION: Line $line_num - Missing zone end for: $zone_tag"
      VIOLATIONS=$((VIOLATIONS + 1))
    fi
  done
fi

# Check for orphaned zone ends
echo "🔚 Checking for orphaned zone ends..."
zone_ends=$(grep -n "@zone:end:" "$FILE_PATH" || true)
if [ -n "$zone_ends" ]; then
  echo "$zone_ends" | while read -r line; do
    line_num=$(echo "$line" | cut -d: -f1)
    zone_tag=$(echo "$line" | cut -d: -f3-)

    zone_start_pattern="@zone:start:$zone_tag"
    if ! grep -q "$zone_start_pattern" "$FILE_PATH"; then
      echo "❌ VIOLATION: Line $line_num - Orphaned zone end: $zone_tag"
      VIOLATIONS=$((VIOLATIONS + 1))
    fi
  done
fi

# Check registry integrity
echo "📝 Checking zone registry..."
registry_lines=$(grep -n "@zone:registry:" "$FILE_PATH" || true)
if [ -n "$registry_lines" ]; then
  echo "$registry_lines" | while read -r line; do
    line_num=$(echo "$line" | cut -d: -f1)
    registry_content=$(echo "$line" | cut -d: -f3-)

    # Basic validation of registry format
    if [[ ! "$registry_content" =~ ^variables\ \[.*\]$ ]]; then
      echo "⚠️  WARNING: Line $line_num - Invalid registry format: $registry_content"
    fi
  done
else
  echo "⚠️  WARNING: No zone registry found"
fi

# TypeScript/JavaScript syntax check in zones
echo "⚙️  Checking syntax in zones..."
temp_file=$(mktemp)

# Extract code between zones for basic syntax validation
awk '
  /@zone:start:/ { in_zone = 1; next }
  /@zone:end:/ { in_zone = 0; next }
  in_zone { print }
' "$FILE_PATH" > "$temp_file"

if [ -s "$temp_file" ]; then
  # Basic syntax checks for TypeScript/JavaScript
  if [[ "$FILE_PATH" == *.ts ]] || [[ "$FILE_PATH" == *.tsx ]]; then
    # Check for common TypeScript issues
    if grep -q "any\s*;" "$temp_file"; then
      echo "⚠️  WARNING: Found 'any' type usage in zones"
    fi

    if grep -q "console\.log" "$temp_file"; then
      echo "⚠️  WARNING: Found console.log statements in zones"
    fi
  fi
fi

rm -f "$temp_file"

# Final report
echo ""
echo "📊 Zone Check Summary:"
echo "   File: $FILE_PATH"
echo "   Agent: $AGENT_NAME"
echo "   Violations: $VIOLATIONS"

if [ $VIOLATIONS -eq 0 ]; then
  echo "✅ All zone checks passed!"
  exit 0
else
  echo "❌ Zone violations detected!"
  echo ""
  echo "🔧 To fix zone violations:"
  echo "   1. Move code to appropriate agent zones"
  echo "   2. Ensure all zones have matching start/end tags"
  echo "   3. Update zone registry with new variables"
  echo "   4. Run this check again"
  exit 1
fi