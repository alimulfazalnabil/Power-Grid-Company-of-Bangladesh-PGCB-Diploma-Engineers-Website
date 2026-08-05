# Security Runbook

## Incident Flow

1. Identify alert source: WAF, Kyverno, Falco, Defender, or Azure Monitor.
2. Correlate with recent deployment and trace IDs.
3. Contain by isolating workload, revoking access, or pausing ingress.
4. Recover using rollback, image revert, or GitOps sync.
5. Record lessons learned and policy gaps.

## Minimum Response Data

- Timestamp
- Affected environment
- Commit SHA
- Image digest
- Trace ID or request ID
- User or workload identity involved
