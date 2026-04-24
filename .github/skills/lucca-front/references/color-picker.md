# AssetsColorPicker

## Quand utiliser ce composant
- Lors de la sélection de couleur dans un formulaire où plusieurs choix de couleurs sont disponibles.
- Pour créer des palettes de couleurs personnalisisées dans les applications où des thèmes variés sont requis.
- Lorsque vous souhaitez afficher des informations supplémentaires via des infobulles associées aux options de couleur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-color-picker-angular--basic)

## Composant Figma
[AssetsColorPicker Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-7790) - Composant permettant de choisir des couleurs avec plusieurs palettes disponibles.

## Import

```typescript
import { ColorInputComponent } from '@lucca-front/ng/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
```

## Usage de base

```html
<lu-form-field>
	<lu-color-input [(ngModel)]="example" [colors]="colors"></lu-color-input>
</lu-form-field>
```

## Directive / Composant : `lu-color-input` ou `<lu-color-input>`

Composant de sélection de couleur. Applicable dans un champ de formulaire pour choisir une couleur.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"state"` | État visuel du composant (par exemple, hover ou sélectionné) |

```html
<lu-color-input [state]="'hover'">...</lu-color-input>
```

## Inputs

### `label`
Type: `string` — Default: `''`

Modifie le label du champ.

```html
<lu-color-input [label]="'Choisissez une couleur'">...</lu-color-input>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-color-input [required]="true">...</lu-color-input>
```

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Modifie la taille du champ.

```html
<lu-color-input [size]="'small'">...</lu-color-input>
```

### `width`
Type: `number` — Default: `undefined`

Applique une largeur fixe au champ.

```html
<lu-color-input [width]="400">...</lu-color-input>
```

### `inlineMessage`
Type: `string` — Default: `''`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<lu-color-input [inlineMessage]="'Ceci est une aide à la sélection de couleur.'">...</lu-color-input>
```

### `clearable`
Type: `boolean` — Default: `false`

Affiche un bouton pour vider le champ lorsque celui-ci est rempli.

```html
<lu-color-input [clearable]="true">...</lu-color-input>
```

### `compact`
Type: `boolean` — Default: `false`

Modifie la taille du color picker pour le rendre plus petit.

```html
<lu-color-input [compact]="true">...</lu-color-input>
```

## Patterns courants

### Sélection de couleur avec palettes
```html
<lu-form-field>
	<lu-color-input [(ngModel)]="selectedColor" [colors]="colorPalettes"></lu-color-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous que chaque champ a un label associé visible ou un attribut aria-label pour garantir que les utilisateurs de lecteurs d'écran peuvent identifier les champs correctement.

## Guidelines Prisme
- Utiliser des couleurs avec des contrastes suffisants pour garantir la lisibilité.
- Éviter de surcharger le composant de couleurs pour ne pas troubler l'utilisateur.