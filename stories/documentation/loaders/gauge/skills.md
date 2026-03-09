---
description: Composant Gauge - composants pour indiquer un chargement ou une progression
triggers:
  - gauge
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

# Gauge

## Description

Le composant **Gauge** fait partie de la catégorie **Loaders** du design system Lucca Front.

Composants pour indiquer un chargement ou une progression.

**Story path:** `Documentation/Loaders/Gauge/Angular/Basic`


## Imports

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `alt` | `string` | `-` | Defines the text alt attribute used for accessibility |

## Utilisation

### Quand utiliser Gauge

- Chargement de données
- Actions asynchrones
- Progression

### Quand ne pas utiliser

- Contenu disponible immédiatement

## Exemples

### Exemple basique

```html
<lu-gauge............ />
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.gauge-circleBackground` | Classe de base |
| `.gauge-circleBar` | Classe de base |

## Accessibilité

- Annoncer le chargement avec aria-busy
- Fournir un texte alternatif descriptif
- Informer de la fin du chargement

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
