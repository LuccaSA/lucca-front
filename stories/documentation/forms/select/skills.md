---
description: Select component from Lucca Front design system
triggers:
  - select
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
  - tooltip
  - lutooltiptrigger
  - lutooltip
  - multi-select
  - lumultiselectinput
  - lumultidisplayer
  - lumultiselectcontentdisplayer
  - lumultiselectcounterdisplayer
  - lumultiselectdefaultdisplayer
  - lumultiselectdisplayerinput
  - lumultiselection
  - lumultiselectwithselectall
  - core-select/api
  - lucoreselectapiv4
  - lucoreselectapiv3
  - core-select/department
  - lucoreselectdepartments
  - core-select/establishment
  - lucoreselectestablishments
  - core-select/job-qualification
  - lucoreselectjobqualifications
  - core-select/occupation-category
  - lucoreselectoccupationcategories
  - core-select/user
  - lucoreselectusers
  - providecoreselectcurrentuserid
  - lucoreselectuseroption
  - tree-select
  - treeselect
  - clear
  - input
  - luinput
  - luinputdisplayer
  - option
  - luoptionitem
  - luoptionpicker
  - luselectinput
  - chip
  - icon
  - user
  - luuserdisplaypipe
  - luuserpicture
  - divider
  - filter-pills
  - filterbar
  - filterpill
  - form
  - field
  - control
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

Select est un composant de la catégorie **Forms** du design system Lucca Front.

**Story path:** `Documentation/Forms/ColorPicker`

**Component:** `LuSimpleSelectInputComponent`

## Imports

```typescript
import { ColorComponent } from '@lucca-front/ng/color';
import { LuDisplayerDirective, LuOptionDirective, LuCoreSelectPanelHeaderDirective, LuCoreSelectTotalCountDirective, LuDisabledOptionDirective, LuOptionGroupDirective, TreeGroupingFn, ɵLuOptionOutletDirective, , LuCoreSelectNoClueDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, ColorOption } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuTooltipTriggerDirective, LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuMultiSelectInputComponent, LuMultiDisplayerDirective, LuMultiSelectContentDisplayerComponent, LuMultiSelectCounterDisplayerComponent, LuMultiSelectDefaultDisplayerComponent, LuMultiSelectDisplayerInputDirective, LuMultiSelection, LuMultiSelectWithSelectAllDirective,  } from '@lucca-front/ng/multi-select';
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

<!-- TODO: Décrire les cas d'usage appropriés -->

### Quand ne pas utiliser

<!-- TODO: Décrire les cas où un autre composant serait plus approprié -->

## Exemples

### Exemple basique

```html
<!-- TODO: Ajouter un exemple de code basique -->
```

### Exemple avancé

```typescript
<!-- TODO: Ajouter un exemple de code avancé -->
```

## Accessibilité

<!-- TODO: Documenter les considérations d'accessibilité -->

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- TODO: Lister les composants liés -->
