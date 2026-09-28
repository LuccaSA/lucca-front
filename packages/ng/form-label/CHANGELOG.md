### 21.3.1

#### Added

- `pl` translations for the Polish locale.

### 21.3.0

#### Added

- `FormLabelSize` type and `FORM_LABEL_SIZE` constant listing the available sizes (`XS`, `S`), exported from the public API.

#### Changed

- The counter accessible label now resolves plural forms through `Intl.PluralRules`, adding support for locales with more than two plural forms (e.g. Polish).

### 21.2.0

#### Added

- `label[luFormLabel], legend[luFormLabel]` Angular component (`FormLabelComponent`) exposing the `required`, `error`, `tooltip`, `tag`, `size`, `counterStatus`, `counterMax` and `counterId` inputs.

### 20.1.0

#### Added

- `tag` styling to render a product `lu-tag` inside the label.

### 19.1.6

#### Fixed

- Vertical alignment of the info tooltip icon.

### 18.2.3

#### Fixed

- Layout of long labels: the character counter is now positioned independently so it no longer breaks the label alignment.

### 18.1.0

#### Fixed

- `focus-visible` outline on the info tooltip icon for keyboard navigation.
