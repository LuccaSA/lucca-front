---
description: Composant Resource card - composants pour structurer la mise en page
triggers:
  - resource-card
  - resourcecard
  - button
  - icon
  - link
  - resourcecardbutton
  - resourcecardlink
  - resourcecardwrapper
  - status-badge
  - statusbadge
  - tag
  - tooltip
  - lutooltiptrigger
  - lutooltip
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

# Resource card

## Description

Le composant **Resource card** fait partie de la catégorie **Structure** du design system Lucca Front.

Composants pour structurer la mise en page.

**Story path:** `Documentation/Structure/Resource Card/Angular/Basic`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective, LuTooltipModule } from '@lucca-front/ng/tooltip';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |
| `wrapperDraggable` | `any` | `false` | - |
| `wrapperGrid` | `any` | `false` | - |

## Utilisation

### Quand utiliser Resource card

- Organisation du contenu
- Mise en page
- Conteneurs

### Quand ne pas utiliser

- Composants interactifs

## Exemples

### Exemple basique

```html
<lu-resource-card-wrapper.........>......</lu-resource-card-wrapper>
```

### Autres exemples

```html
<lu-resource-card-wrapper cdkDropList draggable...>...</lu-resource-card-wrapper>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.resourceCardContainer` | Classe de base |
| `.resourceCard` | Classe de base |
| `.resourceCard-layout` | Classe de base |
| `.resourceCard-layout-header` | Classe de base |
| `.resourceCard-layout-header-title` | Classe de base |
| `.is-disabled` | État disabled |

## Accessibilité

- Utiliser des landmarks appropriés
- Maintenir un ordre de lecture logique
- Structurer le contenu de manière sémantique

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
