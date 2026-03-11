# Authentication Feature - Design Specifications

## 1. Design System

### Color Palette

```
Primary Colors:
┌─────────────────────────────────────────────────────────────┐
│  primary-50   │  primary-500  │  primary-600  │  primary-900 │
│  #eff6ff     │  #3b82f6      │  #2563eb      │  #1e3a8a     │
│  (Light BG)  │  (Buttons)    │  (Hover)      │  (Text)      │
└─────────────────────────────────────────────────────────────┘

Neutral Colors:
┌─────────────────────────────────────────────────────────────┐
│  gray-50     │  gray-200     │  gray-500     │  gray-900    │
│  #f9fafb     │  #e5e7eb      │  #6b7280      │  #111827     │
│  (Page BG)   │  (Borders)    │  (Muted)      │  (Text)      │
└─────────────────────────────────────────────────────────────┘

Semantic Colors:
┌─────────────────────────────────────────────────────────────┐
│  success     │  error        │  warning      │  info        │
│  #10b981     │  #ef4444      │  #f59e0b      │  #3b82f6     │
│  (Green)     │  (Red)        │  (Yellow)     │  (Blue)      │
└─────────────────────────────────────────────────────────────┘
```

### Typography

```
Font Family: Inter (sans-serif)

Sizes:
- text-sm   : 14px  (Labels, helper text)
- text-base : 16px  (Body, inputs)
- text-lg   : 18px  (Subheadings)
- text-xl   : 20px  (Card titles)
- text-2xl  : 24px  (Page titles)
- text-3xl  : 30px  (Hero headings)

Weights:
- font-normal : 400 (Body text)
- font-medium : 500 (Labels, buttons)
- font-semibold : 600 (Headings)
- font-bold : 700 (Emphasis)
```

### Spacing

```
Base unit: 4px

- space-1  : 4px
- space-2  : 8px
- space-3  : 12px
- space-4  : 16px
- space-6  : 24px
- space-8  : 32px
- space-12 : 48px
- space-16 : 64px
```

---

## 2. Page Layouts

### Login Page

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        ┌─────────────────────┐                      │
│                        │       LOGO          │                      │
│                        │      AppName        │                      │
│                        └─────────────────────┘                      │
│                                                                     │
│                   ┌─────────────────────────────┐                   │
│                   │                             │                   │
│                   │     Welcome back            │                   │
│                   │   Sign in to your account   │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │ Username or Email     │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │ Password          👁  │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │       Sign In         │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │                             │                   │
│                   │  Don't have an account?     │                   │
│                   │  [Sign up]                  │                   │
│                   │                             │                   │
│                   └─────────────────────────────┘                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Register Page

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        ┌─────────────────────┐                      │
│                        │       LOGO          │                      │
│                        │      AppName        │                      │
│                        └─────────────────────┘                      │
│                                                                     │
│                   ┌─────────────────────────────┐                   │
│                   │                             │                   │
│                   │     Create Account          │                   │
│                   │   Get started for free      │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │ Username              │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │ Email                 │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │ Password          👁  │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │  (Min. 8 characters)        │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │ Confirm Password  👁  │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │                             │                   │
│                   │  ┌───────────────────────┐  │                   │
│                   │  │     Create Account    │  │                   │
│                   │  └───────────────────────┘  │                   │
│                   │                             │                   │
│                   │  Already have an account?   │                   │
│                   │  [Sign in]                  │                   │
│                   │                             │                   │
│                   └─────────────────────────────┘                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Dashboard (Post-Login)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  LOGO  AppName                              [User ▼] [Logout] │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │     Welcome back, {username}! 👋                              │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                                                         │  │  │
│  │  │   You are successfully logged in.                       │  │  │
│  │  │                                                         │  │  │
│  │  │   Account Info:                                         │  │  │
│  │  │   • Username: {username}                                │  │  │
│  │  │   • Email: {email}                                      │  │  │
│  │  │   • Member since: {date}                                │  │  │
│  │  │                                                         │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Specifications

### Input Field

```
States:
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  DEFAULT:                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Label                                                     │  │
│  │ ┌───────────────────────────────────────────────────────┐ │  │
│  │ │ Placeholder text                                      │ │  │
│  │ └───────────────────────────────────────────────────────┘ │  │
│  │ border: gray-200, bg: white                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  FOCUS:                                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Label                                                     │  │
│  │ ┌───────────────────────────────────────────────────────┐ │  │
│  │ │ User typing...                                    │   │ │  │
│  │ └───────────────────────────────────────────────────────┘ │  │
│  │ border: primary-500, ring: primary-100                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ERROR:                                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Label                                                     │  │
│  │ ┌───────────────────────────────────────────────────────┐ │  │
│  │ │ Invalid input                                         │ │  │
│  │ └───────────────────────────────────────────────────────┘ │  │
│  │ ⚠ Error message here                                     │  │
│  │ border: error, text: error                               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Specs:
- Height: 44px
- Padding: 12px horizontal
- Border radius: 8px
- Font size: 16px (prevents iOS zoom)
```

### Button

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  PRIMARY:                                                       │
│  ┌───────────────────────────────────────┐                      │
│  │           Sign In                     │  bg: primary-500    │
│  └───────────────────────────────────────┘  text: white        │
│                                                                 │
│  PRIMARY (Hover):                                               │
│  ┌───────────────────────────────────────┐                      │
│  │           Sign In                     │  bg: primary-600    │
│  └───────────────────────────────────────┘                      │
│                                                                 │
│  PRIMARY (Loading):                                             │
│  ┌───────────────────────────────────────┐                      │
│  │       ◌ Signing in...                 │  bg: primary-400    │
│  └───────────────────────────────────────┘  cursor: not-allowed│
│                                                                 │
│  PRIMARY (Disabled):                                            │
│  ┌───────────────────────────────────────┐                      │
│  │           Sign In                     │  bg: gray-300       │
│  └───────────────────────────────────────┘  opacity: 50%       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Specs:
- Height: 44px
- Padding: 16px horizontal
- Border radius: 8px
- Font: 16px, medium weight
- Full width in forms
```

### Card (Auth Container)

```
Specs:
- Background: white
- Border radius: 12px
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Padding: 32px
- Max width: 400px
- Margin: auto (centered)
```

### Alert/Toast

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  SUCCESS:                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ✓  Account created successfully!                      ✕  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  bg: green-50, border-left: green-500, text: green-800          │
│                                                                 │
│  ERROR:                                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ✕  Invalid username or password                       ✕  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  bg: red-50, border-left: red-500, text: red-800                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Responsive Breakpoints

```
Mobile:  < 640px   - Full width, stack elements
Tablet:  640-1024px - Centered card, padding
Desktop: > 1024px  - Split layout option
```

### Mobile Adjustments

```
- Card padding: 24px (instead of 32px)
- Input/Button height: 48px (touch-friendly)
- Full-width buttons
- No side margins on inputs
```

---

## 5. Interactions & Animations

### Page Transitions
- Fade in: 200ms ease-out

### Button Press
- Scale: 0.98 on active
- Transition: 150ms

### Input Focus
- Ring animation: 200ms

### Error Shake
- Horizontal shake: 300ms
- Apply to form on validation error

### Loading Spinner
```
┌───────────┐
│     ◠     │
│    ◡      │  Rotation: 360deg
│           │  Duration: 1s
└───────────┘  Timing: linear infinite
```

---

## 6. Tailwind CSS Classes Reference

### Login Form Container
```html
<div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
    <!-- Form content -->
  </div>
</div>
```

### Input Component
```html
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">
    Username
  </label>
  <input
    type="text"
    class="w-full px-4 py-3 border border-gray-200 rounded-lg
           focus:ring-2 focus:ring-primary-100 focus:border-primary-500
           transition-colors"
    placeholder="Enter username"
  />
</div>
```

### Primary Button
```html
<button class="w-full py-3 px-4 bg-primary-500 text-white font-medium
               rounded-lg hover:bg-primary-600
               disabled:bg-gray-300 disabled:cursor-not-allowed
               transition-colors">
  Sign In
</button>
```

### Error Message
```html
<p class="text-sm text-red-500 flex items-center gap-1">
  <svg><!-- warning icon --></svg>
  Invalid username or password
</p>
```
