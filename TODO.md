# TODO

## Open

- [ ] **Set the compatibility date and `nodejs_compat` flag on the `fullstackportfolio` Cloudflare Pages project.**
  Settings → Runtime in the dashboard fails with "An unknown error occurred" (reference `cfl.re/3WgEyrH`)
  on every save, even for a single change. It is a Cloudflare-side error, and the site runs fine without them.
  Retry later, or report it to Cloudflare. The old project used date `2025-12-26` with `nodejs_compat`
  (the picker doesn't offer `2025-12-26`; `2025-12-04` behaves identically). Redeploy afterwards.

## Notes

- `fullstackportfolio` is a direct-upload Pages project: pushing to `main` does not deploy it.
  Run `npm run deploy:pages` after code changes.
- `full-stack-portfolio-2` still builds from git, but with `REDIRECT_TO` set it only emits a
  `_redirects` file that 301s every path to `https://fullstackportfolio.pages.dev`.
