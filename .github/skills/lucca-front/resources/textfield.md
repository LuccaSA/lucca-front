# pr-Textfield

## Quand utiliser ce composant
- Lorsque vous avez besoin d'un champ de texte dans un formulaire pour recueillir des informations utilisateur comme les noms, adresses ou commentaires.
- Pour des cas spécifiques comme la saisie d'IBAN où un format de texte particulier est nécessaire.
- Lorsqu'un besoin d'afficher des champs de texte avec des préfixes ou suffixes est présent, afin d'améliorer l'expérience utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-textfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--basic)
- [IBAN Format](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--iban-format)
- [Password Visiblity](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--password-visiblity)
- [With Prefix And Suffix](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--with-prefix-and-suffix)
- [AI](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--ai)

## Composant Figma
[Accéder au Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6119-36365) - Composant pr-Textfield avec 72 variantes disponibles selon les propriétés Size, State, Content et Feedback.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/forms';
// ou
import { TextInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-form-field>
  <lu-text-input></lu-text-input>
</lu-form-field>
```

## Directive / Composant : `lu-text-input` ou `<lu-form-field>`

Description courte du sélecteur. Applicable sur les éléments HTML pour créer un champ de texte.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"outlined"` | Variante avec contour défini |
| `"filled"` | Variante avec remplissage |
| `"disabled"` | Éléments non modifiables par l'utilisateur |

```html
<lu-text-input type="text" placeholder="Entrez votre texte ici" feedback="none"></lu-text-input>
```

## Inputs

### `type`
Type: `'text' | 'password' | 'email' | 'iban'` — Default: `'text'`

Type de champ de texte à afficher.

```html
<lu-text-input [type]="'email'"></lu-text-input>
```

### `value`
Type: `string` — Default: `''`

Valeur par défaut du champ de texte.

```html
<lu-text-input [value]="'Texte d'exemple'"></lu-text-input>
```

### `placeholder`
Type: `string` — Default: `''`

Texte d'instructions affiché lorsque le champ est vide.

```html
<lu-text-input [placeholder]="'Entrez votre texte ici'"></lu-text-input>
```

### `feedback`
Type: `'none' | 'success' | 'warning' | 'critical'` — Default: `'none'`

Indication de l'état de validation du champ.

```html
<lu-text-input [feedback]="'success'"></lu-text-input>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Taille du champ de texte.

```html
<lu-text-input [size]="'S'"></lu-text-input>
```

### `state`
Type: `'default' | 'focus' | 'hover' | 'disabled'` — Default: `'default'`

État du champ de texte.

```html
<lu-text-input [state]="'focus'"></lu-text-input>
```

## Patterns courants

### Champ de texte avec feedback
```html
<!-- Champ de texte avec indication de succès -->
<lu-form-field>
  <lu-text-input [value]="'Texte d'exemple'" [feedback]="'success'"></lu-text-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous que tous les champs de texte possèdent des attributs accessibles tels que `aria-label` et `aria-describedby` pour garantir que les utilisateurs de lecteurs d'écran puissent comprendre le contexte des champs.

## Guidelines Prisme
- Utiliser les couleurs de feedback de manière cohérente pour les états de validation.
- Ne pas utiliser un champ de texte comme un bouton ou dans des cas d'usage inappropriés.