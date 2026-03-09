---
description: Composant File toolbar - composants pour la saisie et validation de données utilisateur
triggers:
  - file-toolbar
  - filetoolbar
  - button
  - icon
  - tooltip
  - lutooltip
  - input
  - form
  - field
  - control
  - validation
  - saisie
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# File toolbar

## Description

Le composant **File toolbar** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/File/FileToolbar/HTML&CSS/Basic`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser File toolbar

- Saisie de données
- Formulaires
- Configuration
- Filtres

### Quand ne pas utiliser

- Affichage de données en lecture seule
- Navigation

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.fileToolbar-list-item` | Classe de base |
| `.fileToolbar-list-item-button` | Classe de base |
| `.fileToolbar-list-item-button-icon` | Classe de base |
| `.fileToolbar` | Classe de base |
| `.fileToolbar-list` | Classe de base |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
