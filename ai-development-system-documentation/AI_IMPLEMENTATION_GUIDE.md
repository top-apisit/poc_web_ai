# AI-Powered Development System Implementation Guide

## 🎯 Overview

This POC project demonstrates a sophisticated AI-powered development system that automates React Native app development from Jira tickets to production-ready code. The system uses specialized AI agents, MCP (Model Context Protocol) integrations, and strict quality controls to maintain high code standards while dramatically reducing development time.

**Key Results:**
- **45-105 minutes** from Jira ticket to production-ready feature
- **Token efficiency**: ~126k tokens per complete feature (optimized from ~200k+)
- **Quality assurance**: Multi-stage validation with PRE/POST checks
- **Design fidelity**: 1:1 Figma to code conversion

## 🏗️ System Architecture

### Agent-Based Pipeline

```
User Input: Jira Ticket Number (e.g., "AUTH-001")
                     ↓
         ┌─────────────────────┐
         │    orchestrator     │ ← Master coordinator
         └──────────┬──────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
┌─────────┐  ┌──────────────┐  ┌─────────────┐
│Pre-flight│  │Figma Cache   │  │Cross-Ticket │
│Checks   │  │(Screenshots) │  │Check        │
└─────┬───┘  └──────┬───────┘  └──────┬──────┘
      │             │                 │
      └─────────────┼─────────────────┘
                    │
            ┌───────▼────────┐
            │ impl-verifier  │ ← PRE-CHECK (GATE 1)
            │   PRE-CHECK    │   - Spec validation
            └───────┬────────┘   - Code audit
                    │           - Cross-source analysis
          ┌─────────┼─────────┐
          ▼         ▼         ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ui-builder│ │service-  │ │logic-    │
    │(Figma→   │ │builder   │ │builder   │
    │React)    │ │(API→TS)  │ │(Logic)   │
    └─────┬────┘ └─────┬────┘ └─────┬────┘
          │            │            │
          └────────────┼────────────┘
                       │
            ┌──────────▼──────────┐
            │ impl-verifier       │ ← POST-CHECK (GATE 2)
            │   POST-CHECK        │   - Code verification
            └─────────────────────┘   - Auto-fix issues
```

### Core Agents

| Agent | Role | Tools | Model |
|-------|------|-------|-------|
| **orchestrator** | Master coordinator, dispatches other agents | Jira, Confluence, Figma, Bash, Agent | claude-sonnet-4-6 |
| **impl-verifier** | Pre/post implementation validation | All tools | claude-sonnet-4-6 |
| **ui-builder** | Figma → React Native UI | Figma, Read, Write, Edit, Bash | claude-sonnet-4-6 |
| **service-builder** | API specs → TypeScript services | Jira, Confluence, Read, Write, Edit | claude-sonnet-4-6 |
| **logic-builder** | User stories → Business logic | Jira, Confluence, Read, Write, Edit | claude-sonnet-4-6 |

## 🔧 Technology Stack Requirements

### Core Technologies
- **AI Platform**: Claude Code CLI with custom agents
- **Frontend**: React Native 0.83.1 + TypeScript 5.8.3
- **Styling**: NativeWind 4.2.2 (Tailwind for React Native)
- **UI Components**: Custom shadcn-style components
- **State Management**: React hooks + Context API
- **API Client**: Axios 1.13.6
- **i18n**: react-i18next 16.5.5
- **Icons**: React Native SVG 15.15.3

### MCP Integrations
```json
{
  "enabledPlugins": {
    "figma@claude-plugins-official": true
  }
}
```

Required MCP servers:
- **Figma MCP**: Design system integration
- **Atlassian MCP**: Jira/Confluence access
- **IDE MCP**: TypeScript diagnostics

## 📁 Project Structure

```
.claude/
├── agents/                    # AI agent configurations
│   ├── orchestrator.md        # Master coordinator
│   ├── impl-verifier.md       # Quality assurance
│   ├── ui-builder.md          # UI implementation
│   ├── service-builder.md     # API services
│   └── logic-builder.md       # Business logic
├── docs/                      # Documentation
│   ├── agent-pipeline-flow.md
│   ├── lessons-learned.md
│   ├── figma-rules.md
│   └── mock-rules.md
├── scripts/                   # Automation scripts
│   ├── scaffold-screen.sh
│   ├── scaffold-component.sh
│   └── verify-structural.sh
├── templates/                 # Code templates
│   ├── screen.template.tsx
│   ├── component.template.tsx
│   └── service.template.ts
├── settings.json              # Claude Code settings
└── settings.local.json        # Local permissions

src/
├── components/                # Reusable UI components
│   ├── ui/                   # Base UI components (Button, Text, Input)
│   └── common/               # Business components
├── screens/                  # Screen components
│   └── [ScreenName]/
│       ├── [ScreenName].tsx
│       ├── [ScreenName].controller.ts
│       ├── [ScreenName].styles.ts
│       └── index.ts
├── services/                 # API layer
│   ├── apis/                # Real API calls
│   └── mock/                # Mock implementations
├── constants/               # App constants
│   ├── fonts.ts
│   └── colors.ts
├── locales/                # Internationalization
│   ├── th.ts               # Thai (default)
│   └── en.ts               # English
└── claude/                 # Claude API integration
    ├── client.ts
    └── types.ts
```

## 🚀 Implementation Workflow

### Phase 1: Setup

1. **Initialize Claude Code project:**
```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Initialize project
claude init
```

2. **Configure MCP servers:**
```json
// .claude/settings.local.json
{
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

3. **Setup agent configurations:**
Create agent markdown files in `.claude/agents/` with YAML frontmatter:
```markdown
---
name: orchestrator
description: Project manager agent. Reads Jira tickets, dispatches specialist agents.
tools: mcp__jira, mcp__confluence, Read, Bash, Agent
model: claude-sonnet-4-6
---

# Agent implementation details...
```

### Phase 2: Agent Development

Each agent follows strict patterns:

**Zone-based Code Organization:**
```typescript
// Zone markers for agent separation
// @zone:start:ui-builder:JSX
// @zone:registry:variables [showModal, isLoading]
// Agent-specific code here
// @zone:end:ui-builder:JSX
```

**Spec Gap Protocol:**
- Agents MUST identify specification gaps before implementation
- Output format: `⚠️ SPEC GAP — Dev Clarification Needed`
- Implementation stops until gaps are resolved

**Quality Gates:**
- **PRE-CHECK**: Specification validation, code audit, cross-source analysis
- **POST-CHECK**: Code verification, auto-fix, regression testing

### Phase 3: Usage Pattern

**Simple Usage:**
```
User: AUTH-001
System: [Orchestrator reads Jira] → [Dispatches agents] → [Implements feature] → [Reports completion]
```

**Complex Implementation Flow:**
1. **Pre-flight Checks**: MCP connectivity, Figma access, file existence
2. **Figma Caching**: Screenshot + design context (token optimization)
3. **PRE-CHECK Gate**: Spec validation, existing code audit
4. **Implementation**: Parallel/sequential agent execution
5. **POST-CHECK Gate**: Code verification, auto-fixes
6. **Time Tracking**: Jira worklog integration

## 🎨 Design-to-Code Pipeline

### Figma Integration
```typescript
// Figma MCP calls
get_screenshot(nodeId: string) // Visual reference
get_design_context(nodeId: string) // Component specs
```

### State-by-State Implementation
Agents create comparison tables:
```
| State        | Figma Node | Components Used | Search Bar | FAB |
|--------------|------------|-----------------|------------|-----|
| empty        | 76:1234    | 3 avatar stack  | No         | No  |
| has_data     | 76:5678    | Individual items| Yes        | Yes |
| search_found | 76:9012    | Filtered items  | Yes + X    | Yes |
```

### CSS-to-NativeWind Conversion
```typescript
// Figma: background-color: #1c1917
// Output: className="bg-[#1c1917]"

// Figma: font-size: 14px, line-height: 21px
// Output: className="text-[14px] leading-[21px]"
```

## 📋 Quality Assurance System

### Automated Checks
```bash
# Structural validation
bash .claude/scripts/verify-structural.sh

# TypeScript validation
npx tsc --noEmit

# Zone validation
bash .claude/scripts/check-zones.sh <file> <agent>
```

### Code Standards
- **UI Components**: Must use `@components/ui/button`, `@components/ui/text`
- **Styling**: NativeWind classes only, no inline styles for visual properties
- **i18n**: All user-facing text via `t('namespace.key')`
- **testID**: Format `FEATURE_TYPE_DESCRIPTION[_INDEX]`
- **iPad Support**: All components responsive with `isTablet` conditions

### Mock API System
Every service requires paired mock implementation:
```typescript
// src/services/apis/auth.service.ts
export const loginUser = async (credentials: LoginRequest) => {
  if (Config.MOCK_AUTH) {
    return AuthMock.loginUser(credentials);
  }
  return apiClient.post('/auth/login', credentials);
};

// src/services/mock/auth.mock.ts
export const AuthMock = {
  loginUser: async (credentials: LoginRequest) => {
    // Mock implementation covering all AC scenarios
  }
};
```

## 📊 Performance Metrics

### Token Optimization Strategies
1. **Spec JSON Caching**: ~5x reduction in Confluence reads
2. **Figma Caching**: Single screenshot fetch per implementation
3. **Agent Consolidation**: Combined validation phases
4. **Selective Agent Dispatch**: 1-3 agents based on scope

### Time Tracking
```
| Phase | Estimate (min) | AI (min) | Dev Review (min) | Total |
|-------|----------------|----------|------------------|-------|
| Simple Feature | 60 | 15 | 15 | 30 |
| Complex Screen | 180 | 45 | 60 | 105 |
```

## 🛠️ Implementation Steps for New Projects

### Step 1: Project Setup
1. Install Claude Code CLI
2. Configure MCP servers (Figma, Jira/Confluence)
3. Setup project structure following the patterns above
4. Create base UI components (Button, Text, Input)

### Step 2: Agent Configuration
1. Copy agent configurations from `.claude/agents/`
2. Adapt system prompts for your domain
3. Configure tools and permissions
4. Setup validation scripts

### Step 3: Integration Points
1. **Design System**: Figma integration with design tokens
2. **Project Management**: Jira ticket structure and workflows
3. **Code Quality**: ESLint, TypeScript, custom validations
4. **Testing**: Mock system for all external dependencies

### Step 4: Training and Iteration
1. Start with simple tickets to validate the pipeline
2. Collect lessons learned and update agent behaviors
3. Optimize token usage and agent performance
4. Scale to complex features

## 🎓 Best Practices & Lessons Learned

### Critical Success Factors
1. **Figma First**: Always validate design system access before implementation
2. **Spec Completeness**: Address all specification gaps before coding
3. **Code Audit**: Read existing patterns before implementing new features
4. **Component Reuse**: Enforce shared component interfaces across tickets
5. **Mock Quality**: Ensure mocks cover all acceptance criteria scenarios

### Common Pitfalls
- **Hardcoding values** when specifications are incomplete
- **Ignoring existing code patterns** in favor of "AI creativity"
- **Skipping validation gates** to meet deadlines
- **Inconsistent component interfaces** across linked tickets
- **Incomplete time tracking** missing actual vs. estimated metrics

### Optimization Opportunities
- **Parallel agent execution** for independent tasks
- **Caching strategies** for frequently accessed resources
- **Template systems** for repetitive code patterns
- **Automated recovery** for common agent failures

## 🔗 Additional Resources

- **Agent Templates**: See `.claude/templates/` for scaffolding templates
- **Validation Scripts**: See `.claude/scripts/` for quality assurance automation
- **Integration Examples**: See `src/claude/` for API client implementations
- **UI Patterns**: See `.claude/docs/ui-component-cheatsheet.md` for component usage

## 🏆 Expected Outcomes

With proper implementation, teams can expect:
- **70-80% reduction** in feature development time
- **Consistent code quality** across different developers
- **1:1 design fidelity** from Figma to production
- **Comprehensive test coverage** via mock systems
- **Scalable development process** for product teams

This system transforms software development from manual coding to AI-orchestrated implementation, maintaining high quality standards while dramatically improving velocity.