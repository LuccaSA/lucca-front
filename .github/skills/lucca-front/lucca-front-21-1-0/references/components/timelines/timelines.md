# timelines

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
| `label` | `label` | `string` | — | — | — | — |
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
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | — |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean \| null` | `null` | — | — | — |
| `label` | `label` | `string` | — | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `timeChange` | `timeChange` | `TimeChangeEvent` |

## Related files

- 📝 [Code & implementation](./timelines.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./timelines.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-listings-timelines-basic--docs)
- 📋 [Changelog](./timelines.changelog.md)
