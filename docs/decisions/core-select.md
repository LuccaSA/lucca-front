# core-select

## 2026-11-20 — “Parent only” and “children only” tree actions are not keyboard accessible

Status: deferred

**Context** — In a multiple select displaying a tree, a parent option shows two actions on hover: select the parent only, or its children only. The option is reached from the field through `aria-activedescendant`: keyboard focus stays in the field and never enters the option, so these actions can neither be reached with the keyboard nor announced by screen readers.

**Decision** — We keep them as a pointer shortcut until we have an accessible way to offer them, and will make them accessible as soon as we do.

**Consequences** — In the meantime, keyboard and screen reader users get the same result by selecting or deselecting the options one by one: the shortcut only saves time for pointer users.

**Revisit if** — A pattern for actions on a listbox option is chosen (a grid or treegrid, for instance), or users report the shortcut as missing.

## 2026-11-20 — “Include…” rows are listbox options, with `aria-selected`

Status: accepted

**Context** — Some selects show, at the top of the list, a row that changes the list instead of adding a value to it: “Include former employees”, “Include archived legal units”. It is checked like an option and browsed with the keyboard along with the others, from the field, through `aria-activedescendant`. The targeted element must therefore be an `option` of the listbox: otherwise screen readers announce nothing when the row is active.

**Decision** — The row is a `lu-listbox-option` with the `checkbox` input, which shows the checkbox even outside a multiple listbox. Its state goes through `aria-selected`, as for the other options. We follow what VoiceOver announces: a state it announces is very likely to be announced by other screen readers too.

**Consequences** — The row is announced as an option: “Include former employees, selected, (1 of 23)”. It counts among the options, and in a single-select list it can be selected at the same time as the chosen value. As for any option, the unselected state is not announced.

**Rejected options** — Two other semantics:

- a checkbox (`role="checkbox"`) outside the listbox: more accurate, but focus stays in the field, and the whole focus management of the panel would have to be reworked;
- `aria-checked` on the option: allowed by ARIA, but VoiceOver does not announce it on an option, neither checked nor unchecked.

**Sources** — VoiceOver test (macOS, Safari) on a combobox driven by `aria-activedescendant`: on an option, `aria-checked` is never announced; `aria-selected="true"` is announced “selected”, in a single-select list as in a multiple one; `aria-selected="false"` is never announced.
