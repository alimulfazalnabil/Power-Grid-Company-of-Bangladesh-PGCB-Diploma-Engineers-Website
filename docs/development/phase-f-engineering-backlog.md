# Phase F - Engineering Backlog and Remediation Roadmap

## Goal

Convert verified audit findings into implementation work that can be planned, built, tested, and released with clear ownership and acceptance criteria.

## Operating Model

- Delivery cadence: 3 sprints
- Priorities: P0 (launch blocker), P1 (must complete before production), P2 (post-launch hardening)
- Work style: issue-driven, one focused change set per pull request
- Quality gate: no issue is closed unless all Definition of Done checks pass

## Epic Backlog

### Epic 1 - Critical Architecture Fixes (P0)

#### F-101 - Remove duplicate auth implementation risk

- Priority: P0
- Scope: remove legacy or parallel auth code paths so only one canonical auth package is used
- Acceptance criteria:
  - Single auth implementation remains under app/auth
  - No stale imports reference removed auth code
  - Auth tests pass
- Verification:
  - rg "app/auth.py|from app.auth import|from app.auth." apps/api
  - pytest apps/api/tests/test_auth.py

#### F-102 - Consolidate routing strategy

- Priority: P0
- Scope: normalize route ownership so external API routes are consistently served from one structure
- Acceptance criteria:
  - Route modules follow one convention and no duplicate route behavior exists
  - Duplicated profile endpoint logic consolidated
  - Route tests updated
- Verification:
  - rg "@router\\.(get|post|put|delete|patch)\\(" apps/api/app
  - pytest apps/api/tests

#### F-103 - Resolve async and sync DB access inconsistency

- Priority: P0
- Scope: choose one DB access model and apply it consistently
- Current risk: async endpoints use sync Session and threadpool bridging
- Target: AsyncSession end-to-end for API request path
- Acceptance criteria:
  - Request handlers, dependencies, and repositories share one DB session model
  - No threadpool DB bridge remains for core API paths
  - Regression tests pass
- Verification:
  - rg "run_in_threadpool|SessionLocal|AsyncSession|create_async_engine" apps/api/app
  - pytest apps/api/tests

#### F-104 - Wire global exception handling into startup

- Priority: P0
- Scope: ensure standardized error envelope is always returned for unexpected failures
- Acceptance criteria:
  - Exception handler registration is called during app startup
  - 4xx and 5xx error responses include request_id and trace_id where available
  - Tests cover unhandled exception response contract
- Verification:
  - pytest apps/api/tests

### Epic 2 - Security Hardening (P1)

#### F-201 - Hash refresh tokens at rest

- Priority: P1
- Acceptance criteria:
  - Refresh token persistence stores hash digest, not plaintext
  - Validation flow uses digest compare
  - Existing token lifecycle behavior remains correct

#### F-202 - Enforce security headers baseline

- Priority: P1
- Acceptance criteria:
  - HSTS, CSP, Referrer-Policy, X-Frame-Options, Permissions-Policy are present in API responses
  - Automated tests verify header presence

#### F-203 - Request ID middleware guarantees correlation

- Priority: P1
- Acceptance criteria:
  - Every response includes X-Request-ID
  - Request ID is included in structured logs and error payloads

#### F-204 - Trusted host guardrail validation

- Priority: P1
- Acceptance criteria:
  - TrustedHostMiddleware enabled per environment config
  - Misconfigured Host header is rejected in test coverage

#### F-205 - Add API rate limiting

- Priority: P1
- Acceptance criteria:
  - Per-IP or per-token limits on auth and expensive endpoints
  - Burst and steady-state thresholds configurable
  - 429 response includes retry hint

### Epic 3 - Database Reliability and Consistency (P1)

#### F-301 - Add missing operational indexes

- Priority: P1
- Index targets:
  - refresh_tokens.user_id
  - refresh_tokens.expires_at
  - created_at, updated_at, deleted or deleted_at fields used in filtering
- Acceptance criteria:
  - Alembic migration adds indexes
  - Query plan checks show index usage on target paths

#### F-302 - Introduce UnitOfWork transaction boundary

- Priority: P1
- Acceptance criteria:
  - Repositories no longer commit directly
  - Service layer controls transaction scope
  - Multi-step operations commit once

#### F-303 - Standardize timezone-aware timestamps

- Priority: P1
- Acceptance criteria:
  - datetime.utcnow usage removed from runtime models
  - Persisted timestamps are timezone-aware UTC

### Epic 4 - API Contract and Pagination (P1)

#### F-401 - Standard response envelope

- Priority: P1
- Target success format:

```json
{
  "success": true,
  "data": {}
}
```

- Target error format:

```json
{
  "success": false,
  "error": {}
}
```

- Acceptance criteria:
  - All public endpoints conform to one envelope strategy
  - OpenAPI schema reflects envelope types

#### F-402 - Add OpenAPI examples

- Priority: P1
- Acceptance criteria:
  - Request and response examples are present for auth, users, notices, sliders

#### F-403 - Introduce cursor pagination where needed

- Priority: P1
- Acceptance criteria:
  - High-volume list endpoints support cursor-based pagination
  - Backward compatibility strategy documented

### Epic 5 - Observability and Incident Readiness (P1)

#### F-501 - Expand structured log context

- Priority: P1
- Required fields: request_id, trace_id, user_id, endpoint, latency_ms
- Acceptance criteria:
  - Log format contains all required fields
  - Sensitive data is not logged

#### F-502 - Extend audit logging coverage

- Priority: P1
- Acceptance criteria:
  - Auth and administrative actions are consistently recorded
  - Audit records include actor, action, timestamp, and source context

#### F-503 - Integrate Sentry

- Priority: P1
- Acceptance criteria:
  - Backend exception reporting enabled
  - Frontend runtime error reporting enabled
  - Environment-based sampling configuration documented

### Epic 6 - Testing and Quality Gates (P1)

#### F-601 - Raise backend and frontend coverage to 90 percent

- Priority: P1
- Acceptance criteria:
  - Coverage report artifacts published in CI
  - Minimum thresholds enforced

#### F-602 - Expand integration tests

- Priority: P1
- Acceptance criteria:
  - Auth flow, permission checks, and core CRUD paths covered

#### F-603 - Add Playwright end-to-end suite

- Priority: P1
- Acceptance criteria:
  - Login, dashboard, notice flow, and logout covered in CI

#### F-604 - Add k6 performance smoke tests

- Priority: P1
- Acceptance criteria:
  - Baseline latency and error-rate thresholds defined
  - Staging run is automated

#### F-605 - Evaluate mutation testing

- Priority: P2
- Acceptance criteria:
  - Pilot on one backend module
  - Mutation score target proposed

### Epic 7 - Kubernetes Platform Hardening (P2)

#### F-701 - KEDA autoscaling for worker workloads
#### F-702 - Velero backup and restore workflow
#### F-703 - External Secrets integration
#### F-704 - Enforce cosign verification via Kyverno

All items Priority P2 unless required by launch policy.

### Epic 8 - Azure Governance and Cost Controls (P2)

#### F-801 - Validate private endpoints for data plane services
#### F-802 - Azure Policy baseline enforcement
#### F-803 - Cost budgets and alerts
#### F-804 - Defender posture review and remediation

All items Priority P2 unless required by compliance policy.

## Sprint Execution Plan

### Sprint 1 (1 to 2 days)

- F-101, F-102, F-103, F-104
- Exit criteria: all P0 work merged and deployed to staging

### Sprint 2 (2 to 3 days)

- F-201, F-202, F-203, F-204, F-205, F-301, F-302, F-303, F-401
- Exit criteria: security and data integrity hardening complete

### Sprint 3 (3 to 5 days)

- F-402, F-403, F-501, F-502, F-503, F-601 to F-604
- Optional P2 start: F-701 onward
- Exit criteria: readiness validation for production decision

## GitHub Board Workflow

Columns:

1. Backlog
2. Ready
3. In Progress
4. Code Review
5. Testing
6. Done

Suggested labels:

- priority:P0
- priority:P1
- priority:P2
- type:security
- type:architecture
- type:database
- type:api
- type:observability
- type:testing
- type:infra

## Definition of Done

Every issue must satisfy all checks:

1. Code implemented and reviewed
2. Unit tests added or updated
3. Integration tests pass
4. Lint passes
5. Type checking passes
6. Security scan passes
7. Documentation updated
8. Pull request approved
9. Successfully deployed to staging

## CI Validation Commands

Run before opening or merging PRs:

```bash
pnpm install --frozen-lockfile
pnpm --filter web test -- --run
pnpm --filter web build
pnpm --filter cms build
pytest apps/api/tests
```

## Production Gate

Production release approval requires:

- 100 percent of P0 completed
- At least 90 percent of P1 completed
- No open critical security finding
- Staging burn-in completed with no blocking incidents
