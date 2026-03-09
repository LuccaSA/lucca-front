---
description: Composant Tooltip - composants affichés par-dessus le contenu principal
triggers:
  - tooltip
  - infobulle
  - lutooltip
  - lutooltiptrigger
  - lutooltippanel
  - icon
  - button
  - modal
  - popup
  - overlay
  - layer
  - dialog
  - floating
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Tooltip

## Description

Le composant **Tooltip** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Tooltip/Ellipsis tests`
**Component:** `TooltipStory`


## Imports

```typescript
import { LuTooltipModule, LuTooltipTriggerDirective, LuTooltipPanelComponent } from '@lucca-front/ng/tooltip';
import { IconComponent } from '@lucca-front/ng/icon';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `luTooltipEnterDelay` | `number` | `300` | - |
| `table` | `any` | `{ summary:` | - |

## Utilisation

### Quand utiliser Tooltip

- Confirmations importantes
- Formulaires contextuels
- Informations complémentaires

### Quand ne pas utiliser

- Contenu principal de la page
- Navigation fréquente

## Exemples

### Exemple basique

```html
<h1>With ellipsis after few seconds</h1>
<div class=
```

### Autres exemples

```html
<h3>Tooltip simple</h3>
<button id=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.test` | Classe de base |
| `.ellipsis` | Classe de base |
| `.width400` | Classe de base |
| `.fontSize2` | Classe de base |
| `.paddingRight` | Classe de base |

## Accessibilité

- Gérer le focus trap dans les modales
- Permettre la fermeture avec Escape
- Annoncer l'ouverture aux lecteurs d'écran
- Utiliser aria-modal et role="dialog"

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
