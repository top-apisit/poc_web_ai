#!/bin/bash

# Scaffold Next.js API Route
# Usage: bash .claude/scripts/scaffold-api.sh <route_name> <jira_ticket>

ROUTE_NAME=$1
JIRA_TICKET=$2

if [ -z "$ROUTE_NAME" ]; then
  echo "❌ Error: Route name required"
  echo "Usage: scaffold-api.sh <route_name> <jira_ticket>"
  exit 1
fi

# Create API route directory structure
API_DIR="auth-feature-demo/client/src/app/api/$ROUTE_NAME"
mkdir -p "$API_DIR"

echo "🌐 Scaffolding API Route: $ROUTE_NAME"
echo "📂 Creating directory: $API_DIR"

# Create route.ts file
cat > "$API_DIR/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server'

// @zone:start:service-builder:API_ROUTES
// @zone:registry:variables []

export async function GET(request: NextRequest) {
  try {
    // GET implementation will be added here
    return NextResponse.json({ message: 'GET {{ROUTE_NAME}}' })
  } catch (error) {
    console.error('GET {{ROUTE_NAME}} error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // POST implementation will be added here
    return NextResponse.json({ message: 'POST {{ROUTE_NAME}}', data: body })
  } catch (error) {
    console.error('POST {{ROUTE_NAME}} error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// @zone:end:service-builder:API_ROUTES
EOF

# Replace placeholders
sed -i "" "s/{{ROUTE_NAME}}/$ROUTE_NAME/g" "$API_DIR/route.ts"

# Create test file
cat > "$API_DIR/route.test.ts" << 'EOF'
import { NextRequest } from 'next/server'
import { GET, POST } from './route'

// Mock NextRequest
const createMockRequest = (url: string, options: RequestInit = {}) => {
  return new NextRequest(url, options)
}

describe('/api/{{ROUTE_NAME}}', () => {
  describe('GET', () => {
    it('should return success response', async () => {
      const request = createMockRequest('http://localhost:3000/api/{{ROUTE_NAME}}')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('GET {{ROUTE_NAME}}')
    })
  })

  describe('POST', () => {
    it('should handle POST request', async () => {
      const testData = { test: 'data' }
      const request = createMockRequest('http://localhost:3000/api/{{ROUTE_NAME}}', {
        method: 'POST',
        body: JSON.stringify(testData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('POST {{ROUTE_NAME}}')
      expect(data.data).toEqual(testData)
    })
  })
})
EOF

# Replace placeholders in test file
sed -i "" "s/{{ROUTE_NAME}}/$ROUTE_NAME/g" "$API_DIR/route.test.ts"

# Create types file
cat > "auth-feature-demo/client/src/types/api-$ROUTE_NAME.ts" << 'EOF'
// @zone:start:service-builder:TYPES
// @zone:registry:variables []

// Request/Response types for {{ROUTE_NAME}} API
export interface {{ROUTE_NAME_UPPER}}GetResponse {
  message: string
  data?: any
}

export interface {{ROUTE_NAME_UPPER}}PostRequest {
  // Request body fields will be defined here
}

export interface {{ROUTE_NAME_UPPER}}PostResponse {
  message: string
  data: any
}

export interface {{ROUTE_NAME_UPPER}}ErrorResponse {
  error: string
  details?: any
}

// @zone:end:service-builder:TYPES
EOF

# Convert to uppercase for types
ROUTE_NAME_UPPER=$(echo "$ROUTE_NAME" | tr '[:lower:]' '[:upper:]')
sed -i "" "s/{{ROUTE_NAME}}/$ROUTE_NAME/g" "auth-feature-demo/client/src/types/api-$ROUTE_NAME.ts"
sed -i "" "s/{{ROUTE_NAME_UPPER}}/$ROUTE_NAME_UPPER/g" "auth-feature-demo/client/src/types/api-$ROUTE_NAME.ts"

# Create manifest file for tracking
MANIFEST_DIR=".claude/tasks/active"
mkdir -p "$MANIFEST_DIR"

cat > "$MANIFEST_DIR/${ROUTE_NAME}-api.manifest.json" << EOF
{
  "ticket_id": "$JIRA_TICKET",
  "route_name": "$ROUTE_NAME",
  "type": "api",
  "mode": "new",
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "scaffolded",
  "time_tracking": "pending",
  "files": [
    "$API_DIR/route.ts",
    "$API_DIR/route.test.ts",
    "auth-feature-demo/client/src/types/api-$ROUTE_NAME.ts"
  ],
  "agents": {
    "service-builder": "pending"
  }
}
EOF

echo "✅ API Route scaffolded successfully!"
echo "📁 Files created:"
echo "   - $API_DIR/route.ts"
echo "   - $API_DIR/route.test.ts"
echo "   - auth-feature-demo/client/src/types/api-$ROUTE_NAME.ts"
echo "📋 Manifest: $MANIFEST_DIR/${ROUTE_NAME}-api.manifest.json"
echo ""
echo "🎯 Next steps:"
echo "   1. Run PRE-CHECK validation"
echo "   2. Dispatch service-builder agent"
echo "   3. Run POST-CHECK verification"
echo ""
echo "🔗 API endpoints created:"
echo "   - GET /api/$ROUTE_NAME"
echo "   - POST /api/$ROUTE_NAME"