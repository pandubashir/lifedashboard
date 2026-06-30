# Life Dashboard (React + TypeScript)

React rewrite of the original vanilla JS Life Dashboard. This is the
**foundation only** — tooling, design tokens, and the base UI kit.
Feature logic (timer, todo, links, greeting) is intentionally not
implemented yet; see the roadmap from the migration analysis for the
planned sequence.

## Stack

- React 19 + TypeScript
- Vite 8 (`@tailwindcss/vite` plugin — no separate PostCSS config needed)
- Tailwind CSS v4 (CSS-first config, see `src/styles/globals.css`)
- React Hook Form + Zod (installed, not wired to a form yet)
- Lucide React (icons)
- date-fns (installed, not used yet)
- LocalStorage for persistence (no backend) — access goes through
  `src/services/storage` once that's implemented

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check (tsc -b) + production build
npm run lint      # oxlint
```

## Folder structure

```
src/
├── app/                  Composition root. App.tsx currently renders a
│   └── providers/        temporary UI-kit preview, not real features.
├── components/ui/        Reusable, domain-agnostic primitives:
│                          Button, Card, Input, Modal.
├── features/             One folder per business domain (greeting,
│                          focus-timer, todo, quick-templates,
│                          quick-links, theme). Empty for now — each
│                          ships with its own components/, hooks/,
│                          schema.ts (Zod) and a single index.ts
│                          barrel as its public API.
├── services/storage/     Will be the only code allowed to touch
│                          `localStorage` directly.
├── hooks/                Shared hooks with no domain knowledge
│                          (e.g. useLocalStorageState, useMediaQuery).
├── lib/                  Pure helpers — cn() lives here.
├── types/                Types shared across more than one feature.
└── styles/globals.css    Tailwind import + design tokens.
```

## Design tokens

Colors, radius, and font family are defined once in
`src/styles/globals.css` and mapped through Tailwind's `@theme`, so
components use plain utility classes (`bg-surface`, `text-ink`,
`bg-primary`) instead of raw hex values or `dark:` variants. The
underlying CSS variables flip automatically based on `[data-theme]` on
a parent element — exactly how the original vanilla app's dark mode
worked, just expressed through Tailwind tokens now.

Spacing and font-size scales are **not** overridden: Tailwind v4's
defaults already match the original design system's values exactly.
