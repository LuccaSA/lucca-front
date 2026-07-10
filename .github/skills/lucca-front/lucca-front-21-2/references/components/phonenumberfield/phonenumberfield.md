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
| `noAutoPlaceholder` | `noAutoPlaceholder` | `boolean` | `false` | — | — | — |
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
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./phonenumberfield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-fields-phonenumberfield-angular--docs)
- 📋 [Changelog](./phonenumberfield.changelog.md)
