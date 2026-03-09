---
description: Composant Popover - composants pour afficher des informations utilisateur
triggers:
  - popover
  - user
  - iluuser
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

# Popover

## Description

Le composant **Popover** fait partie de la catégorie **Users** du design system Lucca Front.

Composants pour afficher des informations utilisateur.

**Story path:** `Documentation/Users/Popover/Angular`
**Component:** `UserPopoverStory`


## Imports

```typescript
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```


## Utilisation

### Quand utiliser Popover

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
| `.lu-popover-content` | Classe de base |
| `.userPopover` | Classe de base |
| `.userPopover-details` | Classe de base |
| `.userPopover-details-avatar` | Classe de base |
| `.mod-S` | Modificateur S |
| `.mod-circle` | Modificateur circle |
| `.is-loading` | État loading |

## Accessibilité

- Fournir un texte alternatif pour les avatars
- Ne pas reposer uniquement sur les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
