#!/usr/bin/env bash
# Start portfolio sub-projects for UI screenshots. Logs: scripts/.logs/
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECTS="$ROOT/projects"
LOGS="$ROOT/scripts/.logs"
mkdir -p "$LOGS"

kill_port() {
  lsof -ti:"$1" 2>/dev/null | xargs kill -9 2>/dev/null || true
}

start_bg() {
  local name="$1"
  local dir="$2"
  local cmd="$3"
  local log="$LOGS/${name}.log"
  echo "Starting $name..."
  : > "$log"
  nohup bash -lc "cd $(printf '%q' "$dir") && $cmd" >> "$log" 2>&1 &
  echo $! > "$LOGS/${name}.pid"
  sleep 0.5
}

echo "Stopping previous dev servers on known ports..."
for p in 3001 3020 3030 4000 5000 5001 5002 5003 5173 5174 5175 5176 5177 8080; do kill_port "$p"; done

# Portfolio orders + admin API
start_bg "portfolio-api" "$ROOT" "npm run start"

# Full-stack apps — UI-only static mode when MongoDB is unavailable (screenshot friendly)
start_bg "spotter" "$PROJECTS/spotter" "php -S 0.0.0.0:3020 -t frontend"
start_bg "eCitizen" "$PROJECTS/eCitizen" "php -S 0.0.0.0:3030 -t frontend"

# E-commerce backends
start_bg "clothing-api" "$PROJECTS/e-commerce stores/clothing store/backend" "PORT=4000 node server.js"
start_bg "autoforge-api" "$PROJECTS/e-commerce stores/autoforge/backend" "PORT=5000 node src/index.js"
start_bg "luzzio-api" "$PROJECTS/luzzio/server" "PORT=5001 node server.js"
start_bg "vehicle-api" "$PROJECTS/e-commerce stores/vehicle_store/backend" "PORT=5002 node src/index.js"
start_bg "shoe-api" "$PROJECTS/e-commerce stores/shoe store/backend" "PORT=5003 npx ts-node src/index.ts"

# Vite frontends (UI screenshots — may work without API data)
start_bg "clothing-ui" "$PROJECTS/e-commerce stores/clothing store/frontend" "npx vite --port 5173 --host 0.0.0.0"
start_bg "autoforge-ui" "$PROJECTS/e-commerce stores/autoforge/frontend" "npx vite --port 5174 --host 0.0.0.0"
start_bg "vehicle-ui" "$PROJECTS/e-commerce stores/vehicle_store/frontend" "npx vite --port 5175 --host 0.0.0.0"
start_bg "shoe-ui" "$PROJECTS/e-commerce stores/shoe store/frontend/store" "npx vite --port 5176 --host 0.0.0.0"
start_bg "luzzio-ui" "$PROJECTS/luzzio/client" "npx vite --port 5177 --host 0.0.0.0"

# Deskly — must be served from projects root so /deskly/ asset paths resolve
if command -v php >/dev/null 2>&1; then
  start_bg "deskly" "$PROJECTS" "php -S 0.0.0.0:8080 -t ."
fi

sleep 5

check_port() {
  curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "http://localhost:$1$2" 2>/dev/null || echo "000"
}

echo ""
echo "========== PROJECT UI LINKS =========="
echo "Spotter Web:        http://localhost:3020/pages/index.html  ($(check_port 3020 /pages/index.html))"
echo "eCitizen:           http://localhost:3030/pages/index.html  ($(check_port 3030 /pages/index.html))"
echo "Clothing Store UI:  http://localhost:5173  ($(check_port 5173))"
echo "AutoForge UI:       http://localhost:5174  ($(check_port 5174))"
echo "Vehicle Store UI:   http://localhost:5175  ($(check_port 5175))"
echo "Shoe Store UI:      http://localhost:5176  ($(check_port 5176))"
echo "Luzzio UI:          http://localhost:5177  ($(check_port 5177))"
echo "Luzzio API:         http://localhost:5001  ($(check_port 5001 /))"
echo "Deskly (PHP):       http://localhost:8080/deskly/index.php  ($(check_port 8080 /deskly/index.php))"
echo ""
echo "Portfolio (orders): http://localhost:3001  ($(check_port 3001))"
echo ""
echo "Not runnable in browser:"
echo "  • Spotter Android (spotterapp) — Android Studio / emulator"
echo "  • Medicare — Java desktop app (Eclipse)"
echo ""
echo "Logs: $LOGS"
echo "Stop all: bash scripts/stop-all-projects.sh"
echo ""
echo "Tip: run detached so servers stay up after the terminal closes:"
echo "  nohup bash scripts/run-all-projects.sh > scripts/.logs/run-all.out 2>&1 &"
