# callout

## Import

```typescript
import { CalloutActionsComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackItemComponent, CalloutFeedbackListComponent, CalloutComponent } from '@lucca-front/ng/callout';
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

### CalloutFeedbackItemDescriptionDirective (directive)

**Selector:** `lu-feedback-item-description`

### CalloutFeedbackItemComponent (component)

**Selector:** `li[lu-callout-feedback-item]`

### CalloutFeedbackListComponent (component)

**Selector:** `ul[lu-callout-feedback-list]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `palette` | `palette` | `Palette` | — | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | — | — | — | Modifie la taille du callout. |

### CalloutComponent (component)

**Selector:** `lu-callout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `heading` | `heading` | `PortalContent` | — | — | — | Ajoute un titre au callout. [PortalContent] |
| `hx` | `hx` | `unknown` | `null` | — | `numberAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | — | — | — | Modifie la taille du callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `removable` | `removable` | `boolean` | `false` | — | `booleanAttribute` | Ajoute un bouton de suppression au callout. |
| `removed` | `removed` | `boolean` | `false` | — | `booleanAttribute` | Masque le callout. |
| `iconAlt` | `iconAlt` | `string \| null` | `null` | — | — | Information de l’icône restituée par le lecteur d’écran. |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `removedChange` | `removedChange` | `boolean` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_CALLOUT_TRANSLATIONS` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 577 available values

## Related files

- 📝 [Code & implementation](./callout.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./callout.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-feedback-callout-angular-ai--docs)
- 📋 [Changelog](./callout.changelog.md)
