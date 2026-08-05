# Operational Runbooks

## Deploy a new release

- Confirm CI and security checks passed.
- Deploy to staging and verify smoke tests.
- Promote to canary and observe telemetry.
- Expand rollout gradually.

## Roll back a release

- Revert to the last healthy image or Git commit.
- Reconcile the deployment state through GitOps.
- Verify health endpoints and business-critical workflows.

## Restore PostgreSQL

- Restore from the latest verified backup.
- Validate application connectivity and migrations.
- Monitor for data consistency issues.

## Handle Redis outage

- Confirm health and failover status.
- Expect degraded performance until Redis recovers.
- Restart dependent services if cache access fails.
