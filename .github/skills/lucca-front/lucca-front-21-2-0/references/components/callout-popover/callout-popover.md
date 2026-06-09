# callout-popover

## Import

```typescript
import { CalloutActionsComponent, CalloutDisclosureComponent, CalloutFeedbackListComponent, CalloutPopoverComponent, CalloutComponent } from '@lucca-front/ng/callout';
```

## API Reference

### CalloutActionsComponent (component)

**Selector:** `lu-callout-actions`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inline` | `inline` | `boolean` | `false` | — | `booleanAttribute` | — |

### CalloutDisclosureComponent (component)

**Selector:** `lu-callout-disclosure`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent` | — | ✅ | — | Ajoute un titre au popover. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `size` | `size` | `'M' \| 'S'` | `'M'` | — | — | — |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `open` | `open` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `openChange` | `openChange` | `boolean` |

### CalloutFeedbackListComponent (component)

**Selector:** `ul[lu-callout-feedback-list]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `palette` | `palette` | `Palette` | — | — | — | — |
| `size` | `size` | `'M' \| 'S'` | — | — | — | — |

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
| `popoverTrigger` | `popoverTrigger` | `'click' \| 'click+hover' \| 'hover+focus'` | `'click+hover'` | — | — | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au popover. |
| `popoverPosition` | `popoverPosition` | `PopoverPosition` | `'above'` | — | — | Position du popover par rapport au bouton de déclenchement. |
| `customPopoverPositions` | `customPopoverPositions` | `ConnectionPositionPair[]` | — | — | — | — |

### CalloutComponent (component)

**Selector:** `lu-callout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_CALLOUT_TRANSLATIONS` | — | — | — |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au popover. |
| `hx` | `hx` | `unknown` | `null` | — | `numberAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `size` | `size` | `'M' \| 'S'` | — | — | — | — |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `removable` | `removable` | `boolean` | `false` | — | `booleanAttribute` | — |
| `removed` | `removed` | `boolean` | `false` | — | `booleanAttribute` | — |
| `iconAlt` | `iconAlt` | `string \| null` | `null` | — | — | — |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `removedChange` | `removedChange` | `boolean` |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 574 available values

## Related files

- 📝 [Code & implementation](./callout-popover.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./callout-popover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.0/storybook/?path=/docs/documentation-feedback-callout-popover-angular--docs)
- 📋 [Changelog](./callout-popover.changelog.md)
