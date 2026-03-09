---
description: Composant Text - composants pour la saisie et validation de données utilisateur
triggers:
  - text
  - texte
  - form-field
  - formfield
  - forms
  - textinput
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

# Text

## Description

Le composant **Text** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Fields/TextField/Angular`


## Imports

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

## Utilisation

### Quand utiliser Text

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
<lu-form-field ..., argTypes, )}>
<lu-text-input ... type=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.form-field` | Classe de base |
| `.formLabel` | Classe de base |
| `.form-field-contentOptional` | Classe de base |
| `.textField` | Classe de base |
| `.textField-input` | Classe de base |
| `.mod-AI` | Modificateur AI |
| `.mod-S` | Modificateur S |
| `.mod-counter` | Modificateur counter |
| `.mod-XS` | Modificateur XS |
| `.mod-valueAlignRight` | Modificateur valueAlignRight |
| `.mod-width20` | Modificateur width20 |
| `.mod-width30` | Modificateur width30 |
| `.mod-width40` | Modificateur width40 |
| `.mod-width50` | Modificateur width50 |
| `.mod-width60` | Modificateur width60 |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
