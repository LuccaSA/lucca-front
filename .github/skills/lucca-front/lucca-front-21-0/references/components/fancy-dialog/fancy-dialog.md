# fancy-dialog

## Import

```typescript
import { DialogContentComponent, DialogFooterComponent, DialogHeaderAction, DialogHeaderComponent, DialogRoutingContainerComponent, DialogComponent, DialogCloseDirective, DialogDismissDirective, DialogOpenDirective } from '@lucca-front/ng/dialog';
```

## API Reference

### DialogContentComponent (component)

**Selector:** `lu-dialog-content`

### DialogFooterComponent (component)

**Selector:** `lu-dialog-footer`

### DialogHeaderAction (directive)

**Selector:** `[dialogHeaderAction]`

### DialogHeaderComponent (component)

**Selector:** `lu-dialog-header`

### DialogRoutingContainerComponent (component)

**Selector:** `lu-dialog-routing-container`

### DialogComponent (component)

**Selector:** `lu-dialog`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `stacked` | `stacked` | `boolean` | `false` | — | `booleanAttribute` | — |

### DialogCloseDirective (directive)

**Selector:** `[luDialogClose]`

### DialogDismissDirective (directive)

**Selector:** `[luDialogDismiss]`

### DialogOpenDirective (directive)

**Selector:** `[luDialogOpen]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dialog` | `luDialogOpen` | `TemplateRef<void>` | — | ✅ | — | — |
| `luDialogConfig` | `luDialogConfig` | `LuDialogConfig<unknown>` | — | — | — | — |

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `configureLuDialog` | `(): EnvironmentProviders` | — |
| `provideLuDialog` | `(): Provider` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DIALOG_HEADER_TRANSLATIONS` | `unknown` | — |
| `DIALOG_ROUTE_CLOSE_TRIGGER` | `DialogRouteCloseTrigger` | — |
| `DIALOG_ROUTE_DISMISS_TRIGGER` | `DialogRouteDismissTrigger` | — |
| `DIALOG_ROUTE_CONFIG` | `DialogRouteConfig<unknown>` | — |

### Services

#### LuDialogService

- `open<C, TData = LuDialogData<C>>(config: LuDialogConfig<C, NoInfer<TData>>): LuDialogRef<C, TData>`

## Related files

- 🎨 [Design guidelines](./design/_index.md)

- 📋 [Changelog](./fancy-dialog.changelog.md)
