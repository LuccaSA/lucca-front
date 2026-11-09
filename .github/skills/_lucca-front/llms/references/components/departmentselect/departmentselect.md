# departmentselect

## Import

```typescript
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
```

## API Reference

### LuDepartmentSelectInputComponent (component)

**Selector:** `lu-department-select`

> ⚠️ **Déprécié** : since 20.2.0; use LuSimpleSelectInputComponent or LuMultiSelectInputComponent.

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

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-departmentselect--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.2`. Les versions sans changement d'API sont omises.

### 22.1.2

~ `LuDepartmentSelectInputComponent` devient déprécié (since 20.2.0; use LuSimpleSelectInputComponent or LuMultiSelectInputComponent.)
