---
description: Composant Comment - composants pour la typographie et le contenu textuel
triggers:
  - comment
  - commentblock
  - commentchat
  - user
  - luuserpicture
  - text
  - typography
  - content
  - label
  - badge
  - tag
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Comment

## Description

Le composant **Comment** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/Comment/Angular/AI`


## Imports

```typescript
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
```


## Utilisation

### Quand utiliser Comment

- Mise en forme de texte
- Labels
- Badges
- Tags

### Quand ne pas utiliser

- Actions interactives
- Formulaires

## Exemples

### Exemple basique

```html
<lu-comment-chat>
<lu-comment-block compact [avatar]=
```

### Autres exemples

```html
<lu-comment-block ... ..., argTypes, )} authorName=

<lu-comment-chat>
<lu-comment-block ... ..., argTypes, )} authorName=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.comment` | Classe de base |
| `.comment-infos` | Classe de base |
| `.avatar` | Classe de base |
| `.comment-infos-content` | Classe de base |
| `.comment-infos-name` | Classe de base |
| `.mod-chatAnswer` | Modificateur chatAnswer |
| `.mod-noAvatar` | Modificateur noAvatar |
| `.mod-S` | Modificateur S |
| `.mod-compact` | Modificateur compact |

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
