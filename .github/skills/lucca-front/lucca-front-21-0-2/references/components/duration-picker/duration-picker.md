# duration-picker

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
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | — |
| `label` | `label` | `string` | — | — | — | Modifie le label de l'input. |
| `hideZeroValue` | `hideZeroValue` | `boolean` | `false` | — | `booleanAttribute` | Masque le contenu du champ lorsque sa valeur est nulle. |

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
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | — |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean \| null` | `null` | — | — | — |
| `label` | `label` | `string` | — | — | — | Modifie le label de l'input. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `timeChange` | `timeChange` | `TimeChangeEvent` |

## Related files

- 📝 [Code & implementation](./duration-picker.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./duration-picker.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.2/storybook/?path=/docs/documentation-forms-time-duration-picker-angular-form--docs)
- 📋 [Changelog](./duration-picker.changelog.md)
