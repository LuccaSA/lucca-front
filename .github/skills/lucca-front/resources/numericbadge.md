# NumericBadge

## Quand utiliser ce composant
- Pour afficher un compteur d'éléments, par exemple dans une notification.
- Pour indiquer des valeurs quantifiables sur des icônes ou des boutons d'action.
- Pour signaler un état d'activité ou d'attente avec l'option de loader.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-numericbadge-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-numericbadge-angular-basic--template)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14014-5098) + Ce composant présente différentes variantes de taille et de palette, offrant une grande flexibilité pour l'intégration visuelle.

## Import

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/texts';
```

## Usage de base

```html
<!-- Utilisation minimale -->
<lu-numeric-badge>5</lu-numeric-badge>
```

## Directive / Composant : `lu-numeric-badge`

Composant pour afficher un badge numérique pouvant être appliqué sur des éléments HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"XS"` | Taille très petite |
| `"S"` | Taille petite |
| `"M"` | Taille moyenne |
| `"Brand"` | Palette de couleur Brand |
| `"Product"` | Palette de couleur Product |
| `"Neutral"` | Palette de couleur Neutre |
| `"true"` | Badge en état désactivé |
| `"false"` | Badge actif avec loader |

```html
<lu-numeric-badge size="S" palette="Brand" [disabled]="false" [loader]="true">10</lu-numeric-badge>
```

## Inputs

### `size`
Type: `'XS' | 'S' | 'M'` — Default: `'S'`

Détermine la taille du badge numérique.

```html
<lu-numeric-badge [size]="'XS'">1</lu-numeric-badge>
```

### `palette`
Type: `'Brand' | 'Product' | 'Neutral'` — Default: `'Brand'`

Détermine la palette de couleurs du badge.

```html
<lu-numeric-badge [palette]="'Product'">2</lu-numeric-badge>
```

### `disabled`
Type: `boolean` — Default: `false`

Indique si le badge est désactivé.

```html
<lu-numeric-badge [disabled]="true">3</lu-numeric-badge>
```

### `loader`
Type: `boolean` — Default: `false`

Indique si un loader est affiché.

```html
<lu-numeric-badge [loader]="true">4</lu-numeric-badge>
```

## Patterns courants

### Affichage d'un badge avec un compteur
```html
<!-- Badge affichant le nombre de notifications non lues -->
<lu-numeric-badge [size]="'M'" [palette]="'Neutral'">3</lu-numeric-badge>
```

## Accessibilité
Assurez-vous que le badge a une description accessible, soit via un attribut `aria-label`, soit en utilisant un contexte d'interface utilisateur clair.

## Guidelines Prisme
- Évitez d'utiliser trop de tailles différentes sur un même écran.
- Préférez des palettes de couleurs cohérentes avec votre interface pour assurer une bonne lisibilité.
- Ne placez pas de badges numériques sur des éléments qui ne peuvent pas être cliqués ou actionnés.