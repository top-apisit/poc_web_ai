# 🤖 AI-Powered Next.js Development System

## 🎯 Overview

This is an AI-powered development system specifically adapted for Next.js projects. It automates the development workflow from Jira tickets to production-ready Next.js applications using specialized AI agents.

**Key Capabilities:**
- **🎨 Figma → Next.js**: 1:1 design implementation with Tailwind CSS
- **📋 Jira → Code**: Automatic ticket processing and implementation
- **🏗️ Agent-Based Architecture**: Specialized agents for UI, services, and logic
- **✅ Quality Gates**: Pre/post validation with auto-fixes
- **⚡ Next.js Optimized**: App Router, Server Components, TypeScript

## 🚀 Quick Start

### 1. Simple Usage Pattern
```bash
# Just type a Jira ticket number
USER-001
```

The system will:
1. Read the Jira ticket and specifications
2. Analyze Figma designs and requirements
3. Dispatch specialized agents to implement
4. Verify code quality and design fidelity
5. Generate production-ready Next.js code

### 2. Expected Output
- **Pages**: Complete Next.js pages with App Router
- **Components**: Reusable React components with TypeScript
- **API Routes**: Next.js API routes with validation
- **Services**: Data fetching and business logic
- **Tests**: Component and API tests
- **Documentation**: Auto-generated docs and types

## 🏗️ System Architecture

```
Jira Ticket Input
       ↓
   orchestrator (Master Coordinator)
       ↓
   Pre-flight Checks → Figma Cache → PRE-CHECK Gate
       ↓
   Implementation Agents (Parallel)
   ├── ui-builder (Figma → React Components)
   ├── service-builder (API → Next.js Routes)
   └── logic-builder (Stories → Hooks & State)
       ↓
   POST-CHECK Gate → Auto-fixes → Complete
```

## 🛠️ Core Agents

| Agent | Role | Input | Output |
|-------|------|-------|--------|
| **orchestrator** | Master coordinator | Jira ticket number | Orchestrates entire workflow |
| **ui-builder** | UI implementation | Figma designs | React components + Tailwind |
| **service-builder** | Backend services | API specs | Next.js API routes + types |
| **logic-builder** | Business logic | User stories | Hooks + state management |
| **impl-verifier** | Quality assurance | Code + specs | Validation + auto-fixes |

## 📁 Generated Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   ├── page.tsx         # Login page
│   │   │   ├── loading.tsx      # Loading state
│   │   │   └── error.tsx        # Error boundary
│   │   └── register/page.tsx
│   ├── api/                     # API routes
│   │   ├── auth/
│   │   │   ├── login/route.ts   # POST /api/auth/login
│   │   │   └── logout/route.ts  # POST /api/auth/logout
│   │   └── users/route.ts       # User CRUD API
│   └── dashboard/page.tsx
├── components/
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── auth/                    # Feature components
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── services/                # Data layer
│   │   ├── auth.service.ts
│   │   └── api-client.ts
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   └── useForm.ts
│   ├── utils/                   # Utilities
│   │   ├── cn.ts
│   │   └── validation.ts
│   └── contexts/                # React contexts
│       └── AuthContext.tsx
├── types/                       # TypeScript definitions
│   ├── auth.ts
│   └── api.ts
└── styles/
    └── globals.css
```

## 🎨 Technology Stack

### Core Technologies
- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4+
- **UI Components**: shadcn/ui style components
- **Forms**: React Hook Form + Zod validation
- **State Management**: React hooks + Context API
- **Testing**: Jest + React Testing Library

### AI Integration
- **AI Platform**: Claude Code CLI with custom agents
- **Design Integration**: Figma MCP for design extraction
- **Project Management**: Jira/Confluence MCP integration
- **Quality Assurance**: TypeScript + ESLint + Custom validators

## 📋 Workflow Examples

### Example 1: New Login Page
**Input**: "AUTH-001"

**Generated Files**:
```
src/app/(auth)/login/
├── page.tsx              # Login page with form
├── loading.tsx           # Loading skeleton
└── error.tsx             # Error boundary

src/components/auth/
├── LoginForm.tsx         # Login form component
├── LoginForm.types.ts    # TypeScript interfaces
└── LoginForm.test.tsx    # Component tests

src/lib/services/
├── auth.service.ts       # Authentication service
└── api-client.ts         # HTTP client

src/app/api/auth/
└── login/route.ts        # POST /api/auth/login

src/hooks/
└── useAuth.ts            # Authentication hook

src/types/
└── auth.ts               # Auth-related types
```

### Example 2: User Management Component
**Input**: "USER-002"

**Generated Files**:
```
src/components/UserCard/
├── UserCard.tsx          # User card component
├── UserCard.types.ts     # Props interface
├── UserCard.test.tsx     # Component tests
└── index.ts              # Exports

src/app/api/users/
├── route.ts              # GET/POST /api/users
└── [id]/route.ts         # GET/PUT/DELETE /api/users/[id]

src/lib/services/
└── user.service.ts       # User service functions

src/hooks/
└── useUsers.ts           # User management hook

src/types/
└── user.ts               # User type definitions
```

## ⚙️ Configuration

### MCP Permissions
The system requires these MCP integrations:
```json
{
  "enabledPlugins": {
    "figma@claude-plugins-official": true
  },
  "permissions": {
    "allow": [
      "mcp__figma-remote-mcp__get_screenshot",
      "mcp__figma-remote-mcp__get_design_context",
      "mcp__atlassian__getJiraIssue",
      "mcp__atlassian__getConfluencePage"
    ]
  }
}
```

### Project Requirements
1. **Next.js Project**: Initialized with App Router
2. **TypeScript**: Configured with strict mode
3. **Tailwind CSS**: Installed and configured
4. **Package Dependencies**: Core packages installed
5. **Figma Access**: Design system with component library
6. **Jira Integration**: Structured tickets with requirements

## 🔍 Quality Assurance

### Automated Checks
- **TypeScript Compilation**: Zero errors required
- **Zone Validation**: Agent boundary enforcement
- **Design Fidelity**: Figma vs. implementation comparison
- **Test Coverage**: Component and API tests generated
- **Performance**: Bundle size and optimization checks
- **Accessibility**: WCAG compliance validation

### Code Standards
- **Component Structure**: Consistent file organization
- **TypeScript**: Strict typing with interfaces
- **Tailwind CSS**: Utility-first styling approach
- **Testing**: Jest + React Testing Library
- **Documentation**: Auto-generated component docs

## 📊 Performance Metrics

### Development Speed
- **Simple Component**: 10-15 minutes (vs 2-4 hours manual)
- **Complete Page**: 30-45 minutes (vs 4-8 hours manual)
- **API Integration**: 15-30 minutes (vs 2-6 hours manual)

### Quality Metrics
- **Design Fidelity**: 95%+ pixel-perfect implementation
- **TypeScript Coverage**: 100% type safety
- **Test Coverage**: Automated test generation
- **Code Consistency**: Zero style violations

## 🚀 Getting Started

### Prerequisites
1. Next.js project initialized
2. Claude Code CLI installed and configured
3. Figma access with design system
4. Jira/Confluence integration setup

### First Implementation
1. **Setup**: Ensure MCP connections are working
2. **Test Input**: Try a simple ticket: "TEST-001"
3. **Review Output**: Check generated files and structure
4. **Iterate**: Refine based on project needs

### Project Integration
1. **Existing Projects**: Adapt agent configurations to match current patterns
2. **Design System**: Connect Figma component library
3. **API Standards**: Configure service layer patterns
4. **Testing**: Setup test infrastructure

## 🎓 Best Practices

### For Optimal Results
1. **Clear Specifications**: Detailed Jira tickets with Figma links
2. **Design System**: Consistent Figma component library
3. **API Documentation**: Complete Confluence specifications
4. **Iterative Development**: Start simple, add complexity gradually

### Common Patterns
- **Authentication Flow**: Login → Dashboard redirect
- **CRUD Operations**: List → Detail → Edit flow
- **Form Handling**: Validation → Submit → Success/Error
- **Data Fetching**: Loading → Success → Error states

## 🔧 Troubleshooting

### Common Issues
1. **Figma Access**: Ensure desktop app is running
2. **Zone Conflicts**: Check agent boundary violations
3. **TypeScript Errors**: Review generated type definitions
4. **Build Failures**: Validate Next.js configuration

### Support Resources
- **Agent Logs**: Check `.claude/tasks/active/` for details
- **Zone Validation**: Run `bash .claude/scripts/check-zones.sh`
- **TypeScript Check**: Run `npx tsc --noEmit`
- **Test Validation**: Run `npm test`

## 🎯 Expected Outcomes

With proper setup, teams can expect:
- **80%+ time reduction** in frontend development
- **1:1 design fidelity** from Figma to Next.js
- **Type-safe APIs** with full TypeScript coverage
- **Production-ready code** with tests and documentation
- **Consistent patterns** across the entire application

This system transforms Next.js development from manual coding to AI-orchestrated implementation while maintaining high quality standards and modern development practices.