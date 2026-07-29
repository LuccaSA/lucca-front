# userpopover

## Import

```typescript
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## API Reference

### LuUserPopoverComponent (component)

**Selector:** `lu-user-popover-content`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### LuUserPopoverDirective (directive)

**Selector:** `[luUserPopover]`

**exportAs:** `LuUserPopoverDirective`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `luUserPopover` | `luUserPopover` | `ILuUser` | — | ✅ | — | — |
| `luUserPopoverDisabled` | `luUserPopoverDisabled` | `boolean` | — | — | — | — |

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuUserPopover` | `()` | ⚠️ **Déprécié** : no longer needed as user popover uses `luPopover2`  |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_POPUP_EMPLOYEE_TRANSLATIONS` | `unknown` | — |
| `LU_USER_POPOVER_USER` | `Signal<ILuUser>` | — |
| `USER_POPOVER_IS_ACTIVATED` | `Observable<boolean>` | ⚠️ **Déprécié** : no longer needed as popover is always activated  |

## Related files

- 📝 [Code & implementation](./userpopover.component.md)
- 🎨 [Design guidelines](./userpopover.design.md)
- 🎯 [Figma design tokens](./userpopover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-users-display-userpopover--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.1.2

~ provider `provideLuUserPopover` : devient déprécié (no longer needed as user popover uses `luPopover2`)
~ token `USER_POPOVER_IS_ACTIVATED` : devient déprécié (no longer needed as popover is always activated)

### 21.1.0

`LuUserPopoverComponent` :
  + `intl` : unknown

### 21.0.0

Composant introduit (`LuUserPopoverComponent`, `LuUserPopoverDirective`).
