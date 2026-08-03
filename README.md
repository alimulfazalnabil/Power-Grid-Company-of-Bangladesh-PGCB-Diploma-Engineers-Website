# PGCB Portal

Production-grade membership portal built with:

- Next.js 15
- React 19
- FastAPI
- PostgreSQL
- Redis
- Docker
- GitHub Actions

## Development

```bash
pnpm install
docker compose up -d
pnpm dev
```

## Repository layout

- apps/web — public website
- apps/cms — admin CMS
- apps/api — FastAPI backend
- packages/ui, config, types, utils — shared packages
- database — schema and migrations
- docker — nginx, postgres, redis assets
- docs, scripts, infrastructure, .github — project tooling and documentation

