# Repository Guidelines

## Project Structure & Module Organization
- `app/` hosts the Next.js App Router; keep new routes scoped by feature (e.g., `app/my-capabilities/`) and colocate UI logic with route segments.
- `public/` stores static assets referenced by routes; optimize images before dropping them here.
- `docs/` contains architectural notes and UI rules (`docs/dev_rules/ui_rules.md`); update these when altering component patterns.
- `tasks/` tracks product planning history—use it for context when prioritizing new work.
- `tsconfig.json` defines the `@/*` alias and strict TypeScript settings; resolve shared utilities under `app` or `docs` rather than duplicating code.

## Build, Test, and Development Commands
- `npm run dev` launches the Next.js dev server with hot reload.
- `npm run build` compiles the production bundle; run before PRs that change build configuration.
- `npm start` serves the production build locally for smoke tests.
- `npm run lint` executes ESLint using the Next.js ruleset; fix or justify warnings before committing.
- `npx playwright test` runs the Playwright E2E suite; use `--grep "test name"` to target a single scenario.

## Coding Style & Naming Conventions
- TypeScript is strict: type all exports, narrow `any`, and surface domain models via descriptive interfaces.
- Use the `@/*` import alias for root-relative modules and group imports by framework, third-party, and internal code.
- Follow the project naming scheme: PascalCase components, camelCase functions, kebab-case component files, and PascalCase types.
- Leverage Tailwind v4 utilities with semantic tokens defined in the UI rules; prefer composition over ad-hoc styling.
- Keep async flows wrapped in `try/catch` with actionable error messages and user-facing fallbacks.

## Testing Guidelines
- Write Playwright specs that mirror critical user journeys; place new suites under `tests/` (create the folder if missing) and name files `{feature}.spec.ts`.
- Stub network calls where possible, but cover at least one end-to-end happy path per feature.
- Document any skipped tests with a TODO that references an issue for follow-up.

## Commit & Pull Request Guidelines
- Keep commit subjects short, imperative, and scoped (`Add capability summary card`, `Fix lint config`), matching the existing history.
- Every pull request should include: purpose summary, testing notes (`npm run lint`, Playwright results), linked issues, and UI screenshots or recordings when layout changes.
- Request review from the owning domain lead and wait for CI green lights before merging.

## Documentation & Knowledge Sharing
- Update `README.md` for developer onboarding changes and expand `docs/` when introducing new flows or architectural decisions.
- Surface unresolved questions in the PR description and capture final decisions in `docs/PROJECT_PLAN.md` to keep the roadmap accurate.
