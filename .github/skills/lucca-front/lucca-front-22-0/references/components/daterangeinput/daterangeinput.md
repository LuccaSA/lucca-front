# daterangeinput

## Import

```typescript
import { DateRangeInputComponent } from '@lucca-front/ng/date2';
```

## API Reference

### DateRangeInputComponent (component)

**Selector:** `lu-date-range-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `format` | `format` | `(typeof DATE_FORMAT)[keyof typeof DATE_FORMAT]` | `DATE_FORMAT.DATE` | — | — | Modifie le format de date. |
| `ranges` | `ranges` | `unknown` | `[]` | — | — | — |
| `hideToday` | `hideToday` | `boolean` | `false` | — | `luBooleanAttribute` | Retire la mise en valeur de la date du jour. |
| `hasTodayButton` | `hasTodayButton` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `clearable` | `clearable` | `unknown` | `null` | — | `luNullableBooleanAttribute` | Ajoute un bouton de suppression lorsqu’une date est sélectionnée. |
| `clearBehavior` | `clearBehavior` | `'clear' \| 'reset'` | `'clear'` | — | — | [v20.1] Change le comportement au clic sur la croix de suppression |
| `hideWeekend` | `hideWeekend` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `mode` | `mode` | `'day' \| 'week' \| 'month' \| 'year'` | `'day'` | — | — | Modifie le mode de sélection au mois ou à l'année. |
| `getCellInfo` | `getCellInfo` | `((day: Date, mode: CalendarMode) => CellStatus) \| null` | — | — | — | — |
| `min` | `min` | `unknown` | `new Date('1/1/1000')` | — | `transformDateInputToDate` | Définit une date minimum de sélection. |
| `max` | `max` | `unknown` | `null` | — | `transformDateInputToDate` | Définit une date maximum de sélection. |
| `focusedDate` | `focusedDate` | `unknown` | `null` | — | `transformDateInputToDate` | Définit la date préselectionnée à l’ouverture du calendrier. |
| `placeholder` | `placeholder` | `string` | — | — | — | — |
| `widthAuto` | `widthAuto` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `shortcuts` | `shortcuts` | `readonly CalendarShortcut[]` | — | — | — | — |
| `autocomplete` | `autocomplete` | `AutoFill` | `'off'` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `panelOpened` | `panelOpened` | `void` | — |
| `panelClosed` | `panelClosed` | `void` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `calendarMode` | `CalendarMode \| null` | — | — |

## Related files

- 📝 [Code & implementation](./daterangeinput.component.md)
- 🎨 [Design guidelines](./daterangeinput.design.md)
- 🎯 [Figma design tokens](./daterangeinput.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-date2-daterangeinput--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `hideToday` : transform booleanAttribute → luBooleanAttribute
~ `hasTodayButton` : transform booleanAttribute → luBooleanAttribute
~ `clearable` : transform booleanAttribute → luNullableBooleanAttribute
~ `hideWeekend` : transform booleanAttribute → luBooleanAttribute
~ `mode` : 'day' | 'month' | 'year' → 'day' | 'week' | 'month' | 'year'
~ `widthAuto` : transform booleanAttribute → luBooleanAttribute
~ (model) `calendarMode` : CalendarMode → CalendarMode | null

### Notes de release (ZeroHeight)

#### 21.3.0

##### Changed

- `presentation display` uses plain text separators (`from`/`to` labels) instead of a masked span and arrow icon in the read-only presentation mode.

#### 21.2.1

##### Fixed

- `segment width` corrected the width calculation of the start/end input segments.

#### 21.1.4

##### Fixed

- `end input` the end field's input event now reads its own value instead of the start field's value.

#### 21.1.3

##### Fixed

- `empty value` empty value display now matches the other inputs, showing a dash placeholder.

#### 21.1.1

##### Fixed

- `filled label` the label is now correctly considered as filled even when the field is not static.

#### 21.1.0

##### Added

- `intl` translation override support: every label and message can now be overridden through the `intl` inputs.
- `presentation` presentation display mode for the range input, rendering a read-only formatted value inside a presentation form field.

##### Changed

- `empty presentation` displays a dash (`–`) when a presentation value is empty.

##### Fixed

- `keyboard input` typing in the field no longer moves the caret once the value is parsed.

#### 21.0.0

##### Fixed

- `filter pill reset` fixed the reset of the value when used inside a filter pill.

#### 20.3.0

##### Added

- `panelOpened` / `panelClosed` outputs emitted when the calendar panel opens and closes.

#### 20.2.3

##### Fixed

- `value emission` removed an internal effect that could emit a spurious `null` value.

#### 20.1.0

##### Added

- `clearBehavior` input accepting `reset` to restore the initial value instead of clearing to `null` when the clear button is used.

#### 19.3.3

##### Added

- `widthAuto` input to let the field size itself to its content instead of taking the full available width.

#### 19.3.1

##### Fixed

- `disabled state` fixed the input always being rendered as disabled.

#### 19.2.6

##### Fixed

- `filter pill clearable` fixed the clearable behaviour when hosted in a filter pill.

#### 19.2.5

##### Fixed

- `disabled state` the date picker disabled state is now kept in sync with the control.

#### 19.2.2

##### Changed

- `inDateISOFormat` the value accessor now accepts and emits ISO date string ranges when the ISO format is enabled.

#### 19.2.0

##### Added

- `filter pill` support for being used as a filter pill input, integrating with `filter-pills` / `filter-pills-bar`.

##### Fixed

- `keyboard navigation` fixed period keyboard navigation when used as a filter pill.

#### 19.1.0

##### Added

- `lu-date-range-input` new component providing a date range picker input with a dual-calendar panel, `shortcuts`, `placeholder`, `mode` (day / month / year), min/max bounds and calendar cell customization.
