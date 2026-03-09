---
description: Composant Listing - composants pour afficher des listes et collections de données
triggers:
  - listing
  - listingitem
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

# Listing

## Description

Le composant **Listing** fait partie de la catégorie **Listings** du design system Lucca Front.

Composants pour afficher des listes et collections de données.

**Story path:** `Documentation/Listings/Listing/Angular/Basic`
**Component:** `ListingComponent`


## Imports

```typescript
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `palette` | `Palette` | `none` | Applies a color palette to the listing |

## Utilisation

### Quand utiliser Listing

- Affichage de collections
- Tableaux de données
- Listes d'éléments

### Quand ne pas utiliser

- Élément unique
- Formulaires

## Exemples

### Exemple basique

```html
<lu-listing........................>
<lu-listing-item>item</lu-listing-item>
<lu-listing-item...>item</lu-listing-item>
<lu-listing-item> item <lu-listing.....................>
<lu-listing-item>item</lu-listing-item>
<lu-listing-item>item</lu-listing-item>
<lu-listing-item>item</lu-listing-item>
</lu-listing>
</lu-listing-item>
</lu-listing>
```

### Autres exemples

```html
<lu-listing inline...............>
<lu-listing-item>Lorem ipsum</lu-listing-item>
<lu-listing-item...>Lorem ipsum dolor sit amet</lu-listing-item>
<lu-listing-item>Lorem ipsum dolor sit</lu-listing-item>
<lu-listing-item>Lorem</lu-listing-item>
<lu-listing-item>Lorem ipsum dolor</lu-listing-item>
<lu-listing-item>Lorem ipsum dolor sit amet</lu-listing-item>
</lu-listing>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.listing` | Classe de base |
| `.listing-item` | Classe de base |
| `.listing-item-content` | Classe de base |
| `.listing-item-icon` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.mod-checklist` | Modificateur checklist |
| `.mod-inline` | Modificateur inline |
| `.mod-divider` | Modificateur divider |
| `.mod-icons` | Modificateur icons |
| `.palette-success` | Palette success |
| `.palette-product` | Palette product |

## Accessibilité

- Utiliser des structures sémantiques (table, ul, ol)
- Fournir des en-têtes pour les tableaux
- Supporter le tri et la pagination accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
