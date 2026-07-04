#!/usr/bin/env bash
# Rebuild the site and (re)start the production server on port 3000.
# Build runs in the foreground so errors surface; the server is launched in a new
# session (setsid) so it keeps running after this script — and your shell — exits.
set -euo pipefail
cd "$(dirname "$0")"

# Group-writable so any team member can publish over another member's build.
umask 002
mkdir -p .run

echo "Building Next.js site..."
npm run build

echo "Freeing port 3000..."
# Free PORT regardless of which user owns the current listener. lsof runs under
# sudo so it can see (and the kill can signal) a process owned by another user.
for _ in $(seq 1 25); do
  pids=$(sudo lsof -t -iTCP:3000 -sTCP:LISTEN 2>/dev/null || true)
  if [ -z "$pids" ]; then
    break
  fi
  sudo kill $pids 2>/dev/null || true
  sleep 0.2
done

echo "Starting Next.js server on port 3000..."
setsid nohup npm run start -- -p 3000 > .run/server.log 2>&1 < /dev/null &

# Wait for the new server to actually answer before reporting success, so a
# startup crash surfaces here instead of silently leaving the old page live.
for _ in $(seq 1 50); do
  if curl -sf -o /dev/null http://localhost:3000; then
    echo "Next.js site published; serving on port 3000"
    exit 0
  fi
  sleep 0.2
done

echo "warning: published, but the server isn't responding — check .run/server.log" >&2
exit 1
