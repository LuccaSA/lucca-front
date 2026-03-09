---
description: Composant Input framed - composants pour la saisie et validation de données utilisateur
triggers:
  - input-framed
  - inputframed
  - form-field
  - formfield
  - forms
  - checkboxinput
  - radio
  - radiogroupinput
  - grid
  - gridcolumn
  - icon
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

# Input framed

## Description

Le composant **Input framed** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Input Framed/Angular/Basic`


## Imports

```typescript
import { FormFieldComponent, InputFramedComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

## Utilisation

### Quand utiliser Input framed

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
<lu-form-field label=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.grid-column` | Classe de base |
| `.inputFramedWrapper` | Classe de base |
| `.inputFramed` | Classe de base |
| `.inputFramed-header` | Classe de base |
| `.form-field` | Classe de base |
| `.mod-alignCenter` | Modificateur alignCenter |
| `.mod-autoAtMediaMinXXS` | Modificateur autoAtMediaMinXXS |
| `.mod-L` | Modificateur L |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
