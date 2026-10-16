### 22.1.0

#### Added

- `width` input to size the input itself, using the form field width scale.

### 22.0.6

#### Fixed

- Clearing an input bound with `[formField]` (signal forms) now resets its value instead of throwing `this.ngControl.reset is not a function`.
- Form fields bound with `[formField]` (signal forms) are now marked dirty when the user changes the value.

### 21.1.3

#### Fixed

- Empty value display in `presentation` mode now matches the other inputs.

### 21.1.0

#### Added

- `presentation` display mode support, showing an en dash when the value is empty.

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 20.3.2

#### Fixed

- The value no longer changes when scrolling over the input with the mouse wheel on Chrome.

### 20.1.2

#### Added

- `valueAlignRight` input to align the value to the right of the field.

### 18.3.4

#### Fixed

- `min` and `max` validators behaviour.

### 18.2.0

#### Deprecated

- `ILuTranslation` type — use `LuTranslation` instead.
