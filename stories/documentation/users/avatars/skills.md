---
description: Composant Avatars - composants pour afficher des informations utilisateur
triggers:
  - avatars
  - user
  - ludisplayinitials
  - luuserpicture
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

# Avatars

## Description

Le composant **Avatars** fait partie de la catégorie **Users** du design system Lucca Front.

Composants pour afficher des informations utilisateur.

**Story path:** `Documentation/Users/Avatar/Angular/Basic`
**Component:** `AvatarStory`


## Imports

```typescript
import { LuDisplayInitials, LuUserPictureComponent, LuUserPictureModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```


## Utilisation

### Quand utiliser Avatars

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
| `.avatarWrapper` | Classe de base |
| `.avatarWrapper-item` | Classe de base |
| `.avatar` | Classe de base |
| `.avatarWrapper-item-action` | Classe de base |
| `.mod-placeholder` | Modificateur placeholder |
| `.mod-AI` | Modificateur AI |
| `.mod-XS` | Modificateur XS |
| `.mod-S` | Modificateur S |
| `.mod-M` | Modificateur M |
| `.mod-L` | Modificateur L |
| `.mod-XL` | Modificateur XL |
| `.mod-XXL` | Modificateur XXL |
| `.mod-XXXL` | Modificateur XXXL |

## Accessibilité

- Fournir un texte alternatif pour les avatars
- Ne pas reposer uniquement sur les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
