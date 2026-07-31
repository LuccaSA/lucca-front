### 21.1.3

#### Fixed

- Empty value display in `presentation` mode now matches the other inputs.

### 21.1.0

#### Added

- `presentation` display mode support, showing an en dash when the value is empty.

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 21.0.3

#### Changed

- `useAutoPrefixSuffix` input now uses the `booleanAttribute` transform, so it can be set without a binding.

### 20.1.2

#### Added

- `valueAlignRight` input to align the value to the right of the field.

### 18.2.4

#### Fixed

- Incompatibility with `formControl`.

### 18.2.0

#### Added

- `lu-number-format-input` component with the `formatStyle`, `currency`, `currencyDisplay`, `unit`, `unitDisplay`, `min`, `max`, `prefix`, `suffix`, `useAutoPrefixSuffix`, `placeholder`, `hasClearer` and `intl` inputs, built on top of `Intl` number formatting.

#### Changed

- Automatic prefix and suffix are no longer used by default — enable them with `useAutoPrefixSuffix`.

#### Deprecated

- `ILuTranslation` type — use `LuTranslation` instead.
