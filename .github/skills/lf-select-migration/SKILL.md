---
name: lf-select-migration
description: >
  Migrate a Lucca Front Angular app off the deprecated select family (`lu-select`, `lu-option-picker`,
  `lu-api-select`, `lu-user-select`, `lu-department-select`, `lu-establishment-select`, the
  `@lucca-front/ng/select|option|api|user|department|establishment` imports) to `lu-simple-select` /
  `lu-multi-select` and their core-select directives, without changing what the back receives. Use it
  whenever a repo still imports those packages, when a Lucca Front bump makes the deprecated selects
  break, when someone says "migrer les selects", "lu-select déprécié", "core-select", "withSelectAll",
  or when a PR review flags a deprecated select. It covers inventory, the schematic and what it
  rejects, the value-shape trap (ids vs objects), the features the old pickers had and the new ones
  lose by default, the payload-diff proof, and the e2e locators that break.
---

# Migrating the deprecated Lucca Front selects

The mechanical part (`lu-select` → `lu-simple-select`) is the easy part and Lucca Front ships a
schematic for it. What this skill carries is everything around it, learned on a 66-instance
migration (Pagga.Remuneration, LF 21.4 → 22.0.4, Sept 2026): how to cut the work, what the schematic
refuses, the one trap that silently corrupts data (ids vs objects), the features the old pickers had
that the new selects drop unless you ask, and the proof that keeps a regression from shipping green.

Read the whole SKILL.md once, then open the reference that matches the step you are on.

## 0. Ground rules

- **The contract is "the back receives the same request."** A select migration changes the shape of
  the control value (see step 3); the only acceptable proof that nothing changed is a captured network
  payload before and after, not a screen that looks right.
- **Rewire before you rewrite.** Most target directives already exist in the repo or in Lucca Front
  (`users`, `establishments`, `departments`, `apiV3`/`apiV4`, `occupationCategories`, `jobs`…).
  Grep for them first; a new directive is the last resort and copies an existing one.
- **Design-system docs, never memory.** Before writing a template, load the Lucca Front skill matching
  the installed version (`lucca-front-<major>-<minor>`) and read `simple-select`, `multi-select`,
  `select-templating`, `core-select-*`. The API moved between 21 and 22 (`options`, `loading`,
  `optionComparer`, `optionKey` became signals; `totalCount$` became optional in 22.0.4).
- Ship in several PRs on a trunk-based repo; one branch per cluster, each independently reviewable.

## 1. Inventory and cut

Run `node scripts/inventory.mjs <front-src-dir>` (default `src/app`); it prints the deprecated
imports per file, the deprecated elements per template, the home-made wrappers, and byte-identical
duplicates (legacy tiers often carry a copied page or banner: migrate one, copy the diff to the
other).

Cut into three clusters, in this order, one PR each:

| PR | Scope | How |
|---|---|---|
| 1 | Static `lu-select [options]` in templates | Schematic, then the rejects by hand |
| 2 | Home-made API wrappers (`prem-*-select` around `lu-api-select`, `lu-establishment-select`, select-all wrappers) | Delete the wrapper, rewire consumers on core-select directives; watch the value shape |
| 3 | Period selects with load-more, impersonation / user searchers with grouped pickers | Fully manual: `panelHeaderTpl`, grouping, pinned "me" option |

Finish with an ESLint `no-restricted-imports` on the six deprecated packages so they cannot come
back (one rule in the flat config, no plugin).

## 2. The schematic and its rejects

```
cd front && npx ng g @lucca-front/ng:lu-select --dryRun --verbose > <scratch>/lu-select-dryrun.log 2>&1
```

Read the log. The schematic only rewrites a `lu-select` whose attributes are all in its whitelist
(`class`, `ngModel*`, `formControl*`, `disabled`, `required`, `placeholder`, `filters`, `multiple`,
`api`, `orderBy`, `fields`, `luTooltip`, `name`, `#ref`, `data-*`, `attr.*`). Anything else is left
in place with an HTML comment `<!-- [lu-select migration] REJECTED: … -->`. On a real app expect it
to handle the simple static selects and reject the rest: `lu-option-picker-advanced` content,
`lu-option-select-all`, `lu-department-select` (tree), conditional `[multiple]`, custom
`ALuEstablishmentService`. See `references/schematic-rejects.md` for the manual replacement of each.

Then `npx ng g @lucca-front/ng:deprecated-resolver` to pick up deprecated modules and types the
select migration exposed, and delete the `*luDisplayer` templates the schematic generates when the
default displayer (`option.name`) already does the job.

## 3. The value-shape trap

Legacy wrappers usually hold **ids** (`number[]`) and resolve names in the picker. Core-select
directives hold **objects** (`Establishment[]`, `Department[]`, `User[]`) compared by `optionComparer`
on `id`. Every consumer of a migrated control sits on one side of that line, and the store or form
payload behind it was written for the old side.

For each migrated select, before touching the template:

1. Find what consumes the control value (store, form payload builder, query params).
2. Decide the shape: keep ids when a store or an API filter expects ids and you do not want to
   touch it (render names with `*luOption` over an ids list), or move to objects when the consumer is
   a form that maps to ids at submit time.
3. Capture the request the screen sends on `main` for a non-trivial selection, then again on the
   branch. Same query string / body, or the migration is not done.

`references/value-shapes.md` has the pattern for each case, including the hydration direction
(store ids → control objects) and the **store ↔ control loop**: an object-valued control fed by a
legacy store whose `distinctUntilChanged` compares by reference rebuilds the ids array on every
round trip and recurses until "Maximum call stack size exceeded". Guard the write-back with an
ids-equality check, and see step 5 for why this one shipped green once.

## 4. Features the old pickers had

The new selects are leaner by default. Walk this list per migrated select and restore what the
screen had; `references/feature-checklist.md` gives the DS primitive for each:

- **Select all** (`lu-option-select-all` before): `withSelectAll` + `LuMultiSelection<T>` value
  (`none | all | include | exclude`), a `totalCount` source, and `selectionToOptions()` to resolve
  back to the explicit list the back expects. The header checkbox *clears* from a partial selection
  (DS semantic), do not fight it.
- **Search** on a custom multi displayer: the displayer must carry a `luMultiSelectDisplayerInput`
  or the clue input is gone.
- **Former employees / archived toggle** in the panel: `panelHeaderTpl` + a component that sets a
  param on the directive.
- **Placeholder**: a bare `ngModel` yields `""`, which core-select treats as a value; initialise to
  `null`.
- **Size and label**: the migrated select goes inside `lu-form-field` (`size`, `hiddenLabel`,
  `width`); legacy `label.textfield mod-*` wrappers only style the old component and freeze widths.
- **Counter displayer**: `lu-multi-select-counter-displayer` with the plural label.
- **Group select-all**: native on `lu-multi-select` grouping, delete the custom checkbox.
- **Load more / period lists**: `panelHeaderTpl` and `panelFooterTpl`; the footer only renders on
  `lu-simple-select`.
- **Pagination vs enumeration**: `withSelectAll` needs the whole list to resolve "all"; a paginated
  API directive cannot enumerate its options. Write a small fetch-all directive (`fetchAllPages`,
  `limit: 200`) for that screen, with a `switchMap` on its filters so a slow unfiltered load never
  overwrites the scoped list.

## 5. Proof, per screen

One browser session, one `run-code` script per screen, driven against the running app (dev server
redirected to a log, or a preview). The script must:

1. Capture the outgoing request of the action that consumes the value (`page.on('request')`), and
   assert the precise ids, not that "a request fired".
2. Listen to `console.error` and `pageerror` and print them in the result, filtering only known
   noise. A store ↔ control recursion passed a UI-plus-payload script as green because the
   exception unwound before the screenshot; the dev-server log had the error twenty times.
3. After the pass, `grep -c "Maximum call stack\|ERROR" <ngserve log>` before claiming green.

Screenshots before/after the select open go in the PR (`gh pr edit --attach`), one `<details>` per
screen. `references/verification.md` has the script skeleton and the payload-diff routine.

## 6. e2e and locators

The DOM of the new panel is `lu-select-option[role=presentation] > lu-listbox-option[role=option]`;
the old `.optionItem-value` hook matches nothing, the `departments` directive renders
`role=treeitem`, and `lu-form-field` makes `GetByLabel(label)` reach the select. Playwright steps
move to `GetByRole(Option|Treeitem)` with `Name`/`Exact` or a `HasTextRegex` anchored at the start.
A dev server behind a proxy renders raw i18n keys, so run e2e against a prod build served
statically. `references/e2e-locators.md`.

## 7. Bumping Lucca Front along the way

A migration often rides a minor bump. `references/lf-bump.md`: a GitHub release is not an npm
release (stable tags are staged, promotion is manual), the five `@lucca-front/*` + `@lucca/prisme`
+ `@lucca/stylelint-config-prisme` packages move in lockstep (drop their five lock entries, then
`npm install`), RCs cannot install through `^22.0.0` peers, and `override` on `totalCount$` since
22.0.4. Keep every DS workaround in one shame stylesheet with the version that removes it, and a
canary spec pinned on the current version when the workaround masks a DS bug.

## PR description

Functional one-liner (no deprecated select left, no functional change expected), then technical
attention points: what the schematic did and did not do, the value-shape decisions per screen with
the captured payloads, the features restored, DS issues opened and their workarounds, the e2e
locator changes. How-to-test is a non-regression pass on every screen that has a dropdown, listed.
