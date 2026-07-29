### 21.3.1

#### Fixed

- `overlay`: keep connected overlay panels out of the `pushPanel` zone so the panel positions correctly.

### 21.3.0

#### Added

- `impersonation`: new boolean input that displays the select in impersonation mode (keeps the search icon and hides the clear/chevron affordances).

#### Fixed

- `highlight`: fix option highlighting when mixing mouse hover and keyboard navigation.
- `accessibility`: expose the selected value through `aria-labelledby` so assistive technologies announce it correctly.

### 21.2.2

#### Fixed

- `loading`: fix the panel loading state display.

### 21.1.3

#### Fixed

- `presentation`: display an empty value the same way as other inputs in presentation mode.

### 21.1.0

#### Added

- `presentation`: support the form-field presentation display mode, rendering the current value through `*luPresentationDisplay`.
- `intl`: new input to override the component's translations.

### 21.0.3

#### Fixed

- `panel`: keep an 8px margin from the viewport edges so the panel no longer overflows the screen.

### 21.0.2

#### Changed

- `addOption`: the add-option action now sticks to the bottom of the panel.

### 21.0.0

#### Added

- `prefix`: new input to display a prefix (template or icon) inside the field.
- `placeholder`: display a default placeholder when none is provided.

#### Changed

- `emptyState`: show a distinct message (`emptyOptions`) when there are no options versus no search results (`emptyResults`).

### 20.3.2

#### Fixed

- `grouping`: fix a change detection issue on the grouping property.
- `grouping`: wait for establishment grouping calls to be fetched before fetching options.

### 20.2.1

#### Fixed

- `accessibility`: fix the `aria-selected` status of options.

### 20.2.0

#### Added

- `tree`: support tree mode to display and select nested options.

### 20.1.3

#### Fixed

- `autocomplete`: fix the DOM attribute type and keep `off` as the default.

### 20.1.0

#### Added

- `accessibility`: keyboard navigation for the add-option action and support for custom panel headers and footers.

#### Changed

- `autocomplete`: the input now defaults to `off`.

### 19.3.2

#### Fixed

- `focus`: focus the input again after the panel is closed.

### 19.3.0

#### Removed

- `LuSimpleSelectApiV3Directive`: removed, use `LuCoreSelectApiV3Directive` from `@lucca-front/ng/core-select/api` instead.

### 19.2.6

#### Fixed

- `clearable`: hide the clear button when the select is used in filter pill mode.

### 19.2.5

#### Fixed

- `keyboard`: fix the space key not opening the panel properly.

### 19.2.4

#### Fixed

- `grouping`: fix the option id when grouping.
- `focus`: don't focus the checkbox when the panel is opened.

### 19.2.0

#### Added

- `filterPill`: support filter pill mode so the select can be used inside `lu-filter-pill`.
- `search`: display a search icon when the field is searchable.

### 18.3.3

#### Fixed

- `search`: fix search when using `luOptionGroup`.

### 18.3.0

#### Fixed

- `portal`: handle nullish portal values.

### 18.1.2

#### Fixed

- `highlight`: fix the missing highlighted option issue.
- `highlight`: fix the missing highlighted item after the search clue changes.
- `clearable`: hide the clear button when the select is disabled.
