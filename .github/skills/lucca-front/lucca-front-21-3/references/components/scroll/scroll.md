# scroll

## Import

```typescript
import { LuScrollDirective } from '@lucca-front/ng/scroll';
```

## API Reference

### LuScrollDirective (directive)

**Selector:** `[luScroll]`

**exportAs:** `luScroll`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `debounceTime` | `debounceTime` | `number` | `100` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `onScroll` | `onScroll` | `Event` | — |
| `onScrollTop` | `onScrollTop` | `Event` | — |
| `onScrollBottom` | `onScrollBottom` | `Event` | — |
| `onScrollLeft` | `onScrollLeft` | `Event` | — |
| `onScrollRight` | `onScrollRight` | `Event` | — |

### Modules dépréciés

- ⚠️ `LuScrollModule` — use `LuScrollDirective` instead

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`LuScrollDirective`).
