# PhoneNumberField

## Quand utiliser ce composant
- Lorsque vous souhaitez permettre la saisie d'un numéro de téléphone dans un formulaire.
- Pour fournir une interface utilisateur cohérente et accessible pour l'entrée de données de type numéro.
- Lorsque des messages d'erreur ou des aides contextuelles sont nécessaires pour guider l'utilisateur dans la saisie correcte d'un numéro de téléphone.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-phonenumberfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-phonenumberfield-angular--basic)

## Composant Figma
[Composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25864-48330) - Ce composant représente un champ d'entrée pour un numéro de téléphone avec de nombreuses variantes en fonction des états (Disabled, Hover, etc.) et des tailles disponibles.

## Import

```typescript
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<lu-form-field>
  <lu-phone-number-input label="Votre numéro de téléphone"></lu-phone-number-input>
</lu-form-field>
```

## Directive / Composant : `lu-phone-number-input` ou `<lu-phone-number-input>`

Champ de saisie pour un numéro de téléphone. Applicable uniquement sur les éléments de formulaire.

### Valeurs (si directive avec valeurs)

Aucune valeur spécifique à définir.

## Inputs

### `disabled`
Type: `boolean` — Default: `false`

Désactive le champ.

```html
<lu-phone-number-input [disabled]="true"></lu-phone-number-input>
```

### `label`
Type: `string` — Default: `''`

Modifie le label du champ.

```html
<lu-phone-number-input label="Votre numéro de téléphone"></lu-phone-number-input>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-phone-number-input [required]="true"></lu-phone-number-input>
```

### `size`
Type: `'S' | 'M'` — Default: `'S'`

Modifie la taille du champ.

```html
<lu-phone-number-input size="M"></lu-phone-number-input>
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.

```html
<lu-phone-number-input [hiddenLabel]="true"></lu-phone-number-input>
```

### `inlineMessage`
Type: `string` — Default: `''`

Ajoute un texte descriptif sous le champ de formulaire.

```html
<lu-phone-number-input inlineMessage="Indiquez votre numéro ici."></lu-phone-number-input>
```

### `inlineMessageState`
Type: `'default' | 'error' | 'warning' | 'success'` — Default: `'default'`

Modifie l'état de l'inline message.

```html
<lu-phone-number-input inlineMessageState="error"></lu-phone-number-input>
```

### `errorInlineMessage`
Type: `string` — Default: `''`

Ajoute un texte d'erreur sous le champ lorsque celui-ci est en erreur.

```html
<lu-phone-number-input errorInlineMessage="Numéro non valide."></lu-phone-number-input>
```

### `autocomplete`
Type: `string` — Default: `''`

Modifie le comportement autocomplete du champ.

```html
<lu-phone-number-input autocomplete="off"></lu-phone-number-input>
```

### `noAutoPlaceholder`
Type: `boolean` — Default: `false`

Désactive le placeholder.

```html
<lu-phone-number-input [noAutoPlaceholder]="true"></lu-phone-number-input>
```

### `tooltip`
Type: `string` — Default: `''`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-phone-number-input tooltip="Aide pour numéro de téléphone."></lu-phone-number-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-phone-number-input [presentation]="true"></lu-phone-number-input>
```

## Patterns courants

### Champ de téléphone avec message d'erreur
```html
<lu-form-field>
  <lu-phone-number-input label="Votre numéro de téléphone" [errorInlineMessage]="errorMessage"></lu-phone-number-input>
</lu-form-field>
```

## Accessibilité
S'assurer que le composant respecte les exigences d'accessibilité WCAG, incluant des labels associés pour la saisie.

## Guidelines Prisme
- Éviter d'utiliser des couleurs qui n'ont pas suffisamment de contraste.
- Ne pas masquer des informations importantes par des icônes ou des placeholders seuls.