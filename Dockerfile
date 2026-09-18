FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:${PATH}"

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-venv python3-pip nginx curl ca-certificates gettext-base \
    && python3 -m pip install --no-cache-dir --break-system-packages uv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml uv.lock .rbtrc ./
RUN uv sync --frozen --no-dev

COPY api ./api
COPY backend ./backend
COPY web/package.json web/package-lock.json ./web/
RUN cd web && npm ci
COPY web ./web
RUN cd web && npm run build

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/entrypoint.sh /usr/local/bin/petclinic-entrypoint
RUN chmod +x /usr/local/bin/petclinic-entrypoint \
    && mkdir -p /data /var/cache/nginx /var/run/nginx

ENV PORT=8080 \
    RBT_STATE_DIRECTORY=/data \
    RBT_SERVERS=1
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
    CMD curl --fail --silent http://127.0.0.1:${PORT}/healthz || exit 1

CMD ["/usr/local/bin/petclinic-entrypoint"]
