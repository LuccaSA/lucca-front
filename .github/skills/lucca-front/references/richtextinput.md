# pr-RichTextfield

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de saisir du texte riche avec le formatage souhaité.
- Lorsque vous avez besoin d'une interface utilisateur conviviale pour la saisie de contenu multimédia (images, vidéos).
- Dans les formulaires nécessitant l'entrée d'un texte avec des plugins spécifiques (tags, Markdown).

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
[Accéder à Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6946-36429) - Composant pr-RichTextfield (v19.3) avec plusieurs variantes y compris des états de focus, des contenus vides et remplis, ainsi que différentes options de feedback.

## Import

```typescript
import { RichTextInputComponent } from '@lucca-front/ng/forms/rich-text-input';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { MarkdownFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-rich-text-input placeholder="Entrez votre texte ici..."></lu-rich-text-input>
```

## Directive / Composant : `lu-rich-text-input`

Sélecteur Angular pour le composant RichTextInput. Applicable sur les éléments nécessaires pour la saisie de texte enrichi.

### Valeurs 

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `html` | Utilise le formatage HTML |
| `markdown` | Utilise le formatage Markdown |
| `plaintext` | Utilise le formatage de texte brut avec tags |

```html
<lu-rich-text-input luWithHtmlFormatter></lu-rich-text-input>
<lu-rich-text-input luWithMarkdownFormatter></lu-rich-text-input>
<lu-rich-text-input luWithPlainTextTagsFormatter></lu-rich-text-input>
```

## Inputs

### `placeholder`
Type: `string` — Default: `''`

Applique un placeholder au champ.

```html
<lu-rich-text-input [placeholder]="'Entrez votre texte ici...'"></lu-rich-text-input>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le champ.

```html
<lu-rich-text-input [disabled]="true"></lu-rich-text-input>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-rich-text-input [required]="true"></lu-rich-text-input>
```

### `autoResize`
Type: `boolean` — Default: `false`

Active / désactive l'autoresize du champ.

```html
<lu-rich-text-input [autoResize]="true"></lu-rich-text-input>
```

### `hideToolbar`
Type: `boolean` — Default: `false`

Masque les options de mise en forme.

```html
<lu-rich-text-input [hideToolbar]="true"></lu-rich-text-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-rich-text-input [presentation]="true"></lu-rich-text-input>
```

## Patterns courants

### Utilisation avec les plugins de tag
```html
<!-- Exemple d'utilisation d'un plugin de tag -->
<lu-rich-text-input luWithMarkdownFormatter></lu-rich-text-input>
```

## Accessibilité
Assurez-vous que le champ de texte rich soit accessible via des labels descriptifs et des indications claires sur les exigences de contenu.

## Guidelines Prisme
- Utilisez des descriptions claires pour les placeholders.
- Ne masquez pas les outils de mise en forme sans avoir une bonne raison alignée avec l'usage prévu.
- Assurez-vous que le composant fonctionnent bien avec les lecteurs d'écran.