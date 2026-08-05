# Production Reliability Playbook

## Monitoring priorities

- Error rate and latency
- CPU and memory usage
- Connection pool saturation
- Slow database queries
- Failed background jobs
- Authentication and authorization issues

## Alerting examples

- Memory usage above 90%
- p95 latency above target
- Health endpoint failing
- Database query latency above threshold
- Authentication failures increasing sharply

## Response workflow

1. Receive alert from monitoring.
2. Inspect logs, metrics, and traces.
3. Identify the failing service or dependency.
4. Apply mitigation or rollback.
5. Record the incident and open follow-up work.
