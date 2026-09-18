# Coolify deployment

This repository builds as a single Docker image: Nginx serves the React SPA and proxies Reboot RPC calls under `/__/reboot/` to a local Reboot process. Durable Reboot state lives at `/data`.

## Jean CI deployment pipeline

Production releases are built by GitHub Actions as the ARM64 image
`ghcr.io/telegraphic-dev/reboot-pet-clinic`. The package-publication event is
then matched against `.jean-ci/coolify.yml`; Jean CI initiates the Coolify
deployment and records the resulting deployment status.

Configure Coolify as a Docker-image application using that image (tag `latest`),
not as a Git/Dockerfile application. This prevents a Git push from bypassing
Jean CI. Attach persistent storage at `/data`, expose port `8080`, and use
`/healthz` as its health check.

## Authentication configuration

1. Create a GitHub OAuth App with the authorization callback URL
   `https://reboot-pet-clinic.telegraphic.app/__/oauth/callback`.
2. Add the following **runtime-only** Coolify secrets (not build-time and not preview-only):
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
   - `REBOOT_CRYPTO_ROOT_KEYS` — persistent Reboot root-key material used to sign
     and verify OAuth session tokens. Generate this once, keep it stable across
     deploys, and never commit or rotate it casually (rotation invalidates every
     active browser session).
3. After a merge, confirm the GitHub Actions image build, Jean CI deployment,
   and live GitHub sign-in flow.

No external database or Reboot Cloud account is required. Reboot uses the
configured GitHub identity to mint its own short-lived RPC access tokens and
cookie-backed refresh session.
