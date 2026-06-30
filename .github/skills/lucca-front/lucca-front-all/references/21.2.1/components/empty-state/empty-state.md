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
| `alt` | `alt` | `string \| null` | `null` | — | — | Texte alternatif de l’illustration restitué par les lecteurs d’écran. |

### EmptyStatePageComponent (component)

**Selector:** `lu-empty-state-page`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `string \| null` | `null` | — | — | Affiche une illustration au dessus du titre. |
| `topRightBackground` | `topRightBackground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg'` | — | — | — |
| `topRightForeground` | `topRightForeground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg'` | — | — | Illustration de premier plan dans le coin supérieur droit. |
| `bottomLeftBackground` | `bottomLeftBackground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg'` | — | — | — |
| `bottomLeftForeground` | `bottomLeftForeground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg'` | — | — | — |
| `contentBackgroundColor` | `contentBackgroundColor` | `string` | `'var(--pr-t-elevation-surface-default)'` | — | — | Modifie la couleur de fond du contenu (variable CSS, couleur hexadécimale, etc.). |
| `slotTop` | `slotTop` | `PortalContent` | — | — | — | [v19.3] Ajout d’un slot au dessus du titre. |
| `illustration` | `illustration` | `PortalContent` | — | — | — | — |
| `heading` | `heading` | `string` | — | — | — | Titre de l’empty state. |
| `description` | `description` | `PortalContent` | — | — | — | Description du composant. |
| `hx` | `hx` | `number` | `1` | — | `numberAttribute` | Définit le niveau sémantique du titre. |
| `hxStyle` | `hxStyle` | `number` | `1` | — | `numberAttribute` | [v21.2] Niveau du titre (style). |

## Related files

- 📝 [Code & implementation](./empty-state.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./empty-state.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-feedback-empty-state-angular-onboarding-page--docs)
- 📋 [Changelog](./empty-state.changelog.md)
