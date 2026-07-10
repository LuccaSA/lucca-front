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

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `close` | `close` | `void` | — |
| `open` | `open` | `void` | — |
| `hovered` | `hovered` | `boolean` | — |
| `onSelectValue` | `onSelectValue` | `D` | — |

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

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DATE_INPUT_TRANSLATIONS` | `unknown` | — |
| `LU_DATE_SELECT_INPUT_TRANSLATIONS` | `unknown` | — |

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `luDate` | `LuDateAdapterPipe` | `(d: D, format = 'mediumDate'): string` | — |
| `luHumanizeDate` | `LuHumanizeDatePipe` | `(value: Date \| string \| number, allowedUnits?: readonly LuRelativeTimeFormatUnit[]): Observable<string>` | — |

### Services

#### LuHumanizeDateFormatter

- `format(relativeTime: LuRelativeTime): string`

### Modules dépréciés

- ⚠️ `LuDateAdapterModule` — use `LuDateAdapterPipe` instead
- ⚠️ `LuDateModule` — use `LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent` instead
- ⚠️ `LuDatePickerModule` — use `LuDatePickerComponent` instead
- ⚠️ `LuDateSelectInputModule` — use `LuDateSelectInputComponent` instead

## Related files

- 📝 [Code & implementation](./date.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-filterspills-date-angular--docs)
- 📋 [Changelog](./date.changelog.md)
