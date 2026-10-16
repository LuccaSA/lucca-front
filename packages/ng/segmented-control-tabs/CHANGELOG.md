### 22.1.0

#### Added

- `icon` input on `lu-segmented-control-tabs-panel` to display an icon before the tab label.
- `hiddenLabel` input on `lu-segmented-control-tabs-panel` for icon-only tabs: the text label stays available to screen readers and is shown as a tooltip on hover and focus. Ignored for a template label.
- Tablist can be displayed in `lu-filter-bar` through its `segmentedControlTabs` input, the panels staying in place.

#### Changed

- Icons are displayed in small size in a `small` segmented control.

### 22.0.5

#### Added

- `ariaLabel` input to give the tablist an accessible name.

#### Fixed

- `aria-controls` of each tab now references the id of its panel instead of its `value`.

### 21.3.0

#### Added

- `Home` and `End` keyboard navigation between the tabs.

### 21.0.0

#### Added

- `lu-segmented-control-tabs` component with the `small` and `vertical` inputs, and the `LU_SEGMENTEDCONTROLTABS_INSTANCE` injection token.
- `lu-segmented-control-tabs-panel` component with the `label`, `value` and `active` inputs.
