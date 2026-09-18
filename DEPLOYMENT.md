# Coolify deployment

This repository builds as a single Docker image: Nginx serves the React SPA and proxies Reboot RPC calls under `/__/reboot/` to a local Reboot process. Durable Reboot state lives at `/data`.

## Coolify

1. Create a **Dockerfile** application from `telegraphic-dev/reboot-pet-clinic`, branch `main`, using `Dockerfile`.
2. Attach a persistent storage volume: `/data`.
3. Expose port `8080` (the image reads Coolify's `PORT`, defaulting to `8080`).
4. Configure health check path `/healthz`.
5. Create a GitHub OAuth App with the authorization callback URL
   `https://reboot-pet-clinic.telegraphic.app/__/oauth/callback`.
6. Add its credentials as runtime-only Coolify secrets named
   `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET`.
7. Deploy, then verify `/healthz`, the GitHub sign-in redirect, and the browser UI.

No external database or Reboot Cloud account is required. Reboot uses the
configured GitHub identity to mint its own short-lived RPC access tokens and
cookie-backed refresh session.
