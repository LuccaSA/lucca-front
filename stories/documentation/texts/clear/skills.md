---
description: Composant Clear - composants pour la typographie et le contenu textuel
triggers:
  - clear
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

# Clear

## Description

Le composant **Clear** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/Clear/Angular/Basic`


## Imports

```typescript
import { ClearComponent } from '@lucca-front/ng/clear';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'S' | null` | `null` | Which size should the clear be? Defaults to small |
| `palette` | `Palette` | `none` | Which palette should be used for the entire clear |

## Utilisation

### Quand utiliser Clear

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
<lu-clear............>...</lu-clear>
```


## Classes CSS

| Classe | Description |
|--------|-------------|

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
