---
description: Composant Select - composants pour afficher des informations utilisateur
triggers:
  - select
  - selection
  - api
  - luapipagedsearcher
  - input
  - luinputdisplayer
  - option
  - luforoptions
  - luoptionitem
  - luoptionpickeradvanced
  - luoptionpicker
  - luselectinput
  - user
  - luuserdisplaypipe
  - luuserhomonyms
  - luusermeoption
  - iluuser
  - luuserselect
  - luuser
  - avatar
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

Le composant **Select** fait partie de la catégorie **Users** du design system Lucca Front.

Composants pour afficher des informations utilisateur.

**Story path:** `Documentation/Users/Select/Homonymes`
**Component:** `UserHomonymsStory`


## Imports

```typescript
import { LuApiPagedSearcherComponent } from '@lucca-front/ng/api';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuForOptionsDirective, LuOptionItemComponent, LuOptionPickerAdvancedComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuUserDisplayPipe, LuUserHomonymsComponent, LuUserMeOptionDirective, ILuUser, LuUserSelectModule, LuUserModule } from '@lucca-front/ng/user';
```


## Utilisation

### Quand utiliser Select

- Affichage d'utilisateurs
- Avatars
- Profils

### Quand ne pas utiliser

- Données non liées aux utilisateurs

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.textfield` | Classe de base |
| `.textfield-input` | Classe de base |
| `.lu-picker-content-option` | Classe de base |
| `.textfield-label` | Classe de base |
| `.code` | Classe de base |
| `.mod-block` | Modificateur block |

## Accessibilité

- Fournir un texte alternatif pour les avatars
- Ne pas reposer uniquement sur les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
