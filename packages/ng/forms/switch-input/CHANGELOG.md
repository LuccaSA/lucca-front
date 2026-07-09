### 21.1.0

#### Added

- `presentation`: when the parent `lu-form-field` is switched to presentation mode, the switch now renders its state as a readable `yes`/`no` value instead of the interactive control.

### 20.3.3

#### Fixed

- `styles`: corrected the bundled SCSS import to point at the `switchField` styles so the control is displayed correctly.

### 20.2.3

#### Fixed

- `styles`: the component now imports its own styles through `styleUrl`, so switch styling no longer needs to be pulled in globally.

### 20.2.0

#### Changed

- `hover`/`active`: updated the hover and active state colors to use darker palette shades.

### 18.2.4

#### Fixed

- `opacity`: the native input now uses `opacity: 0.0001` instead of `0`, keeping it focusable and announced by screen readers in Safari.
