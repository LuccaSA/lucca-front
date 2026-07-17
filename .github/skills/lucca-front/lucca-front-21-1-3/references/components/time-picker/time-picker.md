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
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | Affiche les boutons d'incrémention. |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean \| null` | `null` | — | — | — |
| `label` | `label` | `string` | — | — | — | Modifie le label de l'input. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `timeChange` | `timeChange` | `TimeChangeEvent` |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `value` | `ISO8601Time` | — |

## Related files

- 📝 [Code & implementation](./time-picker.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./time-picker.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.3/storybook/?path=/docs/documentation-forms-time-time-picker-angular-form--docs)
- 📋 [Changelog](./time-picker.changelog.md)
