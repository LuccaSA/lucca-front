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
| `operationIds` | `operationIds` | `readonly number[] \| null` | `null` | — | — | ⚠️ **Déprécié** : use `uniqueOperationIds` instead  |
| `uniqueOperationIds` | `uniqueOperationIds` | `readonly number[] \| null` | `null` | — | — | — |
| `appInstanceId` | `appInstanceId` | `unknown` | `null` | — | `luNullableNumberAttribute` | ⚠️ **Déprécié** : use `uniqueOperationIds` instead  |
| `searchDelimiter` | `searchDelimiter` | `string` | `' '` | — | — | — |

### Services

#### EstablishmentGroupingService

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.1

~ `operationIds` : devient déprécié (use `uniqueOperationIds` instead)
~ `appInstanceId` : devient déprécié (use `uniqueOperationIds` instead)

### 22.0.0

~ `appInstanceId` : number | null → unknown, transform ∅ → luNullableNumberAttribute
