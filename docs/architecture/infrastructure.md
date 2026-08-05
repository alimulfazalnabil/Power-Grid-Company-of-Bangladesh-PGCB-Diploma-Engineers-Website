# Infrastructure Overview

## Azure resources

- Resource groups for environment separation
- Virtual networks and private connectivity
- AKS for workload hosting
- PostgreSQL and Redis for platform services
- Azure Storage for media and file workloads
- Azure Key Vault for secrets
- Azure Monitor and Grafana for observability

## Operational considerations

- Use Terraform for infrastructure lifecycle management.
- Validate scaling limits and cost assumptions before production promotion.
- Keep monitoring, alerting, and backup coverage enabled for every environment.
