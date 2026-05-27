# Lucca Front — Copilot Instructions

Lucca Front is a monorepo design system with three publishing packages:
- **`@lucca-front/ng`** — Angular components (`packages/ng/`)
- **`@lucca-front/scss`** — SCSS framework (`packages/scss/`)
- **`@lucca-front/icons`** — Icon font (`packages/icons/`)

Angular depends on SCSS, which depends on Icons.

---

## Commands

| Task | Command |
|---|---|
| Dev (Storybook) | `npm start` |
| Build all | `npm run build` |
| Unit tests (watch) | `npm test` |
| Unit tests (CI) | `npm run ci-test` |
| Lint (Angular + SCSS) | `npm run lint` |
| Lint fix | `npm run lint:fix` |
| Build Storybook | `npm run build-storybook` |

---

## Angular component conventions

All components are **standalone** (no NgModule).

- **Selector**: `lu-<name>` for element components; attribute selector (e.g. `button[luButton]`) for directive-style components
- **`ChangeDetectionStrategy.OnPush`** — always
- **`ViewEncapsulation.None`** — always (styles live in global SCSS)
- **Inputs**: signal-based `input()` / `input.required()`; booleans use `{ transform: booleanAttribute }`; numbers use `{ transform: numberAttribute }`
- **Outputs**: signal-based `output<void>()`
- **Host bindings**: declared in `host: {}` metadata — set base class directly (`class: 'numericBadge'`), conditionals via `[class.is-X]`
- **JSDoc**: every public input must have a JSDoc comment

**Entry points**: each component folder is its own secondary entry point with a `public-api.ts` and `ng-package.json`. Consumers import as:
```ts
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

---

## SCSS conventions

See full rules in [/Users/jbiron/Desktop/lfrules.md](/Users/jbiron/Desktop/lfrules.md).

- **Class naming**: camelCase blocks, hyphen-separated descendants — `.numericBadge`, `.numericBadge-value`, `.indexTable-body-row`
- **Modifiers**: `.mod-<name>` always coupled with the base class, never standalone — e.g. `.mod-S`, `.mod-compact`
- **States**: `.is-<name>` always coupled with the base class — e.g. `.is-loading`, `.is-disabled`
- **Palettes**: `.palette-<name>` — e.g. `.palette-product`, `.palette-neutral`
- **Low specificity**: prefer `.header-menu-logo` over `.header .menu .logo`
- **Media queries**: written inside their selector context, not in a separate section
- **Nested component override**: add a scoped class — `.parentComponent-action .button`
- **Logical properties**: use `inline-size`, `block-size`, `margin-inline-start`, etc. — not `width`, `height`, `margin-left`

SCSS component files are split per concern: `component.scss`, `vars.scss`, `mods.scss`, `states.scss`, `exports.scss`.

---

## Stories

### QA Stories

QA stories live in `stories/qa/<component>/` and contain two files:

- **`<component>.stories.ts`** — declares a `@Component` with `templateUrl`, imports the Angular component(s), and exports a single `Basic` story
- **`<component>.stories.html`** — a `<table class="demo-QAtable">` comparing **HTML** (pure CSS classes) vs **Angular** (`<lu-*>` components) side by side

#### QA story template
```ts
@Component({
  selector: '<component>-stories',
  templateUrl: './<component>.stories.html',
  imports: [SomeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SomeStory {}

export default { title: 'QA/SomeName', component: SomeStory } as Meta;
export const Basic: StoryObj<SomeStory> = { args: {}, render: () => ({}) };
```

#### Key rules
- **Angular column always uses `<lu-*>` components**, never raw HTML with CSS classes
- When replacing HTML buttons/spans with Angular components, also update the `imports` array in the `.stories.ts`
- `<span class="numericBadge">9</span>` → `<lu-numeric-badge value="9" />`
- `<a class="link mod-icon" ...>` → `<a luLink href="..." external>Link text</a>`

### Documentation Stories

Documentation stories live in `stories/documentation/<category>/<component>/angular/` (Angular) or `.../html&css/` (HTML). They use the standard Storybook `Meta`/`StoryObj` pattern directly against the component class — no wrapper `@Component` needed.

#### Documentation story template
```ts
export default {
  title: 'Documentation/<Category>/<Component>/Angular/<Variant>',
  component: SomeComponent,
  render: (inputs, { argTypes }) => ({
    template: `<lu-some-component ${generateInputs(inputs, argTypes)}>Content</lu-some-component>`,
  }),
} as Meta;

export const Basic: StoryObj<SomeComponent> = { args: {} };
```

#### Key rules
- Title follows `Documentation/<Category>/<Component>/Angular/<Variant>` — mirrors the folder structure
- Use helper `generateInputs(inputs, argTypes)` from `stories/helpers/stories` to bind all controls
- Use `createTestStory` from the same helpers for accessibility/interaction tests
- HTML & CSS variants live in a sibling `html&css/` folder, not mixed with Angular

---

## `highlight-prisme.scss`

`packages/scss/src/commons/utils/highlight-prisme.scss` maintains a comprehensive selector list for the `.pr-u-highlightPrisme` overlay utility. When adding a new component:
1. Add its CSS class to the **HTML COMPONENTS OUTSIDE** or **INSIDE** section
2. Add its Angular selector to the **ANGULAR COMPONENTS OUTSIDE** or **INSIDE** section

---

## Key files

| File | Purpose |
|---|---|
| `packages/ng/<comp>/public-api.ts` | Entry point exports for the component |
| `packages/ng/<comp>/ng-package.json` | Marks folder as secondary entry point |
| `packages/scss/src/commons/utils/highlight-prisme.scss` | Component selector registry for highlight overlay |
| `stories/qa/<comp>/<comp>.stories.ts` | QA story component + imports |
| `stories/qa/<comp>/<comp>.stories.html` | HTML vs Angular comparison table |
| `contributing.md` | Naming, architecture, and DX guidelines |
