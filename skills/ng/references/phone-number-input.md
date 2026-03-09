# Phone Number Input

Phone number input component with country prefix selector and E.164 formatting.

**Storybook:** [Documentation/Forms/Fields/Phone Number Input/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Phone Number Input - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=18201-688)  
**Node ID:** `18201-688`

## Import

```typescript
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Phone number">
  <lu-phone-number-input [(ngModel)]="phoneNumber" />
</lu-form-field>
```

## Inputs

### `country` (alias of `defaultCountryCode`)
Type: `CountryCode`

Default selected country.

```html
<lu-phone-number-input [(ngModel)]="phoneNumber" country="FR" />
```

### `allowedCountries`
Type: `ReadonlyArray<CountryCode | string>`

Restricts selectable countries.

```html
<lu-phone-number-input
  [(ngModel)]="phoneNumber"
  [allowedCountries]="['FR', 'BE', 'CH']" />
```

### `autocomplete`
Type: `'off' | 'tel'`

Browser autocomplete behavior.

```html
<lu-phone-number-input [(ngModel)]="phoneNumber" autocomplete="tel" />
```

### `label`
Type: `string`

Optional internal label for the control.

### `noAutoPlaceholder`
Type: `boolean` (default: `false`)

Disables auto-generated placeholder based on selected country.

```html
<lu-phone-number-input [(ngModel)]="phoneNumber" noAutoPlaceholder />
```

## Outputs

### `countryChange`
Type: `EventEmitter<CountryCode>`

Emitted when selected country changes.

```html
<lu-phone-number-input
  [(ngModel)]="phoneNumber"
  (countryChange)="onCountryChange($event)" />
```

## Value Format

The component outputs normalized phone numbers in **E.164** format.

```typescript
// Example output values
'+33612345678'
'+32470123456'
```

## Common Patterns

### International Form

```html
<lu-form-field label="Mobile">
  <lu-phone-number-input
    [(ngModel)]="mobile"
    country="FR"
    [allowedCountries]="['FR', 'BE', 'CH', 'LU']"
    autocomplete="tel" />
</lu-form-field>
```

### With Reactive Forms

```html
<lu-form-field label="Phone" errorInlineMessage="Invalid phone number">
  <lu-phone-number-input [formControl]="phoneControl" country="FR" />
</lu-form-field>
```

```typescript
phoneControl = new FormControl('');
```

### Country-dependent placeholder

```html
<lu-phone-number-input [(ngModel)]="phone" country="US" />
<!-- Placeholder example: (201) 555-0123 -->
```

## Accessibility

- Country selector is keyboard accessible
- Formatted number is announced correctly
- Use with `<lu-form-field>` for proper label/error association

