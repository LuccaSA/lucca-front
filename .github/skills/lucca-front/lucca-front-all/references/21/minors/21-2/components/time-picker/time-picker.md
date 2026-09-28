# time-picker

## Import

```typescript
import { TimePickerComponent } from '@lucca-front/ng/time';
```

## API Reference

### TimePickerComponent (component)

**Selector:** `lu-time-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | Affiche les boutons d’incrémentation. |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean \| null` | `null` | — | — | — |
| `label` | `label` | `string` | — | — | — | Modifie le label de l’input. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `timeChange` | `timeChange` | `TimeChangeEvent` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `value` | `ISO8601Time` | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TIME_PICKER_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./time-picker.component.md)
- 🎨 [Design guidelines](./time-picker.design.md)
- 🎯 [Figma design tokens](./time-picker.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-time-time-picker-angular-form--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`TimePickerComponent`).
