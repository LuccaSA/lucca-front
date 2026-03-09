---
description: Composant Read more - composants pour la typographie et le contenu textuel
triggers:
  - read-more
  - readmore
  - tag
  - text
  - typography
  - content
  - label
  - badge
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Read more

## Description

Le composant **Read more** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/ReadMore/Angular/AI`


## Imports

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { TagComponent } from '@lucca-front/ng/tag';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `lineClamp` | `number` | `5` | Change the number of lines displayed when collapsed |
| `surface` | `null | 'sunken' | 'default' | string` | `null` | Apply the spacing of the Text Flow component |
| `innerContent` | `null | string` | `null` | Allow content to be passed via innerHTML |

## Utilisation

### Quand utiliser Read more

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
<lu-read-more...... />
```

### Autres exemples

```html
<lu-read-more......> ... </lu-read-more>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.box` | Classe de base |
| `.mod-elementAfterText` | Modificateur elementAfterText |

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
