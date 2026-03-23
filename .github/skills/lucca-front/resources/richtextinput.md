# RichTextInputComponent

## Quand utiliser ce composant
- Lors de la création de formulaires nécessitant un champ de texte riche (texte formaté).
- Pour permettre aux utilisateurs d'entrer et de formater du texte, incluant du markdown ou des balises HTML.
- Quand un retour visuel dynamique est nécessaire lors de la saisie de texte.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-richtextinput-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-richtextinput-angular--basic)
- [Required With No Initial Value](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-richtextinput-angular--required-with-no-initial-value)
- [With Html Formatter](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-richtextinput-angular--with-html-formatter)
- [With Tag Plugin](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-richtextinput-angular--with-tag-plugin)
- [With Tag Plugin Markdown](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-richtextinput-angular--with-tag-plugin-markdown)
- [With Tag Plugin Plain Text](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-richtextinput-angular--with-tag-plugin-plain-text)
- [With Tag Plugin Markdown Content Change](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-richtextinput-angular--with-tag-plugin-markdown-content-change)

## Composant Figma
[RichTextInput Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6946-36429) — Le composant est un champ de saisie riche avec des options de formatage. Variantes disponibles pour différents états et contenus.

## Import

```typescript
import { RichTextInputComponent, RichTextInputToolbarComponent, HtmlFormatterDirective, MarkdownFormatterDirective, MarkdownFormatterWithTagsDirective, PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-rich-text-input placeholder="Saisissez votre texte ici..."></lu-rich-text-input>
```

## Directive / Composant : `luRichTextInput` ou `<lu-rich-text-input>`

Composant de saisie de texte riche, pouvant être utilisé dans les formulaires Angular pour collecter et formater du texte.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `` (vide) | Variante par défaut, sans état spécifique |
| `"html"` | Utilise un formatage HTML |
| `"markdown"` | Utilise un formatage Markdown |
| `"plain"` | Utilise un formatage simple |

```html
<lu-rich-text-input format="markdown"></lu-rich-text-input>
```

## Inputs

### `placeholder`
Type: `string` — Default: `''`

Texte affiché lorsque le champ est vide.

```html
<lu-rich-text-input [placeholder]="'Entrez votre texte ici...'"></lu-rich-text-input>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le champ si vrai.

```html
<lu-rich-text-input [disabled]="true"></lu-rich-text-input>
```

### `required`
Type: `boolean` — Default: `false`

Indique si le champ est obligatoire.

```html
<lu-rich-text-input [required]="true"></lu-rich-text-input>
```

### `disableSpellcheck`
Type: `boolean` — Default: `false`

Désactive le correcteur d'orthographe du navigateur.

```html
<lu-rich-text-input [disableSpellcheck]="true"></lu-rich-text-input>
```

### `autoResize`
Type: `boolean` — Default: `false`

Permet au champ de s'ajuster automatiquement en fonction de la quantité de texte.

```html
<lu-rich-text-input [autoResize]="true"></lu-rich-text-input>
```

## Patterns courants

### Saisie de texte avec validation
```html
<lu-rich-text-input placeholder="Saisissez votre texte ici..." [required]="true"></lu-rich-text-input>
```

## Accessibilité
Assurez-vous que le champ de saisie inclut des attributs ARIA appropriés pour indiquer l'état de validation et d'obligation.

## Guidelines Prisme
- Suivre les standards de design et d'interaction selon Lucca.
- Évitez d'utiliser trop d'options de formatage pour ne pas surcharger l'utilisateur.