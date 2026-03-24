# pr-MultilanguageTextfield

## Quand utiliser ce composant
- Lors de la création de formulaires multilingues où l'utilisateur doit entrer des informations dans plusieurs langues.
- Quand un retour d'information visuel est nécessaire pour guider l'utilisateur sur l'état des entrées (par exemple, erreurs, avertissements).
- Lorsque des champs de texte dynamiques doivent être affichés ou masqués selon l'interaction de l'utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-multilanguagefield-angular--basic)

## Composant Figma
[Visuel dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25864-39239) — Ce composant propose différentes variantes en termes de taille, d'état d'interaction, de contenu et de retour d'information visuel.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/forms';
import { MultilanguageInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
  <lu-multilanguage-input></lu-multilanguage-input>
</lu-form-field>
```

## Directive / Composant : `lu-multilanguage-input` ou `<lu-multilanguage-input>`

Composant principal pour le champ de texte multilingue. Applicable à l'intérieur d'un élément `lu-form-field`.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-multilanguage-input></lu-multilanguage-input>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'S'`

Détermine la taille du champ de texte.

```html
<lu-multilanguage-input [size]="'M'"></lu-multilanguage-input>
```

### `state`
Type: `'HoverIcon' | 'FocusInput' | 'FocusPopover' | 'Default'` — Default: `'Default'`

Détermine l'état d'interaction visuelle du champ.

```html
<lu-multilanguage-input [state]="'FocusInput'"></lu-multilanguage-input>
```

### `content`
Type: `'Filled' | 'Placeholder' | 'Empty'` — Default: `'Filled'`

Détermine l'état de contenu du champ.

```html
<lu-multilanguage-input [content]="'Placeholder'"></lu-multilanguage-input>
```

### `feedback`
Type: `'None' | 'Critical' | 'Warning'` — Default: `'None'`

Fournit des indications visuelles sur l'état du champ.

```html
<lu-multilanguage-input [feedback]="'Warning'"></lu-multilanguage-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Détermine si le champ doit être présenté sous forme d'élément actif ou inactif.

```html
<lu-multilanguage-input [presentation]="true"></lu-multilanguage-input>
```

## Patterns courants

### Champ de texte multilingue
```html
<lu-form-field>
  <lu-multilanguage-input [size]="'M'" [state]="'FocusInput'" [content]="'Filled'" [feedback]="'None'" [presentation]="false"></lu-multilanguage-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous que le champ de texte a une étiquette claire associée et que les messages d'erreur sont audibles pour les technologies d'assistance.

## Guidelines Prisme
- Évitez de masquer les champs de texte de façon à créer de la confusion pour l'utilisateur.
- Assurez-vous que les retours d'information sont explicites et utiles.