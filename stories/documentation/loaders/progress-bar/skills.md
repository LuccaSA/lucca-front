---
description: Composant Progress bar - composants pour indiquer un chargement ou une progression
triggers:
  - progress-bar
  - progressbar
  - loading
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

# Progress bar

## Description

Le composant **Progress bar** fait partie de la catégorie **Loaders** du design system Lucca Front.

Composants pour indiquer un chargement ou une progression.

**Story path:** `Documentation/Loaders/Progress Bar/Angular/Basic`


## Imports

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `state` | `'success' | 'error' | 'null'` | `null` | Progress bar state |

## Utilisation

### Quand utiliser Progress bar

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
| `.progress-bar` | Classe de base |

## Accessibilité

- Annoncer le chargement avec aria-busy
- Fournir un texte alternatif descriptif
- Informer de la fin du chargement

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
