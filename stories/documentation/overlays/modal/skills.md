---
description: Composant Modal - composants affichés par-dessus le contenu principal
triggers:
  - modal
  - modale
  - button
  - ilumodalcontent
  - lu_modal_data
  - lumodal
  - lumodalconfig
  - toast
  - lutoasts
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

# Modal

## Description

Le composant **Modal** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Modal`
**Component:** `ModalStories`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { ILuModalContent, LU_MODAL_DATA, LuModal, LuModalConfig, LuModalModule } from '@lucca-front/ng/modal';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |
| `mode` | `any` | `-` | - |

## Utilisation

### Quand utiliser Modal

- Confirmations importantes
- Formulaires contextuels
- Informations complémentaires

### Quand ne pas utiliser

- Contenu principal de la page
- Navigation fréquente

## Exemples

### Exemple basique

```html
<p>General Kenobi</p>
```

### Autres exemples

```html
<lu-toasts [sources]=

<p>{{data.message}}</p>
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
