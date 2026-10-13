# @lucca-front/e2e-harness

Playwright harnesses for Lucca Front components.

A harness wraps one component instance and exposes what a test actually means — `selectOption`,
`selectedLabel`, `isDisabled` — instead of the markup it happens to be made of today. Products stop
writing CSS selectors against our internals, and we stop breaking their tests whenever a class name
or a DOM structure changes.

```ts
// Before: coupled to our DOM, broken by any refactor of the select.
await page.click('lu-simple-select .simpleSelect-field');
await page.click('.cdk-overlay-pane [role="option"]:has-text("Lucca Paris")');
await expect(page.locator('.simpleSelect-field-value')).toHaveText('Lucca Paris');

// After: coupled to the behaviour, which is what the test was about.
const establishment = LuSimpleSelectHarness.byLabel(page, 'Établissement');
await establishment.selectOption('Lucca Paris');
await expect.poll(() => establishment.selectedLabel()).toBe('Lucca Paris');
```

This is an MVP: it covers the two selects and nothing else yet. [What is not covered](#what-the-mvp-does-not-cover)
says what is missing and how to ask for it.

---

## Install

```bash
npm install --save-dev @lucca-front/e2e-harness
```

`@playwright/test` is a peer dependency, and is the only one. Nothing of `@lucca-front/ng` is
imported at runtime: a harness drives a rendered page, so it works the same against a dev server,
a preview deployment or a production build.

The package ships both ESM and CommonJS, with types for each, so either Playwright setup works
without a transpilation step of its own.

It declares its entrypoints through `exports`, which TypeScript only reads from `node16`,
`nodenext` or `bundler`. On the legacy `"moduleResolution": "node"` the imports resolve at runtime
but not at type-check time, and `tsc` reports `Cannot find module '@lucca-front/e2e-harness'`:

```jsonc
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext", // or "bundler"
  },
}
```

### Which version

Pin the harness on the same major as `@lucca-front/ng`: the versions are released together and a
harness only knows the components of its own version.

```jsonc
{
  "devDependencies": {
    "@lucca-front/e2e-harness": "~22.1.0", // same major as @lucca-front/ng
    "@lucca-front/ng": "~22.1.0",
  },
}
```

Upgrading Lucca Front without upgrading the harness is the case that breaks: the components move,
the harness does not follow, and the tests fail on the markup the harness still expects.

## A first test

```ts
import { expect, test } from '@playwright/test';
import { LuSimpleSelectHarness } from '@lucca-front/e2e-harness/simple-select';

test('picks an establishment', async ({ page }) => {
  await page.goto('/employees/new');

  const establishment = LuSimpleSelectHarness.byLabel(page, 'Établissement');

  await establishment.search('Par');
  await establishment.selectOption('Lucca Paris');

  await expect.poll(() => establishment.selectedLabel()).toBe('Lucca Paris');
});
```

Each harness has its own entrypoint, so a test only pulls in what it drives:

```ts
import { LuMultiSelectHarness } from '@lucca-front/e2e-harness/multi-select';
import { LuSimpleSelectHarness } from '@lucca-front/e2e-harness/simple-select';

// Or everything at once, including the shared types:
import { LuHarnessScope, LuMultiSelectHarness, LuSimpleSelectHarness } from '@lucca-front/e2e-harness';
```

## Finding a component

Every harness is found the same three ways:

| Factory                   | Anchors on                                              |
| ------------------------- | ------------------------------------------------------- |
| `byLabel(scope, label)`   | the label of the form field wrapping the component      |
| `byTestId(scope, testId)` | a `data-testid` carried by the component element itself |
| `from(locator)`           | a locator you built yourself                            |

`scope` is a `Page` to search the whole document, or a `Locator` to search inside a dialog, a form
section or a table row:

```ts
const dialog = page.getByRole('dialog');
const country = LuSimpleSelectHarness.byLabel(dialog, 'Pays');

const row = page.getByRole('row').filter({ hasText: 'Lucca Paris' });
const owner = LuSimpleSelectHarness.byTestId(row, 'owner-select');
```

Labels are matched the Playwright way — case-insensitive, whitespace-trimmed, as a substring —
because several Lucca selects fold their current value into the accessible name of their control.
A `RegExp` is accepted anywhere a label is, for the cases where a substring matches too much.

`byTestId` wants the `data-testid` on the component element itself (`<lu-simple-select data-testid="…">`);
it fails loudly when the attribute sits on a wrapper, which is what `from()` is for.

## Harness reference

### Both selects

| Member                     | What it does                                                    |
| -------------------------- | --------------------------------------------------------------- |
| `open()` / `close()`       | drives the panel, doing nothing when already in that state      |
| `isOpen()`                 | whether the panel is open                                       |
| `isDisabled()`             | whether the select refuses interaction                          |
| `isSearchable()`           | whether typing in the select filters its options                |
| `search(clue)`             | opens the panel and types a clue                                |
| `clear()` / `canClear()`   | empties it through its clear button, and whether one is offered |
| `panel()`                  | the panel harness, see below                                    |
| `highlightedOptionLabel()` | the option the keyboard is on — what `Enter` would pick         |
| `addOption(clue?)`         | makes an option out of the search and takes it                  |
| `canAddOption()`           | whether the panel offers that row                               |
| `locator`                  | the escape hatch, see below                                     |

### `LuSimpleSelectHarness` — `lu-simple-select`

One value, picked out of a panel that closes on selection.

| Member                | What it does                                     |
| --------------------- | ------------------------------------------------ |
| `selectOption(label)` | picks an option, waiting for the panel to close  |
| `selectedLabel()`     | the text of the current value, `null` when empty |
| `hasValue()`          | whether the select holds a value                 |

### `LuMultiSelectHarness` — `lu-multi-select`

Several values at once, read as a list and toggled one by one — the panel stays open, as it does
for a user picking values in a row.

| Member                  | What it does                                                       |
| ----------------------- | ------------------------------------------------------------------ |
| `selectOption(label)`   | adds a value, doing nothing when it is already held                |
| `deselectOption(label)` | drops a value through the panel, doing nothing when it is not held |
| `toggleOption(label)`   | flips a value, whichever state it is in                            |
| `setValue(labels)`      | sets the value to exactly these options, in one call               |
| `removeValue(label)`    | drops a value through its chip's own button, no panel needed       |
| `selectedLabels()`      | the text of every displayed value, in display order                |
| `hiddenValuesCount()`   | how many values are held beyond the ones displayed                 |
| `hasValue()`            | whether the select holds at least one value                        |
| `selectAll()`           | takes every option, whichever state the selection starts in        |
| `selectAllState()`      | `'none' \| 'some' \| 'all'`, or `null` without a select-all row    |

```ts
const legumes = LuMultiSelectHarness.byLabel(page, 'Légumes');

await legumes.selectOption('Carotte');
await legumes.selectOption('Betterave');
await legumes.deselectOption('Carotte');
await legumes.removeValue('Betterave');

await expect.poll(() => legumes.selectedLabels()).toEqual([]);
```

`setValue` drops whatever the select holds and the value does not ask for, then takes what is
missing. It reads what is held off the panel, not off the chips, so it is right on a select given a
`maxValuesShown` that displays only part of its value. The resulting order is the select's own: an
option already held keeps its place.

```ts
await legumes.setValue(['Carotte', 'Betterave']);
await legumes.setValue([]); // empties it
```

### `LuSelectPanelHarness` — `select.panel()`

Only meaningful while that select's panel is open: the panel lives in a CDK overlay shared by the
whole page, and opening a select closes any other one, so there is at most one at a time.

| Member                              | What it does                                                 |
| ----------------------------------- | ------------------------------------------------------------ |
| `option(label)`                     | one option, by its own text                                  |
| `options()`                         | every option currently rendered, in display order            |
| `optionLabels()`                    | the text of each of them                                     |
| `rootOptions()`                     | a tree panel's top level, each node holding its own children |
| `isLoading()`                       | whether the panel is showing skeletons                       |
| `isEmpty()`                         | whether the panel is showing its empty state                 |
| `isTree()`                          | whether the panel nests its options                          |
| `statusMessage()`                   | the message shown in place of the options, `null` otherwise  |
| `scrollToEnd()`                     | asks a paginated select for its next page                    |
| `waitForOpen()` / `waitForClosed()` | waits on the panel, which `open()`/`close()` already do      |

### `LuSelectOptionHarness` — `panel.option(label)`

| Member                 | What it does                                           |
| ---------------------- | ------------------------------------------------------ |
| `label()`              | the option's own text, without its children's          |
| `isSelected()`         | whether it is part of the current value                |
| `isDisabled()`         | whether it refuses selection                           |
| `isIndeterminate()`    | whether it is partially selected                       |
| `hasChildren()`        | whether it is a tree node holding other options        |
| `children()`           | the options nested one level under it                  |
| `click()`              | toggles it — prefer the select's own `selectOption`    |
| `selectOnlyParent()`   | selects this tree node alone, leaving its children out |
| `selectOnlyChildren()` | selects its subtree but not the node itself            |
| `waitFor()`            | waits for it to be rendered, for a paginated panel     |

Every state is read from the ARIA contract of the option, which is also what a screen reader goes
through: a harness that stops seeing an option's state is usually reporting a real accessibility
regression.

## Rows that are not options

A panel can offer two rows that look like options and are not: the one that makes an option out of
the current search, and the one that takes every option at once. They are actions, so they are
driven from the select in a single call and left out of `options()` and `optionLabels()`:

```ts
await select.addOption('Rutabaga'); // searches, then takes the row the panel offers
await select.canAddOption();

await legumes.selectAll(); // lands on every option, whatever the selection started as
await legumes.selectAllState(); // 'none' | 'some' | 'all', or null without a select-all row
```

`addOption` only reports the clue to the select: what the new option becomes is the consumer's
`addOption` handler, so wait on the value rather than assuming it is there.

## Tree selects

`treeSelect` is a directive, not a component: there is no `lu-tree-select` to wrap, and a tree is
driven through the simple or multi select harness it is applied to. What changes is the panel,
which takes the `tree` role and nests its options:

```ts
const panel = legumes.panel();
await legumes.open();

expect(await panel.isTree()).toBe(true);
expect(await panel.option('Carotte').hasChildren()).toBe(true);

// Picks the node and its whole subtree. The two shortcuts the panel offers on a node:
await panel.option('Carotte').selectOnlyParent();
await panel.option('Carotte').selectOnlyChildren();
```

A node renders its children inside its own element, so an option is always matched, read and
clicked on its own row — `option('Carotte')` never resolves to one of its children, and
`optionLabels()` lists each node's own label.

## Waiting, and what to assert on

A harness method returns a value, not a locator, so Playwright's auto-retrying `expect(locator)`
does not apply to it. Read a state through `expect.poll` whenever the component may not have caught
up yet — after a selection, after a search, after anything the application answers asynchronously:

```ts
await expect.poll(() => select.selectedLabel()).toBe('Carotte');
```

A plain `expect(await select.isOpen())` is right only for a state the previous call already waited
on: `open()`, `close()` and `selectOption()` all return once the panel has settled.

Filtering is the application's job — it happens in whatever `clueChange` is wired to — so
`search()` returns as soon as the clue is typed. Wait on the resulting options rather than assuming
they are already there.

## The escape hatch

`harness.locator` is a plain Playwright locator on the component root, for what the harness does
not cover yet — a screenshot, a bounding box, an assertion on a detail of the markup:

```ts
await expect(select.locator).toHaveScreenshot();
```

Anything expressed through it is coupled to our DOM again, and nothing protects it from our next
refactor. Prefer asking for a harness method.

## What the MVP does not cover

Today the package ships `LuSimpleSelectHarness` and `LuMultiSelectHarness`. Everything else — date
inputs, dialogs, filter pills, tables, popovers — still needs your own selectors.

Known gaps on the selects themselves: keyboard navigation is readable (`highlightedOptionLabel`)
but not driveable, grouped options are not modelled, and the API-backed directives
(`LuCoreSelectUsersDirective` and friends) are driven like any other select, with no knowledge of
the request behind them.

Which component comes next is driven by what products ask for: open an issue on
[lucca-front](https://github.com/LuccaSA/lucca-front/issues) describing the test you are trying to
write, not the markup you are trying to reach. A harness is designed from the intentions a test
needs, so the test you cannot write today is the useful part of the request.

---

# Contributing

Everything below is about working on the harnesses themselves, inside the `lucca-front` repository.

## How these are kept honest

A harness has to know something about our markup — a few ARIA attributes, and the handful of class
names for the parts that expose nothing else. That knowledge is what the tests in `tests/` protect:
they drive the harnesses against the real components, rendered by the Storybook of the very same
commit. Change a class name, drop a role, move the value out of its element, and the harness tests
fail here — before a product's test suite does.

Run them against a Storybook serving the stories:

```bash
npm run test:e2e-harness
```

On its own that builds the static Storybook and serves it, which takes a couple of minutes the
first time. The static build is deliberate: a dev Storybook compiles each story on first request
and re-transforms its module graph for every browser context, and the workers end up waiting on
stories that never render. It is also exactly what CI serves.

While writing a harness, keep a server of your own running and the suite will reuse it — rebuild it
whenever you touch a component:

```bash
npm run build-storybook
npx http-server storybook-static --port 6006 --silent   # terminal 1
npm run test:e2e-harness                                 # terminal 2
```

```bash
npm run test:e2e-harness -- --ui                    # watch each step, time-travel
npm run test:e2e-harness -- --headed --workers=1    # visible browser
npm run test:e2e-harness -- -g "clears the value"   # a single test
```

`STORYBOOK_URL` points the suite somewhere else. `npm start` works too for a one-off test, but only
with `--workers=1`: the dev server does not survive the full parallelism.

If every test fails at once on a hidden `#storybook-root`, the Storybook being reused is not
serving stories — check what actually holds port 6006.

## Showing the harnesses at work

`npm run demo:e2e-harness` runs the whole suite with a trace recorded for every test. The report is
written but never opened, so open it yourself once the run is over:

```bash
npm run demo:e2e-harness
npx playwright show-report test-results/e2e-harness-report
```

Each test opens on its timeline: the harness calls on one side, a DOM snapshot of the select at
every step on the other, with the panel, the options and the chips as they were. That is the
shortest way to show what a harness does without reading its source — and the quickest way to see
why one broke.

## Adding a harness

1. Read the component's template and find what it exposes to assistive technologies. Roles,
   `aria-*` state and accessible names are the anchors to use: they are a contract we already owe
   our users, so they move far less than class names, and a harness that breaks on them is usually
   reporting a real accessibility regression.
2. Fall back to a class name only for the parts with no accessible hook at all, and say so in a
   comment. Never anchor on a translated string — the same component is rendered in a dozen locales.
3. Expose intentions, not DOM access. `selectedLabels()`, not `chips()`.
4. Cover every method with a test against an existing documentation story. If a method cannot be
   tested, it does not ship.
5. Give the harness its own entrypoint in `package.json`'s `exports`, next to the others, so a test
   only pulls in what it drives.
6. Document it on the Storybook page (`stories/documentation/integration/testing/e2e-harness.mdx`)
   and in the reference above — that page is what products read.
