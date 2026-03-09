---
description: Composant Textarea - composants pour la saisie et validation de données utilisateur
triggers:
  - textarea
  - form-field
  - formfield
  - forms
  - textareainput
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

# Textarea

## Description

Le composant **Textarea** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Fields/TextAreaField/Angular`


## Imports

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextareaInputComponent } from '@lucca-front/ng/forms';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

## Utilisation

### Quand utiliser Textarea

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
| `.textField-input-valueClone` | Classe de base |
| `.form-field` | Classe de base |
| `.formLabel` | Classe de base |
| `.textField` | Classe de base |
| `.textField-input` | Classe de base |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
