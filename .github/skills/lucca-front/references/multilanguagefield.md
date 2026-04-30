# pr-MultilanguageTextfield

## Quand utiliser ce composant
- Pour créer des formulaires multilingues où chaque champ nécessite une traduction.
- Lorsque des validations spécifiques sont requises pour chaque langue saisie dans le formulaire.
- Pour des champs de texte dont le contenu doit être affiché ou masqué selon les besoins d'accessibilité.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-multilanguagefield-angular--basic)

## Composant Figma
[Documentation Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25864-39239) — Le composant représente un champ de texte multilingue avec plusieurs variantes de taille, d'état et de contenu.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
  <lu-multilanguage-input [label]="'Titre'" [required]="true"></lu-multilanguage-input>
</lu-form-field>
```

## Directive / Composant : `lu-multilanguage-input` ou `<lu-multilanguage-input>`

Composant permettant la saisie de texte multilingue. Applicable dans des éléments de formulaire.

### Valeurs (si directive avec valeurs)
Aucune valeur spécifique de directive pour ce composant.

## Inputs

### `label`
Type: `string` — Default: `undefined`

Modifie le label du champ.

```html
<lu-multilanguage-input [label]="'Titre'"></lu-multilanguage-input>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-multilanguage-input [required]="true"></lu-multilanguage-input>
```

### `allLanguagesRequired`
Type: `boolean` — Default: `false`

Ajoute le validateur marquant toutes les traductions comme obligatoires.

```html
<lu-multilanguage-input [allLanguagesRequired]="true"></lu-multilanguage-input>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du champ.

```html
<lu-multilanguage-input [size]="'S'"></lu-multilanguage-input>
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.

```html
<lu-multilanguage-input [hiddenLabel]="true"></lu-multilanguage-input>
```

### `inlineMessage`
Type: `string` — Default: `undefined`

Ajoute un texte descriptif sous le champ.

```html
<lu-multilanguage-input [inlineMessage]="'Ceci est un message d'aide'"></lu-multilanguage-input>
```

### `inlineMessageState`
Type: `'none' | 'error' | 'warning' | 'success'` — Default: `'none'`

Modifie l'état du message en ligne.

```html
<lu-multilanguage-input [inlineMessageState]="'error'"></lu-multilanguage-input>
```

### `placeholder`
Type: `string` — Default: `undefined`

Modifie le placeholder au champ.

```html
<lu-multilanguage-input [placeholder]="'Entrez votre texte ici'"></lu-multilanguage-input>
```

### `tooltip`
Type: `string` — Default: `undefined`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-multilanguage-input [tooltip]="'Info complémentaire'"></lu-multilanguage-input>
```

### `openOnFocus`
Type: `boolean` — Default: `false`

Ouvre le panel automatiquement au focus du champ.

```html
<lu-multilanguage-input [openOnFocus]="true"></lu-multilanguage-input>
```

### `width`
Type: `string` — Default: `undefined`

Applique une largeur fixe au champ.

```html
<lu-multilanguage-input [width]="'250px'"></lu-multilanguage-input>
```

### `autocomplete`
Type: `string` — Default: `undefined`

Modifie l’attribut autocomplete des champs input.

```html
<lu-multilanguage-input [autocomplete]="'off'"></lu-multilanguage-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-multilanguage-input [presentation]="true"></lu-multilanguage-input>
```

## Patterns courants

### Champ multilingue
```html
<lu-form-field>
  <lu-multilanguage-input [label]="'Titre'" [required]="true" [placeholder]="'Entrez votre traduction'"></lu-multilanguage-input>
</lu-form-field>
```

## Accessibilité
Le champ doit respecter les normes d'accessibilité en fournissant des étiquettes claires et des messages d'erreurs appropriés pour les technologies d'assistance.

## Guidelines Prisme
- Assurez-vous que le champ multilingue est clairement étiqueté pour chaque langue.
- Évitez de cacher des labels essentiels qui pourraient nuire à l'expérience utilisateur.