---
description: Composant Listbox option - composants pour la saisie et validation de données utilisateur
triggers:
  - listbox-option
  - listboxoption
  - icon
  - listbox
  - option
  - treeitem
  - loading
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

# Listbox option

## Description

Le composant **Listbox option** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Listbox Option/Angular/Add option`


## Imports

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent, Treeitem } from '@lucca-front/ng/listbox';
import { LoadingComponent } from '@lucca-front/ng/loading';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `alt` | `string` | `-` | Information conveyed by the screen reader |
| `size` | `'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'` | `-` | Which size should the icon be? XXS to XXL |
| `color` | `'primary' | 'secondary' | 'product' | 'error' |...` | `inherit` | Changes the color of the icon (inherit by default) |

## Utilisation

### Quand utiliser Listbox option

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
| `.listboxOption` | Classe de base |
| `.listboxOption-content` | Classe de base |
| `.listboxOption-content-checkboxField` | Classe de base |
| `.checkboxField` | Classe de base |
| `.listboxOption-content-checkboxField-input` | Classe de base |
| `.mod-add` | Modificateur add |
| `.mod-select` | Modificateur select |
| `.is-hovered` | État hovered |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
