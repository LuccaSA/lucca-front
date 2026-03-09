---
description: Composant Loading - composants pour indiquer un chargement ou une progression
triggers:
  - loading
  - chargement
  - spinner
  - progress
  - wait
  - skeleton
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Loading

## Description

Le composant **Loading** fait partie de la catégorie **Loaders** du design system Lucca Front.

Composants pour indiquer un chargement ou une progression.

**Story path:** `Documentation/Loaders/Loading/Angular/Basic`


## Imports

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `block` | `any` | `false` | - |

## Utilisation

### Quand utiliser Loading

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
| `.loading` | Classe de base |

## Accessibilité

- Annoncer le chargement avec aria-busy
- Fournir un texte alternatif descriptif
- Informer de la fin du chargement

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
