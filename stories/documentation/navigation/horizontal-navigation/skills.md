---
description: Composant Horizontal navigation - composants pour la navigation dans l'application
triggers:
  - horizontal-navigation
  - horizontalnavigation
  - horizontalnavigationlink
  - numeric-badge
  - numericbadge
  - scroll-box
  - scrollbox
  - nav
  - menu
  - navigate
  - route
  - link
  - breadcrumb
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Horizontal navigation

## Description

Le composant **Horizontal navigation** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/HorizontalNavigation/Angular`


## Imports

```typescript
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `null | 'S'` | `null` | Which size should the horizontal navigation be? Defaults and small |

## Utilisation

### Quand utiliser Horizontal navigation

- Navigation entre pages
- Menus
- Fil d'Ariane
- Pagination

### Quand ne pas utiliser

- Actions (utiliser Button)
- Affichage de données

## Exemples

### Exemple basique

```html
<lu-horizontal-navigation...>
<a *luHorizontalNavigationLink class=
```

### Autres exemples

```html
<lu-scroll-box [attr.style]=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.horizontalNavigation-list-item-action` | Classe de base |
| `.horizontalNavigation-list` | Classe de base |
| `.horizontalNavigation-list-item` | Classe de base |
| `.horizontalNavigation` | Classe de base |
| `.horizontalNavigation-containerOptional` | Classe de base |
| `.is-disabled` | État disabled |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
