---
description: Composant Pagination - composants pour la navigation dans l'application
triggers:
  - pagination
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

# Pagination

## Description

Le composant **Pagination** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/Pagination/Angular`


## Imports

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `from` | `number | null` | `-` | Where the pagination start |
| `to` | `number | null` | `-` | Where the pagination end |
| `itemsCount` | `number | null` | `-` | Total number of items in the pagination |
| `mod` | `'default' | 'compact'` | `default` | Pagination mod (default or compact) |

## Utilisation

### Quand utiliser Pagination

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
| `.pagination` | Classe de base |
| `.pagination-count` | Classe de base |
| `.pagination-count-current` | Classe de base |
| `.pagination-count-separator` | Classe de base |
| `.pagination-count-total` | Classe de base |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-ghost` | Modificateur ghost |
| `.mod-S` | Modificateur S |
| `.mod-compact` | Modificateur compact |
| `.is-active` | État active |
| `.is-ellipsis` | État ellipsis |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
