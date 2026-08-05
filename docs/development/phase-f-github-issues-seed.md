# Phase F - GitHub Issues Seed List

Use this file to create issues quickly. Each section contains a title and starter acceptance criteria.

## P0 Issues

### [P0] F-101 Remove duplicate auth implementation risk

- Keep one canonical auth implementation under app/auth
- Remove stale imports and dead code paths
- Pass auth tests and API smoke tests

### [P0] F-102 Consolidate routing strategy and remove duplicated behavior

- Normalize route ownership and module structure
- Consolidate duplicated current-user endpoint behavior
- Update tests for canonical paths

### [P0] F-103 Resolve async/sync database access inconsistency

- Migrate API request path to one DB access model
- Remove threadpool bridge for DB operations in core endpoints
- Preserve behavior and pass integration tests

### [P0] F-104 Enable global exception handling registration in app startup

- Register handlers on app startup
- Verify error envelope and correlation fields in 4xx and 5xx responses
- Add regression tests for unhandled exceptions

## P1 Issues

### [P1] F-201 Hash refresh tokens at rest

- Store SHA-256 digest instead of raw token
- Validate refresh and revoke flows with digest lookup
- Add migration plan for existing tokens

### [P1] F-202 Enforce API security headers baseline

- Validate HSTS, CSP, Referrer-Policy, X-Frame-Options, Permissions-Policy
- Add tests verifying headers

### [P1] F-203 Enforce request correlation with X-Request-ID

- Ensure every response includes X-Request-ID
- Ensure logs and error payload include request ID

### [P1] F-204 Validate Trusted Host middleware policy

- Enable environment-specific allowlist
- Add test coverage for blocked host headers

### [P1] F-205 Add API rate limiting for auth and expensive endpoints

- Implement configurable limits and burst thresholds
- Return clear 429 responses

### [P1] F-301 Add database indexes for operational queries

- Add indexes on refresh_tokens.user_id and refresh_tokens.expires_at
- Add/verify indexes for created_at, updated_at, deleted or deleted_at query paths

### [P1] F-302 Introduce UnitOfWork and remove repository-owned commits

- Service layer controls transaction lifecycle
- Repository methods are persistence operations without commit side effects

### [P1] F-303 Standardize timezone-aware UTC timestamps

- Replace datetime.utcnow with timezone-aware defaults and updates
- Validate serialization compatibility

### [P1] F-401 Standardize API response envelope

- Success and error responses follow one contract
- OpenAPI docs and tests updated accordingly

### [P1] F-402 Add OpenAPI examples to core endpoints
### [P1] F-403 Add cursor pagination for high-volume list endpoints

### [P1] F-501 Expand structured logs with endpoint and latency
### [P1] F-502 Expand audit logging for security-sensitive actions
### [P1] F-503 Integrate Sentry for backend and frontend runtime exceptions

### [P1] F-601 Raise backend and frontend coverage thresholds to 90%
### [P1] F-602 Expand integration testing depth
### [P1] F-603 Add Playwright end-to-end coverage for critical user journeys
### [P1] F-604 Add k6 performance smoke suite for staging

## P2 Issues

### [P2] F-605 Pilot mutation testing on one backend module
### [P2] F-701 Add KEDA worker autoscaling
### [P2] F-702 Add Velero backup and restore workflow
### [P2] F-703 Integrate External Secrets operator
### [P2] F-704 Enforce signed-image admission with Kyverno

### [P2] F-801 Validate private endpoint posture for data-plane services
### [P2] F-802 Enforce Azure Policy baseline
### [P2] F-803 Add cost budget alerts and governance reporting
### [P2] F-804 Complete Defender security posture remediation loop
