### 22.1.0

#### Added

- `resultsCount` input to display the number of results after the filters, announced to screen readers when it changes (`null` hides it, for instance while results are loading).
- `segmentedControlTabs` input to display the tabs of a `lu-segmented-control-tabs` at the end of the bar, its panels staying where they are declared. The `luFilterPillAddonAfter` actions are displayed after the tabs, separated by a divider.

#### Changed

- Optional filters are now picked from a searchable multi-select, and grouped according to the `grouping` input of their `lu-filter-pill`.

### 22.0.6

#### Fixed

- Filter bar buttons no longer wrap on two lines in touch mode.
- Divider height is reduced.

### 22.0.0

#### Added

- `lu-filter-view-selector` component to pick a saved filter view, and ask for its renaming or deletion (`views`, `selectedView`, `viewLabel`, `optionComparer` and `optionKey` inputs, `renameView` and `deleteView` outputs).

### 21.4.1

#### Fixed

- Alternative text of the optional filters button is now exposed to screen readers.

### 21.1.2

#### Fixed

- Checkbox styles used by the filter bar are now loaded with the component.

### 21.1.1

#### Fixed

- Background color of the scroll box inside the filter bar.

### 21.1.0

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 20.1.0

#### Changed

- The bar relies on `lu-scroll-box` to scroll its pills, with the matching shadows.

### 19.2.0

#### Added

- `lu-filter-bar` component (`filterBar`) with the `intl` input, laying out a collection of `lu-filter-pill`.
- `[luFilterPillAddonBefore]` and `[luFilterPillAddonAfter]` directives to project content before and after the pills.
