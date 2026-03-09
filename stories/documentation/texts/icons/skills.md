---
description: Composant Icons - composants pour la typographie et le contenu textuel
triggers:
  - icons
  - icon
  - text
  - typography
  - content
  - label
  - badge
  - tag
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Icons

## Description

Le composant **Icons** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/Icons/Angular`
**Component:** `IconComponent`


## Imports

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `alt` | `string` | `-` | Information conveyed by the screen reader |
| `size` | `'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'` | `-` | Which size should the icon be? XXS to XXL |
| `color` | `'primary' | 'secondary' | 'product' | 'error' |...` | `inherit` | Changes the color of the icon (inherit by default) |

## Utilisation

### Quand utiliser Icons

- Mise en forme de texte
- Labels
- Badges
- Tags

### Quand ne pas utiliser

- Actions interactives
- Formulaires

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.lucca-icon` | Classe de base |
| `.icon-heart` | Classe de base |
| `.mod-AI` | Modificateur AI |
| `.mod-XXS` | Modificateur XXS |
| `.mod-XS` | Modificateur XS |
| `.mod-S` | Modificateur S |
| `.mod-M` | Modificateur M |
| `.mod-L` | Modificateur L |
| `.mod-XL` | Modificateur XL |
| `.mod-XXL` | Modificateur XXL |

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
