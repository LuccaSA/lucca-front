---
description: Composant Popover - composants affichés par-dessus le contenu principal
triggers:
  - popover
  - lupopoveralignment
  - lupopover
  - lupopoverposition
  - lupopovertriggerevent
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

# Popover

## Description

Le composant **Popover** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Popover`
**Component:** `PopoverStory`


## Imports

```typescript
import { LuPopoverAlignment, LuPopoverModule, LuPopoverPosition, LuPopoverTriggerEvent } from '@lucca-front/ng/popover';
```


## Utilisation

### Quand utiliser Popover

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


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.button` | Classe de base |

## Accessibilité

- Gérer le focus trap dans les modales
- Permettre la fermeture avec Escape
- Annoncer l'ouverture aux lecteurs d'écran
- Utiliser aria-modal et role="dialog"

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
