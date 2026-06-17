#!/usr/bin/env bash
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOGS="$ROOT/scripts/.logs"
for p in 3001 3020 3030 4000 5000 5001 5002 5003 5173 5174 5175 5176 5177 8080; do
  lsof -ti:"$p" 2>/dev/null | xargs kill -9 2>/dev/null || true
done
if [ -d "$LOGS" ]; then
  for f in "$LOGS"/*.pid; do
    [ -f "$f" ] && kill "$(cat "$f")" 2>/dev/null || true
  done
fi
echo "Stopped project dev servers."
