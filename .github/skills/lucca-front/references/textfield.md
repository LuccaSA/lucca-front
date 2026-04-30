# pr-Textfield

## Quand utiliser ce composant
- Pour la saisie de texte dans des formulaires nécessitant différentes options (ex. : ajout de préfixes ou suffixes).
- Lorsqu'il est nécessaire d'afficher un message d'erreur ou d'assistance directement sous le champ de saisie.
- Lors de l'utilisation de champs avec des fonctionnalités spécifiques comme la saisie de mots de passe visibles ou le format IBAN.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-textfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--basic)
- [IBAN Format](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--iban-format)
- [Password Visiblity](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--password-visiblity)
- [With Prefix And Suffix](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--with-prefix-and-suffix)
- [AI](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textfield-angular--ai)

## Composant Figma
[Consulter le modèle Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6119-36365) — Le composant représente un champ de saisie flexible avec des variantes pour la taille (S, M), l'état (focus, disabled), et des options de contenu (placeholder, filled).

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
  <lu-text-input
    type="text"
    placeholder="Entrez votre texte ici"
    [(ngModel)]="example">
  </lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```

## Directive / Composant : `lu-form-field` ou `<lu-form-field>`

Le sélecteur pour le champ de formulaire, utilisé pour encapsuler un champ de saisie.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variantes par défaut |
| `"outlined"` | Champ avec une bordure marquée |

```html
<lu-form-field [tag]="'*'" [required]="true">...</lu-form-field>
```

## Inputs

### `label`
Type: `string` — Default: `undefined`

Modifie le label de l'input.

```html
<lu-form-field [label]="'Nom'">...</lu-form-field>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-form-field [required]="true">...</lu-form-field>
```

### `tooltip`
Type: `string` — Default: `undefined`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-form-field [tooltip]="'Informations supplémentaires'">...</lu-form-field>
```

### `tag`
Type: `string` — Default: `undefined`

Ajoute un tag après le label du champ.

```html
<lu-form-field [tag]="'*'">...</lu-form-field>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du champ.

```html
<lu-form-field [size]="'S'">...</lu-form-field>
```

### `inlineMessage`
Type: `string` — Default: `undefined`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<lu-form-field [inlineMessage]="'Erreur de saisie'">...</lu-form-field>
```

### `inlineMessageState`
Type: `'default' | 'success' | 'error'` — Default: `'default'`

Modifie l'état de l'inline message.

```html
<lu-form-field [inlineMessageState]="'error'">...</lu-form-field>
```

### `valueAlignRight`
Type: `boolean` — Default: `false`

Aligne la valeur du champ à droite.

```html
<lu-form-field [valueAlignRight]="true">...</lu-form-field>
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.

```html
<lu-form-field [hiddenLabel]="true">...</lu-form-field>
```

### `autocomplete`
Type: `string` — Default: `undefined`

Modifie le comportement autocomplete du champ.

```html
<lu-text-input [autocomplete]="'off'" ...></lu-text-input>
```

### `width`
Type: `string` — Default: `undefined`

Applique une largeur fixe au champ.

```html
<lu-form-field [width]="'300px'">...</lu-form-field>
```

### `AI`
Type: `boolean` — Default: `false`

Indique que la valeur du champ a été générée par IA.

```html
<lu-text-input [AI]="true">...</lu-text-input>
```

### `iconAIalt`
Type: `string` — Default: `undefined`

Information restituée par le lecteur d'écran.

```html
<lu-text-input [iconAIalt]="'Icône d\'IA'">...</lu-text-input>
```

### `iconAItooltip`
Type: `string` — Default: `undefined`

Ajoute une info-bulle à l'icône AI.

```html
<lu-text-input [iconAItooltip]="'Infos IA'">...</lu-text-input>
```

### `hasClearer`
Type: `boolean` — Default: `false`

Affiche un bouton pour vider le champ lorsque celui-ci est rempli.

```html
<lu-text-input [hasClearer]="true">...</lu-text-input>
```

### `hasSearchIcon`
Type: `boolean` — Default: `false`

Affiche une icône de recherche.

```html
<lu-text-input [hasSearchIcon]="true">...</lu-text-input>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le champ.

```html
<lu-text-input [disabled]="true">...</lu-text-input>
```

### `placeholder`
Type: `string` — Default: `undefined`

Applique un placeholder au champ.

```html
<lu-text-input [placeholder]="'Texte de remplacement'">...</lu-text-input>
```

### `counter`
Type: `number` — Default: `undefined`

Indique le nombre de caractères maximum du champ.

```html
<lu-text-input [counter]="50">...</lu-text-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Affiche une version présentation, en lecture seule, de la valeur.

```html
<lu-form-field [presentation]="true">...</lu-form-field>
```

## Patterns courants

### Champ de texte avec label et helper
```html
<lu-form-field label="Nom" placeholder="Entrez votre nom" [inlineMessage]="'Champ requis'" [required]="true">
  <lu-text-input [(ngModel)]="userName"></lu-text-input>
</lu-form-field>
```

## Accessibilité
Assurer que les labels sont toujours présents pour les champs de saisie pour garantir l'accessibilité aux utilisateurs d'outils d'assistance.

## Guidelines Prisme
- Ne pas utiliser de messages d'erreur en rouge uniquement; ils doivent aussi être expliqués par du texte.
- Ne pas ajouter de placeholders en tant que substituts aux labels. Les placeholders ne doivent pas être utilisés seuls.