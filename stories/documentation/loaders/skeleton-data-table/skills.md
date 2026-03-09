---
description: Composant Skeleton data table - composants pour indiquer un chargement ou une progression
triggers:
  - skeleton-data-table
  - skeletondatatable
  - skeleton
  - loading
  - spinner
  - progress
  - wait
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Skeleton data table

## Description

Le composant **Skeleton data table** fait partie de la catégorie **Loaders** du design system Lucca Front.

Composants pour indiquer un chargement ou une progression.

**Story path:** `Documentation/Loaders/Skeleton/Skeleton DataTable`
**Component:** `SkeletonDataTableComponent`


## Imports

```typescript
import { SkeletonDataTableComponent } from '@lucca-front/ng/skeleton';
```


## Utilisation

### Quand utiliser Skeleton data table

- Chargement de données
- Actions asynchrones
- Progression

### Quand ne pas utiliser

- Contenu disponible immédiatement

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.dataTableWrapper` | Classe de base |
| `.dataTable` | Classe de base |
| `.skeleton` | Classe de base |
| `.dataTable-head` | Classe de base |
| `.dataTable-head-row` | Classe de base |
| `.mod-alignCenter` | Modificateur alignCenter |
| `.mod-alignEnd` | Modificateur alignEnd |
| `.is-loading` | État loading |

## Accessibilité

- Annoncer le chargement avec aria-busy
- Fournir un texte alternatif descriptif
- Informer de la fin du chargement

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
