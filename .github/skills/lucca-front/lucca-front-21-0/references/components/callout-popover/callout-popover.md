# callout-popover

## Import

```typescript
import { CalloutPopoverComponent } from '@lucca-front/ng/callout';
```

## API Reference

### CalloutPopoverComponent (component)

**Selector:** `lu-callout-popover`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `openDelay` | `openDelay` | `number` | `50` | — | `numberAttribute` | — |
| `closeDelay` | `closeDelay` | `number` | `500` | — | `numberAttribute` | — |
| `buttonLabel` | `buttonLabel` | `string` | — | — | — | Label du bouton. |
| `buttonAlt` | `buttonAlt` | `string` | `''` | — | — | Information restituée par le bouton. |
| `headingHiddenIfSingleItem` | `headingHiddenIfSingleItem` | `boolean` | `false` | — | `booleanAttribute` | Masque le titre si le popover ne contient qu'un élément. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au popover. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_CALLOUT_TRANSLATIONS` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./callout-popover.component.md)
- 🎨 [Design guidelines](./callout-popover.design.md)
- 🎯 [Figma design tokens](./callout-popover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-feedback-callout-popover-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.0.5`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`CalloutPopoverComponent`).
