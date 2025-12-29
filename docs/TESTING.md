# Testing

This repo uses **small, high-signal tests** that demonstrate engineering maturity without turning a portfolio into a full QA project.

## Goals
- Ensure server boundary validation is correct
- Keep error responses stable
- Prevent regressions in critical mutations (admin CRUD)

## Recommended stack
- **Vitest** for unit tests
- (Optional) **Playwright** for one or two end-to-end smoke tests

## What to test (high ROI)

### 1) Schema validation (unit)
- create schema rejects invalid payloads
- update schema rejects empty patch
- URLs and tag arrays behave as expected

### 2) Error response format (unit)
- Zod error -> 422 + flattened errors
- bad JSON -> 400

### 3) One integration test (optional)
- call a Route Handler with a `Request` object
- assert status + JSON body

## Commands
- `npm test` — run once in CI
- `npm run test:watch` — local dev loop

## CI
CI should run:
- lint
- typecheck
- tests
