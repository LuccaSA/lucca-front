---
description: Composant Vertical navigation - composants pour la navigation dans l'application
triggers:
  - vertical-navigation
  - verticalnavigation
  - verticalnavigationgroup
  - verticalnavigationitem
  - verticalnavigationlink
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

# Vertical navigation

## Description

Le composant **Vertical navigation** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/VerticalNavigation/Angular/Disabled`


## Imports

```typescript
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `level` | `number` | `3` | Defines aria level for heading title |

## Utilisation

### Quand utiliser Vertical navigation

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
<lu-vertical-navigation heading=
```

### Autres exemples

```html
<lu-vertical-navigation...>
<lu-vertical-navigation-group label=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.verticalNavigation` | Classe de base |
| `.verticalNavigation-sectionTitle` | Classe de base |
| `.verticalNavigation-list` | Classe de base |
| `.verticalNavigation-list-item` | Classe de base |
| `.verticalNavigation-list-item-link` | Classe de base |
| `.mod-child` | Modificateur child |
| `.mod-iconless` | Modificateur iconless |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
