### 21.1.0

#### Added

- `presentation display`: when the parent `lu-form-field` is set to presentation mode, the checkbox now renders its value as a localized "yes"/"no" label through the `*luPresentationDisplayDefault` directive.

### 20.3.0

#### Fixed

- `filter pill layout`: the checkable checkbox layout is no longer displayed when the parent select already contains a checkbox.

### 20.2.0

#### Added

- `checklist`: new boolean input that applies the `mod-checklist` modifier to display the checkbox in the checklist style.

### 20.1.1

#### Added

- `color override`: the checked, hover and active colors can now be overridden through the `--palettes-*` CSS custom properties (falling back to `--palettes-product-*`).

### 20.1.0

#### Added

- `input framed`: when placed inside an `lu-input-framed`, the checkbox applies the framed header layout classes to its input and icon.

### 18.3.2

#### Added

- `mixed state styling`: interactive states (hover, active, disabled, invalid and their combinations) are now styled for the indeterminate (`aria-checked="mixed"`) checkbox.
