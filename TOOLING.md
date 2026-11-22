# Admin engineering tooling

Read AGENTS.md. Run commands from this directory:

```sh
npm run format -- src/path/to/changed-file.tsx
npm run format:check
npm run typecheck
npm run lint
npm run build
```

Formatting requires explicit paths; do not rewrite the entire application during feature work.
Prettier 3.10.1 and eslint-config-prettier 10.1.8 are pinned. VS Code settings require the
Prettier and ESLint editor extensions; these were not installed automatically.

Verified on 2026-11-22: TypeScript and build passed. Build retains a large-chunk warning.
Whole-app format check reports 41 existing files requiring separate cleanup. Representative
AuthLayout.tsx was formatted. ESLint/Prettier conflict check passed. Existing lint failures:

- src/pages/Dashboard.tsx:84: explicit any.
- src/pages/Orders.tsx:25,86: explicit any; line 44: missing fetchOrders effect dependency.
- src/pages/Users.tsx:41: explicit any.
- src/services/products.services.ts:14,19: explicit any.

Total: six errors and one warning. Rules remain enabled and these files are untouched.
No local test script exists. With the backend sibling available, run npm test there: all
41 isolated tests passed, including frontend regressions. Report missing cross-application
tests when using a standalone checkout.
