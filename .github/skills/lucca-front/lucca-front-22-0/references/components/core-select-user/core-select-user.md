# core-select-user

## Import

```typescript
import { LuCoreSelectUsersDirective, LuCoreSelectUserOptionDirective } from '@lucca-front/ng/core-select/user';
```

## API Reference

### LuCoreSelectUsersDirective (directive)

**Selectors:** `lu-simple-select[users]`, `lu-multi-select[users]`

**exportAs:** `luUsers`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `displayFormat` | `displayFormat` | `LuDisplayFormat` | `LuDisplayFullname.lastfirst` | — | — | — |
| `filters` | `filters` | `Record<string, string \| number \| boolean>` | — | — | — | — |
| `url` | `url` | `string \| null` | `null` | — | — | — |
| `orderBy` | `orderBy` | `string \| null` | `null` | — | — | — |
| `operationIds` | `operationIds` | `readonly number[] \| null` | `null` | — | — | — |
| `uniqueOperationIds` | `uniqueOperationIds` | `readonly number[] \| null` | `null` | — | — | — |
| `appInstanceId` | `appInstanceId` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `enableFormerEmployees` | `enableFormerEmployees` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `displayMeOption` | `displayMeOption` | `boolean` | `true` | — | `luBooleanAttribute` | — |
| `searchDelimiter` | `searchDelimiter` | `string` | `' '` | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `customUserOptionTpl` | `TemplateRef<LuOptionContext<T>> \| Type<unknown> \| undefined` | — | — |

### LuCoreSelectUserOptionDirective (directive)

**Selector:** `[luUserOption]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `usersDirective` | `luUserOptionUsersRef` | `LuCoreSelectUsersDirective<T> \| null` | `null` | — | — | — |

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideCoreSelectUsersContext` | `<T extends LuCoreSelectUser = LuCoreSelectUser>(directiveFn: () => Type<LuCoreSelectUsersDirective<T>>): Provider[]` | — |
| `provideCoreSelectCurrentUserId` | `(factory: () => number): Provider` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_CORE_SELECT_USER_TRANSLATIONS` | `unknown` | — |
| `LU_CORE_SELECT_CURRENT_USER_ID` | `number` | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`LuCoreSelectUsersDirective`, `LuCoreSelectUserOptionDirective`).
