# pr-NumericBadge

## Quand utiliser ce composant
- Pour afficher un nombre ou une quantité de manière visuellement attrayante, par exemple dans un tableau de bord.
- Lorsqu'une valeur dépasse un certain seuil et qu'il est nécessaire d'afficher un indicateur comme "999+".
- Pour indiquer un état de chargement ou désactiver une interaction dans une interface utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-numericbadge-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-numericbadge-angular-basic--template)

## Composant Figma
[Consulter le design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14014-5098). Ce composant présente un badge numérique avec plusieurs variantes de taille (XS, S, M) et de palette (Brand, Product, Neutral).

## Import

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-numeric-badge [value]="7"></lu-numeric-badge>
```

## Directive / Composant : `lu-numeric-badge`

Composant pour afficher un badge numérique. Applicable uniquement sur les éléments '<lu-numeric-badge>'.

### Valeurs (si directive avec valeurs)

| Valeur            | Description                               |
|-------------------|-------------------------------------------|
| `"none"`          | Pas de palette de couleur appliquée       |
| `"product"`       | Palette de couleur pour les produits      |
| `"neutral"`       | Palette de couleur neutre                 |
| `"success"`       | Palette de couleur pour un état de succès |
| `"warning"`       | Palette de couleur pour un avertissement   |
| `"error"`         | Palette de couleur pour une erreur         |

```html
<lu-numeric-badge [palette]="'product'" [value]="7"></lu-numeric-badge>
```

## Inputs

### `value`
Type: `number | string` — Default: `undefined`

Valeur affichée par le composant. Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "999+", etc.).

```html
<lu-numeric-badge [value]="7"></lu-numeric-badge>
```

### `maxValue`
Type: `number` — Default: `undefined`

Valeur maximale affichée au format "999+".

```html
<lu-numeric-badge [value]="1000" [maxValue]="999"></lu-numeric-badge>
```

### `disableTooltip`
Type: `boolean` — Default: `false`

Empêche le déclenchement d'une tooltip si la valeur est supérieure à maxValue.

```html
<lu-numeric-badge [value]="1000" [maxValue]="999" [disableTooltip]="true"></lu-numeric-badge>
```

### `size`
Type: `'XS' | 'S' | 'M'` — Default: `'S'`

Modifie la taille du composant.

```html
<lu-numeric-badge [size]="'M'" [value]="7"></lu-numeric-badge>
```

### `loading`
Type: `boolean` — Default: `false`

Applique l'état de chargement au composant.

```html
<lu-numeric-badge [loading]="true" [value]="7"></lu-numeric-badge>
```

## Patterns courants

### Afficher une valeur avec une palette et une taille spécifiques
```html
<lu-numeric-badge [value]="10" [palette]="'success'" [size]="'M'"></lu-numeric-badge>
```

## Accessibilité
Assurez-vous que la valeur affichée est essentielle pour l'utilisateur et qu'une description est fournie pour toutes les valeurs maximales pour une meilleure compréhension.

## Guidelines Prisme
- Utiliser les palettes de couleurs définies dans la documentation.
- Éviter d'utiliser des valeurs numériques sans explication dans l'interface.
- Assurer la cohérence dans l'utilisation des tailles pour un aspect visuel harmonieux.