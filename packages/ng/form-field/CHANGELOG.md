### 22.1.1

#### Fixed

- No more `NG0205: Injector has already been destroyed` error when the application is destroyed with a form field holding several inputs.

### 22.1.0

#### Added

- `10` value for the `width` input (`FORM_FIELD_WIDTH`).

#### Fixed

- An `luInput` element destroyed while its form field stays (e.g. swapped by an `@if`) is now unregistered, so its stale ids no longer pile up in `aria-labelledby`.

### 22.0.5

#### Added

- `luInputLabelledBy` and `luInputDescribedBy` inputs on `luInput` to add ids to the ones provided by the form field, instead of binding `aria-labelledby` or `aria-describedby`, which the form field would override.

#### Fixed

- `aria-describedby` of the input only references the inline message when it is displayed.
- Fieldset legend is no longer hidden from screen readers when `hiddenLabel` is set.

### 22.0.0

#### Changed

- `standalone` input of `luInput` (`luInputStandalone`) is now a signal input.

### 21.3.1

#### Added

- `pl` translations for the Polish locale.

### 21.3.0

#### Added

- `signal forms` support: required-state detection now accounts for Angular signal-form fields (`@angular/forms/signals`) declared inside the field.

### 21.1.4

#### Fixed

- `aria-labelledby`: resolve NG0950 error caused by incorrect label id filtering.

### 21.1.0

#### Added

- `presentation`: display fields in a read-only presentation mode through the `presentation` input, the `lu-data-presentation` component, and the `luPresentationDisplay` / `luPresentationDisplayDefault` directives.
- `intl`: allow overriding the component translations through the `intl` input.
- `data-presentation`: show an em dash placeholder when the presentation value is empty.

### 21.0.4

#### Fixed

- `counter`: correctly detect content input changes for the character counter.

### 21.0.0

#### Added

- `size`: new `size` input (`'L'`) on `lu-input-framed`; the former styling is now applied via `mod-L`.

#### Changed

- `lu-input-framed`: renamed from `lu-framed-input` (`InputFramedComponent`, formerly `FramedInputComponent`).

### 20.3.0

#### Added

- `center`: new `center` input to horizontally center the content of `lu-input-framed`.

### 20.1.0

#### Added

- `lu-framed-input`: new framed input component (`FramedInputComponent`) with a `framedPortal` input.

#### Changed

- No longer force the inline layout automatically when an arrow is displayed.

### 19.3.4

#### Fixed

- Prevent a null reference exception during control detection.

### 19.2.6

#### Added

- `extraDescribedBy`: new input to append extra ids to the input's `aria-describedby` attribute.

### 19.2.2

#### Fixed

- Improve detection of the required and invalid states.

### 19.2.1

#### Changed

- `width`: the `width` input now also accepts string values.

#### Fixed

- Correct the handling of the invalid-state override.

### 19.2.0

#### Added

- `width`: new `width` input (`20 | 30 | 40 | 50 | 60`) to constrain the field width.

### 19.1.3

#### Fixed

- Filter out entries with no control during control detection.

### 19.1.1

#### Fixed

- Support asynchronously loaded controls during control detection.

### 18.3.2

#### Fixed

- Correct the change detection of the label id.

### 18.3.1

#### Fixed

- Only apply the box arrow style when a box is actually present.

### 18.3.0

#### Added

- `inline`: new `inline` input to render the field with an inline layout.

### 18.2.0

#### Fixed

- `aria-labelledby`: prevent the label id from being appended repeatedly.

### 18.1.4

#### Fixed

- `invalid`: correctly handle the invalid-state override input.
- Avoid emitting a `mod-undefined` class.

### 18.1.0

#### Added

- `rolePresentationLabel`: new input to set the label's role to presentation.

#### Fixed

- Add a focus-visible outline for the tooltip info icons in labels.
