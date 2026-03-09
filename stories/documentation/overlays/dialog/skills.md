---
description: Dialog component from Lucca Front design system
triggers:
  - dialog
  - button
  - dialogcontent
  - dialogdismiss
  - dialogfooter
  - dialogheader
  - ludialogref
  - ludialogservice
  - configureludialog
  - injectdialogdata
  - injectdialogref
  - provideludialog
  - dialogclose
  - dialogheaderaction
  - dialogopen
  - ludialogconfig
  - dialog_route_dismiss_trigger
  - dialogroutefactory
  - providedialogroutingreusestrategy
  - form-field
  - formfield
  - simple-select
  - lusimpleselectinput
  - forms
  - checkboxinput
  - textinput
  - numberinput
  - icon
  - callout
  - link
  - modal
  - popup
  - overlay
  - layer
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Dialog

## Description

Dialog est un composant de la catégorie **Overlays** du design system Lucca Front.

**Story path:** `Documentation/Overlays/Dialog/Basic`

**Component:** `DialogBasicStory`

## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderComponent, LuDialogRef, LuDialogService, configureLuDialog, injectDialogData, injectDialogRef, provideLuDialog, , DialogCloseDirective, DialogHeaderAction, DialogOpenDirective, LuDialogConfig, DIALOG_ROUTE_DISMISS_TRIGGER, dialogRouteFactory, provideDialogRoutingReuseStrategy } from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { CheckboxInputComponent, TextInputComponent, NumberInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { LinkComponent } from '@lucca-front/ng/link';
```


## Utilisation

### Quand utiliser Dialog

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
