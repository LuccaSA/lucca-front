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
| `min` | `min` | `unknown` | — | — | — | — |
| `max` | `max` | `unknown` | — | — | — | — |
| `granularity` | `granularity` | `LuDateGranularity` | `ELuDateGranularity.day` | — | — | — |
| `startOn` | `startOn` | `D` | `this._adapter.forgeToday()` | — | — | — |

### Modules dépréciés

- ⚠️ `LuDateModule` — use `LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent` instead

## Related files

- 📝 [Code & implementation](./calendar.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./calendar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-date-calendar--docs)
- 📋 [Changelog](./calendar.changelog.md)
