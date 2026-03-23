# UI Component Cheatsheet (Required reading before implementing)

> This file summarizes the real behavior of shared UI components — avoids needing to read source code every time.

---

## Project: shadcn/ui + Tailwind CSS

Components live in `components/ui/`. All use `cn()` from `lib/utils` for class merging.
The `cn()` function: `import { cn } from '@/lib/utils'`

---

## Button (`components/ui/button`)

```typescript
import { Button } from '@/components/ui/button'
```

### Variants:
```
default:   bg-primary text-primary-foreground hover:bg-primary/90
destructive: bg-destructive text-destructive-foreground hover:bg-destructive/90
outline:   border border-input bg-background hover:bg-accent
secondary: bg-secondary text-secondary-foreground hover:bg-secondary/80
ghost:     hover:bg-accent hover:text-accent-foreground
link:      text-primary underline-offset-4 hover:underline
```

### Sizes:
```
default: h-10 px-4 py-2
sm:      h-9 rounded-md px-3
lg:      h-11 rounded-md px-8
icon:    h-10 w-10
```

### Usage:
```tsx
// ✅ Correct — use variant/size props
<Button variant="default" size="default" onClick={fn}>
  Submit
</Button>

// ✅ Custom overrides via className (uses cn() for merging)
<Button className="w-full" variant="outline">
  Cancel
</Button>

// ❌ Wrong — do not use inline style
<Button style={{ backgroundColor: '#2563EB' }}>Submit</Button>
```

---

## Input (`components/ui/input`)

```typescript
import { Input } from '@/components/ui/input'
```

### Default className:
```
flex h-10 w-full rounded-md border border-input bg-background px-3 py-2
text-sm ring-offset-background placeholder:text-muted-foreground
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
disabled:cursor-not-allowed disabled:opacity-50
```

### Usage:
```tsx
// ✅ Correct
<Input
  type="email"
  placeholder="Enter email"
  className="mt-2"
  data-testid="login-input-email"
  {...register('email')}
/>

// ❌ Wrong — do not override padding/height with style
<Input style={{ height: '48px' }} />
```

---

## Card (`components/ui/card`)

```typescript
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
```

### Usage:
```tsx
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

---

## Form (React Hook Form + shadcn)

```typescript
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
```

### Usage:
```tsx
const form = useForm<LoginFormData>({
  resolver: zodResolver(LoginSchema),
  defaultValues: { email: '', password: '' }
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="email@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

---

## cn() Utility

```typescript
import { cn } from '@/lib/utils'

// Merge conditional classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className  // allow prop override
)} />
```

---

## Common Tailwind Patterns

### Flex Center
```
flex items-center justify-center
```

### Responsive Container
```
w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Card Shadow
```
rounded-lg border bg-card text-card-foreground shadow-sm
```

### Form Error Text
```
text-sm font-medium text-destructive
```

### Loading Skeleton
```
animate-pulse rounded-md bg-muted
```
