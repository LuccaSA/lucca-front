# callout-disclosure

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

### CalloutFeedbackListComponent (component)

**Selector:** `ul[lu-callout-feedback-list]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `palette` | `palette` | `Palette` | — | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | — | — | — | Modifie la taille du callout. |

### CalloutPopoverComponent (component)

**Selector:** `lu-callout-popover`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `openDelay` | `openDelay` | `number` | `50` | — | `numberAttribute` | — |
| `closeDelay` | `closeDelay` | `number` | `500` | — | `numberAttribute` | — |
| `buttonLabel` | `buttonLabel` | `string` | — | — | — | — |
| `buttonAlt` | `buttonAlt` | `string` | `''` | — | — | — |
| `headingHiddenIfSingleItem` | `headingHiddenIfSingleItem` | `boolean` | `false` | — | `booleanAttribute` | — |
| `popoverTrigger` | `popoverTrigger` | `'click' \| 'click+hover' \| 'hover+focus'` | `'click+hover'` | — | — | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | Modifie la taille du callout. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `heading` | `heading` | `PortalContent` | — | — | — | Titre du callout. |
| `popoverPosition` | `popoverPosition` | `PopoverPosition` | `'above'` | — | — | — |
| `customPopoverPositions` | `customPopoverPositions` | `ConnectionPositionPair[]` | — | — | — | — |

### CalloutComponent (component)

**Selector:** `lu-callout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_CALLOUT_TRANSLATIONS` | — | — | — |
| `heading` | `heading` | `PortalContent` | — | — | — | Titre du callout. |
| `hx` | `hx` | `unknown` | `null` | — | `numberAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | — | — | — | Modifie la taille du callout. |
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

- [`LuccaIcon`](../../../types/v21.2.1/LuccaIcon.md) — 574 available values

## Related files

- 📝 [Code & implementation](./callout-disclosure.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../callout-disclosure.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)
- 📋 [Changelog](../callout-disclosure.changelog.md)
