# e2e locators after the migration (Playwright, .NET or TS)

The panel DOM of `lu-simple-select` / `lu-multi-select` under LF 22:

```
lu-select-panel-layout
  lu-listbox[role=listbox]
    lu-select-option[role=presentation]
      lu-listbox-option.listboxOption[role=option]
        .listboxOption-content > .listboxOption-content-value
```

| Old locator | Why it breaks | New locator |
|---|---|---|
| `lu-select-option .optionItem-value` | `optionItem-value` is no longer rendered (CSS only) | `GetByRole(AriaRole.Option, new() { Name = "Cadre", Exact = true })`, or `GetByRole(AriaRole.Option).Filter(new() { HasTextRegex = new Regex(@"^\s*Doe John\s*-") })` to anchor the start of the label |
| `lu-select-option` + `GetByText(x, Exact)` | still works | keep |
| `lu-option` / `.lu-option` | element gone | `GetByRole(AriaRole.Option)` |
| department tree option | `departments` renders `role=treeitem` | `GetByRole(AriaRole.Treeitem).GetByText(name, new() { Exact = true })` |
| clicking the select by CSS (`.textfield` wrapper) | wrapper gone, select in `lu-form-field` | `GetByLabel("Établissement")` reaches the select; or `lu-multi-select[departments]` |
| `prem-user-api-paged-searcher` / custom searcher inputs | deleted | type in the select's combobox: `GetByRole(AriaRole.Combobox)` inside the panel, or `locator("lu-multi-select input")` |
| a select on a page the user lands on conditionally (impersonation) | the same user may land on a user-selection page instead of the form | widen the locator to both selectors (`prem-impersonation-simple-select lu-simple-select, prem-impersonation-select lu-simple-select`) |
| option chosen by full name in a multi-word label | option text now includes suffixes (`- 12 demandes`) | `Split(' ').Aggregate(GetByRole(Option), (o, part) => o.Filter(new() { HasText = part }))` |

Two facts about the environment:

- A dev server behind `lucca apps proxy` renders raw `@lucca/translate` keys, so every text locator
  fails in bulk. Run e2e against a prod build served statically (`npx serve -s dist/browser`) with a
  marker meta tag so you can prove which build the run hit.
- These breaks come from the LF bump itself, not from the select migration: a step red on the
  branch is red on `main` too once `main` carries the bump. Say it in the PR so a red QA run is not
  attributed to the migration.
