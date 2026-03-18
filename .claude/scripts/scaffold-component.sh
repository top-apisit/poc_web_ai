#!/bin/bash

# Scaffold Next.js Component
# Usage: bash .claude/scripts/scaffold-component.sh <ComponentName> <jira_ticket> <figma_link>

COMPONENT_NAME=$1
JIRA_TICKET=$2
FIGMA_LINK=$3

if [ -z "$COMPONENT_NAME" ]; then
  echo "❌ Error: Component name required"
  echo "Usage: scaffold-component.sh <ComponentName> <jira_ticket> <figma_link>"
  exit 1
fi

# Create component directory structure
COMPONENT_DIR="auth-feature-demo/client/src/components/$COMPONENT_NAME"
mkdir -p "$COMPONENT_DIR"

echo "🧩 Scaffolding React Component: $COMPONENT_NAME"
echo "📂 Creating directory: $COMPONENT_DIR"

# Create main component file
cat > "$COMPONENT_DIR/$COMPONENT_NAME.tsx" << 'EOF'
import { {{COMPONENT_NAME}}Props } from './{{COMPONENT_NAME}}.types'

export function {{COMPONENT_NAME}}({ className, ...props }: {{COMPONENT_NAME}}Props) {
  {/* @zone:start:ui-builder:UI_COMPONENTS */}
  {/* @zone:registry:variables [] */}

  return (
    <div className={className} {...props}>
      {/* Component implementation will be added here */}
    </div>
  )

  {/* @zone:end:ui-builder:UI_COMPONENTS */}
}
EOF

# Create types file
cat > "$COMPONENT_DIR/$COMPONENT_NAME.types.ts" << 'EOF'
import { HTMLAttributes } from 'react'

export interface {{COMPONENT_NAME}}Props extends HTMLAttributes<HTMLDivElement> {
  // Component-specific props will be defined here
  className?: string
  'data-testid'?: string
}
EOF

# Create index file
cat > "$COMPONENT_DIR/index.ts" << 'EOF'
export { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}'
export type { {{COMPONENT_NAME}}Props } from './{{COMPONENT_NAME}}.types'
EOF

# Create test file
cat > "$COMPONENT_DIR/$COMPONENT_NAME.test.tsx" << 'EOF'
import { render, screen } from '@testing-library/react'
import { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}'

describe('{{COMPONENT_NAME}}', () => {
  it('renders correctly', () => {
    render(<{{COMPONENT_NAME}} data-testid="{{COMPONENT_NAME_LOWER}}" />)

    const element = screen.getByTestId('{{COMPONENT_NAME_LOWER}}')
    expect(element).toBeInTheDocument()
  })
})
EOF

# Replace placeholders
sed -i "" "s/{{COMPONENT_NAME}}/$COMPONENT_NAME/g" "$COMPONENT_DIR/$COMPONENT_NAME.tsx"
sed -i "" "s/{{COMPONENT_NAME}}/$COMPONENT_NAME/g" "$COMPONENT_DIR/$COMPONENT_NAME.types.ts"
sed -i "" "s/{{COMPONENT_NAME}}/$COMPONENT_NAME/g" "$COMPONENT_DIR/index.ts"
sed -i "" "s/{{COMPONENT_NAME}}/$COMPONENT_NAME/g" "$COMPONENT_DIR/$COMPONENT_NAME.test.tsx"

# Convert to lowercase for test id
COMPONENT_NAME_LOWER=$(echo "$COMPONENT_NAME" | tr '[:upper:]' '[:lower:]')
sed -i "" "s/{{COMPONENT_NAME_LOWER}}/$COMPONENT_NAME_LOWER/g" "$COMPONENT_DIR/$COMPONENT_NAME.test.tsx"

# Create manifest file for tracking
MANIFEST_DIR=".claude/tasks/active"
mkdir -p "$MANIFEST_DIR"

cat > "$MANIFEST_DIR/${COMPONENT_NAME}.manifest.json" << EOF
{
  "ticket_id": "$JIRA_TICKET",
  "component_name": "$COMPONENT_NAME",
  "type": "component",
  "mode": "new",
  "figma_link": "$FIGMA_LINK",
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "scaffolded",
  "time_tracking": "pending",
  "files": [
    "$COMPONENT_DIR/$COMPONENT_NAME.tsx",
    "$COMPONENT_DIR/$COMPONENT_NAME.types.ts",
    "$COMPONENT_DIR/index.ts",
    "$COMPONENT_DIR/$COMPONENT_NAME.test.tsx"
  ],
  "agents": {
    "ui-builder": "pending"
  }
}
EOF

echo "✅ Component scaffolded successfully!"
echo "📁 Files created:"
echo "   - $COMPONENT_DIR/$COMPONENT_NAME.tsx"
echo "   - $COMPONENT_DIR/$COMPONENT_NAME.types.ts"
echo "   - $COMPONENT_DIR/index.ts"
echo "   - $COMPONENT_DIR/$COMPONENT_NAME.test.tsx"
echo "📋 Manifest: $MANIFEST_DIR/${COMPONENT_NAME}.manifest.json"
echo ""
echo "🎯 Next steps:"
echo "   1. Run PRE-CHECK validation"
echo "   2. Dispatch ui-builder agent"
echo "   3. Run POST-CHECK verification"