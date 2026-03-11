# Frontend Engineer Prompts

## 1. Feature Implementation

```markdown
Implement the [FEATURE_NAME] feature for [PRODUCT_NAME].

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- State: Tanstack Query + Zustand
- Forms: react-hook-form + Zod

## Pages to create
1. /[route] - [PURPOSE]
2. /[route]/new - [PURPOSE]
3. /[route]/[id] - [PURPOSE]

## Components needed
1. [ComponentName] - [PURPOSE]
2. [ComponentName] - [PURPOSE]

## Requirements

### Data Fetching
- Use Tanstack Query hooks
- Handle loading states
- Handle error states
- Implement optimistic updates

### Forms
- Use react-hook-form
- Zod validation matching API
- Error display
- Submit handling

### UI/UX
- Loading skeletons
- Empty states
- Toast notifications
- Confirm dialogs

### Responsiveness
- Mobile-first approach
- Touch-friendly on mobile

## Existing Patterns
Follow: src/features/[existing-feature]/

## API Endpoints
- GET /api/[resource] - List
- POST /api/[resource] - Create
- etc.

## Output
- Page components
- Feature components
- Custom hooks
- Zustand store (if needed)
- Tests
```

## 2. Component Development

```markdown
Create a [COMPONENT_NAME] component.

## Tech Stack
- React 19 + TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Lucide icons

## Props Interface
```typescript
interface [ComponentName]Props {
  // Define all props
  data: DataType;
  onAction?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}
```

## Visual Requirements
- Layout: [DESCRIBE]
- Colors: Use semantic (primary, muted, etc.)
- Spacing: Follow design system
- Icons: [WHICH_ICONS]

## States
- Default: [DESCRIBE]
- Hover: [DESCRIBE]
- Active/Selected: [DESCRIBE]
- Disabled: [DESCRIBE]
- Loading: Skeleton
- Error: [DESCRIBE]
- Empty: [DESCRIBE]

## Interactions
- Click: [ACTION]
- Hover: [EFFECT]
- Keyboard: [SHORTCUTS]

## Accessibility
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader text

## Responsive
- Mobile: [BEHAVIOR]
- Tablet: [BEHAVIOR]
- Desktop: [BEHAVIOR]

## Output
- Component file
- Storybook stories
- Unit tests
```

## 3. Custom Hook Development

```markdown
Create a custom hook: use[HookName].

## Purpose
[WHAT_THIS_HOOK_DOES]

## Interface
```typescript
interface Use[HookName]Options {
  // Options
}

interface Use[HookName]Return {
  // Return values
}

function use[HookName](options: Use[HookName]Options): Use[HookName]Return
```

## Behavior
1. [BEHAVIOR_1]
2. [BEHAVIOR_2]
3. [BEHAVIOR_3]

## Dependencies
- External hooks: [LIST]
- APIs: [ENDPOINTS]

## State Management
- Internal state: [WHAT]
- Side effects: [WHAT]
- Cleanup: [WHAT]

## Error Handling
- Error states
- Error recovery
- Error reporting

## Performance
- Memoization needs
- Debouncing/throttling
- Cleanup on unmount

## Testing
- Test scenarios
- Mock setup

## Output
- Hook implementation
- TypeScript types
- Tests
- Usage documentation
```

## 4. Form Implementation

```markdown
Create a form for [FORM_PURPOSE].

## Tech Stack
- react-hook-form
- Zod validation
- shadcn/ui form components

## Form Fields
| Field | Type | Validation | Default |
|-------|------|------------|---------|
| [name] | [input/select/etc.] | [rules] | [value] |

## Validation Schema
```typescript
const schema = z.object({
  // Field validations
});
```

## Features
- Field-level validation
- Form-level validation
- Async validation (if needed)
- Dependent fields

## Submit Handling
- API endpoint: [ENDPOINT]
- Success behavior: [WHAT]
- Error handling: [WHAT]

## UX Requirements
- Loading state during submit
- Disabled state during submit
- Error display (field + form level)
- Success feedback

## Accessibility
- Labels for all fields
- Error announcements
- Focus management

## Output
- Form component
- Zod schema
- Submit handler
- Tests
```

## 5. State Management Setup

```markdown
Create a Zustand store for [FEATURE_NAME].

## State Shape
```typescript
interface [Feature]State {
  // State properties
}

interface [Feature]Actions {
  // Action methods
}
```

## State Properties
- [property1]: [TYPE] - [PURPOSE]
- [property2]: [TYPE] - [PURPOSE]

## Actions
- [action1]: [PARAMS] → [BEHAVIOR]
- [action2]: [PARAMS] → [BEHAVIOR]

## Selectors
```typescript
// Derived/computed values
const selectFilteredItems = (state) => ...
```

## Persistence
- Persist to: [localStorage/sessionStorage/none]
- Keys to persist: [WHICH]
- Hydration handling

## DevTools
- Name for devtools
- Action logging

## Testing
- Initial state tests
- Action tests
- Selector tests

## Output
- Store definition
- Types
- Selectors
- Tests
```

## 6. API Integration

```markdown
Create API integration for [RESOURCE_NAME].

## Base URL
- Development: http://localhost:3000/api
- Production: [URL]

## Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | /[resource] | List |
| POST | /[resource] | Create |
| GET | /[resource]/:id | Get |
| PUT | /[resource]/:id | Update |
| DELETE | /[resource]/:id | Delete |

## Implementation

### API Client
```typescript
// Typed fetch wrapper
const api = {
  [resource]: {
    list: (params) => fetch(...),
    create: (data) => fetch(...),
    // etc.
  }
};
```

### Tanstack Query Hooks
```typescript
// Query hooks
function use[Resource]s(params) { ... }
function use[Resource](id) { ... }

// Mutation hooks
function useCreate[Resource]() { ... }
function useUpdate[Resource]() { ... }
function useDelete[Resource]() { ... }
```

### Features
- Request/response types
- Error handling
- Loading states
- Optimistic updates
- Cache invalidation
- Infinite scroll (if needed)

## Output
- API client
- Query hooks
- Mutation hooks
- Types
- Tests
```
