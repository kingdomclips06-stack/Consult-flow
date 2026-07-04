# ConsultFlow AI — Deployment Guide

## Overview

ConsultFlow AI is deployed on **Vercel** with the following infrastructure:

| Component | Service |
|-----------|---------|
| Hosting | Vercel (Serverless + Edge Functions) |
| CI/CD | GitHub Actions |
| Error Tracking | Sentry |
| Performance Monitoring | Vercel Analytics + Speed Insights |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Media CDN | Cloudinary |
| Rate Limiting | Vercel KV (Redis) |
| Payments | Stripe |

## Prerequisites

Before deploying, you need accounts and API keys for:

1. **Vercel** (vercel.com) — hosting
2. **Supabase** (supabase.com) — database + auth
3. **OpenAI** (platform.openai.com) — AI consultation engine
4. **Stripe** (stripe.com) — subscriptions & payments
5. **Cloudinary** (cloudinary.com) — image hosting
6. **Sentry** (sentry.io) — error tracking (optional but recommended)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in all values.

### Required for all environments

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_APP_URL=
```

### Required for production

```
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
ADMIN_EMAILS=
```

## Vercel Deployment

### 1. Connect Repository to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`consultflow-ai`)
3. Framework preset: **Next.js**
4. Root directory: `./` (leave default)

### 2. Configure Environment Variables in Vercel

Add ALL environment variables from `.env.example` to Vercel:

- **Production**: Settings → Environment Variables
- **Preview**: Same page, select "Preview" tab
- **Development**: Same page, select "Development" tab

### 3. Deploy Settings

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node Version | 20.x |
| Region | Washington, D.C. (iad1) |

### 4. Custom Domain (Production)

1. Go to your project → Domains
2. Add `consultflow.ai` (or your custom domain)
3. Follow Vercel's DNS configuration instructions

## GitHub Actions CI/CD

### Workflows

| File | Trigger | Description |
|------|---------|-------------|
| `.github/workflows/ci.yml` | Push to `main`/`staging`, PRs | Lint → Type Check → Test → Build |
| `.github/workflows/deploy.yml` | Push to `main`/`staging` | Deploy → E2E Tests → Health Check |

### Required GitHub Secrets

Set these in your repository: Settings → Secrets and variables → Actions

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `SENTRY_AUTH_TOKEN` | Sentry auth token |
| `SENTRY_ORG` | Sentry organization slug |
| `SENTRY_PROJECT` | Sentry project slug |

### Getting Vercel Tokens

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Get Org ID and Project ID
vercel link
cat .vercel/project.json
# → orgId and projectId values

# Generate a token (from Vercel dashboard: Settings → Tokens)
```

## Sentry Setup

### 1. Create Sentry Project

1. Go to [sentry.io](https://sentry.io)
2. Create a new project → Next.js
3. Copy the DSN

### 2. Configure Sentry

Sentry is configured in three files:

| File | Runtime |
|------|---------|
| `sentry.client.config.ts` | Browser |
| `sentry.server.config.ts` | Node.js |
| `sentry.edge.config.ts` | Edge |

### 3. Environment Variables for Sentry

```
NEXT_PUBLIC_SENTRY_DSN=https://key@sentry.io/project
SENTRY_ORG=consultflow-ai
SENTRY_PROJECT=nextjs
SENTRY_AUTH_TOKEN=<from sentry.io settings>
```

## Vercel Analytics & Speed Insights

Enable in Vercel Dashboard:
1. Project → Analytics → Enable
2. Project → Speed Insights → Enable

No code changes needed — Vercel injects these automatically for Next.js.

## Database Backups

Supabase handles automated backups:
- **Daily backups**: Retained for 7 days (Pro plan)
- **Point-in-time recovery**: Available on Pro plan (7 day window)
- **Manual backup**: Supabase Dashboard → Database → Backups → Create backup

For additional safety, configure a weekly pg_dump to external storage:

```bash
pg_dump "$DATABASE_URL" | gzip > "backup-$(date +%Y-%m-%d).sql.gz"
```

## Monitoring & Alerts

### Health Checks

The deploy workflow runs a health check automatically. Additionally, set up:

1. **Vercel Status Dashboard**: https://status.vercel.com
2. **Sentry Alerts**: Sentry → Alerts → Create Alert
   - Error rate > 5% in 5 minutes
   - Apdex score < 0.9
3. **Uptime Monitoring**: Use Vercel's built-in monitoring or a service like Better Uptime

### Logging

- **Vercel Logs**: Project → Logs (real-time and historical)
- **Sentry**: All errors with stack traces, breadcrumbs, and user context
- **Stripe**: Dashboard → Developers → Logs (webhook events)

## Production Checklist

- [ ] Custom domain configured and SSL active
- [ ] All environment variables set in Vercel (Production + Preview)
- [ ] GitHub secrets configured
- [ ] Supabase RLS policies enabled
- [ ] Stripe webhook endpoint configured (pointed to `/api/webhooks/stripe`)
- [ ] Cloudinary upload preset configured with unsigned uploads
- [ ] Sentry DSN and auth configured
- [ ] Vercel Analytics enabled
- [ ] Rate limiting enabled via Vercel KV
- [ ] CORS origins configured for widget embedding
- [ ] E2E tests passing
- [ ] Database backup strategy configured

## Rollback Procedure

### Vercel Rollback

1. Go to Vercel Dashboard → Project → Deployments
2. Find the last known-good deployment
3. Click the "..." menu → "Promote to Production"

### Via CLI

```bash
vercel rollback --token=$VERCEL_TOKEN
```

### Database Rollback

```bash
# Restore from Supabase backup
# Supabase Dashboard → Database → Backups → Restore
```

## Local Development

```bash
npm run dev    # Start dev server on :3000
npm run build  # Production build
npm run test   # Run unit tests
npm run test:e2e  # Run Playwright E2E tests
npm run lint   # Lint check
```