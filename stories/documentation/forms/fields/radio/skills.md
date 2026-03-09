---
description: Composant Radio - composants pour la saisie et validation de données utilisateur
triggers:
  - radio
  - bouton-radio
  - form-field
  - formfield
  - forms
  - radiogroupinput
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

# Radio

## Description

Le composant **Radio** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Fields/RadioField/Angular`


## Imports

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

## Utilisation

### Quand utiliser Radio

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
| `.form-fieldset` | Classe de base |
| `.formLabel` | Classe de base |
| `.formLabel-required` | Classe de base |
| `.form-field` | Classe de base |
| `.radioField` | Classe de base |
| `.mod-inline` | Modificateur inline |
| `.mod-S` | Modificateur S |
| `.is-error` | État error |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
