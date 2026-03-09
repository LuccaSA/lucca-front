---
description: Composant Filter pills - composants pour la saisie et validation de données utilisateur
triggers:
  - filter-pills
  - filterpills
  - date2
  - dateinput
  - daterangeinput
  - filterpill
  - filterbar
  - filterpilladdonafter
  - filterpilladdonbefore
  - forms
  - checkboxinput
  - textinput
  - button
  - core-select/api
  - lucoreselectapiv4
  - divider
  - form-field
  - formfield
  - multi-select
  - lumultiselectinput
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Filter pills

## Description

Le composant **Filter pills** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/FiltersPills/Checkbox/Angular`


## Imports

```typescript
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent, FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent, LuMultiDisplayerDirective, LuMultiSelectCounterDisplayerComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuDisplayerDirective, LuOptionDirective, LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
```


## Utilisation

### Quand utiliser Filter pills

- Saisie de données
- Formulaires
- Configuration
- Filtres

### Quand ne pas utiliser

- Affichage de données en lecture seule
- Navigation

## Exemples

### Exemple basique

```html
<lu-filter-pill label=
```

### Autres exemples

```html
<lu-filter-bar>
<lu-segmented-control class=

@if (multiple()) { <lu-multi-select #selectRef data-qa=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.divider` | Classe de base |
| `.filterBar-segmentedControl` | Classe de base |
| `.filterPill` | Classe de base |
| `.filterPill-label` | Classe de base |
| `.filterPill-label-placeholder` | Classe de base |
| `.mod-button` | Modificateur button |
| `.mod-selectOption` | Modificateur selectOption |
| `.is-filled` | État filled |
| `.is-empty` | État empty |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
