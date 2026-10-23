# impersonation

## Import

```typescript
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
```

## Basic Usage

```html
<lu-impersonation [(selectedUser)]="example" (clear)="example= me" /> <pr-story-model-display>{{example | json}}</pr-story-model-display>
```

## API Reference

### ImpersonationComponent (component)

**Selector:** `lu-impersonation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `enableFormerEmployees` | `enableFormerEmployees` | `boolean` | `false` | — | `luBooleanAttribute` | Inclus les collaborateurs partis |
| `operationIds` | `operationIds` | `readonly number[] \| null` | `null` | — | — | Restreint les utilisateurs à ceux accessibles via ces opérations, dans le périmètre de l'appInstanceId |
| `uniqueOperationIds` | `uniqueOperationIds` | `readonly number[] \| null` | `null` | — | — | Restreint les utilisateurs à ceux accessibles via ces opérations uniques ; prioritaire sur operationIds / appInstanceId,… |
| `appInstanceId` | `appInstanceId` | `unknown` | `null` | — | `luNullableNumberAttribute` | Instance d'application dans laquelle les operationIds sont résolus ; sans effet avec uniqueOperationIds |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `clear` | `clear` | `void` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `selectedUser` | `ILuUser` | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_IMPERSONATION_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./impersonation.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-navigation-impersonation-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.1.0

+ `operationIds` : readonly number[] | null
+ `uniqueOperationIds` : readonly number[] | null
+ `appInstanceId` : unknown

### 22.0.5

+ token `LU_IMPERSONATION_TRANSLATIONS` : unknown

### 22.0.0

~ `enableFormerEmployees` : transform booleanAttribute → luBooleanAttribute
