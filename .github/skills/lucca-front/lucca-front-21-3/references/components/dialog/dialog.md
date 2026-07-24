# dialog

## Import

```typescript
import { DialogContentComponent, DialogFooterComponent, DialogHeaderAction, DialogHeaderSubtitle, DialogHeaderComponent, DialogRoutingContainerComponent, DialogComponent, DialogCloseDirective, DialogDismissDirective, DialogOpenDirective } from '@lucca-front/ng/dialog';
```

## API Reference

### DialogContentComponent (component)

**Selector:** `lu-dialog-content`

### DialogFooterComponent (component)

**Selector:** `lu-dialog-footer`

### DialogHeaderAction (directive)

**Selector:** `[dialogHeaderAction]`

### DialogHeaderSubtitle (directive)

**Selector:** `[dialogHeaderSubtitle]`

### DialogHeaderComponent (component)

**Selector:** `lu-dialog-header`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### DialogRoutingContainerComponent (component)

**Selector:** `lu-dialog-routing-container`

### DialogComponent (component)

**Selector:** `lu-dialog`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `stacked` | `stacked` | `boolean` | `false` | — | `booleanAttribute` | — |
| `fancyIllustration` | `fancyIllustration` | `'approval' \| 'checklist' \| 'email' \| 'install' \| 'mapping' \| 'save' \| 'users' \| 'welcome' \| 'payment-card'` | `'welcome'` | — | — | Modifie l’illustration affichée dans la Fancy dialog. |
| `fancyIllustrationUrl` | `fancyIllustrationUrl` | `string \| null` | `null` | — | — | Surcharge l’illustration avec une URL personnalisée. |

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
| `provideDialogRoutingReuseStrategy` | `(): EnvironmentProviders` | — |
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

- 📝 [Code & implementation](./dialog.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./dialog.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)
- 📋 [Changelog](./dialog.changelog.md)
