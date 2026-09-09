# empty-state

## Import

```typescript
import { EmptyStatePageIllustration, EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
```

## API Reference

### EmptyStatePageIllustration (component)

**Selector:** `lu-empty-state-page-illustration`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `src` | `src` | `string \| null` | `null` | — | — | URL de l’illustration. |
| `alt` | `alt` | `string \| null` | `''` | — | — | Texte alternatif de l’illustration restitué par les lecteurs d’écran. |

### EmptyStatePageComponent (component)

**Selector:** `lu-empty-state-page`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `string \| null` | `null` | — | — | Affiche une illustration au dessus du titre. |
| `topRightBackground` | `topRightBackground` | `string \| null` | — | — | — | — |
| `topRightForeground` | `topRightForeground` | `string \| null` | — | — | — | Illustration de premier plan dans le coin supérieur droit. |
| `bottomLeftBackground` | `bottomLeftBackground` | `string \| null` | — | — | — | — |
| `bottomLeftForeground` | `bottomLeftForeground` | `string \| null` | — | — | — | — |
| `contentBackgroundColor` | `contentBackgroundColor` | `string` | `'var(--pr-t-elevation-surface-default)'` | — | — | Modifie la couleur de fond du contenu (variable CSS, couleur hexadécimale, etc.). |
| `slotTop` | `slotTop` | `PortalContent` | — | — | — | [v19.3] Ajout d’un slot au dessus du titre. [PortalContent] |
| `illustration` | `illustration` | `PortalContent` | — | — | — | Modifie l’illustration. |
| `heading` | `heading` | `string` | — | — | — | Titre de l’empty state. |
| `description` | `description` | `PortalContent` | — | — | — | Description du composant. [PortalContent] |
| `hx` | `hx` | `number` | `1` | — | `luNumberAttribute` | Définit le niveau sémantique du titre. |
| `hxStyle` | `hxStyle` | `number` | `1` | — | `luNumberAttribute` | [v21.2] Niveau du titre (style). |

## Related files

- 📝 [Code & implementation](./empty-state.component.md)
- 🎨 [Design guidelines](./empty-state.design.md)
- 🎯 [Figma design tokens](./empty-state.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-feedback-empty-state-angular-onboarding-page--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`EmptyStatePageIllustration`, `EmptyStatePageComponent`).
