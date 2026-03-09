---
description: Rich text component from Lucca Front design system
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
  - input
  - form
  - field
  - control
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

Rich text est un composant de la catégorie **Forms** du design system Lucca Front.

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


## Utilisation

### Quand utiliser Rich text

<!-- TODO: Décrire les cas d'usage appropriés -->

### Quand ne pas utiliser

<!-- TODO: Décrire les cas où un autre composant serait plus approprié -->

## Exemples

### Exemple basique

```html
<!-- TODO: Ajouter un exemple de code basique -->
```

### Exemple avancé

```typescript
<!-- TODO: Ajouter un exemple de code avancé -->
```

## Accessibilité

<!-- TODO: Documenter les considérations d'accessibilité -->

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- TODO: Lister les composants liés -->
