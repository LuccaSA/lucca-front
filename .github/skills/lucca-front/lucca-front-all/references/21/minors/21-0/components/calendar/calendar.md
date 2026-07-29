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
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `startOn` | `startOn` | `D` | `this._adapter.forgeToday()` | — | — | — |

### Modules dépréciés

- ⚠️ `LuCalendarInputModule` — use `LuCalendarInputComponent` instead
- ⚠️ `LuDateModule` — use `LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent` instead

## Related files

- 📝 [Code & implementation](./calendar.component.md)
- 🎨 [Design guidelines](./calendar.design.md)
- 🎯 [Figma design tokens](./calendar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-forms-date-calendar--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.0.5`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`LuCalendarInputComponent`).
