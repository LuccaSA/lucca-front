### 21.3.0

#### Added

- `lu-segmented-control-tabs` now supports `Home` and `End` keys to move focus and selection to the first and last tab.

### 21.2.2

#### Added

- `palette` support: selected, hover and active states now read `--palettes-*` CSS variables (falling back to the product palette) so the component can inherit a surrounding palette.

### 20.3.0

#### Added

- `lu-segmented-control` Angular wrapper (`SegmentedControlComponent`), a `ControlValueAccessor` with `small` and `vertical` boolean inputs.
- `lu-segmented-control-filter` (`SegmentedControlFilterComponent`) with `value` (required), `label` and `disabled` inputs.
- `lu-segmented-control-tabs` (`SegmentedControlTabsComponent`) with `small` and `vertical` inputs, an `active` two-way model, and arrow-key navigation.
- `lu-segmented-control-tabs-panel` (`SegmentedControlTabsPanelComponent`) with `value` (required) and `label` inputs.

### 20.1.2

#### Added

- `disabled` visual state for segmented control items.

#### Fixed

- Selected item `numericBadge` value no longer disappears when the item is not loading (loading styles now only apply to `is-loading` items).

### 20.1.1

#### Fixed

- `numericBadge` loading state color specificity inside selected items.

### 19.2.0

#### Changed

- Hover and active states restyled to use a raised shadow instead of a background pseudo-element; added `wrap` and `whiteSpace` CSS variables.

### 18.2.3

#### Fixed

- Hover and focus background rendering of segmented control items.

### 18.2.1

#### Added

- `segmentedControl` HTML/CSS component (`.segmentedControl`), with semantic and vertical variants.
