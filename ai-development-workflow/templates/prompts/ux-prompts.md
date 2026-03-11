# UX/UI Designer Prompts

## 1. User Flow Design

```markdown
Design user flows for [FEATURE_NAME] in [PRODUCT_NAME].

## Context
Product: [BRIEF_DESCRIPTION]
Users: [USER_PERSONAS]
Platform: [Web/Mobile/Both]

## Flows to design:
1. [FLOW_1_NAME] - [PURPOSE]
2. [FLOW_2_NAME] - [PURPOSE]
3. [FLOW_3_NAME] - [PURPOSE]

## For each flow provide:

### Flow Overview
- Entry points (how user arrives)
- Goal (what user achieves)
- Success criteria

### Step-by-Step Flow
1. Screen: [NAME]
   - User sees: [ELEMENTS]
   - User action: [ACTION]
   - System response: [RESPONSE]
   - Next: [SCREEN or DECISION]

### Decision Points
- Condition: [WHAT]
- Path A: [WHERE]
- Path B: [WHERE]

### Error Handling
- Error type: [WHAT]
- User sees: [MESSAGE]
- Recovery: [ACTIONS]

### Edge Cases
- Case: [SCENARIO]
- Handling: [SOLUTION]

Output as flowchart description (Mermaid compatible).
```

## 2. Wireframe Generation (for v0/Galileo)

```markdown
Create a wireframe for [PAGE_NAME] in [PRODUCT_NAME].

## Context
Page purpose: [WHAT_USER_DOES_HERE]
User persona: [WHO]
Device: [Desktop/Mobile/Responsive]

## Page requirements:
- Header: [ELEMENTS]
- Main content: [SECTIONS]
- Sidebar: [Yes/No - contents]
- Footer: [ELEMENTS]

## Content to display:
- Data: [LIST_DATA_TYPES]
- Actions: [LIST_USER_ACTIONS]
- Navigation: [WHERE_USER_CAN_GO]

## Interactions needed:
- [INTERACTION_1]
- [INTERACTION_2]

## Design constraints:
- Style: [Modern/Classic/Minimal/etc.]
- Existing components: [LIST]
- Brand colors: [IF_KNOWN]

## States to consider:
- Loading state
- Empty state
- Error state
- Success state

Generate detailed wireframe description with layout, components, and placeholder content.
```

## 3. Component Design (for v0)

```markdown
Create a [COMPONENT_NAME] component for a [PRODUCT_TYPE] app.

## Tech Stack
- Framework: React 19 + TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Icons: Lucide React

## Component Requirements

### Props Interface
```typescript
interface [ComponentName]Props {
  // List expected props with types
}
```

### Visual Design
- Layout: [DESCRIBE]
- Colors: [USE_SEMANTIC - primary, muted, destructive, etc.]
- Typography: [SIZES]
- Spacing: [PADDING/MARGIN]

### States
- Default: [DESCRIBE]
- Hover: [DESCRIBE]
- Active: [DESCRIBE]
- Disabled: [DESCRIBE]
- Loading: [DESCRIBE]
- Error: [DESCRIBE]

### Responsiveness
- Mobile (< 640px): [BEHAVIOR]
- Tablet (640-1024px): [BEHAVIOR]
- Desktop (> 1024px): [BEHAVIOR]

### Accessibility
- ARIA labels needed
- Keyboard navigation
- Focus indicators
- Screen reader text

### Animations
- Entrance: [DESCRIBE]
- Interaction: [DESCRIBE]
- Exit: [DESCRIBE]

Output production-ready React component with TypeScript.
```

## 4. Design System Generation

```markdown
Create a design system specification for [PRODUCT_NAME].

## Brand Context
- Industry: [INDUSTRY]
- Personality: [PROFESSIONAL/PLAYFUL/MINIMAL/etc.]
- Target audience: [WHO]

## Generate:

### 1. Color Palette
```json
{
  "colors": {
    "primary": { "50": "#...", "500": "#...", "900": "#..." },
    "secondary": { ... },
    "accent": { ... },
    "neutral": { ... },
    "success": { ... },
    "warning": { ... },
    "error": { ... },
    "info": { ... }
  }
}
```
Include: Hex values, WCAG contrast ratios, dark mode variants

### 2. Typography
```json
{
  "fonts": {
    "heading": "Inter",
    "body": "Inter",
    "mono": "JetBrains Mono"
  },
  "sizes": {
    "xs": "0.75rem",
    "sm": "0.875rem",
    ...
  }
}
```

### 3. Spacing Scale
4px base unit system

### 4. Border Radius
```json
{
  "none": "0",
  "sm": "0.25rem",
  "md": "0.5rem",
  "lg": "1rem",
  "full": "9999px"
}
```

### 5. Shadows
Elevation system (sm, md, lg, xl)

### 6. Component Specifications
For core components (Button, Input, Card, Modal):
- Variants
- Sizes
- States
- Spacing

### 7. Animation Tokens
- Duration: fast, normal, slow
- Easing: ease-in, ease-out, spring

Output as design tokens JSON + Tailwind config.
```

## 5. Page Layout Design

```markdown
Design the [PAGE_NAME] page layout for [PRODUCT_NAME].

## Page Context
- Purpose: [WHAT_USER_DOES]
- User state: [LOGGED_IN/GUEST/ONBOARDING]
- Key actions: [PRIMARY_ACTIONS]

## Page Structure

### Header
- Logo placement
- Navigation items: [LIST]
- User menu: [ELEMENTS]
- Responsive behavior

### Main Content
- Layout type: [Grid/Flex/Single Column]
- Content sections:
  1. [SECTION_1]: [CONTENT]
  2. [SECTION_2]: [CONTENT]
  3. [SECTION_3]: [CONTENT]

### Sidebar (if applicable)
- Position: [Left/Right]
- Width: [FIXED/RESPONSIVE]
- Contents: [ELEMENTS]
- Collapse behavior

### Footer (if applicable)
- Links: [CATEGORIES]
- Legal text
- Social links

## Responsive Breakpoints
- Mobile: [LAYOUT_CHANGES]
- Tablet: [LAYOUT_CHANGES]
- Desktop: [LAYOUT_CHANGES]

## Interactive Elements
- [ELEMENT]: [INTERACTION]

Generate React layout component with Tailwind CSS.
```

## 6. Prototype Flow Description

```markdown
Create a prototype specification for [FEATURE_NAME].

## User Journey
Starting point: [WHERE]
Goal: [WHAT_USER_ACHIEVES]
Time to complete: [ESTIMATE]

## Screen-by-Screen

### Screen 1: [NAME]
- **Purpose**: [WHY_THIS_SCREEN]
- **Elements**:
  - [ELEMENT_1]: [DESCRIPTION]
  - [ELEMENT_2]: [DESCRIPTION]
- **User Actions**:
  - Click [ELEMENT] → Go to [SCREEN]
  - Swipe [DIRECTION] → [ACTION]
- **Micro-interactions**:
  - [TRIGGER]: [ANIMATION]

### Screen 2: [NAME]
[Same structure]

## Transition Specifications
- Screen 1 → Screen 2: [ANIMATION_TYPE]
- Duration: [MS]
- Easing: [TYPE]

## Edge Cases
- Back navigation: [BEHAVIOR]
- Error state: [SCREEN/MODAL]
- Loading: [SKELETON/SPINNER]

## Annotations
- Hotspots
- Gestures supported
- Keyboard shortcuts

Output as Framer/Figma prototype specification.
```
