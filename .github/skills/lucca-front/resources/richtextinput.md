# pr-RichTextfield

## Quand utiliser ce composant
- Pour créer un champ de saisie riche où l'utilisateur peut formater le texte.
- Lorsqu'un retour d'information est nécessaire, comme des messages d'erreur ou des confirmations visuelles de succès.
- Pour des fonctionnalités avancées comme l'intégration de balises ou le formatage HTML dans un champ de saisie.

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
[Consulter le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6946-36429). Variantes disponibles incluent: état de focus, contenu vide, retour d'information critique, présentation par défaut, etc.

## Import

```typescript
import { RichTextInputComponent } from '@lucca-front/ng/forms';
// ou
import { HtmlFormatterDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-rich-text-input></lu-rich-text-input>
```

## Directive / Composant : `lu-rich-text-input` ou `<lu-rich-text-input>`

Composant principal pour l'édition de texte enrichi. Applicable sur tout élément qui doit contenir du texte avec mise en forme.

### Inputs

#### `luWithHtmlFormatter`
Type: `boolean` — Default: `false`

Active le formatage HTML dans le champ de saisie.

```html
<lu-rich-text-input [luWithHtmlFormatter]="true"></lu-rich-text-input>
```

#### `luWithMarkdownFormatter`
Type: `boolean` — Default: `false`

Active le formatage Markdown dans le champ de saisie.

```html
<lu-rich-text-input [luWithMarkdownFormatter]="true"></lu-rich-text-input>
```

#### `luWithPlainTextTagsFormatter`
Type: `boolean` — Default: `false`

Active le formatage de texte brut avec balises.

```html
<lu-rich-text-input [luWithPlainTextTagsFormatter]="true"></lu-rich-text-input>
```

## Patterns courants

### Saisie de texte enrichie avec balises
```html
<!-- Champs de texte riche avec plugin de balises -->
<lu-rich-text-input [luWithHtmlFormatter]="true" [required]="true"></lu-rich-text-input>
```

## Accessibilité
S'assurer que le champ de saisie est accessible via des étiquettes appropriées et que les retours d'information sont lisibles par un lecteur d'écran.

## Guidelines Prisme
- Suivre les bonnes pratiques pour le design des champs de saisie riches, comme éviter la surcharge d'options et assurer une facilité d'utilisation.