---
description: Composant Tags - composants pour la typographie et le contenu textuel
triggers:
  - tags
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

# Tags

## Description

Le composant **Tags** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/Tags/Angular/Basic`
**Component:** `TagComponent`


## Imports

```typescript
import { TagComponent } from '@lucca-front/ng/tag';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'S' | 'M' | 'L'` | `M` | Which size should the tag be? Defaults to medium |
| `link` | `string` | `-` | For routerLink usage |

## Utilisation

### Quand utiliser Tags

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
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.tag` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-heart` | Classe de base |
| `.tag-content` | Classe de base |
| `.mod-AI` | Modificateur AI |
| `.mod-outlined` | Modificateur outlined |
| `.mod-L` | Modificateur L |
| `.mod-M` | Modificateur M |
| `.mod-S` | Modificateur S |
| `.palette-product` | Palette product |
| `.palette-success` | Palette success |
| `.palette-warning` | Palette warning |
| `.palette-error` | Palette error |
| `.palette-kiwi` | Palette kiwi |

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
