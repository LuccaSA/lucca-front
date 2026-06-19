# dialog

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

## Related files

- 📝 [Code & implementation](./dialog.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./dialog.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.1/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)
- 📋 [Changelog](./dialog.changelog.md)
