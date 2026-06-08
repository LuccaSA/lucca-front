# dialog

## Import

```typescript
import { DialogHeaderComponent, DialogComponent, DialogCloseDirective, DialogDismissDirective, DialogOpenDirective } from '@lucca-front/ng/dialog';
```

## API Reference

### DialogHeaderComponent (component)

**Selector:** `lu-dialog-header`

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

## Related files

- 📝 [Code & implementation](./dialog.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./dialog.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.2/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)
- 📋 [Changelog](./dialog.changelog.md)
