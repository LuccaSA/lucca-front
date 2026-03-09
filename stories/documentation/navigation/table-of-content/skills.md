---
description: Composant Table of content - composants pour la navigation dans l'application
triggers:
  - table-of-content
  - tableofcontent
  - tableofcontentlink
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

# Table of content

## Description

Le composant **Table of content** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/TableOfContent/Angular/Basic`


## Imports

```typescript
import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
```


## Utilisation

### Quand utiliser Table of content

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
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.tableOfContent` | Classe de base |
| `.tableOfContent-list` | Classe de base |
| `.tableOfContent-list-item` | Classe de base |
| `.tableOfContent-list-item-action` | Classe de base |
| `.is-active` | État active |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
