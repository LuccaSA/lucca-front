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
| `heading` | `heading` | `PortalContent` | — | ✅ | — | Titre du callout. [PortalContent] |
| `icon` | `icon` | `LuccaIcon` | — | — | — | Ajoute une icône au callout. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au callout. |
| `size` | `size` | `'M' \| 'S'` | `'M'` | — | — | Modifie la taille du callout. |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | État du callout. |
| `open` | `open` | `boolean` | `false` | — | `booleanAttribute` | Place le callout dans son état déplié. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `openChange` | `openChange` | `boolean` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_CALLOUT_TRANSLATIONS` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 582 available values

## Related files

- 📝 [Code & implementation](./callout-disclosure.component.md)
- 🎨 [Design guidelines](./callout-disclosure.design.md)
- 🎯 [Figma design tokens](./callout-disclosure.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`CalloutDisclosureComponent`).
