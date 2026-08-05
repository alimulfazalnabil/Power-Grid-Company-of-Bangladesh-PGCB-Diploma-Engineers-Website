## Summary

Describe what this PR changes and why.

## Linked Issues

- Closes #

## Change Type

- [ ] Architecture
- [ ] Backend
- [ ] Frontend
- [ ] Security
- [ ] Database
- [ ] Infrastructure
- [ ] Documentation

## Review Checklist

### Architecture

- [ ] Business logic remains in service layer
- [ ] Repository is persistence-only
- [ ] Dependency injection usage is correct

### Security

- [ ] No secrets exposed
- [ ] Input validation enforced
- [ ] Authorization checks are present where needed

### Performance

- [ ] No obvious N+1 query introduced
- [ ] Index impact considered for new query paths
- [ ] No blocking I/O added in async request path
- [ ] Caching opportunity considered

### Quality

- [ ] Tests added or updated
- [ ] Type hints are complete for new code
- [ ] Logging is sufficient for operations
- [ ] Documentation updated

## CI Gate

- [ ] Ruff
- [ ] Black
- [ ] MyPy
- [ ] Pytest
- [ ] Coverage
- [ ] CodeQL
- [ ] Trivy
- [ ] Docker build
- [ ] Helm validation
- [ ] Terraform validate

## Deployment Plan

- [ ] Deploy to staging after merge
- [ ] Smoke tests completed
- [ ] Rollback path verified
