# NumericBadge

## Quand utiliser ce composant
- Pour afficher un indicateur numérique dans une interface utilisateur, comme un compteur de notifications.
- Lorsque vous souhaitez montrer une valeur qui dépasse un maximum prédéfini avec une indication de surcharge (ex: "999+").
- Pour ajouter un état de chargement sur un badge numérique, afin d'afficher un feedback visuel à l'utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-numericbadge-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-numericbadge-angular-basic--template)

## Composant Figma
[Consulter le design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14014-5098) - Composant badge numérique avec plusieurs variantes de taille et de palette.

## Import

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

## Usage de base

```html
<lu-numeric-badge [value]="7"></lu-numeric-badge>
```

## Directive / Composant : `lu-numeric-badge`

Sélecteur utilisé pour créer un badge numérique affichant une valeur. Applicable sur les éléments spécifiés dans la documentation du composant.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut avec la palette et la taille standard. |
| `"loader"` | Affiche l'état de chargement du badge. |

```html
<lu-numeric-badge [loading]="true" [value]="'3/5'"></lu-numeric-badge>
```

## Inputs

### `value`
Type: `number | string` — Default: `0`

Valeur affichée par le composant. Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "999+", etc.).

```html
<lu-numeric-badge [value]="10"></lu-numeric-badge>
```

### `maxValue`
Type: `number | string` — Default: `undefined`

Valeur maximale affichée au format "999+". Permet de déterminer lorsque la valeur affichée doit montrer une surcharge.

```html
<lu-numeric-badge [value]="1000" [maxValue]="999"></lu-numeric-badge>
```

### `palette`
Type: `'brand' | 'product' | 'neutral'` — Default: `'brand'`

Applique une palette de couleurs au composant.

```html
<lu-numeric-badge [value]="5" palette="product"></lu-numeric-badge>
```

### `size`
Type: `'xs' | 's' | 'm'` — Default: `'s'`

Modifie la taille du badge numérique.

```html
<lu-numeric-badge [value]="8" size="m"></lu-numeric-badge>
```

### `loading`
Type: `boolean` — Default: `false`

Applique l'état de chargement au badge.

```html
<lu-numeric-badge [value]="9" [loading]="true"></lu-numeric-badge>
```

### `disableTooltip`
Type: `boolean` — Default: `false`

Empêche le déclanchement d'une tooltip si la valeur est supérieure à maxValue.

```html
<lu-numeric-badge [value]="150" [maxValue]="100" [disableTooltip]="true"></lu-numeric-badge>
```

## Patterns courants

### Affichage d'une surcharge
```html
<lu-numeric-badge [value]="'999+'" [maxValue]="999"></lu-numeric-badge>
```

## Accessibilité
Assurez-vous que toutes les valeurs soient compréhensibles et que le composant respecte les normes d'accessibilité. Les badges doivent être clairement lisibles et fournir un feedback visuel.

## Guidelines Prisme
- Évitez l'utilisation de valeurs numériques peu claires.
- Utilisez les variantes de palette pour véhiculer des significations distinctes visuellement (ex: erreurs, succès).
- Ne surchargez pas le badge avec trop d'informations numériques, préférez des valeurs succinctes.