# user-select

## Import

```typescript
import { LuUserSelectInputComponent } from '@lucca-front/ng/user';
```

## API Reference

### LuUserSelectInputComponent (component)

**Selector:** `lu-user-select`

> ⚠️ **Déprécié** : prefer SimpleSelect or MultipleSelect with luCustomUsers directive

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `inputPlaceholder` | `placeholder` | `string` | — | — | — | — |
| `fields` | `fields` | `string` | — | — | — | — |
| `filters` | `filters` | `string[]` | — | — | — | — |
| `orderBy` | `orderBy` | `string` | — | — | — | — |
| `appInstanceId` | `appInstanceId` | `number \| string` | — | — | — | — |
| `operations` | `operations` | `number[]` | — | — | — | — |
| `enableFormerEmployees` | `enableFormerEmployees` | `boolean` | `false` | — | — | — |
| `disablePrincipal` | `disablePrincipal` | `boolean` | `false` | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_USER_SELECT_INPUT_TRANSLATIONS` | `unknown` | — |

### Modules dépréciés

- ⚠️ `LuUserSelectModule` — prefer SimpleSelect or MultipleSelect with luCustomUsers directive
- ⚠️ `LuUserSelectInputModule` — prefer SimpleSelect or MultipleSelect with luCustomUsers directive
- ⚠️ `LuUserModule` — use `LuUserDisplayPipe, LuUserPictureComponent, LuUserTileComponent` instead

## Related files

- 📋 [Changelog](./user-select.changelog.md)
