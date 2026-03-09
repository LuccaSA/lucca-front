---
description: Composant Highlight data - composants pour structurer la mise en page
triggers:
  - highlight-data
  - highlightdata
  - button
  - link
  - layout
  - container
  - structure
  - grid
  - box
  - card
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Highlight data

## Description

Le composant **Highlight data** fait partie de la catégorie **Structure** du design system Lucca Front.

Composants pour structurer la mise en page.

**Story path:** `Documentation/Structure/Highlight data/Angular/Basic`
**Component:** `HighlightDataComponent`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Highlight data

- Organisation du contenu
- Mise en page
- Conteneurs

### Quand ne pas utiliser

- Composants interactifs

## Exemples

### Exemple basique

```html
<lu-highlight-data ...>...</lu-highlight-data>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.highlightData` | Classe de base |
| `.highlightData-content` | Classe de base |
| `.highlightData-content-title` | Classe de base |
| `.highlightData-content-value` | Classe de base |
| `.highlightData-content-action` | Classe de base |
| `.mod-outlined` | Modificateur outlined |
| `.mod-valueFirst` | Modificateur valueFirst |
| `.mod-nested` | Modificateur nested |
| `.mod-S` | Modificateur S |
| `.mod-XS` | Modificateur XS |
| `.mod-light` | Modificateur light |
| `.mod-dark` | Modificateur dark |

## Accessibilité

- Utiliser des landmarks appropriés
- Maintenir un ordre de lecture logique
- Structurer le contenu de manière sémantique

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
