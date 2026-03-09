---
description: Composant Tile - composants pour afficher des informations utilisateur
triggers:
  - tile
  - user
  - luuserdisplay
  - luuserpicture
  - luusertile
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

# Tile

## Description

Le composant **Tile** fait partie de la catégorie **Users** du design system Lucca Front.

Composants pour afficher des informations utilisateur.

**Story path:** `Documentation/Users/Tile/Angular/Format`
**Component:** `UserTileFormatStory`


## Imports

```typescript
import { LuUserDisplayModule, LuUserPictureModule, LuUserTileComponent, LuUserTileModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```


## Utilisation

### Quand utiliser Tile

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
| `.userTile` | Classe de base |
| `.avatar` | Classe de base |
| `.avatar-picture` | Classe de base |
| `.userTile-content` | Classe de base |
| `.mod-XS` | Modificateur XS |
| `.mod-S` | Modificateur S |
| `.mod-L` | Modificateur L |

## Accessibilité

- Fournir un texte alternatif pour les avatars
- Ne pas reposer uniquement sur les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
