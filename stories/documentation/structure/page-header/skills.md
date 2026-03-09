---
description: Composant Page header - composants pour structurer la mise en page
triggers:
  - page-header
  - pageheader
  - breadcrumbs
  - breadcrumbslink
  - button
  - form-field
  - formfield
  - forms
  - textinput
  - horizontal-navigation
  - horizontalnavigation
  - horizontalnavigationlink
  - icon
  - link
  - tooltip
  - lutooltip
  - layout
  - container
  - structure
  - grid
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Page header

## Description

Le composant **Page header** fait partie de la catégorie **Structure** du design system Lucca Front.

Composants pour structurer la mise en page.

**Story path:** `Documentation/Structure/PageHeader/Angular/Basic`


## Imports

```typescript
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```


## Utilisation

### Quand utiliser Page header

- Organisation du contenu
- Mise en page
- Conteneurs

### Quand ne pas utiliser

- Composants interactifs

## Exemples

### Exemple basique

```html
<lu-page-header ...> ..................... </lu-page-header>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.horizontalNavigation-list-item-action` | Classe de base |
| `.breadcrumbs-list-item-action` | Classe de base |
| `.pageHeader` | Classe de base |
| `.pageHeader-content` | Classe de base |
| `.pageHeader-content-title` | Classe de base |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-ghost` | Modificateur ghost |
| `.mod-search` | Modificateur search |
| `.mod-outline` | Modificateur outline |
| `.mod-XS` | Modificateur XS |
| `.mod-withBreadcrumbs` | Modificateur withBreadcrumbs |
| `.mod-withHorizontalNavigation` | Modificateur withHorizontalNavigation |

## Accessibilité

- Utiliser des landmarks appropriés
- Maintenir un ordre de lecture logique
- Structurer le contenu de manière sémantique

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
