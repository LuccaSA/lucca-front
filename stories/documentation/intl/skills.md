---
description: Composant Intl - composants d'internationalisation
triggers:
  - intl
  - pagination
  - i18n
  - translation
  - locale
  - language
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Intl

## Description

Le composant **Intl** fait partie de la catégorie **Intl** du design system Lucca Front.

Composants d'internationalisation.

**Story path:** `Documentation/Intl/Basic`
**Component:** `IntlStory`


## Imports

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `from` | `number | null` | `-` | Where the pagination start |
| `to` | `number | null` | `-` | Where the pagination end |
| `itemsCount` | `number | null` | `-` | Total number of items in the pagination |
| `mod` | `'default' | 'compact'` | `default` | Pagination mod (default or compact) |

## Utilisation

### Quand utiliser Intl

- Traductions
- Formatage localisé
- Pluralisation

### Quand ne pas utiliser

- Contenu non internationalisé

## Exemples

### Exemple basique

```html
<lu-pagination [from]=
```


## Accessibilité

- Utiliser lang pour indiquer la langue
- S'assurer que les traductions sont complètes

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
