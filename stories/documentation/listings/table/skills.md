---
description: Composant Table - composants pour afficher des listes et collections de données
triggers:
  - table
  - tableau
  - empty-state
  - emptystatesection
  - button
  - list
  - data
  - grid
  - collection
  - items
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Table

## Description

Le composant **Table** fait partie de la catégorie **Listings** du design system Lucca Front.

Composants pour afficher des listes et collections de données.

**Story path:** `Documentation/Listings/Table/Actions`


## Imports

```typescript
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { ButtonComponent } from '@lucca-front/ng/button';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `navSideCompact` | `any` | `false` | - |

## Utilisation

### Quand utiliser Table

- Affichage de collections
- Tableaux de données
- Listes d'éléments

### Quand ne pas utiliser

- Élément unique
- Formulaires

## Exemples

### Exemple basique

```html
<!-- header height passed with CSS var -->
<table class=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.table` | Classe de base |
| `.table-head` | Classe de base |
| `.table-head-row` | Classe de base |
| `.table-head-row-cell` | Classe de base |
| `.table-body` | Classe de base |
| `.mod-actions` | Modificateur actions |
| `.mod-ghost` | Modificateur ghost |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-S` | Modificateur S |
| `.mod-card` | Modificateur card |
| `.mod-clickable` | Modificateur clickable |
| `.mod-draggable` | Modificateur draggable |
| `.mod-filters` | Modificateur filters |
| `.mod-search` | Modificateur search |
| `.mod-block` | Modificateur block |
| `.is-collapsed` | État collapsed |

## Accessibilité

- Utiliser des structures sémantiques (table, ul, ol)
- Fournir des en-têtes pour les tableaux
- Supporter le tri et la pagination accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
