---
description: Composant Sidepanel - composants pour la navigation dans l'application
triggers:
  - sidepanel
  - modal
  - ilumodalcontent
  - lusidepanel
  - ilusidepanelcontent
  - nav
  - menu
  - navigate
  - route
  - link
  - breadcrumb
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

Le composant **Sidepanel** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/Sidepanel`
**Component:** `SidePanelStory`


## Imports

```typescript
import { ILuModalContent } from '@lucca-front/ng/modal';
import { LuSidepanel, LuSidepanelModule, ILuSidepanelContent } from '@lucca-front/ng/sidepanel';
```


## Utilisation

### Quand utiliser Sidepanel

- Navigation entre pages
- Menus
- Fil d'Ariane
- Pagination

### Quand ne pas utiliser

- Actions (utiliser Button)
- Affichage de données

## Exemples

### Exemple basique

```html
<p>General Kenobi</p>
```

### Autres exemples

```html
<h1>Sidepanels</h1>
<button type=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.button` | Classe de base |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
