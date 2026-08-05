# Database Architecture

## Primary storage

- PostgreSQL stores application data and relational records.
- Redis provides cache and transient state.

## Operational guidance

- Use migrations for schema changes.
- Back up regularly.
- Validate restore procedures as part of release readiness.
