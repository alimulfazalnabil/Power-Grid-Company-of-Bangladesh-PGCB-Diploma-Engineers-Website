# API Architecture

## Overview

The backend API is built with FastAPI and exposes health endpoints plus domain routes for notices, sliders, users, and authentication.

## Documentation

- Swagger UI is available through the FastAPI docs endpoint.
- OpenAPI output is maintained in [docs/api/openapi.yaml](docs/api/openapi.yaml).

## Operational expectations

- Define request and response schemas for each endpoint.
- Document authentication requirements and error responses.
- Validate API behavior through automated tests and smoke checks.
