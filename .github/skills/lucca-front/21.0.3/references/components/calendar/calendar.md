# calendar

## Import

```typescript
import { LuCalendarInputComponent, LuDateInputDirective, LuDatePickerComponent, LuDateSelectInputComponent } from '@lucca-front/ng/date';
```

## API Reference

### LuCalendarInputComponent (component)

**Selector:** `lu-calendar`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `startOn` | `startOn` | `D` | `this._adapter.forgeToday()` | — | — | — |

### LuDateInputDirective (directive)

**Selector:** `input[luDateInput]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `override` | `override` | `unknown` | — | — | — | — |

### LuDatePickerComponent (component)

**Selector:** `lu-date-picker`

**exportAs:** `LuDatePicker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `startOn` | `startOn` | `D` | `this._adapter.forgeToday()` | — | — | — |

### LuDateSelectInputComponent (component)

**Selector:** `lu-date-select`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `override` | `placeholder` | `unknown` | — | — | — | — |
| `hideClearer` | `hideClearer` | `boolean` | `false` | — | — | — |

## Related files

- 📝 [Code & implementation](./calendar.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./calendar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.3/storybook/?path=/docs/documentation-forms-date-calendar--docs)
- 📋 [Changelog](./calendar.changelog.md)
