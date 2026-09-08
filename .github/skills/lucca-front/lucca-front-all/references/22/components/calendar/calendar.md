# calendar

## Import

```typescript
import { LuCalendarInputComponent } from '@lucca-front/ng/date';
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







### Modules dépréciés

- ⚠️ `LuDateModule` — use `LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent` instead


## Related files

- 📝 [Code & implementation](./calendar.component.md)
- 🎨 [Design guidelines](./calendar.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-date-calendar--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`LuCalendarInputComponent`).

### Notes de release (ZeroHeight)

#### 21.1.0

##### Added

- `intl`: added an `intl` input on `lu-calendar` and `lu-calendar2` to override the component's built-in translations.

#### 21.0.3

##### Fixed

- `lu-calendar`: dates disabled by `min`/`max` now display a proper disabled style (dimmed color, strikethrough, non-interactive hover).

#### 21.0.0

##### Deprecated

- `LuCalendarInputModule`: deprecated, import the standalone `LuCalendarInputComponent` instead.

##### Fixed

- `lu-calendar2`: the day grid now always renders a 6th week row so the calendar keeps a consistent height across months.

#### 20.3.0

##### Changed

- `displayMode`: the `lu-calendar2` `displayMode` model now defaults to `null` and falls back to `mode`, letting consumers set the starting display mode without overriding the navigation mode.

#### 20.2.0

##### Fixed

- `lu-calendar2`: improved weekday header accessibility, decorative day initials are now `aria-hidden` while the full day name stays available to screen readers.

#### 19.2.0

##### Added

- `intl`: added translatable previous/next navigation labels on `lu-calendar`.

#### 18.3.0

##### Added

- `lu-calendar2` (`Calendar2Component`): new standalone calendar component built on `date-fns`. Supports day/month/year modes, date ranges, keyboard navigation, overflow-day display and a "today" button. Inputs: `showOverflow`, `enableOverflow`, `hideToday`, `hasTodayButton`, `hideWeekend`, `ranges`, `getCellInfo`; models: `date` (required), `tabbableDate`, `mode`, `displayMode`; outputs: `nextPage`, `previousPage`, `dateClicked`.

#### 18.1.0

##### Changed

- `granularity`: the `lu-calendar` `granularity` input now accepts the `LuDateGranularity` string union (e.g. `'day'`) in addition to the `ELuDateGranularity` enum.
