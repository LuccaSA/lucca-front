---
description: Composant Select - composants pour la saisie et validation de données utilisateur
triggers:
  - select
  - selection
  - color
  - core-select
  - ludisplayer
  - luoption
  - lucoreselectpanelheader
  - lucoreselecttotalcount
  - ludisabledoption
  - luoptiongroup
  - treegroupingfn
  - ɵluoptionoutlet
  - lucoreselectnoclue
  - form-field
  - formfield
  - forms
  - colorinput
  - coloroption
  - simple-select
  - lusimpleselectinput
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Select

## Description

Le composant **Select** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/ColorPicker`
**Component:** `LuSimpleSelectInputComponent`


## Imports

```typescript
import { ColorComponent } from '@lucca-front/ng/color';
import { LuDisplayerDirective, LuOptionDirective, LuCoreSelectPanelHeaderDirective, LuCoreSelectTotalCountDirective, LuDisabledOptionDirective, LuOptionGroupDirective, TreeGroupingFn, ɵLuOptionOutletDirective, LuCoreSelectNoClueDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, ColorOption } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuTooltipTriggerDirective, LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuMultiSelectInputComponent, LuMultiDisplayerDirective, LuMultiSelectContentDisplayerComponent, LuMultiSelectCounterDisplayerComponent, LuMultiSelectDefaultDisplayerComponent, LuMultiSelectDisplayerInputDirective, LuMultiSelection, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { LuCoreSelectApiV4Directive, LuCoreSelectApiV3Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/establishment';
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select/job-qualification';
import { LuCoreSelectOccupationCategoriesDirective } from '@lucca-front/ng/core-select/occupation-category';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId, LuCoreSelectUserOptionDirective } from '@lucca-front/ng/core-select/user';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { ClearComponent } from '@lucca-front/ng/clear';
import { LuInputDirective, LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuOptionModule, LuOptionItemComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { ChipComponent } from '@lucca-front/ng/chip';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuUserDisplayPipe, LuUserPictureComponent } from '@lucca-front/ng/user';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterBarComponent, FilterPillComponent } from '@lucca-front/ng/filter-pills';
```


## Utilisation

### Quand utiliser Select

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
<lu-color-input [colors]=
```

### Autres exemples

```html
<lu-multi-select withSelectAll [totalCount]=

<lu-multi-select #selectRef [clearable]=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.scroll-test` | Classe de base |
| `.textfield-input` | Classe de base |
| `.textfield` | Classe de base |
| `.numericBadge` | Classe de base |
| `.lu-picker-header` | Classe de base |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
