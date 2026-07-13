### 21.3.0

#### Added

- `hasNoInvariant` input (`booleanAttribute`) to display a field without an invariant value, paired with a `displayLocale` input to choose which locale is shown in the closed input.
- `translateWithAI` output emitting the culture code when a translation is requested, and a `hasAIButtons` input (`booleanAttribute`) to opt into the AI translation buttons.

#### Changed

- AI translation buttons are no longer shown by default; enable them explicitly through the `hasAIButtons` input.

### 21.1.3

#### Fixed

- Empty value in presentation mode now displays the same em dash placeholder as other inputs.

### 21.1.0

#### Added

- `intl` input to override the component's translations.
- `MultiLanguageInputValidators.invariantRequired` validator, which requires the invariant value to be filled.
- Support for the form field presentation display mode (`presentation` mode / `*luPresentationDisplay`), showing an em dash when the value is empty.

#### Changed

- Renamed the `MultiLanguageInputValidators.allLanguagesFilled` validator to `MultiLanguageInputValidators.allLanguagesRequired`.

### 21.0.3

#### Added

- `autocomplete` input to set the `autocomplete` attribute on every language input at once (defaults to `"off"`).

#### Fixed

- Corrected the width of the languages panel.

### 20.3.0

#### Added

- `openOnFocus` input (`booleanAttribute`) to open the languages panel when the input receives focus.

### 19.2.6

#### Changed

- The component now inherits its size from the surrounding form field instead of applying a fixed size.

### 18.2.0

#### Added

- `lu-multilanguage-input` component, a `ControlValueAccessor` for editing a text value across multiple languages, with a `placeholder` input and the `MultiLanguageInputValidators.allLanguagesFilled` validator.
