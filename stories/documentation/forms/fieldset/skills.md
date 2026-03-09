---
description: Composant Fieldset - composants pour la saisie et validation de données utilisateur
triggers:
  - fieldset
  - button
  - form-field
  - formfield
  - forms
  - textinput
  - grid
  - gridcolumn
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

# Fieldset

## Description

Le composant **Fieldset** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Fieldset/Angular/Basic`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Fieldset

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
@let column = { colspanAtMediaMinXXS: 2 }; ... <lu-fieldset...............>
<lu-grid mode=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.fieldset-title-content-text-helper` | Classe de base |
| `.grid` | Classe de base |
| `.grid-column` | Classe de base |
| `.form-field` | Classe de base |
| `.formLabel` | Classe de base |
| `.mod-form` | Modificateur form |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
