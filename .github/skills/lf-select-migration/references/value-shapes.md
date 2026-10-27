# Value shapes: ids vs objects

Legacy wrappers hold ids and resolve names inside the picker; core-select directives hold the option
objects and compare them with `optionComparer` (`a.id === b.id`). The consumer of the control (store,
form payload, query params) was written for the old shape. Decide per select, before the template.

## Case A: keep ids, render names

When a legacy store or an API filter consumes `number[]` and you do not want to touch it (filter
banners, workflow conditions). The select lists ids and a `*luOption` template resolves the name:

```html
<lu-multi-select #select clearable [formControl]="compensationTypeCtrl"
  [options]="availableCompensationTypes | luApplyFn: idsMatching : clue()"
  (clueChange)="clue.set($event)">
  <ng-container *luOption="let id; select: select">{{ availableCompensationTypes | luApplyFn: nameOf : id }}</ng-container>
</lu-multi-select>
```

```ts
readonly idsMatching = (items: { id: number; name: string }[], clue: string) =>
  items.filter((item) => searchMatch(item.name, clue)).map((item) => item.id);
readonly nameOf = (items: { id: number; name: string }[], id: number) => items.find((item) => item.id === id)?.name ?? '';
```

Search must be re-wired by hand here (`clueChange` + local filter): the directive-less select does
not search for you.

## Case B: objects in the control, ids at the boundary

When a DS directive owns the options (`establishments`, `departments`, `users`): the control holds
objects, the payload builder maps to ids once (`establishments.map((e) => e.id)`), and hydration
goes the other way (store ids → objects looked up in the loaded list, `{ id } as T` as fallback).

```ts
this.store.departmentIds$.subscribe((ids) => {
  const departments = ids.map((id) => this.departments?.find((d) => d.id === id) ?? ({ id } as Department));
  this.departmentCtrl.setValue(departments);
});
this.departmentCtrl.valueChanges.subscribe((departments) => this.store.setDepartments(departments.map((d) => d.id)));
```

### The store ↔ control loop

A legacy `BehaviorSubject` store with a reference-based `distinctUntilChanged` (`safeSelect`) does
not dedupe a freshly built array. Objects in the control → `map(id)` builds a new array → store
emits → control `setValue` → `valueChanges` → new array → … until "Maximum call stack size
exceeded" on every page load. Symptoms are invisible on screen once the exception unwinds; the
payload is even correct. Guard the write-back:

```ts
this.departmentCtrl.valueChanges.subscribe((departments) => {
  const departmentIds = departments.map((d) => d.id);
  if (!sameIds(departmentIds, this.store.value.departmentIds)) this.store.setDepartments(departmentIds);
});
function sameIds(ids: number[], stored: number[] = []) {
  return ids.length === stored.length && ids.every((id, i) => id === stored[i]);
}
```

Check every screen that mounts the component (v1 and v2 tiers, the list page and its import page).

## Case C: select-all on top

`withSelectAll` changes the control type to `LuMultiSelection<T>` (`{mode:'none'} | {mode:'all'} |
{mode:'include', values} | {mode:'exclude', values}`). The back still wants explicit ids: resolve
with `selectionToOptions(selection, allOptions, keyFn)` at the boundary, and hydrate the other way
with `{ mode: 'include', values }` (or `{ mode: 'all' }` when the ids cover the whole list, so the
header checkbox reads checked). The directive providing the options must expose them (`readonly
options = this.#options.asReadonly()`) for the resolution; read it through an optional
`viewChild()` and `?.options() ?? []` (a `viewChild.required` read in an effect before first render
throws NG0951).

For a form-based screen (query params, report filters), a pure pipe or a small bridge maps the
string/ids form value to a `LuMultiSelection` and back, so the form keeps its historical shape.

## Case D: paginated API + select-all

A paginated `ALuCoreSelectApiDirective` cannot enumerate "all". Write a per-screen directive that
`fetchAllPages` the list (`limit: 200`, `'fields.root': ['next']`), filters the clue locally, exposes
`options` and `totalCount$`, and pipes its `filters` input through `switchMap` so a slower unfiltered
request cannot land after the scoped one:

```ts
readonly options = toSignal(toObservable(this.filters).pipe(switchMap((f) => this.#fetch(f ?? {}))), { initialValue: [] });
```

## The proof

Before/after payload for a non-trivial selection (several ids, one exclusion, the empty case), on
`main` and on the branch. Same request, or the migration is not done. See verification.md.
