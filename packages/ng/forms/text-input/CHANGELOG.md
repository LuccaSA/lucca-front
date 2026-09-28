### 21.3.1

#### Fixed

- `luInput` now unsubscribes from its value changes on destroy, preventing a memory leak.

### 21.3.0

#### Changed

- `prefix` and `suffix` text addons now accept a `PortalContent` instead of a plain `string`, allowing rich (e.g. multilanguage) content.

### 21.1.4

#### Fixed

- Border color no longer stays incorrect when the invalid and hover states are combined.

### 21.1.3

#### Fixed

- Presentation mode now displays `–` for an empty value, matching the other inputs.

### 21.1.1

#### Fixed

- Password visibility toggle now correctly switches the input type.

### 21.1.0

#### Added

- Presentation display mode through `*luPresentationDisplayDefault`, rendering the value (with its prefix and suffix) read-only and showing `–` when empty.

### 21.0.0

#### Deprecated

- `LuInputModule`, use `LuInputDirective`, `LuInputDisplayerDirective` and `LuInputClearerComponent` instead.
- `lu-input-clearer` (`LuInputClearerComponent`), use `ClearComponent` instead.

### 20.3.0

#### Added

- `mask` input to provide an `ngx-mask` type configuration on the field.

### 20.2.0

#### Deprecated

- `luDisplayer` (`LuInputDisplayerDirective`).

#### Fixed

- Value and placeholder are now truncated with an ellipsis instead of overflowing.

### 20.1.3

#### Changed

- `autocomplete` input now defaults to `'off'` and is typed as `AutoFill`.

### 18.3.3

#### Fixed

- Prefix addon no longer wraps onto multiple lines.

### 18.3.0

#### Added

- `autocomplete` input.

### 18.2.3

#### Fixed

- Hover border color now applies to the whole field.

### 18.1.0

#### Added

- `mod-valueAlignRight` modifier to right-align the field value.

#### Changed

- Removed the border around prefix and suffix addons.
