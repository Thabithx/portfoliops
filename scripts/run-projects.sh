#!/usr/bin/env bash
# Start portfolio sub-projects on fixed local ports (persists with nohup).
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="/tmp/portfolio-projects"
mkdir -p "$LOG_DIR"

kill_port() { lsof -ti:"$1" 2>/dev/null | xargs kill -9 2>/dev/null || true; }

start_nohup() {
  local name="$1" dir="$2"
  shift 2
  echo "Starting $name..."
  nohup bash -lc "cd \"$dir\" && $*" > "$LOG_DIR/$name.log" 2>&1 &
  echo $! > "$LOG_DIR/$name.pid"
}

echo "Stopping previous project servers..."
for port in 3020 3021 3030 3031 4000 5000 5001 5002 5003 5173 5174 5175 5176 5177 8080; do
  kill_port "$port"
done

# Static frontends (no MongoDB needed for UI screenshots)
start_nohup "spotter-ui" "$ROOT/projects/spotter/frontend" "npx --yes serve -l 3021"
start_nohup "ecitizen-ui" "$ROOT/projects/eCitizen/frontend/pages" "npx --yes serve -l 3031"

# Full-stack / split apps
start_nohup "luzzio" "$ROOT/projects/luzzio" "npm run dev"
start_nohup "clothing-ui" "$ROOT/projects/e-commerce stores/clothing store/frontend" "npm run dev"
start_nohup "autoforge-ui" "$ROOT/projects/e-commerce stores/autoforge/frontend" "npx vite --host --port 5175"
start_nohup "vehicle-ui" "$ROOT/projects/e-commerce stores/vehicle_store/frontend" "npx vite --host --port 5176"
start_nohup "shoe-ui" "$ROOT/projects/e-commerce stores/shoe store/frontend/store" "npx vite --host --port 5177"
start_nohup "deskly" "$ROOT/projects/deskly" "php -S 127.0.0.1:8080"

sleep 10

echo ""
echo "========== PROJECT LINKS (for UI screenshots) =========="
echo "Portfolio:          file://$ROOT/index.html  (or local static server)"
echo "Build page:           file://$ROOT/build.html"
echo "Spotter Web UI:     http://localhost:3021/pages/index.html"
echo "eCitizen UI:        http://localhost:3031/index.html"
echo "Luzzio:             http://localhost:5173"
echo "Clothing Store:     http://localhost:5174"
echo "AutoForge:          http://localhost:5175"
echo "Vehicle Store:      http://localhost:5176  (home/shop pages; 3D detail may need models)"
echo "Shoe Store:         http://localhost:5177"
echo "Deskly:             http://localhost:8080"
echo ""
echo "Not web-runnable: spotterapp (Android), medicare (Java desktop)"
echo "Logs: $LOG_DIR"
