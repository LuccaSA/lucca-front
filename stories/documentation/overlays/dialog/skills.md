---
description: Composant Dialog - composants affichés par-dessus le contenu principal
triggers:
  - dialog
  - dialogue
  - button
  - dialogcontent
  - dialogdismiss
  - dialogfooter
  - dialogheader
  - ludialogref
  - ludialog
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

Le composant **Dialog** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Dialog/Basic`
**Component:** `DialogBasicStory`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderComponent, LuDialogRef, LuDialogService, configureLuDialog, injectDialogData, injectDialogRef, provideLuDialog, DialogCloseDirective, DialogHeaderAction, DialogOpenDirective, LuDialogConfig, DIALOG_ROUTE_DISMISS_TRIGGER, dialogRouteFactory, provideDialogRoutingReuseStrategy } from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { CheckboxInputComponent, TextInputComponent, NumberInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { LinkComponent } from '@lucca-front/ng/link';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Dialog

- Confirmations importantes
- Formulaires contextuels
- Informations complémentaires

### Quand ne pas utiliser

- Contenu principal de la page
- Navigation fréquente

## Exemples

### Exemple basique

```html
<lu-dialog>
<lu-dialog-header>Header</lu-dialog-header>
<lu-dialog-content>
<lu-form-field label=
```

### Autres exemples

```html
<button luButton (click)=

<lu-dialog #dialog>
<lu-dialog-header>
<h1>Confirmation</h1>
</lu-dialog-header>
<lu-dialog-content>Lorem ipsum dolor</lu-dialog-content>
<lu-dialog-footer>
<div class=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.dialog_backdrop` | Classe de base |
| `.dialog-inside` | Classe de base |
| `.dialog-inside-formOptional` | Classe de base |
| `.dialog-inside-header` | Classe de base |
| `.dialog-inside-header-button` | Classe de base |
| `.mod-ghost` | Modificateur ghost |
| `.mod-drawer` | Modificateur drawer |
| `.mod-fromBottom` | Modificateur fromBottom |

## Accessibilité

- Gérer le focus trap dans les modales
- Permettre la fermeture avec Escape
- Annoncer l'ouverture aux lecteurs d'écran
- Utiliser aria-modal et role="dialog"

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
