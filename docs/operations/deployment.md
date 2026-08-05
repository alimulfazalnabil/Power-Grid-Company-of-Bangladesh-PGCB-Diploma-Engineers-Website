# Deployment Guide

## Release flow

1. Merge changes into the main branch.
2. CI runs linting, tests, and security scans.
3. Build artifacts are produced.
4. Staging validation is performed.
5. A canary release is deployed to a small share of traffic.
6. Production rollout proceeds if metrics remain healthy.

## Rollback

Rollback should be executed immediately if error rate, latency, or availability thresholds are exceeded.

## Operational notes

- Validate health checks before widening traffic.
- Monitor logs, metrics, and alerting dashboards during rollout.
- Keep deployment artifacts and image tags recorded for audit and rollback.
