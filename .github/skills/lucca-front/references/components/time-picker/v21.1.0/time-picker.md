# time-picker

## Import

```typescript
import { DurationPickerComponent, TimePickerComponent } from '@lucca-front/ng/time';
```

## API Reference

### DurationPickerComponent (component)

**Selector:** `lu-duration-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `max` | `max` | ``${string}P${string}`` | `'PT99H'` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | Affiche les boutons d'incrémention. |
| `label` | `label` | `string` | — | — | — | Modifie le label de l'input. |
| `hideZeroValue` | `hideZeroValue` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `durationChange` | `durationChange` | `DurationChangeEvent` |

### TimePickerComponent (component)

**Selector:** `lu-time-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | Affiche les boutons d'incrémention. |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean \| null` | `null` | — | — | — |
| `label` | `label` | `string` | — | — | — | Modifie le label de l'input. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `timeChange` | `timeChange` | `TimeChangeEvent` |

## Related files

- 📝 [Code & implementation](./time-picker.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../time-picker.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-forms-time-time-picker-angular-form--docs)
- 📋 [Changelog](../time-picker.changelog.md)
