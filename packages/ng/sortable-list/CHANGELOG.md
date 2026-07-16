### 21.3.1

#### Changed

- `label` the `lu-sortable-list-item` input now accepts a `PortalContent` instead of a plain `string`, allowing rich templated content.

### 21.0.0

#### Added

- `lu-sortable-list` new Angular wrapper component exposing a `small` input and projecting `lu-sortable-list-item` children.
- `lu-sortable-list-item` new Angular wrapper component with `label` (required), `helperMessage`, `clickable`, `unclearable` and `small` inputs and a `delete` output.
- `drag` a `lu-sortable-list-item` input that displays a drag handle and enables drag-and-drop reordering.
