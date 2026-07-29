# departmentselect

## Import

```typescript
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
```

## API Reference

### LuDepartmentSelectInputComponent (component)

**Selector:** `lu-department-select`

> ⚠️ **Déprécié** : Déprécié.

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `appInstanceId` | `appInstanceId` | `number \| string` | — | — | — | — |
| `operations` | `operations` | `number[]` | — | — | — | — |
| `filters` | `filters` | `string[]` | `[]` | — | — | — |
| `uniqueOperation` | `uniqueOperation` | `number` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS` | `unknown` | — |

### Modules dépréciés

- ⚠️ `LuDepartmentModule` — use `LuDepartmentFeederComponent, LuDepartmentSelectInputComponent` instead
- ⚠️ `LuDepartmentSelectModule` — use `LuDepartmentFeederComponent, LuDepartmentSelectInputComponent` instead
- ⚠️ `LuDepartmentSelectInputModule` — use `LuDepartmentSelectInputComponent` instead

## Related files

- 📝 [Code & implementation](./departmentselect.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-departmentselect--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`LuDepartmentSelectInputComponent`).
