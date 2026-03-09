---
description: Composant Examples - composants pour la saisie et validation de données utilisateur
triggers:
  - examples
  - divider
  - form
  - form-field
  - formfield
  - form-header
  - formheader
  - forms
  - fieldset
  - textinput
  - grid
  - gridcolumn
  - input
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

# Examples

## Description

Le composant **Examples** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Examples/Angular`


## Imports

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FormHeaderComponent } from '@lucca-front/ng/form-header';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | null` | `null` | Which size should the chip be? Defaults or small |

## Utilisation

### Quand utiliser Examples

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
<form luForm maxWidth>
<lu-form-header>Form title</lu-form-header>
<lu-fieldset heading=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.form` | Classe de base |
| `.form-header` | Classe de base |
| `.form-header-title` | Classe de base |
| `.form-header-mandatory` | Classe de base |
| `.form-header-mandatory-asterisk` | Classe de base |
| `.mod-maxWidth` | Modificateur maxWidth |
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
