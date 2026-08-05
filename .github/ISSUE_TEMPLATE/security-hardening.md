---
name: Security Hardening Task
about: Use for security remediation and policy enforcement tasks.
title: "[P1][Security] "
labels: ["priority:P1", "type:security"]
assignees: []
---

## Summary

Describe the vulnerability, weakness, or hardening objective.

## Security Objective

- Prevent:
- Detect:
- Recover:

## Acceptance Criteria

- [ ] Control implemented
- [ ] Security tests or scan assertions added
- [ ] No secrets exposed in code or logs
- [ ] Documentation updated

## Verification Commands

```bash
pytest apps/api/tests
pnpm --filter web build
```

## Rollout Plan

1. Implement in feature branch
2. Validate in CI
3. Deploy to staging
4. Confirm expected security behavior
