---
description: Composant Fancy box - composants pour structurer la mise en page
triggers:
  - fancy-box
  - fancybox
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

# Fancy box

## Description

Le composant **Fancy box** fait partie de la catégorie **Structure** du design system Lucca Front.

Composants pour structurer la mise en page.

**Story path:** `Documentation/Structure/FancyBox/Angular/Basic`


## Imports

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `foreground` | `string` | `-` | foreground image (URL) |
| `size` | `null | 'S'` | `null` | Which size should the callout be? Defaults to small |

## Utilisation

### Quand utiliser Fancy box

- Organisation du contenu
- Mise en page
- Conteneurs

### Quand ne pas utiliser

- Composants interactifs

## Exemples

### Exemple basique

```html
<lu-fancy-box............> Content </lu-fancy-box>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.fancyBox-content` | Classe de base |
| `.fancyBox-content-foreground` | Classe de base |

## Accessibilité

- Utiliser des landmarks appropriés
- Maintenir un ordre de lecture logique
- Structurer le contenu de manière sémantique

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
