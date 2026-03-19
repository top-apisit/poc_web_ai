# Quick Setup Guide: AI Development System

## 🚀 30-Minute Setup Checklist

### Prerequisites
- [ ] Claude Code CLI installed
- [ ] React Native project initialized
- [ ] Figma access with design system
- [ ] Jira/Confluence with API access

### 1. Claude Code Configuration (5 mins)
```bash
# Initialize Claude Code in your project
cd your-project
claude init

# Install required dependencies
npm install nativewind tailwindcss class-variance-authority clsx
npm install axios react-i18next i18next
npm install react-native-svg react-native-config
```

### 2. MCP Setup (10 mins)
Create `.claude/settings.local.json`:
```json
{
  "enabledPlugins": {
    "figma@claude-plugins-official": true
  },
  "permissions": {
    "allow": [
      "mcp__figma-desktop__get_screenshot",
      "mcp__figma-desktop__get_design_context",
      "mcp__atlassian__getJiraIssue",
      "mcp__atlassian__getConfluencePage",
      "mcp__atlassian__addWorklogToJiraIssue"
    ]
  }
}
```

### 3. Project Structure (5 mins)
```
mkdir -p .claude/{agents,docs,scripts,templates}
mkdir -p src/{components/{ui,common},screens,services/{apis,mock},constants,locales}
```

### 4. Core Agents (10 mins)
Copy these essential agent configs to `.claude/agents/`:

**orchestrator.md** (Master coordinator):
```markdown
---
name: orchestrator
description: Project manager agent. Reads Jira tickets, dispatches specialist agents.
tools: mcp__jira, mcp__confluence, Read, Bash, Agent
model: claude-sonnet-4-6
---
# Your orchestrator implementation
```

**ui-builder.md** (UI implementation):
```markdown
---
name: ui-builder
description: Senior React Native engineer. Figma → React Native UI.
tools: mcp__plugin_figma_figma-desktop, Read, Write, Edit, Bash
model: claude-sonnet-4-6
---
# Your UI builder implementation
```

**service-builder.md** (API layer):
```markdown
---
name: service-builder
description: TypeScript service engineer. API specs → TypeScript services.
tools: mcp__jira, mcp__confluence, Read, Write, Edit, Bash
model: claude-sonnet-4-6
---
# Your service builder implementation
```

## 💡 Essential Patterns

### 1. Component Structure
```
ComponentName/
├── ComponentName.tsx      # JSX + logic
├── ComponentName.styles.ts # StyleSheet + responsive
├── ComponentName.types.ts  # TypeScript interfaces
└── index.ts               # Exports
```

### 2. Agent Zone System
```typescript
// @zone:start:ui-builder:JSX
// @zone:registry:variables [isVisible, onPress]
// UI-specific code here
// @zone:end:ui-builder:JSX

// @zone:start:service-builder:SERVICE_LAYER
// Service-specific code here
// @zone:end:service-builder:SERVICE_LAYER
```

### 3. Mock System Pattern
```typescript
// src/services/apis/feature.service.ts
import { Config } from 'react-native-config';
import { FeatureMock } from '../mock/feature.mock';

export const getFeatureData = async () => {
  if (Config.MOCK_FEATURE === 'true') {
    return FeatureMock.getFeatureData();
  }
  return apiClient.get('/feature');
};
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
- **Summary**: "Login Screen Implementation"
- **Labels**: `screen`, `[FE]`
- **Figma link**: `figma_frozen_link: [URL with node-id]`
- **Confluence**: User story with API specs
- **Story Points**: 3

Then run:
```
User input: "AUTH-001"
```

Expected output: Complete login screen with controller, styles, types, and tests.

## 🔍 Quality Checks

### Required Validations
```bash
# TypeScript check
npx tsc --noEmit

# Structural validation
bash .claude/scripts/verify-structural.sh

# Zone validation
bash .claude/scripts/check-zones.sh src/screens/LoginScreen/LoginScreen.tsx ui-builder
```

### Success Metrics
- [ ] Code compiles without errors
- [ ] All user-facing text uses i18n
- [ ] All interactive elements have testIDs
- [ ] Figma design matches implementation
- [ ] Mock data covers all test scenarios
- [ ] iPad responsive layout works
- [ ] Time tracking logged to Jira

## ⚠️ Common Gotchas

1. **Figma Access**: Ensure Figma desktop app is running and token is valid
2. **Zone Conflicts**: Different agents can't modify same code zones
3. **Spec Gaps**: Agents will stop if specifications are incomplete
4. **Component Interfaces**: Linked tickets must define shared component contracts
5. **Mock Coverage**: Must handle all acceptance criteria scenarios

## 🎉 Success Indicators

If setup is correct, you should see:
- Agents dispatch automatically from ticket numbers
- Code generation follows strict patterns
- Quality gates prevent broken implementations
- Time tracking appears in Jira worklogs
- Design fidelity matches Figma 1:1

Time investment: 30 min setup → Hours saved per feature