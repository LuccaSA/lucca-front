# pr-Textfield

## Quand utiliser ce composant
- Pour créer des champs de saisie textuelle dans des formulaires.
- Lorsqu'il est nécessaire de fournir une indication visuelle ou un message d'erreur lié à la saisie utilisateur.
- Pour des cas où une taille variable du champ de texte peut être nécessaire (ex: S, M, XS).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-textfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--basic)
- [IBAN Format](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--iban-format)
- [Password Visibility](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--password-visiblity)
- [With Prefix And Suffix](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--with-prefix-and-suffix)
- [AI](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--ai)

## Composant Figma
[Vue Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6119-36365) - Inclut les variantes de taille et état telles que M, S, XS, ainsi que des indications sur le contenu et le feedback.

## Import

```typescript
import { TextInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-textfield label="Votre nom" required="true" size="M"></lu-textfield>
```

## Directive / Composant : `luTextfield` ou `<lu-textfield>`

Composant pour créer un champ de texte. Applicable sur les éléments de formulaire.

### Valeurs

| Valeur             | Description                  |
|--------------------|------------------------------|
| `""` (vide)        | Variante par défaut          |
| `"M"`              | Taille medium                |
| `"S"`              | Taille small                 |
| `"XS"`             | Taille extra small           |

```html
<lu-textfield size="S" label="Email" required="true"></lu-textfield>
```

## Inputs

### `label`
Type: `string` — Default: `''`

Modifie le label de l'input.

```html
<lu-textfield [label]="'Nom complet'"></lu-textfield>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-textfield [required]="true"></lu-textfield>
```

### `size`
Type: `'M' | 'S' | 'XS'` — Default: `'M'`

Modifie la taille du champ.

```html
<lu-textfield [size]="'S'"></lu-textfield>
```

### `inlineMessage`
Type: `string` — Default: `''`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<lu-textfield [inlineMessage]="'Champ requis'"></lu-textfield>
```

## Patterns courants

### Champ de texte avec message d'erreur
```html
<lu-textfield label="Mot de passe" required="true" [inlineMessage]="'Doit contenir au moins 8 caractères'" [inlineMessageState]="'error'"></lu-textfield>
```

## Accessibilité
Assurez-vous que chaque champ de texte a un label associé pour améliorer l'accessibilité pour les lecteurs d'écran.

## Guidelines Prisme
- Préférez les messages d'erreur clairs et les indication contextuelles.
- Évitez de surcharger le champ de texte avec trop d'éléments d'interface.