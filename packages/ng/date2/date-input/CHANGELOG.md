### 21.2.3

#### Fixed

- `lu-date-input`: validation error state and value are now correctly triggered on write value.

### 21.2.0

#### Fixed

- `lu-date-input`: no longer marks the control as touched when the text input changes.

### 21.1.0

#### Added

- `intl`: new input on `lu-date-input` and `input[luDateInput]` to override component translations.
- `*luPresentationDisplay`: `lu-date-input` now supports the form-field presentation display mode.

#### Fixed

- `lu-date-input`: parsing now uses the mode-specific date format (`dateFormatWithMode`) so values are read according to the current mode.

### 21.0.0

#### Deprecated

- `LuDatePickerModule`: deprecated, import the standalone `LuDatePickerComponent` directly instead.

### 20.3.1

#### Fixed

- `lu-date-input`: the calendar display mode is now kept in sync with the `mode` input.

### 20.3.0

#### Added

- `panelOpened` / `panelClosed`: new outputs on `lu-date-input` emitted when the calendar panel opens or closes.

#### Fixed

- `lu-date-input`: better handling of single-digit input in month and day segments.

### 20.1.0

#### Added

- `clearBehavior`: new input on `lu-date-input` (`'clear'` | `'reset'`) allowing the clear button to reset to the initial value instead of emptying the field, along with a public `reset()` method.

### 19.3.4

#### Fixed

- `lu-date-input`: invalid text input is now converted correctly to a date ISO value.

### 19.3.3

#### Added

- `widthAuto`: new boolean input on `lu-date-input` to size the field to its content.

#### Fixed

- `lu-date-input`: `writeValue` no longer calls `onChange`.

### 19.3.1

#### Fixed

- `lu-date-input`: selecting an initial value after a change is now reflected on the model.

### 19.2.6

#### Fixed

- `lu-date-input`: correct handling of `min`/`max` in month mode.
- `lu-date-input`: disabled state now uses a signal so the view re-renders correctly.
- `lu-date-input`: clearing now sends `null` on change and moves the calendar accordingly.

### 19.2.5

#### Fixed

- `lu-date-input`: the disabled state of the date picker panel is now updated correctly.

### 19.2.3

#### Fixed

- `lu-date-input`: a `null` value at initialisation is now handled correctly.

### 19.2.2

#### Added

- `inDateISOFormat`: `lu-date-input` can now emit and consume date ISO string values instead of `Date` objects.

### 18.3.3

#### Fixed

- `lu-date-input`: `min`/`max` are now handled properly in a month picker configuration.
- `lu-date-input`: validators logic fixes for `min`/`max`.

### 18.3.2

#### Fixed

- `lu-date-input`: now accepts `null` as a value.

### 18.3.0

#### Added

- `lu-date-input`: new date input component built on the calendar2 stack. Exposes inputs such as `format`, `mode`, `min`, `max`, `ranges`, `clearable`, `hideToday`, `hasTodayButton`, `disableOverflow` and `hideOverflow`.

### 18.1.0

#### Changed

- `granularity`: on `lu-date-picker` and `input[luDateInput]`, the input now also accepts the `LuDateGranularity` string union type in addition to the `ELuDateGranularity` enum.
