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
| `buttonLabel` | `buttonLabel` | `string \| number` | — | — | — | Label du bouton. |
| `buttonAlt` | `buttonAlt` | `string` | `''` | — | — | Information restituée par le bouton. |
| `headingHiddenIfSingleItem` | `headingHiddenIfSingleItem` | `boolean` | `false` | — | `booleanAttribute` | Masque le titre si le popover ne contient qu’un élément. |
| `popoverTrigger` | `popoverTrigger` | `'click' \| 'click+hover' \| 'hover+focus'` | `'click+hover'` | — | — | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au popover. [PortalContent] |
| `popoverPosition` | `popoverPosition` | `PopoverPosition` | `'above'` | — | — | Position du popover par rapport au bouton de déclenchement. |
| `customPopoverPositions` | `customPopoverPositions` | `ConnectionPositionPair[]` | — | — | — | — |
| `popoverDisabled` | `popoverDisabled` | `boolean` | `false` | — | `booleanAttribute` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_CALLOUT_TRANSLATIONS` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 577 available values

## Related files

- 📝 [Code & implementation](./callout-popover.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./callout-popover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-feedback-callout-popover-angular--docs)
- 📋 [Changelog](./callout-popover.changelog.md)
