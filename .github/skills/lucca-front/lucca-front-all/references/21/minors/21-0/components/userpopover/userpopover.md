# userpopover

## Import

```typescript
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## API Reference

### LuUserPopoverComponent (component)

**Selector:** `lu-user-popover-content`

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
| `provideLuUserPopover` | `()` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_POPUP_EMPLOYEE_TRANSLATIONS` | `unknown` | — |
| `LU_USER_POPOVER_USER` | `Signal<ILuUser>` | — |
| `USER_POPOVER_IS_ACTIVATED` | `Observable<boolean>` | — |

## Related files

- 📝 [Code & implementation](./userpopover.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./userpopover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-users-display-userpopover--docs)
- 📋 [Changelog](./userpopover.changelog.md)
