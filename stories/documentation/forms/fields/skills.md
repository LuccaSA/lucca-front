---
description: Composant Fields - composants pour la saisie et validation de données utilisateur
triggers:
  - fields
  - form-field
  - formfield
  - input
  - forms
  - radio
  - radiogroupinput
  - textinput
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

# Fields

## Description

Le composant **Fields** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Fields/[Test] Form Field Async Loading`
**Component:** `FormFieldComponent`


## Imports

```typescript
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

## Utilisation

### Quand utiliser Fields

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
@if(timer$ | async){ <form [formGroup]=
```

### Autres exemples

```html
<lu-form-field extraDescribedBy=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.textField` | Classe de base |
| `.textField-input` | Classe de base |
| `.textField-input-value` | Classe de base |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
