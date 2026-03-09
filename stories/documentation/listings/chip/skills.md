---
description: Composant Chip - composants pour afficher des listes et collections de données
triggers:
  - chip
  - etiquette
  - list
  - table
  - data
  - grid
  - collection
  - items
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Chip

## Description

Le composant **Chip** fait partie de la catégorie **Listings** du design system Lucca Front.

Composants pour afficher des listes et collections de données.

**Story path:** `Documentation/Listings/Chip/Angular/Basic`


## Imports

```typescript
import { ChipComponent } from '@lucca-front/ng/chip';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'S' | null` | `null` | Which size should the chip be? Defaults or small |

## Utilisation

### Quand utiliser Chip

- Affichage de collections
- Tableaux de données
- Listes d'éléments

### Quand ne pas utiliser

- Élément unique
- Formulaires

## Exemples

### Exemple basique

```html
<lu-chip..................>Label</lu-chip>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.chip` | Classe de base |
| `.chip-kill` | Classe de base |
| `.chip-icon` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-signWarning` | Classe de base |
| `.mod-product` | Modificateur product |
| `.mod-S` | Modificateur S |
| `.is-disabled` | État disabled |
| `.palette-warning` | Palette warning |
| `.palette-critical` | Palette critical |

## Accessibilité

- Utiliser des structures sémantiques (table, ul, ol)
- Fournir des en-têtes pour les tableaux
- Supporter le tri et la pagination accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
