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
| `appInstanceId` | `appInstanceId` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `searchDelimiter` | `searchDelimiter` | `string` | `' '` | — | — | — |

### Services

#### EstablishmentGroupingService

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `appInstanceId` : number | null → unknown, transform ∅ → luNullableNumberAttribute
