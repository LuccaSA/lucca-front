# core-select-establishment

## Import

```typescript
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/establishment';
```

## API Reference

### LuCoreSelectEstablishmentsDirective (directive)

**Selectors:** `lu-simple-select[establishments]`, `lu-multi-select[establishments]`

**exportAs:** `luEstablishments`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `url` | `url` | `string` | `'/organization/structure/api/establishments'` | — | — | — |
| `filters` | `filters` | `Record<string, string \| number \| boolean> \| null` | `null` | — | — | — |
| `operationIds` | `operationIds` | `readonly number[] \| null` | `null` | — | — | — |
| `uniqueOperationIds` | `uniqueOperationIds` | `readonly number[] \| null` | `null` | — | — | — |
| `appInstanceId` | `appInstanceId` | `number \| null` | `null` | — | — | — |
| `searchDelimiter` | `searchDelimiter` | `string` | `' '` | — | — | — |

### Services

#### EstablishmentGroupingService

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.1.4`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`LuCoreSelectEstablishmentsDirective`).
