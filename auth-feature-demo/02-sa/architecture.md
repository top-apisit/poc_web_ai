# Authentication Feature - Architecture

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      React Application                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │  Login Page  │  │Register Page │  │  Dashboard   │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  │                           │                                         │   │
│  │                    ┌──────▼──────┐                                  │   │
│  │                    │ Auth Context│  (JWT Token Storage)             │   │
│  │                    └──────┬──────┘                                  │   │
│  └───────────────────────────┼─────────────────────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────────────────────┘
                               │ HTTP/HTTPS
                               │ (Authorization: Bearer <token>)
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SERVER (Node.js)                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         API Routes                                   │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐        │   │
│  │  │ POST /register │  │ POST /login    │  │ POST /logout   │        │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘        │   │
│  │                                                                      │   │
│  │  ┌────────────────┐  ┌────────────────┐                             │   │
│  │  │ GET /me        │  │ Auth Middleware│                             │   │
│  │  └────────────────┘  └────────────────┘                             │   │
│  └──────────────────────────────┬──────────────────────────────────────┘   │
│                                 │                                           │
│  ┌──────────────────────────────▼──────────────────────────────────────┐   │
│  │                         Services                                     │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐        │   │
│  │  │  Auth Service  │  │  User Service  │  │   JWT Utils    │        │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘        │   │
│  └──────────────────────────────┬──────────────────────────────────────┘   │
└─────────────────────────────────┼───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE (PostgreSQL)                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  users                                                               │   │
│  │  ├── id (UUID, PK)                                                   │   │
│  │  ├── username (VARCHAR, UNIQUE)                                      │   │
│  │  ├── email (VARCHAR, UNIQUE)                                         │   │
│  │  ├── password_hash (VARCHAR)                                         │   │
│  │  ├── created_at (TIMESTAMP)                                          │   │
│  │  └── updated_at (TIMESTAMP)                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Component | Technology | Version | Justification |
|-----------|------------|---------|---------------|
| Frontend | React | 18+ | Component-based, wide adoption |
| Frontend Build | Vite | 5+ | Fast HMR, modern bundling |
| Styling | Tailwind CSS | 3+ | Utility-first, rapid development |
| HTTP Client | Fetch/Axios | - | Standard API calls |
| Backend | Node.js | 20+ | JavaScript ecosystem |
| Framework | Express/Hono | 4+/4+ | Simple, well-documented |
| Database | PostgreSQL | 15+ | Reliable, feature-rich |
| ORM | Drizzle/Prisma | Latest | Type-safe queries |
| Auth | JWT | - | Stateless authentication |
| Password Hashing | bcrypt | 5+ | Industry standard |

---

## 3. Database Schema

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

### Drizzle Schema (TypeScript)

```typescript
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 20 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
```

---

## 4. API Design

### Base URL
```
Development: http://localhost:3001/api
Production:  https://api.yourapp.com/api
```

### Endpoints

#### POST /api/auth/register
Create a new user account.

**Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid-here",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

**Errors:**
| Status | Code | Message |
|--------|------|---------|
| 400 | VALIDATION_ERROR | Invalid input |
| 409 | USER_EXISTS | Username or email already exists |

---

#### POST /api/auth/login
Authenticate user and return JWT token.

**Request:**
```json
{
  "username": "johndoe",
  "password": "securepass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400,
    "user": {
      "id": "uuid-here",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

**Errors:**
| Status | Code | Message |
|--------|------|---------|
| 400 | VALIDATION_ERROR | Invalid input |
| 401 | INVALID_CREDENTIALS | Invalid username or password |

---

#### POST /api/auth/logout
Invalidate current session (client-side token removal).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### GET /api/auth/me
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

**Errors:**
| Status | Code | Message |
|--------|------|---------|
| 401 | UNAUTHORIZED | Invalid or expired token |

---

## 5. Authentication Flow

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-uuid",
    "username": "johndoe",
    "iat": 1704067200,
    "exp": 1704153600
  }
}
```

### Token Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login     │────▶│  Generate   │────▶│   Store     │
│   Request   │     │    JWT      │     │  (Client)   │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               │ Include in requests
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Access    │◀────│   Verify    │◀────│   API       │
│   Granted   │     │    JWT      │     │   Request   │
└─────────────┘     └─────────────┘     └─────────────┘

Token Expiry: 24 hours
Storage: localStorage (demo) / httpOnly cookie (production)
```

---

## 6. Security Considerations

### Password Security
- Hash with bcrypt (cost factor 12)
- Never store plain text passwords
- Never log passwords

### Token Security
- Short expiration (24h for demo)
- Sign with strong secret (256-bit)
- Validate on every protected request

### API Security
- CORS configuration
- Rate limiting (5 requests/minute for auth endpoints)
- Input validation (Zod schemas)
- SQL injection prevention (parameterized queries)

### Headers
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## 7. Folder Structure

### Backend
```
server/
├── src/
│   ├── index.ts              # Entry point
│   ├── config/
│   │   └── env.ts            # Environment variables
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   └── schema.ts         # Drizzle schema
│   ├── routes/
│   │   └── auth.ts           # Auth routes
│   ├── services/
│   │   ├── auth.service.ts   # Auth business logic
│   │   └── user.service.ts   # User operations
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── password.ts
│   └── types/
│       └── index.ts
├── package.json
└── tsconfig.json
```

### Frontend
```
client/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── ui/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── services/
│   │   └── api.ts
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── DashboardPage.tsx
│   └── types/
│       └── index.ts
├── package.json
└── vite.config.ts
```

---

## 8. Environment Variables

### Backend (.env)
```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/auth_demo

# JWT
JWT_SECRET=your-256-bit-secret-key-here
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```
