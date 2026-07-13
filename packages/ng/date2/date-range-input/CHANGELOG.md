### 21.3.0

#### Changed

- `presentation display` uses plain text separators (`from`/`to` labels) instead of a masked span and arrow icon in the read-only presentation mode.

### 21.2.1

#### Fixed

- `segment width` corrected the width calculation of the start/end input segments.

### 21.1.4

#### Fixed

- `end input` the end field's input event now reads its own value instead of the start field's value.

### 21.1.3

#### Fixed

- `empty value` empty value display now matches the other inputs, showing a dash placeholder.

### 21.1.1

#### Fixed

- `filled label` the label is now correctly considered as filled even when the field is not static.

### 21.1.0

#### Added

- `intl` translation override support: every label and message can now be overridden through the `intl` inputs.
- `presentation` presentation display mode for the range input, rendering a read-only formatted value inside a presentation form field.

#### Changed

- `empty presentation` displays a dash (`–`) when a presentation value is empty.

#### Fixed

- `keyboard input` typing in the field no longer moves the caret once the value is parsed.

### 21.0.0

#### Fixed

- `filter pill reset` fixed the reset of the value when used inside a filter pill.

### 20.3.0

#### Added

- `panelOpened` / `panelClosed` outputs emitted when the calendar panel opens and closes.

### 20.2.3

#### Fixed

- `value emission` removed an internal effect that could emit a spurious `null` value.

### 20.1.0

#### Added

- `clearBehavior` input accepting `reset` to restore the initial value instead of clearing to `null` when the clear button is used.

### 19.3.3

#### Added

- `widthAuto` input to let the field size itself to its content instead of taking the full available width.

### 19.3.1

#### Fixed

- `disabled state` fixed the input always being rendered as disabled.

### 19.2.6

#### Fixed

- `filter pill clearable` fixed the clearable behaviour when hosted in a filter pill.

### 19.2.5

#### Fixed

- `disabled state` the date picker disabled state is now kept in sync with the control.

### 19.2.2

#### Changed

- `inDateISOFormat` the value accessor now accepts and emits ISO date string ranges when the ISO format is enabled.

### 19.2.0

#### Added

- `filter pill` support for being used as a filter pill input, integrating with `filter-pills` / `filter-pills-bar`.

#### Fixed

- `keyboard navigation` fixed period keyboard navigation when used as a filter pill.

### 19.1.0

#### Added

- `lu-date-range-input` new component providing a date range picker input with a dual-calendar panel, `shortcuts`, `placeholder`, `mode` (day / month / year), min/max bounds and calendar cell customization.
