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
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
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
| `palette` | `palette` | `Palette` | — | — | — | Applique une palette de couleurs au callout. |
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
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au popover. |

### CalloutComponent (component)

**Selector:** `lu-callout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au popover. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
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

- [`LuccaIcon`](../../../types/v21.0.4/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./callout-popover.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../callout-popover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.4/storybook/?path=/docs/documentation-feedback-callout-popover-angular--docs)
- 📋 [Changelog](../callout-popover.changelog.md)
