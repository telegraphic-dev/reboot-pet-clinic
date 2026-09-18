# Coolify deployment

This repository builds as a single Docker image: Nginx serves the React SPA and proxies Reboot RPC calls under `/__/reboot/` to a local Reboot process. Durable Reboot state lives at `/data`.

## Coolify

1. Create a **Dockerfile** application from `telegraphic-dev/reboot-pet-clinic`, branch `main`, using `Dockerfile`.
2. Attach a persistent storage volume: `/data`.
3. Expose port `8080` (the image reads Coolify's `PORT`, defaulting to `8080`).
4. Configure health check path `/healthz`.
5. Deploy, then verify `/healthz` and the browser UI.

No external database, secrets, or Reboot Cloud account is required.
