# callout-disclosure

## Import

```typescript
import { CalloutDisclosureComponent } from '@lucca-front/ng/callout';
```

## API Reference

### CalloutDisclosureComponent (component)

**Selector:** `lu-callout-disclosure`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent` | — | ✅ | — | Titre du callout. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | `'M'` | — | — | Modifie la taille du callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `open` | `open` | `boolean` | `false` | — | `booleanAttribute` | Place le callout dans son état déplié. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `openChange` | `openChange` | `boolean` |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 574 available values

## Related files

- 📝 [Code & implementation](./callout-disclosure.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./callout-disclosure.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.0/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)
- 📋 [Changelog](./callout-disclosure.changelog.md)
