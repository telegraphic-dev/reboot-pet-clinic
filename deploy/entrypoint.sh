#!/usr/bin/env bash
set -euo pipefail

: "${PORT:=8080}"
mkdir -p /data

envsubst '${PORT}' < /etc/nginx/nginx.conf > /tmp/nginx.conf

env -u PORT -u RBT_STATE_DIRECTORY -u RBT_SERVERS rbt serve run \
  --state-directory=/data \
  --port=9991 &
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
