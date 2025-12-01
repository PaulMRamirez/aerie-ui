# CLAUDE.md

This file provides guidance for Claude Code when working with the aerie-ui codebase.

## Project Overview

Aerie UI is the client application for [Aerie](https://github.com/NASA-AMMOS/aerie), NASA's mission planning and sequencing tool. It provides a web-based interface for mission planning, activity scheduling, simulation, and sequence generation.

## Tech Stack

- **Framework**: SvelteKit (Svelte 4)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS v3
- **Build Tool**: Vite
- **Testing**: Vitest (unit), Playwright (e2e)
- **Linting**: ESLint, Stylelint, Prettier
- **Data Visualization**: D3.js
- **Code Editor**: Monaco Editor, CodeMirror
- **UI Components**: @nasa-jpl/stellar-svelte

## Directory Structure

```
src/
├── assets/        # Additional assets (SVGs, images)
├── components/    # Svelte components (26 subdirectories)
├── constants/     # Constant values
├── css/           # Global stylesheets
├── enums/         # TypeScript enums
├── routes/        # SvelteKit route components
├── schemas/       # JSON schemas
├── stores/        # Svelte stores (state management)
├── tests/         # Unit test utilities
├── types/         # Global TypeScript types
├── utilities/     # Helper functions
└── workers/       # Web workers
e2e-tests/
├── fixtures/      # Playwright test fixtures
├── tests/         # E2E test files
└── utilities/     # E2E test utilities
```

## Essential Commands

```bash
# Development
npm run dev              # Start dev server on port 3000
npm run build            # Production build to build/
npm run preview          # Preview production build

# Code Quality
npm run check            # Svelte-check TypeScript validation
npm run lint             # ESLint
npm run lint:css         # Stylelint for CSS/Svelte
npm run format:check     # Prettier check
npm run format:write     # Prettier auto-fix

# Testing
npm run test:unit        # Run unit tests once
npm run test             # Run unit tests in watch mode
npm run test:e2e         # Run Playwright e2e tests
npm run test:e2e:debug   # Debug e2e tests with inspector
npm run test:e2e:with-ui # E2E tests with Playwright UI
```

## Code Style & Conventions

### TypeScript
- Strict mode enabled
- Use explicit types; avoid `any` when possible
- Object keys must be sorted alphabetically (enforced by ESLint)
- Class members ordered: call-signature, field, constructor, get, method, set, signature

### Svelte Components
- Use TypeScript in script blocks: `<script lang="ts">`
- Prefer TailwindCSS utility classes over semantic CSS
- If semantic classes needed, use `@apply` directive for tailwind classes

### CSS/Styling
- TailwindCSS v3 is the primary styling solution
- Global styles in `src/css/`
- Component styles can use scoped `<style>` blocks

### ESLint Rules
- `curly`: Always use braces
- `eqeqeq`: Always use `===` (except for null)
- `sort-keys`: Object keys must be alphabetically sorted

## Testing Guidelines

### Unit Tests
- Located in `src/**/*.test.ts`
- Use Vitest with jsdom environment
- Run with `npm run test:unit`

### E2E Tests
- Located in `e2e-tests/tests/`
- Use Playwright with Chromium
- Requires Aerie backend services running (see docker-compose-test.yml)
- Tests run against production build in CI, dev server locally

## Commit Message Format

Follow conventional commits format:

```
<type>: <subject>

<body>
```

**Types**: `build`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `release`, `style`, `test`

**Subject rules**:
- Use imperative, present tense: "change" not "changed"
- Don't capitalize first letter
- No period at end
- Max 100 characters per line

## Backend Dependencies

Aerie UI requires the Aerie backend services. For local development:
1. Clone the [Aerie repo](https://github.com/NASA-AMMOS/aerie)
2. Configure `.env` with required secrets
3. Run services via Docker Compose

For e2e testing, authentication is typically disabled. See `docker-compose-test.yml`.

## Environment Variables

Key environment variables (see `.env` file):
- `VITE_HTTPS`: Enable HTTPS for dev server
- `VITE_HOST`: Dev server host (default: localhost)

## Common Patterns

### State Management
- Use Svelte stores in `src/stores/`
- Prefer reactive statements (`$:`) for derived state

### API Communication
- GraphQL via graphql-ws for real-time subscriptions
- REST endpoints through gateway service

### Data Visualization
- Timeline and activity visualization uses D3.js
- Custom SVG rendering for complex visualizations
