# phonenumberfield

## Import

```typescript
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
```

## API Reference

### PhoneNumberInputComponent (component)

**Selector:** `lu-phone-number-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string` | — | — | — | Modifie le label du champ. |
| `autocomplete` | `autocomplete` | `'off' \| 'tel'` | — | — | — | — |
| `allowedCountries` | `allowedCountries` | `ReadonlyArray<CountryCode \| string>` | `[]` | — | — | — |
| `noAutoPlaceholder` | `noAutoPlaceholder` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `defaultCountryCode` | `country` | `CountryCode` | `undefined` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `countryChange` | `countryChange` | `CountryCode` | — |

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `luPhoneNumberFormat` | `PhoneNumberFormatPipe` | `(value: E164Number, format: NumberFormat = 'NATIONAL'): unknown` | — |

## Related files

- 📝 [Code & implementation](./phonenumberfield.component.md)
- 🎨 [Design guidelines](./phonenumberfield.design.md)
- 🎯 [Figma design tokens](./phonenumberfield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-phonenumberfield-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `noAutoPlaceholder` : transform ∅ → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.1.3

##### Fixed

- `presentation` display: align the empty-value display with the other form inputs.

#### 21.1.0

##### Added

- `presentation` display mode: render the field as a read-only formatted value when the form field is in presentation mode.
- `presentation` display: show a `–` placeholder when the value is empty.

#### 20.3.3

##### Added

- SCSS styles are now available as a standalone `phoneNumber` component export from `@lucca-front/scss`.

#### 20.3.2

##### Fixed

- Correct the spacing (margin) applied after the country flag.

#### 20.1.2

##### Fixed

- Sort the country list by translated country name instead of by raw country code.

#### 19.2.1

##### Changed

- Remove the search icon from the country selector dropdown.

#### 19.2.0

##### Added

- `noAutoPlaceholder` input: disable the automatically generated example-number placeholder (enabled by default).

#### 18.3.0

##### Added

- `autocomplete` input (`'off' | 'tel'`): control the browser autocomplete behavior of the phone number field.

#### 18.2.3

##### Fixed

- Validator now takes the selected country code into account when validating the number.

#### 18.2.2

##### Added

- `country` input: set the default country code used to parse and format the number.
- `countryChange` output: emitted when the detected/selected country code changes.
- Incomplete numbers are now formatted as they are typed.

#### 18.2.1

##### Added

- Display and search countries by their localized country name.

##### Fixed

- Catch `libphonenumber-js` exceptions when parsing invalid input.

#### 18.2.0

##### Added

- `lu-phone-number-input` component: a phone number input field with country selection, parsing, formatting and validation powered by `libphonenumber-js`.
