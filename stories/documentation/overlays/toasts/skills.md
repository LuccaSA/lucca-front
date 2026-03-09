---
description: Composant Toasts - composants affichés par-dessus le contenu principal
triggers:
  - toasts
  - toast
  - lutoastinput
  - lutoasttype
  - lutoasts
  - defaulttoastduration
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

# Toasts

## Description

Le composant **Toasts** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Toasts`
**Component:** `ToastsStory`


## Imports

```typescript
import { LuToastInput, LuToastType, LuToastsComponent, LuToastsService, defaultToastDuration } from '@lucca-front/ng/toast';
```


## Utilisation

### Quand utiliser Toasts

- Confirmations importantes
- Formulaires contextuels
- Informations complémentaires

### Quand ne pas utiliser

- Contenu principal de la page
- Navigation fréquente

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Accessibilité

- Gérer le focus trap dans les modales
- Permettre la fermeture avec Escape
- Annoncer l'ouverture aux lecteurs d'écran
- Utiliser aria-modal et role="dialog"

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
