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
| `min` | `min` | `D` | — | — | — | — |
| `max` | `max` | `D` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `startOn` | `startOn` | `D` | — | — | — | — |

### LuDateInputDirective (directive)

**Selector:** `input[luDateInput]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `D` | — | — | — | — |
| `max` | `max` | `D` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `placeHolderInput` | `placeholder` | `string` | `''` | — | — | — |
| `intl` | `intl` | `unknown` | — | — | — | — |

### LuDatePickerComponent (component)

**Selector:** `lu-date-picker`

**exportAs:** `LuDatePicker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `D` | — | — | — | — |
| `max` | `max` | `D` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `startOn` | `startOn` | `D` | — | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `closeOutput` | `closeOutput` | `void` | — |
| `openOutput` | `openOutput` | `void` | — |
| `hoveredOutput` | `hoveredOutput` | `void` | — |
| `onSelectValueOutput` | `onSelectValueOutput` | `void` | — |

### LuDateSelectInputComponent (component)

**Selector:** `lu-date-select`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `min` | `min` | `D` | — | — | — | — |
| `max` | `max` | `D` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `hideClearer` | `hideClearer` | `boolean` | `false` | — | `luBooleanAttribute` | — |
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

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-filterspills-date-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`LuCalendarInputComponent` :
  ~ `min` : unknown → D
  ~ `max` : unknown → D
  ~ `startOn` : défaut this._adapter.forgeToday() → ∅
`LuDateInputDirective` :
  ~ `min` : unknown → D
  ~ `max` : unknown → D
  ~ `placeholder` : défaut ∅ → ''
`LuDatePickerComponent` :
  ~ `min` : unknown → D
  ~ `max` : unknown → D
  ~ `startOn` : défaut this._adapter.forgeToday() → ∅
  + (output) `closeOutput` : void
  + (output) `openOutput` : void
  + (output) `hoveredOutput` : void
  + (output) `onSelectValueOutput` : void
  - (output) `close`
  - (output) `open`
  - (output) `hovered`
  - (output) `onSelectValue`
`LuDateSelectInputComponent` :
  - `placeholder`
  ~ `min` : unknown → D
  ~ `max` : unknown → D
  ~ `hideClearer` : transform ∅ → luBooleanAttribute
