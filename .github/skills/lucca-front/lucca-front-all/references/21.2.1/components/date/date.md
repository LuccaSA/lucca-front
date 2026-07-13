# date

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
| `intl` | `intl` | `unknown` | — | — | — | — |
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `startOn` | `startOn` | `D` | `this._adapter.forgeToday()` | — | — | — |

### LuDateInputDirective (directive)

**Selector:** `input[luDateInput]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `placeholder` | `placeholder` | `string` | — | — | — | — |

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

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `close` | `close` | `void` |
| `open` | `open` | `void` |
| `hovered` | `hovered` | `boolean` |
| `onSelectValue` | `onSelectValue` | `D` |

### LuDateSelectInputComponent (component)

**Selector:** `lu-date-select`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `inputPlaceholder` | `placeholder` | `string` | — | — | — | — |
| `hideClearer` | `hideClearer` | `boolean` | `false` | — | — | — |
| `startOn` | `startOn` | `D` | — | — | — | — |

## Related files

- 📝 [Code & implementation](./date.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-forms-filterspills-date-angular--docs)
- 📋 [Changelog](./date.changelog.md)
