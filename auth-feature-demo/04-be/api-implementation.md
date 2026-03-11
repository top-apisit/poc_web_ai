# Authentication Feature - Backend Implementation

## 1. Project Setup

### Initialize Project
```bash
# Create project folder
mkdir auth-demo-server && cd auth-demo-server

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv bcryptjs jsonwebtoken zod
npm install drizzle-orm postgres
npm install -D typescript ts-node @types/node @types/express
npm install -D @types/bcryptjs @types/jsonwebtoken
npm install -D drizzle-kit

# Initialize TypeScript
npx tsc --init
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

---

## 2. File Structure

```
src/
├── index.ts                 # Entry point
├── config/
│   └── env.ts              # Environment config
├── db/
│   ├── index.ts            # Database connection
│   └── schema.ts           # Drizzle schema
├── routes/
│   └── auth.routes.ts      # Auth endpoints
├── services/
│   ├── auth.service.ts     # Auth logic
│   └── user.service.ts     # User operations
├── middleware/
│   ├── auth.middleware.ts  # JWT verification
│   └── validate.middleware.ts
├── utils/
│   ├── jwt.ts              # JWT helpers
│   └── password.ts         # Password hashing
├── validators/
│   └── auth.validator.ts   # Zod schemas
└── types/
    └── index.ts            # TypeScript types
```

---

## 3. Implementation Files

### src/config/env.ts
```typescript
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
};
```

### src/db/schema.ts
```typescript
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 20 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### src/db/index.ts
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config/env';
import * as schema from './schema';

const client = postgres(config.databaseUrl);
export const db = drizzle(client, { schema });
```

### src/validators/auth.validator.ts
```typescript
import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
```

### src/utils/password.ts
```typescript
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

### src/utils/jwt.ts
```typescript
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface JwtPayload {
  sub: string;
  username: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
}
```

### src/services/user.service.ts
```typescript
import { eq, or } from 'drizzle-orm';
import { db } from '../db';
import { users, NewUser, User } from '../db/schema';

export async function findUserByUsername(username: string): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
  return result[0] || null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return result[0] || null;
}

export async function findUserByUsernameOrEmail(
  usernameOrEmail: string
): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.username, usernameOrEmail),
        eq(users.email, usernameOrEmail)
      )
    )
    .limit(1);
  return result[0] || null;
}

export async function findUserById(id: string): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return result[0] || null;
}

export async function createUser(data: NewUser): Promise<User> {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function userExists(
  username: string,
  email: string
): Promise<{ username: boolean; email: boolean }> {
  const [byUsername, byEmail] = await Promise.all([
    findUserByUsername(username),
    findUserByEmail(email),
  ]);
  return {
    username: !!byUsername,
    email: !!byEmail,
  };
}
```

### src/services/auth.service.ts
```typescript
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import * as userService from './user.service';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export interface AuthResponse {
  token: string;
  expiresIn: number;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  // Check if user exists
  const exists = await userService.userExists(input.username, input.email);

  if (exists.username) {
    throw new Error('USERNAME_EXISTS');
  }
  if (exists.email) {
    throw new Error('EMAIL_EXISTS');
  }

  // Hash password
  const passwordHash = await hashPassword(input.password);

  // Create user
  const user = await userService.createUser({
    username: input.username,
    email: input.email,
    passwordHash,
  });

  // Generate token
  const token = generateToken({
    sub: user.id,
    username: user.username,
  });

  return {
    token,
    expiresIn: 86400, // 24 hours in seconds
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  // Find user by username or email
  const user = await userService.findUserByUsernameOrEmail(input.username);

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Verify password
  const isValid = await comparePassword(input.password, user.passwordHash);

  if (!isValid) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Generate token
  const token = generateToken({
    sub: user.id,
    username: user.username,
  });

  return {
    token,
    expiresIn: 86400,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}
```

### src/middleware/auth.middleware.ts
```typescript
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import * as userService from '../services/user.service';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'No token provided',
        },
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const user = await userService.findUserById(payload.sub);

    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not found',
        },
      });
      return;
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      },
    });
  }
}
```

### src/middleware/validate.middleware.ts
```typescript
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
            details: error.errors.map((e) => ({
              field: e.path.join('.'),
              message: e.message,
            })),
          },
        });
        return;
      }
      next(error);
    }
  };
}
```

### src/routes/auth.routes.ts
```typescript
import { Router, Response } from 'express';
import * as authService from '../services/auth.service';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const router = Router();

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.message === 'USERNAME_EXISTS') {
      res.status(409).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'Username already exists',
        },
      });
      return;
    }
    if (error.message === 'EMAIL_EXISTS') {
      res.status(409).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'Email already exists',
        },
      });
      return;
    }
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong',
      },
    });
  }
});

// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid username or password',
        },
      });
      return;
    }
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong',
      },
    });
  }
});

// POST /api/auth/logout
router.post('/logout', authMiddleware, (req, res) => {
  // JWT is stateless, logout is handled client-side
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

export default router;
```

### src/index.ts
```typescript
import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware
app.use(cors({ origin: config.cors.origin }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Something went wrong',
    },
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
```

---

## 4. Database Migration

### drizzle.config.ts
```typescript
import type { Config } from 'drizzle-kit';
import { config } from './src/config/env';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.databaseUrl,
  },
} satisfies Config;
```

### Run Migrations
```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:migrate
```

---

## 5. Environment Variables

### .env.example
```env
# Server
PORT=3001
NODE_ENV=development

# Database (PostgreSQL)
DATABASE_URL=postgresql://postgres:password@localhost:5432/auth_demo

# JWT
JWT_SECRET=your-super-secret-key-min-256-bits-long-for-security
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

## 6. API Testing with cURL

### Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}'
```

### Get Current User
```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Logout
```bash
curl -X POST http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
