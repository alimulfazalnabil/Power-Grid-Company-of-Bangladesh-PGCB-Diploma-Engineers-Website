# Application Insights

Use Application Insights for exceptions, dependency telemetry, live metrics, browser monitoring, and synthetic availability tests.

Recommended configuration:

- Provision the connection string from Azure Key Vault.
- Export OpenTelemetry traces to Azure Monitor through the collector.
- Create availability tests for `/`, `/health`, `/api/v1/health`, and login flows.
