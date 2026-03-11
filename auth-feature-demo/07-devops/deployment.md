# Authentication Feature - Deployment Guide

## 1. Local Development Setup

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm or pnpm

### Database Setup
```bash
# Option 1: Local PostgreSQL
createdb auth_demo

# Option 2: Docker
docker run -d \
  --name auth-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=auth_demo \
  -p 5432:5432 \
  postgres:15
```

### Backend Setup
```bash
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL=postgresql://postgres:password@localhost:5432/auth_demo

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

### Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with API URL
# VITE_API_URL=http://localhost:3001/api

# Start development server
npm run dev
```

---

## 2. Docker Setup

### docker-compose.yml
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15
    container_name: auth-demo-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: auth_demo
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Backend API
  api:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: auth-demo-api
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/auth_demo
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=24h
      - CORS_ORIGIN=http://localhost:5173
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy

  # Frontend (for production build)
  web:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: auth-demo-web
    environment:
      - VITE_API_URL=http://localhost:3001/api
    ports:
      - "5173:80"
    depends_on:
      - api

volumes:
  postgres_data:
```

### server/Dockerfile
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3001

CMD ["node", "dist/index.js"]
```

### client/Dockerfile
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### client/nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing - redirect all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

### Run with Docker Compose
```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## 3. Production Deployment

### Option A: Vercel + Railway

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel

# Set environment variable in Vercel dashboard
# VITE_API_URL=https://your-api.railway.app/api
```

#### Backend (Railway)
1. Create account at railway.app
2. New Project → Deploy from GitHub
3. Add PostgreSQL database
4. Set environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate-secure-key>
   JWT_EXPIRES_IN=24h
   CORS_ORIGIN=https://your-app.vercel.app
   DATABASE_URL=<auto-filled-by-railway>
   ```
5. Deploy

---

### Option B: DigitalOcean/AWS

#### Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

#### Database Setup
```bash
sudo -u postgres psql

CREATE DATABASE auth_demo;
CREATE USER auth_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE auth_demo TO auth_user;
\q
```

#### Backend Deployment
```bash
# Clone repository
git clone <your-repo> /var/www/auth-demo
cd /var/www/auth-demo/server

# Install dependencies
npm ci --production

# Build
npm run build

# Run migrations
npm run db:migrate

# Start with PM2
pm2 start dist/index.js --name auth-api
pm2 save
pm2 startup
```

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/auth-demo
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/auth-demo/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Enable Site & SSL
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/auth-demo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

---

## 4. Environment Variables

### Production Checklist

| Variable | Development | Production |
|----------|-------------|------------|
| NODE_ENV | development | production |
| JWT_SECRET | any string | Strong random 256-bit key |
| DATABASE_URL | localhost | Production DB URL |
| CORS_ORIGIN | localhost:5173 | Production frontend URL |

### Generate Secure JWT Secret
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32
```

---

## 5. CI/CD Pipeline

### GitHub Actions (.github/workflows/deploy.yml)
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: |
          cd server && npm ci
          cd ../client && npm ci

      - name: Run tests
        run: |
          cd server && npm test
          cd ../client && npm test

  deploy-api:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: auth-api

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./client
```

---

## 6. Monitoring & Logging

### PM2 Monitoring
```bash
# View status
pm2 status

# View logs
pm2 logs auth-api

# Monitor resources
pm2 monit
```

### Health Check Endpoint
```bash
# Test health
curl https://api.yourdomain.com/health

# Expected response
{"status":"ok","timestamp":"2024-01-01T00:00:00.000Z"}
```

### Log Rotation
```bash
# PM2 log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## 7. Backup Strategy

### Database Backup
```bash
# Manual backup
pg_dump -U postgres auth_demo > backup_$(date +%Y%m%d).sql

# Automated daily backup (crontab)
0 2 * * * pg_dump -U postgres auth_demo > /backups/auth_demo_$(date +\%Y\%m\%d).sql

# Restore
psql -U postgres auth_demo < backup_20240101.sql
```

---

## 8. Security Checklist

### Before Production
- [ ] Change default database passwords
- [ ] Generate strong JWT secret (256-bit)
- [ ] Enable HTTPS only
- [ ] Configure CORS for production domain
- [ ] Enable rate limiting
- [ ] Set secure HTTP headers
- [ ] Disable debug mode
- [ ] Review firewall rules
- [ ] Enable database connection encryption
- [ ] Set up monitoring and alerts
