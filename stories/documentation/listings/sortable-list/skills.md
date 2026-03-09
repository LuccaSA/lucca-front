---
description: Composant Sortable list - composants pour afficher des listes et collections de données
triggers:
  - sortable-list
  - sortablelist
  - sortablelistitem
  - tooltip
  - lutooltip
  - list
  - table
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

# Sortable list

## Description

Le composant **Sortable list** fait partie de la catégorie **Listings** du design system Lucca Front.

Composants pour afficher des listes et collections de données.

**Story path:** `Documentation/Listings/Sortable List/Angular/Basic`
**Component:** `SortableListDraggableStory`


## Imports

```typescript
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```


## Utilisation

### Quand utiliser Sortable list

- Affichage de collections
- Tableaux de données
- Listes d'éléments

### Quand ne pas utiliser

- Élément unique
- Formulaires

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.sortableList-item-handler` | Classe de base |
| `.button` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-drag` | Classe de base |
| `.sortableList-item-content` | Classe de base |

## Accessibilité

- Utiliser des structures sémantiques (table, ul, ol)
- Fournir des en-têtes pour les tableaux
- Supporter le tri et la pagination accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
