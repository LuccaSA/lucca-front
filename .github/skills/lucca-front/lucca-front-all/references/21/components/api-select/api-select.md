# api-select

## Import

```typescript
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';
```

## API Reference

### LuApiSelectInputComponent (component)

**Selector:** `lu-api-select`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `standard` | `standard` | `ApiSelectStandard` | `'v3'` | — | — | — |
| `api` | `api` | `string` | — | — | — | — |
| `fields` | `fields` | `string` | — | — | — | — |
| `filters` | `filters` | `string[]` | — | — | — | — |
| `orderBy` | `orderBy` | `string` | — | — | — | — |
| `sort` | `sort` | `string` | — | — | — | — |

### Modules dépréciés

- ⚠️ `LuApiModule` — use `LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent` instead
- ⚠️ `LuApiSelectModule` — use `LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent` instead
- ⚠️ `LuApiSelectInputModule` — use `LuApiSelectInputComponent` instead

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

~ `standard` : 'v3' | 'v4' → ApiSelectStandard

### 21.0.0

Composant introduit (`LuApiSelectInputComponent`).
