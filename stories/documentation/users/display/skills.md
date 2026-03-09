---
description: Composant Display - composants pour afficher des informations utilisateur
triggers:
  - display
  - user
  - iluuser
  - ludisplayformat
  - ludisplayfullname
  - ludisplayhybrid
  - ludisplayinitials
  - luuserdisplay
  - button
  - user-popover
  - luuserpopover
  - avatar
  - profile
  - person
  - employee
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Display

## Description

Le composant **Display** fait partie de la catégorie **Users** du design system Lucca Front.

Composants pour afficher des informations utilisateur.

**Story path:** `Documentation/Users/Display/Basic`
**Component:** `DisplayStory`


## Imports

```typescript
import { ILuUser, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials, LuUserDisplayModule } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `displayFormat` | `'...Object.values(LuDisplayFullname)' \| '...Ob...` | `LuDisplayFullname.lastfirst` | - |

## Utilisation

### Quand utiliser Display

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
| `.userPopover_trigger` | Classe de base |

## Accessibilité

- Fournir un texte alternatif pour les avatars
- Ne pas reposer uniquement sur les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
