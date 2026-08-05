# Phase C — Backend Hardening Plan

## Objective

Harden the FastAPI backend so it is more consistent, secure, testable, and production-ready.

## Priority 1 — Consolidate API structure

- Standardize on one routing approach under the API package.
- Keep legacy route modules out of the primary execution path.
- Ensure each endpoint follows the same dependency and service pattern.

## Priority 2 — Strengthen authentication and session lifecycle

- Add refresh-token rotation and revocation support.
- Introduce a clearer logout and token invalidation flow.
- Keep auth failures consistent and explicit.

## Priority 3 — Standardize service and repository boundaries

- Routers should only parse input and delegate to services.
- Services should own business rules.
- Repositories should own persistence concerns.
- Avoid committing inside the repository layer unless transaction scope is explicit.

## Priority 4 — Introduce centralized exception handling

- Create structured error responses.
- Add correlation identifiers and consistent status codes.
- Ensure validation and domain errors are translated into predictable API errors.

## Priority 5 — Improve data-layer consistency

- Add explicit constraints and indexes where needed.
- Review transaction boundaries and lazy/eager loading behavior.
- Make repository methods more deterministic and testable.

## Priority 6 — Expand automated tests

- Add auth tests.
- Add service tests.
- Add integration tests for notices and health flows.

## Expected outcome

After this phase, the backend will be easier to evolve, safer to operate, and more suitable for production deployment.
