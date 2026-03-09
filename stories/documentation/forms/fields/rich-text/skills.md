---
description: Composant Rich text - composants pour la saisie et validation de données utilisateur
triggers:
  - rich-text
  - richtext
  - button
  - divider
  - form-field
  - formfield
  - forms/rich-text-input
  - richtextinput
  - richtextinputtoolbar
  - richtextplugintag
  - forms/rich-text-input/formatters/html
  - htmlformatter
  - forms/rich-text-input/formatters/markdown
  - default_markdown_transformers
  - markdownformatter
  - markdownformatterwithtags
  - tags
  - forms/rich-text-input/formatters/plain-text
  - plaintext_tags
  - plaintextformatterwithtags
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Rich text

## Description

Le composant **Rich text** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Fields/RichTextInput/Angular`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RichTextInputComponent, RichTextInputToolbarComponent, RichTextPluginTagComponent } from '@lucca-front/ng/forms/rich-text-input';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { DEFAULT_MARKDOWN_TRANSFORMERS, MarkdownFormatterDirective, MarkdownFormatterWithTagsDirective, TAGS } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { PLAINTEXT_TAGS, PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Rich text

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
