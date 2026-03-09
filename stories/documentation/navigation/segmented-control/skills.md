---
description: Composant Segmented control - composants pour la navigation dans l'application
triggers:
  - segmented-control
  - segmentedcontrol
  - numeric-badge
  - numericbadge
  - segmented-control-tabs
  - segmentedcontroltabs
  - segmentedcontroltabspanel
  - segmentedcontrolfilter
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

# Segmented control

## Description

Le composant **Segmented control** fait partie de la catégorie **Navigation** du design system Lucca Front.

Composants pour la navigation dans l'application.

**Story path:** `Documentation/Navigation/segmentedControl/Angular/Tabs`


## Imports

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'XS' | 'S' | 'M'` | `-` | The size of the badge |
| `palette` | `Palette` | `none` | The palette to use for this badge. Defaults to 'none' (inherits parent palette) |
| `maxValue` | `number` | `999` | Indicates the maximum value of number for the numeric badge |

## Utilisation

### Quand utiliser Segmented control

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
<ng-template #label> Lorem... </ng-template>
<lu-segmented-control-tabs......>
<lu-segmented-control-tabs-panel [label]=
```

### Autres exemples

```html
<ng-template #label> Lorem... </ng-template>
<lu-segmented-control...... [(ngModel)]=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.demo` | Classe de base |
| `.numericBadge` | Classe de base |
| `.segmentedControl-item` | Classe de base |
| `.segmentedControl-item-input` | Classe de base |
| `.segmentedControl-item-action` | Classe de base |

## Accessibilité

- Utiliser des landmarks nav appropriés
- Indiquer la page courante avec aria-current
- Supporter la navigation au clavier

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
