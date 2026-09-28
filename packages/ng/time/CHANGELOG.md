### 21.3.1

#### Changed

- `lu-duration-picker` / `lu-time-picker`: support longer time/unit separators (e.g. Dutch).

#### Fixed

- `lu-time-picker`: allow typing `0` in the hours field when the value is empty, so the picker can be set to midnight.

### 21.3.0

#### Added

- `lu-time-range-picker`: new component to pick a start and end time, with the exported `endTimeBeforeStartTimeValidator` to flag an end time earlier than the start time.

#### Fixed

- `lu-time-range-picker`: focus handling and `onTouched` behavior.

### 21.2.3

#### Fixed

- `lu-time-picker` / `lu-duration-picker`: no longer keep a stale `0` in the underlying input before a value is set, preventing wrong values (e.g. `10`) when typing.

### 21.1.1

#### Fixed

- `lu-duration-picker`: correctly display the minutes part.
- `intl` input is now public on `lu-time-picker` and `lu-duration-picker`.

### 21.1.0

#### Added

- `intl` input on `lu-time-picker` and `lu-duration-picker` to override the component translations.

#### Changed

- `lu-duration-picker`: support durations longer than 99 hours.

#### Fixed

- `lu-duration-picker`: fix wrong incrementation that skipped an hour digit.

### 20.1.1

#### Fixed

- Export `date-primitives` from the public API.

### 19.1.5

#### Fixed

- `lu-time-picker`: fix the `name` attribute on the AM/PM (meridiem) inputs.

### 19.1.4

#### Fixed

- `lu-time-picker`: generate unique `id` values for the inner inputs.

### 18.2.4

#### Fixed

- Export the `lu-duration-picker` component type from the public API.

### 18.2.0

#### Added

- `lu-time-picker`: AM/PM (meridiem) support, with a `forceMeridiemDisplay` input to force the 12h display.

#### Fixed

- Export the missing translation tokens from the public API.

### 18.1.5

#### Fixed

- `lu-time-picker`: the `max` input now defaults to `23:59:59`.

### 18.1.0

#### Added

- `lu-time-picker`: new component to pick a time of day.
- `lu-duration-picker`: new component to pick a duration.
