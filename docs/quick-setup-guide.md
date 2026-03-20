# Quick Setup Guide: AI Development System

## 🚀 30-Minute Setup Checklist

### Prerequisites
- [ ] Claude Code CLI installed
- [ ] Next.js project initialized (App Router)
- [ ] Figma access with design system
- [ ] Jira/Confluence with API access

### 1. Claude Code Configuration (5 mins)
```bash
# Initialize Claude Code in your project
cd your-project
claude init

# Install required dependencies
npm install tailwindcss class-variance-authority clsx
npm install react-hook-form @hookform/resolvers zod
npm install zustand
```

### 2. MCP Setup (10 mins)
Create `.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "mcp__figma-remote-mcp__get_screenshot",
      "mcp__figma-remote-mcp__get_design_context",
      "mcp__atlassian__getJiraIssue",
      "mcp__atlassian__getConfluencePage",
      "mcp__atlassian__addWorklogToJiraIssue"
    ]
  }
}
```

### 3. Project Structure (5 mins)
```bash
mkdir -p .claude/{agents,docs,scripts,templates}
mkdir -p src/{app/api,components/{ui,auth,layout},lib/{services,hooks,utils,contexts},types,styles}
```

### 4. Core Agents (10 mins)
Copy these essential agent configs to `.claude/agents/`:

**orchestrator.md** (Master coordinator):
```markdown
---
name: orchestrator
description: Project manager agent. Reads Jira tickets, dispatches specialist agents.
tools: mcp__atlassian, mcp__figma-remote-mcp, Read, Bash, Agent
model: claude-sonnet-4-6
---
# Your orchestrator implementation
```

**ui-builder.md** (UI implementation):
```markdown
---
name: ui-builder
description: Senior Next.js engineer. Figma → React/Tailwind UI.
tools: mcp__figma-remote-mcp, Read, Write, Edit, Bash
model: claude-sonnet-4-6
---
# Your UI builder implementation
```

**service-builder.md** (API layer):
```markdown
---
name: service-builder
description: TypeScript service engineer. API specs → Next.js routes and services.
tools: mcp__atlassian, Read, Write, Edit, Bash
model: claude-sonnet-4-6
---
# Your service builder implementation
```

## 💡 Essential Patterns

### 1. Component Structure
```
ComponentName/
├── ComponentName.tsx      # JSX + logic
├── ComponentName.types.ts # TypeScript interfaces
├── ComponentName.test.tsx # Unit tests (optional)
└── index.ts               # Exports
```

### 2. Agent Zone System
```typescript
// @zone:start:ui-builder:JSX
// @zone:registry:variables [isVisible, onClick]
// UI-specific code here
// @zone:end:ui-builder:JSX

// @zone:start:service-builder:SERVICE_LAYER
// Service-specific code here
// @zone:end:service-builder:SERVICE_LAYER
```

### 3. API Route Pattern
```typescript
// src/app/api/feature/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { FeatureSchema } from '@/types/feature'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = FeatureSchema.parse(body)
    // Handle request
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
```

## 🎯 Usage Pattern

### Simple Workflow
```
1. User types: "AUTH-001"
2. Orchestrator reads Jira ticket
3. Dispatches specialist agents
4. Generates production-ready code
5. Reports completion with time tracking
```

### Quality Gates
- **PRE-CHECK**: Spec validation, code audit, Figma verification
- **Implementation**: Parallel agent execution
- **POST-CHECK**: Code verification, auto-fixes, regression tests

## 📋 First Implementation Test

Create a test Jira ticket with:
- **Summary**: "Login Page Implementation"
- **Labels**: `page`, `[FE]`
- **Figma link**: `figma_frozen_link: [URL with node-id]`
- **Confluence**: User story with API specs
- **Story Points**: 3

Then run:
```
User input: "AUTH-001"
```

Expected output: Complete login page with form component, API route, auth hook, and types.

## 🔍 Quality Checks

### Required Validations
```bash
# TypeScript check
npx tsc --noEmit

# Lint check
npm run lint

# Zone validation
bash .claude/scripts/check-zones.sh src/app/login/page.tsx ui-builder

# Run tests
npm test
```

### Success Metrics
- [ ] TypeScript compiles without errors
- [ ] ESLint passes with no errors
- [ ] All components have proper TypeScript interfaces
- [ ] Figma design matches implementation
- [ ] API routes have input validation with Zod
- [ ] Tests pass for components and hooks

## ⚠️ Common Gotchas

1. **Figma Access**: Ensure Figma MCP server is connected and token is valid
2. **Zone Conflicts**: Different agents cannot modify the same code zones
3. **Spec Gaps**: Agents will stop if specifications are incomplete
4. **Component Interfaces**: Linked tickets must define shared component contracts
5. **App Router**: Use `src/app/` directory — not `pages/` — for all routes

## 🎉 Success Indicators

If setup is correct, you should see:
- Agents dispatch automatically from ticket numbers
- Code generation follows strict Next.js App Router patterns
- Quality gates prevent broken implementations
- Time tracking appears in Jira worklogs
- Design fidelity matches Figma 1:1

Time investment: 30 min setup → Hours saved per feature
