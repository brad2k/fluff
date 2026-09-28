# Fluff

A small, CUBE-CSS-structured React component library, built one
component at a time.

## CSS structure (CUBE)

[CUBE](https://cube.fyi/) is a structural CSS methodology developed by Andy Bell to simplify and organize CSS development. It stands for **Composition Utility Block Exception**.

- `src/styles/layers.css` — declares `@layer composition, utility,
block, exception;` once, up front. This is what guarantees an
  Exception rule always beats a Block rule, regardless of source
  order or selector specificity.
- `src/styles/tokens/` — design tokens (`--f-color-*`, `--f-space-*`,
  etc). Not layered — custom properties don't compete on specificity.
  See [Design tokens](#design-tokens) below for naming.
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

## Design tokens

Three tiers, each importable in `src/styles/tokens/`:

1. **Primitives** (`src/styles/tokens/primitives/`) — raw values only:
   the color palette (`--f-color-midnight-500`), Utopia space/type
   scales (`--f-space-m`, `--f-step-2`), radii (`--f-radius-lg`),
   motion durations (`--f-motion-base`). No meaning attached — a
   consumer swaps this whole layer to retheme (new palette, new
   Utopia scale) and everything downstream should follow.
2. **Semantic** (`src/styles/tokens/semantic/tokens.css`) — aliases
   primitives to meaning (`--f-color-surface-danger`,
   `--f-radius-interactive`) and holds each component's public,
   overridable API (`--f-button-bg-primary`). This is the layer a
   library consumer themes against — never reference a primitive
   directly from a component file if a semantic token already
   carries that meaning.
3. **Component-local** (`--_btn-bg`, `--_alert-bg` inside each
   `*.module.css`) — private composition only, underscore-prefixed
   to signal "not part of the public API." Exists purely so a
   `[data-variant]`/`[data-size]` rule can swap one property
   cleanly; never themed from outside.

Only add a component-specific *semantic* token when a component
either needs its own override hook or makes a decision with no
existing semantic equivalent (e.g. `--f-button-bg-primary` — no
"primary" status exists to alias). If a component's value is a
verbatim copy of an existing semantic token (a `danger` variant
reusing `--f-color-surface-danger`), reference that token directly
instead of re-exporting it under a component-specific name.

### Naming grammar: Object–Property–Modifier

```
--f-{object}-{property}[-{modifier}][-{state}]
```

- **Object** — the system or component (`button`, `alert`, `color`, `radius`)
- **Property** — the CSS concern being set (`bg`, `text`, `padding`, `surface`)
- **Modifier** — what makes it vary: variant (`primary`, `danger`) or size (`sm`, `lg`)
- **State** — interaction state, always last, most specific (`hover`)

Drop any segment that doesn't vary — don't invent a modifier just to
fill the pattern.

| Token | Reads as |
|---|---|
| `--f-color-surface-danger` | color → surface → danger |
| `--f-button-bg-primary` | button → bg → primary |
| `--f-button-bg-primary-hover` | button → bg → primary → hover |
| `--f-button-radius` | button → radius (no modifier — same for every variant) |
| `--f-button-font-size-sm` | button → font-size → sm |

A quick test for whether a token needs a modifier: try to name it
without knowing which variant you're in. If that's possible, the
property doesn't vary — drop the modifier.

## Adding a component

1. `src/components/<Name>/<Name>.tsx` + `<Name>.module.css`
2. `import styles from "./<Name>.module.css"`, use `styles.<blockClass>`
3. `src/components/<Name>/index.ts` — named exports only, no default
4. Re-export from `src/index.ts`, below the style imports

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — type declarations + library bundle (ESM + CJS)
- `npm run typecheck` — TS only, no emit
