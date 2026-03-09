---
description: Composant Dropdown - composants affichés par-dessus le contenu principal
triggers:
  - dropdown
  - menu-deroulant
  - ludropdown
  - ludropdowntrigger
  - dropdownaction
  - dropdowndivider
  - dropdowngroup
  - dropdownitem
  - dropdownmenu
  - button
  - icon
  - popover2
  - popoverposition
  - modal
  - popup
  - overlay
  - layer
  - dialog
  - floating
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Dropdown

## Description

Le composant **Dropdown** fait partie de la catégorie **Overlays** du design system Lucca Front.

Composants affichés par-dessus le contenu principal.

**Story path:** `Documentation/Overlays/Dropdown/Angular/Basic`
**Component:** `DropdownBasicStory`


## Imports

```typescript
import { LuDropdownModule, LuDropdownTriggerDirective, DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent } from '@lucca-front/ng/dropdown';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverPosition } from '@lucca-front/ng/popover2';
```


## Utilisation

### Quand utiliser Dropdown

- Confirmations importantes
- Formulaires contextuels
- Informations complémentaires

### Quand ne pas utiliser

- Contenu principal de la page
- Navigation fréquente

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.button` | Classe de base |
| `.dropdown-list-option` | Classe de base |
| `.dropdown-list-option-action` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-eye` | Classe de base |
| `.mod-critical` | Modificateur critical |
| `.is-disabled` | État disabled |

## Accessibilité

- Gérer le focus trap dans les modales
- Permettre la fermeture avec Escape
- Annoncer l'ouverture aux lecteurs d'écran
- Utiliser aria-modal et role="dialog"

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
