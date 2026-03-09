---
description: Composant Skeleton table - composants pour indiquer un chargement ou une progression
triggers:
  - skeleton-table
  - skeletontable
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

# Skeleton table

## Description

Le composant **Skeleton table** fait partie de la catégorie **Loaders** du design system Lucca Front.

Composants pour indiquer un chargement ou une progression.

**Story path:** `Documentation/Loaders/Skeleton/Skeleton Table`
**Component:** `SkeletonTableComponent`


## Imports

```typescript
import { SkeletonTableComponent } from '@lucca-front/ng/skeleton';
```


## Utilisation

### Quand utiliser Skeleton table

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
| `.table` | Classe de base |
| `.skeleton` | Classe de base |
| `.table-head` | Classe de base |
| `.table-head-row` | Classe de base |
| `.table-head-row-cell` | Classe de base |
| `.mod-alignCenter` | Modificateur alignCenter |
| `.mod-alignRight` | Modificateur alignRight |
| `.is-loading` | État loading |

## Accessibilité

- Annoncer le chargement avec aria-busy
- Fournir un texte alternatif descriptif
- Informer de la fin du chargement

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
