---
description: Composant Status badge - composants pour la typographie et le contenu textuel
triggers:
  - status-badge
  - statusbadge
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

# Status badge

## Description

Le composant **Status badge** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/StatusBadge/Angular`


## Imports

```typescript
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'L' | 'M'` | `M` | Changes the size of the status badge (Medium by default or L) |
| `palette` | `Palette | null` | `null` | Applies a color palette to the status badge |

## Utilisation

### Quand utiliser Status badge

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
<lu-status-badge label=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.statusBadge` | Classe de base |
| `.mod-L` | Modificateur L |
| `.palette-product` | Palette product |
| `.palette-neutral` | Palette neutral |
| `.palette-success` | Palette success |
| `.palette-warning` | Palette warning |
| `.palette-error` | Palette error |

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
