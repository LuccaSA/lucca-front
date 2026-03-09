---
description: Composant Skip links - composants pour la navigation dans l'application
triggers:
  - skip-links
  - skiplinks
  - a11y
  - luskiplinks
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

# Skip links

## Description

Le composant **Skip links** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/SkipLinks/Basic`
**Component:** `SkipLinksStory`


## Imports

```typescript
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
```


## Utilisation

### Quand utiliser Skip links

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
<lu-skip-links />
<div id=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.button` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-app` | Classe de base |
| `.icon-peopleGroup` | Classe de base |
| `.icon-transportRocket` | Classe de base |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-ghost` | Modificateur ghost |
| `.mod-withIcon` | Modificateur withIcon |
| `.palette-product` | Palette product |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
