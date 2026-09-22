# Shared conventions — read fully before writing any test

You are writing tests for **lucca-front**, Lucca's Angular design system. This file defines
the stack, the patterns to copy, and the rules. The task file you received alongside this
one defines the scope. Follow both exactly.

## Repository facts

- Angular 21. All components are **standalone**, use **OnPush** change detection, and are
  increasingly **signal-based** (`input()`, `signal()`, `computed()`).
- Library code lives in `packages/ng/<entry-point>/`, each with a `public-api.ts`.
- Unit tests: **Jest** (jsdom) via `jest-preset-angular`. Config: `jest.config.json`,
  setup: `setup-jest.ts` (already loads `@testing-library/jest-dom`, `jest-axe`, and
  polyfills for ResizeObserver/IntersectionObserver/MutationObserver).
- Interaction tests in a real browser: **Storybook play functions** run by
  `@storybook/test-runner` (Playwright). Stories live in `stories/documentation/**`.
- Path alias in tests: `@lucca-front/ng/<entry>` resolves to that entry point's public API.

## Choosing the test layer

Write a **Jest spec** (`packages/ng/<entry>/**/*.spec.ts`) when the behavior is observable
in jsdom: form value changes, outputs emitted, ARIA attribute changes, DOM content changes,
keydown handling, focus moves within the component's own template.

Write a **Storybook play-function story** (`stories/documentation/**`) when the behavior
needs a real browser: overlay positioning, focus trapping across an overlay boundary,
hover-triggered behavior, scrolling, anything where jsdom's lack of layout would make the
test lie. The repo already has 141 play-function stories — always look at neighbors first.

If a behavior works in both layers, prefer Jest (faster, runs in `ci-test`).

## Jest spec pattern (copy this style)

Reference example to read before writing anything:
`packages/ng/date2/date-input/date-input.component.spec.ts`

```ts
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeFr, 'fr-FR');

@Component({
	template: `<lu-some-input [formControl]="formControl" />`,
	imports: [ReactiveFormsModule, SomeInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	formControl = new FormControl<SomeType | null>(null);
}

describe('SomeInputComponent', () => {
	// TestBed.configureTestingModule({ imports: [HostComponent], providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] })
	// fixture = TestBed.createComponent(HostComponent); fixture.detectChanges();
});
```

Rules for Jest specs:

- **Always test through a host component** binding the public API (inputs, outputs,
  `formControl`), never by poking private fields.
- **Locale**: always `registerLocaleData(localeFr, 'fr-FR')` at module top and provide
  `{ provide: LOCALE_ID, useValue: 'fr-FR' }`. This is a repo-wide convention.
- Interactions: prefer `userEvent` from `@testing-library/user-event` (already a dependency)
  for clicks and typing; for raw key handling on a specific element, dispatching a
  `KeyboardEvent('keydown', { key: '...' })` and awaiting `fixture.whenStable()` is the
  established pattern (see `packages/ng/core-select/input/select-input.component.spec.ts`).
- You may also use `render`/`screen` from `@testing-library/angular`
  (see `packages/ng/api/api.spec.ts` for that style). Either style is fine; match whichever
  the entry point already uses.
- Query the DOM by **role or data-testid**, in that order of preference. Add a
  `data-testid` to the component template only if there is truly no accessible query.
- Add exactly **one** `jest-axe` accessibility test per component (render a representative
  state, `expect(await axe(element)).toHaveNoViolations()`), not one per scenario.
- Async/animations: `fakeAsync` + `tick()` where timers are involved; otherwise
  `await fixture.whenStable()`.

## Storybook play-function pattern (copy this style)

Reference examples to read before writing anything:
`stories/documentation/forms/select/simple-select.stories.ts` and
`stories/helpers/stories.ts` / `stories/helpers/test.ts`.

- Create test variants with `createTestStory(existingStory, playFn)` from
  `stories/helpers/stories.ts` — it clones a story, appends " TEST" to its name, and
  provides `LOCALE_ID: 'fr-FR'`.
- Import `expect, screen, userEvent, within` from `'storybook/test'`.
- After every interaction that triggers Angular change detection, call
  `await waitForAngular()` from `stories/helpers/test.ts`.
- Structure keyboard coverage in a `step('Keyboard interactions', async () => { ... })`
  block inside the same play function as the mouse coverage.
- Overlay content usually renders in a CDK overlay container **outside** `canvasElement`:
  query it with the global `screen`, not `within(canvasElement)`.

## What every interactive component must cover

For each component in scope, cover both input modalities **when the component supports
them** (check the source; do not invent behavior):

**Mouse**: click to activate/open/select/toggle; click outside or on close affordances to
dismiss; click on a disabled control does nothing (value unchanged, no output emitted).

**Keyboard**: Tab reaches the control and focus is visible on the right element; the
documented keys work (typically Enter/Space to activate, Escape to dismiss, arrow keys to
navigate options, Home/End where lists are involved); focus goes somewhere sensible after
close (usually back to the trigger); a disabled control is skipped or inert.

**Forms contract** (only for ControlValueAccessor components): user interaction updates the
bound `FormControl` value (assert the actual value, including edge cases like clearing to
`null`); `setValue` from code updates the DOM; `disable()` prevents interaction and DOM
reflects it; the control reports `touched` after blur; `registerOnChange` is not fired by
programmatic `writeValue`.

## Hard rules — tests that will be rejected

- No "component exists" / "should create" tests. No asserting a CSS class is present
  unless the class change *is* the observable behavior of an interaction.
- No snapshot tests.
- No testing of private members, internal signals, or implementation details. Assert only:
  FormControl values, emitted outputs, DOM/ARIA state, focus location, rendered text.
- No duplicating existing coverage. **Before writing, list the existing `*.spec.ts` files
  in the entry point and any existing `play` functions in its stories, read them, and only
  add what's missing.** Extending an existing spec file is preferred over creating a
  parallel one.
- Every test must fail if the behavior it describes breaks. If you cannot articulate the
  user-visible failure a test guards against, do not write it.
- Do not add new dependencies. Do not modify component source except to add a
  `data-testid` or fix an *actual bug* the test exposes — and if you find a bug, stop and
  report it instead of silently changing behavior.

## Definition of done (run these, report output)

```bash
# fast loop while writing (scope to the entry point):
npx jest packages/ng/<entry-point> --isolatedModules=true

# full unit suite must stay green:
npm run ci-test

# only if you added/changed stories — needs a served Storybook:
npm run build-storybook
npx concurrently -k -s first "npx http-server storybook-static --port 6006 --silent" "npx wait-on tcp:127.0.0.1:6006 && npm run test-storybook"
```

Also run `npm run lint` if you touched any non-spec file.
