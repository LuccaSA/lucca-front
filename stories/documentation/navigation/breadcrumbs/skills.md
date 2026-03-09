---
description: Composant Breadcrumbs - composants pour la navigation dans l'application
triggers:
  - breadcrumbs
  - breadcrumbslink
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

# Breadcrumbs

## Description

Le composant **Breadcrumbs** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/Breadcrumbs/Angular/Basic`


## Imports

```typescript
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
```


## Utilisation

### Quand utiliser Breadcrumbs

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
<lu-breadcrumbs ...>
<a *luBreadcrumbsLink routerLink=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.breadcrumbs` | Classe de base |
| `.breadcrumbs-list` | Classe de base |
| `.breadcrumbs-list-item` | Classe de base |
| `.breadcrumbs-list-item-action` | Classe de base |
| `.mod-compact` | Modificateur compact |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
