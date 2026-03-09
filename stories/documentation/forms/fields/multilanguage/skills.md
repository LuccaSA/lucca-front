---
description: Composant Multilanguage - composants pour la saisie et validation de données utilisateur
triggers:
  - multilanguage
  - form-field
  - formfield
  - forms
  - multilanguageinput
  - multilanguageinputvalidators
  - multilanguagetranslation
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

# Multilanguage

## Description

Le composant **Multilanguage** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Fields/MultilanguageField/Angular`


## Imports

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent, MultiLanguageInputValidators, MultilanguageTranslation } from '@lucca-front/ng/forms';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

## Utilisation

### Quand utiliser Multilanguage

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


## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
