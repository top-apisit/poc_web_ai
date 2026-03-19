# Next.js AI Development Conventions

## Project Structure Conventions

### App Router Structure
```
app/
├── (auth)/                # Route groups
│   ├── login/
│   │   ├── page.tsx       # Login page
│   │   ├── loading.tsx    # Loading UI
│   │   └── error.tsx      # Error UI
│   └── register/
├── api/                   # API routes
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   └── users/
├── dashboard/
│   ├── page.tsx
│   ├── loading.tsx
│   └── components/        # Page-specific components
└── globals.css
```

### Component Organization
```
components/
├── ui/                    # Base UI components (shadcn-style)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── index.ts
├── layout/               # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── auth/                 # Feature-specific components
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
└── common/               # Shared business components
    ├── UserCard.tsx
    └── DataTable.tsx
```

### Service Layer
```
lib/
├── services/
│   ├── auth.service.ts    # Authentication services
│   ├── user.service.ts    # User management
│   └── api-client.ts      # Base API client
├── hooks/
│   ├── useAuth.ts         # Authentication hook
│   ├── useForm.ts         # Form handling
│   └── useAsyncOperation.ts
├── utils/
│   ├── cn.ts              # Class name utility
│   ├── validation.ts      # Validation helpers
│   └── formatting.ts      # Data formatting
└── contexts/
    ├── AuthContext.tsx
    └── ThemeContext.tsx
```

## File Naming Conventions

### Pages (App Router)
- **page.tsx**: Main page component
- **layout.tsx**: Layout wrapper
- **loading.tsx**: Loading UI
- **error.tsx**: Error boundary
- **not-found.tsx**: 404 page
- **global-error.tsx**: Global error handler

### Components
- **PascalCase**: `UserCard.tsx`, `LoginForm.tsx`
- **Types**: `UserCard.types.ts`
- **Tests**: `UserCard.test.tsx`
- **Stories**: `UserCard.stories.tsx` (Storybook)

### API Routes
- **route.ts**: API route handlers
- **middleware.ts**: Route middleware
- **route.test.ts**: API tests

## Code Organization Patterns

### Component Structure
```typescript
// UserCard.tsx
import { UserCardProps } from './UserCard.types'

export function UserCard({ user, onEdit, className }: UserCardProps) {
  // @zone:start:ui-builder:UI_COMPONENTS
  // @zone:registry:variables [isEditing, handleSubmit]

  return (
    <div className={cn("bg-card p-4 rounded-lg", className)}>
      {/* Component JSX */}
    </div>
  )

  // @zone:end:ui-builder:UI_COMPONENTS
}
```

### API Route Structure
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

// @zone:start:service-builder:API_ROUTES
// @zone:registry:variables [validateRequest, handleError]

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// @zone:end:service-builder:API_ROUTES
```

### Custom Hook Structure
```typescript
// hooks/useAuth.ts
import { useState, useCallback } from 'react'

// @zone:start:logic-builder:HOOKS
// @zone:registry:variables [user, login, logout, isLoading]

export function useAuth() {
  const [user, setUser] = useState(null)

  const login = useCallback(async (credentials) => {
    // Implementation
  }, [])

  return { user, login, logout, isLoading }
}

// @zone:end:logic-builder:HOOKS
```

## TypeScript Conventions

### Interface Naming
```typescript
// Component Props
export interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
  className?: string
  'data-testid'?: string
}

// API Types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

// Hook Return Types
interface UseAuthReturn {
  user: User | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}
```

### Zod Schema Patterns
```typescript
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.date()
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true
})

export type User = z.infer<typeof UserSchema>
export type CreateUserData = z.infer<typeof CreateUserSchema>
```

## Styling Conventions

### Tailwind CSS Classes
```typescript
// Component styling
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
```

### Responsive Design
```typescript
// Mobile-first responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">
  <h2 className="text-lg md:text-xl lg:text-2xl">
    Responsive Title
  </h2>
</div>
```

## Testing Conventions

### Component Tests
```typescript
// UserCard.test.tsx
import { render, screen } from '@testing-library/react'
import { UserCard } from './UserCard'

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  }

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })
})
```

### API Route Tests
```typescript
// route.test.ts
import { NextRequest } from 'next/server'
import { GET, POST } from './route'

describe('/api/users', () => {
  it('should return users list', async () => {
    const request = new NextRequest('http://localhost/api/users')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.users).toBeDefined()
  })
})
```

### Hook Tests
```typescript
// useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'

describe('useAuth', () => {
  it('should handle login flow', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password'
      })
    })

    expect(result.current.user).toBeDefined()
  })
})
```

## Agent Zone Conventions

### UI Builder Zones
- `@zone:start:ui-builder:UI_IMPORTS`
- `@zone:start:ui-builder:UI_COMPONENTS`
- `@zone:start:ui-builder:JSX`
- `@zone:start:ui-builder:STYLES`

### Service Builder Zones
- `@zone:start:service-builder:SERVICE_IMPORTS`
- `@zone:start:service-builder:SERVICE_LAYER`
- `@zone:start:service-builder:API_ROUTES`
- `@zone:start:service-builder:TYPES`

### Logic Builder Zones
- `@zone:start:logic-builder:LOGIC_IMPORTS`
- `@zone:start:logic-builder:HOOKS`
- `@zone:start:logic-builder:STATE_MANAGEMENT`
- `@zone:start:logic-builder:BUSINESS_LOGIC`

## Error Handling Conventions

### API Error Responses
```typescript
// Standard error response format
interface ApiError {
  error: string
  details?: any
  status: number
}

// Usage in API routes
return NextResponse.json(
  { error: 'Validation failed', details: validationErrors },
  { status: 400 }
)
```

### Component Error Boundaries
```typescript
// error.tsx
'use client'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  )
}
```

## Performance Conventions

### Dynamic Imports
```typescript
// Lazy loading heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})
```

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/profile.jpg"
  alt="User profile"
  width={64}
  height={64}
  className="rounded-full"
/>
```

### Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

// Memoize event handlers
const handleClick = useCallback((id: string) => {
  onItemClick(id)
}, [onItemClick])
```