---
description: Composant Numeric badge - composants pour la typographie et le contenu textuel
triggers:
  - numeric-badge
  - numericbadge
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

# Numeric badge

## Description

Le composant **Numeric badge** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/NumericBadge/Angular/Basic`
**Component:** `NumericBadgeComponent`


## Imports

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'XS' | 'S' | 'M'` | `-` | The size of the badge |
| `palette` | `Palette` | `none` | The palette to use for this badge. Defaults to 'none' (inherits parent palette) |
| `maxValue` | `number` | `999` | Indicates the maximum value of number for the numeric badge |

## Utilisation

### Quand utiliser Numeric badge

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
<lu-numeric-badge ... [value]=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.numericBadge` | Classe de base |
| `.mod-S` | Modificateur S |
| `.mod-XS` | Modificateur XS |
| `.is-loading` | État loading |
| `.palette-product` | Palette product |

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
