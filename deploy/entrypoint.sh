#!/usr/bin/env bash
set -euo pipefail

: "${PORT:=8080}"
mkdir -p /data

envsubst '${PORT}' < /etc/nginx/nginx.conf > /tmp/nginx.conf

rbt serve run \
  --application=backend/src/main.py \
  --state-directory=/data \
  --application-name=petclinic \
  --port=9991 \
  --tls=external &
backend_pid=$!

nginx -c /tmp/nginx.conf -g 'daemon off;' &
nginx_pid=$!

cleanup() {
  kill -TERM "$backend_pid" "$nginx_pid" 2>/dev/null || true
  wait "$backend_pid" "$nginx_pid" 2>/dev/null || true
}
trap cleanup INT TERM

wait -n "$backend_pid" "$nginx_pid"
status=$?
cleanup
exit "$status"
