# AGENTS.md

## Build/Lint/Test Commands
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Dev server**: `npm run dev`
- **Start production**: `npm start`
- **Single test**: `npx playwright test --grep "test name"` (Playwright-based testing)

## Code Style Guidelines

### TypeScript & Imports
- Strict mode enabled - all code must be properly typed
- Use path aliases: `@/*` for root directory imports
- Group imports: React/React DOM, external libs, internal modules, types
- Prefer named imports over default imports

### Naming Conventions
- Components: PascalCase (e.g., `ProductCard`)
- Functions: camelCase (e.g., `handleSubmit`)
- Files: kebab-case for components (e.g., `product-card.tsx`)
- Types: PascalCase with descriptive names (e.g., `ProductData`)

### Error Handling
- Use try/catch for async operations
- Throw descriptive Error objects with context
- Handle API errors gracefully with user feedback

### UI Design System (docs/dev_rules/ui_rules.md)
- OKLCH color space with semantic tokens
- Mobile-first responsive design
- WCAG AA accessibility compliance
- Spring-based animations with stagger effects
- Follow established component patterns and variants