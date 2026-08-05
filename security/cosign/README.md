# Cosign Signing Policy

This repository uses keyless signing with GitHub OIDC.

Signing flow:

1. GitHub Actions builds and pushes the image.
2. `cosign sign --yes` signs the image using the workflow identity.
3. Kyverno verifies the signature before Kubernetes admission.

Recommended production controls:

- Enforce immutable tags for production releases.
- Require Rekor transparency log inclusion.
- Verify attestations for SBOM and provenance.
