# Testing Guide

## Automated testing

- Backend: pytest
- Frontend: Vitest
- API smoke tests: pytest
- CI enforcement: GitHub Actions

## Commands

```bash
pnpm install
pnpm --filter web test -- --run
pytest apps/api/tests
```

## Coverage expectations

- Backend: target 90%+
- Frontend: target 90%+
