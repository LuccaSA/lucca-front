# callout

## Import

```typescript
import { CalloutActionsComponent, CalloutDisclosureComponent, CalloutFeedbackListComponent, CalloutPopoverComponent, CalloutComponent } from '@lucca-front/ng/callout';
```

## Basic Usage

```html
<lu-callout> <p>Feedback description</p>
</lu-callout>
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
| `heading` | `heading` | `PortalContent` | — | ✅ | — | Ajoute un titre au callout. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | `'M'` | — | — | Modifie la taille du callout. |
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
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | Modifie la taille du callout. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au callout. |

### CalloutComponent (component)

**Selector:** `lu-callout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_CALLOUT_TRANSLATIONS` | — | — | — |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au callout. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | — | — | — | Modifie la taille du callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `removable` | `removable` | `boolean` | `false` | — | `booleanAttribute` | Ajoute un bouton de suppression au callout. |
| `removed` | `removed` | `boolean` | `false` | — | `booleanAttribute` | Masque le callout. |
| `iconAlt` | `iconAlt` | `string \| null` | `null` | — | — | Information de l'icône restituée par le lecteur d'écran. |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `removedChange` | `removedChange` | `boolean` |

## Type definitions

- [`LuccaIcon`](../../../types/v21.1.2/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./callout.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../callout.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.2/storybook/?path=/docs/documentation-feedback-callout-angular-ai--docs)
- 📋 [Changelog](../callout.changelog.md)
