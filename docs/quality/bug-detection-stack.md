# Bug Detection Stack

## Layered detection strategy

### 1. Static analysis

Run on every commit.

- Ruff for Python linting
- Black for formatting checks
- MyPy for type checking
- Bandit for Python security checks
- ESLint and TypeScript checks for the frontend

### 2. Unit testing

Validate individual functions, services, and helpers.

### 3. Integration testing

Validate interactions between frontend, API, Redis, PostgreSQL, and storage services.

### 4. End-to-end testing

Simulate real user flows with Playwright.

### 5. Production monitoring

Use Azure Monitor, Application Insights, Prometheus, and Grafana to detect runtime failures.

### 6. Logging

Capture request context including timestamp, trace ID, user ID, endpoint, status code, and error details.

### 7. Distributed tracing

Use OpenTelemetry to follow requests across frontend, API, Redis, PostgreSQL, and storage layers.

### 8. Error tracking

Use Sentry to capture stack traces, browser context, and session details for real-world issues.
