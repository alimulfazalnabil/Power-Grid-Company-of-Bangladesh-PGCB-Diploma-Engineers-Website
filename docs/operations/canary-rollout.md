# Canary Rollout

## Suggested rollout plan

1. Deploy to 5% of traffic.
2. Monitor key signals for 30-60 minutes.
3. Increase to 25% if healthy.
4. Increase to 50% if healthy.
5. Increase to 100% if healthy.

## Signals to watch

- Error rate
- Latency
- CPU and memory consumption
- Business KPI changes

## Rollback trigger

Rollback immediately if thresholds are exceeded or user-facing errors increase materially.
