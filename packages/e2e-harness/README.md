# @lucca-front/e2e-harness

Playwright harnesses for Lucca Front components.

A harness wraps one component instance and exposes what a test actually means — `selectOption`,
`selectedLabel`, `isDisabled` — instead of the markup it happens to be made of today. Products stop
writing CSS selectors against our internals, and we stop breaking their tests whenever a class name
or a DOM structure changes.

## Install

```bash
npm install --save-dev @lucca-front/e2e-harness
```

`@playwright/test` is a peer dependency. Pin the harness on the same major as `@lucca-front/ng`:
the versions are released together and a harness only knows the components of its own version.

## Use

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

Every harness is found the same three ways:

- `byLabel(scope, label)` — through the label of the form field wrapping the component;
- `byTestId(scope, testId)` — through a `data-testid` carried by the component element itself;
- `from(locator)` — around a locator you built yourself.

`scope` is a `Page` to search the whole document, or a `Locator` to search inside a dialog, a form
section or a table row.

`harness.locator` is the escape hatch: a plain Playwright locator on the component root, for what
the harness does not cover yet. Anything expressed through it is coupled to our DOM again, so ask
for a harness method rather than settling there.

## Available harnesses

| Harness                 | Component          | Entrypoint                               |
| ----------------------- | ------------------ | ---------------------------------------- |
| `LuMultiSelectHarness`  | `lu-multi-select`  | `@lucca-front/e2e-harness/multi-select`  |
| `LuSimpleSelectHarness` | `lu-simple-select` | `@lucca-front/e2e-harness/simple-select` |

A multi select holds several values at once, so it reads them as a list and toggles them one by
one — the panel stays open, as it does for a user picking values in a row:

```ts
const legumes = LuMultiSelectHarness.byLabel(page, 'Légumes');

await legumes.selectOption('Carotte');
await legumes.selectOption('Betterave');
await legumes.deselectOption('Carotte');
await legumes.removeValue('Betterave'); // through the chip's own button, no panel needed

await expect.poll(() => legumes.selectedLabels()).toEqual([]);
```

`selectOption` and `deselectOption` state where the value should end up and do nothing when it is
already there; `toggleOption` flips it whichever state it is in. To set the whole value at once,
whatever the select already holds:

```ts
await legumes.setValue(['Carotte', 'Betterave']);
await legumes.setValue([]); // empties it
```

`setValue` reads what is held off the panel, not off the chips, so it is right on a select given a
`maxValuesShown` that displays only part of its value. The resulting order is the select's own: an
option already held keeps its place.

### Rows that are not options

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

### Tree selects

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
