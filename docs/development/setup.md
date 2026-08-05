# Development Setup

## Prerequisites

- Node.js 20+
- pnpm 10+
- Python 3.13+
- Docker Desktop or Docker Engine
- Git

## Local development

```bash
pnpm install
docker compose up -d
pnpm dev
```

## Backend

```bash
cd apps/api
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Verification

- Web app: http://localhost:3000
- CMS: http://localhost:3001
- API: http://localhost:8000
