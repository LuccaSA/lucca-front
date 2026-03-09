---
description: Composant Popover2 - composants affichés par-dessus le contenu principal
triggers:
  - popover2
  - button
  - divider
  - icon
  - listing
  - listingitem
  - configurelupopover
  - popover
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

# Popover2

## Description

Le composant **Popover2** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Popover2/Angular`
**Component:** `PopoverDirective`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Popover2

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
| `.demo` | Classe de base |
| `.popover-contentOptional` | Classe de base |
| `.verticalNavigation` | Classe de base |
| `.verticalNavigation-list` | Classe de base |
| `.verticalNavigation-list-item` | Classe de base |
| `.mod-iconless` | Modificateur iconless |

## Accessibilité

- Gérer le focus trap dans les modales
- Permettre la fermeture avec Escape
- Annoncer l'ouverture aux lecteurs d'écran
- Utiliser aria-modal et role="dialog"

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
