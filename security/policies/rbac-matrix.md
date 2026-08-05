# RBAC Matrix

| Role | Scope | Capabilities |
| --- | --- | --- |
| Admin | Cluster | Full access |
| DevOps | Namespace | Sync, rollback, observe |
| Developer | Namespace | Read-only workloads and logs |
| Auditor | Cluster | Read-only history and policy reports |

Principles:

- Least privilege by default.
- Separate human and workload identities.
- Production write access only through GitOps controllers and approved break-glass paths.
