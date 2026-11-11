#!/usr/bin/env bash
# Builds the site for Cloudflare Pages with OpenNext (advanced mode: .pages/_worker.js/index.js + static assets).
# The Pages project runs `npm run build:pages` with output directory `.pages` on every push (main is production,
# other branches get preview URLs); `npm run deploy:pages` does the same from this machine.
set -euo pipefail
cd "$(dirname "$0")/.."

# Redirect-only build: with REDIRECT_TO set (the old full-stack-portfolio-2 project), skip the site build and
# output a single _redirects file that 301s every path to that origin.
if [ -n "${REDIRECT_TO:-}" ]; then
  rm -rf .pages
  mkdir -p .pages
  echo "/* ${REDIRECT_TO%/}/:splat 301" > .pages/_redirects
  exit 0
fi

npx opennextjs-cloudflare build

rm -rf .pages
cp -R .open-next/assets .pages
# Prerendered pages read by the static-assets incremental cache (what `opennextjs-cloudflare deploy` uploads).
mkdir -p .pages/cdn-cgi/_next_cache
cp -R .open-next/cache/. .pages/cdn-cgi/_next_cache/

# Bundle the worker with wrangler; Pages expects the entry at _worker.js/index.js.
npx wrangler deploy --dry-run --outdir .pages/_worker.js
mv .pages/_worker.js/worker.js .pages/_worker.js/index.js
rm -f .pages/_worker.js/worker.js.map .pages/_worker.js/README.md
node scripts/node-prefix.mjs .pages/_worker.js/index.js

# Pages runs _worker.js for every request; let the build's static files bypass it like Workers assets do
# (/favicon.ico too: served through the worker, the .ico bytes come out altered).
cat > .pages/_routes.json <<'JSON'
{ "version": 1, "include": ["/*"], "exclude": ["/_next/static/*", "/BUILD_ID", "/favicon.ico"] }
JSON

# wrangler.jsonc describes a Worker, not a Pages project: in Cloudflare's build (CF_PAGES=1) remove it so Pages
# keeps the dashboard's settings. Only affects the build machine's checkout.
if [ "${CF_PAGES:-}" = "1" ]; then rm -f wrangler.jsonc; fi
