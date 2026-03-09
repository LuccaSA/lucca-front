---
description: Composant Sidepanel - composants affichés par-dessus le contenu principal
triggers:
  - sidepanel
  - modal
  - ilumodalcontent
  - lumodal
  - lusidepanel
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

# Sidepanel

## Description

Le composant **Sidepanel** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Sidepanel`
**Component:** `SidepanelStory`


## Imports

```typescript
import { ILuModalContent, LuModal, LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
```


## Utilisation

### Quand utiliser Sidepanel

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
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.button` | Classe de base |
| `.mod-outlined` | Modificateur outlined |

## Accessibilité

- Gérer le focus trap dans les modales
- Permettre la fermeture avec Escape
- Annoncer l'ouverture aux lecteurs d'écran
- Utiliser aria-modal et role="dialog"

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
