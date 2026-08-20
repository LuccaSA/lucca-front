# core-select-department

## Import

```typescript
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
```

## API Reference

### LuCoreSelectDepartmentsDirective (directive)

**Selectors:** `lu-simple-select[departments]`, `lu-multi-select[departments]`

**exportAs:** `luDepartments`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `url` | `url` | `string` | `'/organization/structure/api/departments/tree'` | — | — | — |
| `countUrl` | `countUrl` | `string` | `'/organization/structure/api/departments'` | — | — | — |
| `filters` | `filters` | `Record<string, string \| number \| boolean> \| null` | `null` | — | — | — |
| `operationIds` | `operationIds` | `readonly number[] \| null` | `null` | — | — | — |
| `uniqueOperationIds` | `uniqueOperationIds` | `readonly number[] \| null` | `null` | — | — | — |
| `appInstanceId` | `appInstanceId` | `number \| null` | `null` | — | — | — |
| `searchDelimiter` | `searchDelimiter` | `string` | `' '` | — | — | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.1

+ `countUrl` : string

### 21.0.0

Composant introduit (`LuCoreSelectDepartmentsDirective`).
