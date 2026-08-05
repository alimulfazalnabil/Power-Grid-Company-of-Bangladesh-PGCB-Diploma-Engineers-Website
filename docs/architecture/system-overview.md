# System Overview

The PGCB Portal is a production-ready enterprise content management platform composed of:

- a Next.js public website and CMS frontend
- a FastAPI backend for content, authentication, and health endpoints
- PostgreSQL for persistent data
- Redis for caching and session-related workflows
- Azure infrastructure for hosting, networking, storage, monitoring, and secrets management

## Core capabilities

- Public website experience
- CMS-driven content publishing
- Member-facing portal workflows
- Observability and security controls
- CI/CD and GitOps deployment automation

## Runtime topology

- Users access the platform through the web application.
- The frontend communicates with the FastAPI backend.
- The backend uses PostgreSQL and Redis for data and caching needs.
- Azure services provide infrastructure, storage, secrets, and monitoring.
