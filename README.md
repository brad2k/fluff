# Fluff

A small, CUBE-CSS-structured React component library, built one
component at a time.

## CSS structure (CUBE)

[CUBE](https://cube.fyi/) is a structural CSS methodology developed by Andy Bell to simplify and organize CSS development. It stands for **Composition Utility Block Exception**.

- `src/styles/layers.css` — declares `@layer composition, utility,
block, exception;` once, up front. This is what guarantees an
  Exception rule always beats a Block rule, regardless of source
  order or selector specificity.
- `src/styles/tokens.css` — design tokens (`--color-*`, `--space-*`,
  etc). Not layered — custom properties don't compete on specificity.
- `src/styles/composition.css` — layout-only primitives (`.stack`,
  `.cluster`), no visual opinion.
- `src/styles/utilities.css` — single-purpose helper classes
  (`.visually-hidden`), Tailwind-light — global, reused freely across
  components, not scoped.
- `src/components/<Name>/<Name>.module.css` — each component owns its
  **Block** rules (base look, including any custom properties it
  declares like `--btn-bg`) and **Exception** rules (variant/size
  overrides via `[data-variant]`/`[data-size]` attributes) in the
  same file, each wrapped in its matching `@layer`. A CSS Module, not
  global CSS — scoped/hashed class names, safe from collisions with
  any other component, while still using plain semantic names
  (`.button`) in source.

**Important:** `src/index.ts` imports the four global style files
_before_ it re-exports any component. Cascade-layer order is set by
whichever `@layer` mention comes first in the final bundle — if a
component's `@layer block { }` got bundled before `layers.css`'s bare
`@layer composition, utility, block, exception;` declaration, `block`
would silently rank ahead of `utility`, breaking the ability to
override a component with a utility class. Keep new component exports
below the style imports in `index.ts`.

## Adding a component

1. `src/components/<Name>/<Name>.tsx` + `<Name>.module.css`
2. `import styles from "./<Name>.module.css"`, use `styles.<blockClass>`
3. `src/components/<Name>/index.ts` — named exports only, no default
4. Re-export from `src/index.ts`, below the style imports

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — type declarations + library bundle (ESM + CJS)
- `npm run typecheck` — TS only, no emit
