#!/bin/bash

# Scaffold Next.js Page
# Usage: bash .claude/scripts/scaffold-page.sh <PageName> <jira_ticket> <figma_link>

PAGE_NAME=$1
JIRA_TICKET=$2
FIGMA_LINK=$3

if [ -z "$PAGE_NAME" ]; then
  echo "❌ Error: Page name required"
  echo "Usage: scaffold-page.sh <PageName> <jira_ticket> <figma_link>"
  exit 1
fi

# Convert to lowercase for route path
ROUTE_PATH=$(echo "$PAGE_NAME" | tr '[:upper:]' '[:lower:]')

# Create page directory structure
PAGE_DIR="app/$ROUTE_PATH"
mkdir -p "$PAGE_DIR"
mkdir -p "$PAGE_DIR/components"

echo "🚀 Scaffolding Next.js Page: $PAGE_NAME"
echo "📂 Creating directory: $PAGE_DIR"

# Create page.tsx
cat > "$PAGE_DIR/page.tsx" << 'EOF'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '{{PAGE_NAME}}',
  description: '{{PAGE_NAME}} page'
}

export default function {{PAGE_NAME}}Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{{PAGE_NAME}}</h1>

      {/* @zone:start:ui-builder:JSX */}
      {/* @zone:registry:variables [] */}
      {/* Page content will be implemented here */}
      {/* @zone:end:ui-builder:JSX */}
    </div>
  )
}
EOF

# Replace placeholders
sed -i "" "s/{{PAGE_NAME}}/$PAGE_NAME/g" "$PAGE_DIR/page.tsx"

# Create loading.tsx
cat > "$PAGE_DIR/loading.tsx" << 'EOF'
export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}
EOF

# Create error.tsx
cat > "$PAGE_DIR/error.tsx" << 'EOF'
'use client'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-4">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
EOF

# Create manifest file for tracking
MANIFEST_DIR=".claude/tasks/active"
mkdir -p "$MANIFEST_DIR"

cat > "$MANIFEST_DIR/${PAGE_NAME}.manifest.json" << EOF
{
  "ticket_id": "$JIRA_TICKET",
  "page_name": "$PAGE_NAME",
  "route_path": "$ROUTE_PATH",
  "type": "page",
  "mode": "new",
  "figma_link": "$FIGMA_LINK",
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "scaffolded",
  "time_tracking": "pending",
  "files": [
    "$PAGE_DIR/page.tsx",
    "$PAGE_DIR/loading.tsx",
    "$PAGE_DIR/error.tsx"
  ],
  "agents": {
    "ui-builder": "pending",
    "service-builder": "pending",
    "logic-builder": "pending"
  }
}
EOF

echo "✅ Page scaffolded successfully!"
echo "📁 Files created:"
echo "   - $PAGE_DIR/page.tsx"
echo "   - $PAGE_DIR/loading.tsx"
echo "   - $PAGE_DIR/error.tsx"
echo "📋 Manifest: $MANIFEST_DIR/${PAGE_NAME}.manifest.json"
echo ""
echo "🎯 Next steps:"
echo "   1. Run PRE-CHECK validation"
echo "   2. Dispatch implementation agents"
echo "   3. Run POST-CHECK verification"