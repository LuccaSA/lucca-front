# pr-ColorPicker

## Quand utiliser ce composant
1. Pour permettre aux utilisateurs de sélectionner une couleur dans un formulaire.
2. Lorsque vous avez besoin d'une interface intuitive pour choisir une couleur personnalisée.
3. Pour des cas d'utilisation nécessitant une variante de couleur stylisée avec plusieurs états et tailles.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-color-picker-angular--basic)

## Composant Figma
[Vue du composant sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-7965) - Ce composant présente différentes variantes telles que Compact, différentes tailles, états, et types de contenu (rempli ou vide).

## Import

```typescript
import { ColorInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<input luColorPicker />
```

## Directive / Composant : `luColorPicker` ou `<lu-color-picker>`

Directive pour un sélecteur de couleur, applicable sur les éléments `<input>`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `null` | Variante par défaut, affichée normalement. |
| `"compact"` | Variante compacte du sélecteur. |

```html
<input luColorPicker="compact" />
```

## Inputs

### `tooltip`
Type: `string` — Default: `undefined`

Affiche une icône (?) associée à une info-bulle pour plus d'informations.

```html
<input luColorPicker [tooltip]="'Exemple d'info-bulle'" />
```

### `label`
Type: `string` — Default: `undefined`

Modifie le label du champ.

```html
<input luColorPicker [label]="'Choisissez une couleur'" />
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<input luColorPicker [required]="true" />
```

### `size`
Type: `'M' | 'S'` — Default: `'M'`

Modifie la taille du champ.

```html
<input luColorPicker [size]="'S'" />
```

### `width`
Type: `number | null` — Default: `null`

Applique une largeur fixe au champ.

```html
<input luColorPicker [width]="30" />
```

### `inlineMessage`
Type: `string` — Default: `undefined`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<input luColorPicker [inlineMessage]="'Entrée requise'" />
```

### `inlineMessageState`
Type: `'default' | 'success' | 'warning' | 'error'` — Default: `'default'`

Modifie l'état de l'inline message.

```html
<input luColorPicker [inlineMessageState]="'error'" />
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Masque le label en le conservant dans le DOM pour les lecteurs d’écrans.

```html
<input luColorPicker [hiddenLabel]="true" />
```

### `clearable`
Type: `boolean` — Default: `false`

Affiche un bouton pour vider le champ lorsque celui-ci est rempli.

```html
<input luColorPicker [clearable]="true" />
```

## Patterns courants

### Utilisation d'un sélecteur de couleur
```html
<!-- Utilisation d'un sélecteur de couleur avec label et info-bulle -->
<input luColorPicker [label]="'Sélectionnez la couleur'" [tooltip]="'Cliquez pour choisir une couleur'" />
```

## Accessibilité
Assurez-vous que le champ est associé à un label pour améliorer l'accessibilité. Utilisez `hiddenLabel` pour garder le label accessible tout en masquant le texte visuellement.

## Guidelines Prisme
- Utiliser le composant dans un formulaire pour renforcer la cohérence visuelle.
- Éviter d'utiliser des couleurs difficiles à distinguer pour garantir l'accessibilité.
- Fournir un message d'état informatif lorsque cela est pertinent (ex: erreur, succès).