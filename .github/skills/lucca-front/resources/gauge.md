# pr-Gauge

## Quand utiliser ce composant
- Pour afficher une valeur sous forme de pourcentage dans des tableaux de bord ou des rapports.
- Lorsqu'il est nécessaire de visualiser des indicateurs de performance pour des applications analytiques.
- Dans des cas où une représentation stylisée de la progression est essentielle (ex: chargeurs ou jauges de performance).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-gauge-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-gauge-angular-basic--basic)

## Composant Figma
[pr-Gauge Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=31115-14785) - Ce composant représente une jauge avec plusieurs variantes disponibles, notamment des styles circulaires et différents niveaux d'épaisseur.

## Import

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-gauge [value]="50" palette="success"></lu-gauge>
```

## Directive / Composant : `lu-gauge` ou `<lu-gauge>`

Directive utilisée pour créer une jauge. Applicable sur des éléments HTML personnalisés créés par le composant.

### Valeurs

| Valeur          | Description                                          |
|-----------------|------------------------------------------------------|
| `""` (vide)     | Variante par défaut                                  |
| `"product"`     | Palette de couleur produit                           |
| `"neutral"`     | Palette de couleur neutre                            |
| `"success"`     | Palette représentant le succès                       |
| `"warning"`     | Palette représentant un avertissement                |
| `"error"`       | Palette représentant une erreur                      |

```html
<lu-gauge palette="success" circular="true" [value]="75"></lu-gauge>
```

## Inputs

### `value`
Type: `number` — Default: `0`

Valeur en pourcentage à afficher dans la jauge.

```html
<lu-gauge [value]="33"></lu-gauge>
```

### `palette`
Type: `'' | 'product' | 'neutral' | 'success' | 'warning' | 'error'` — Default: `''`

Applique une palette de couleurs à la jauge.

```html
<lu-gauge palette="warning" [value]="50"></lu-gauge>
```

### `thin`
Type: `boolean` — Default: `false`

Diminue l'épaisseur de la jauge.

```html
<lu-gauge [thin]="true" [value]="50"></lu-gauge>
```

### `circular`
Type: `boolean` — Default: `false`

Affiche la jauge sous une forme circulaire.

```html
<lu-gauge [circular]="true" [value]="50"></lu-gauge>
```

### `animated`
Type: `boolean` — Default: `false`

Ajoute une animation au chargement ou lorsque la valeur est modifiée.

```html
<lu-gauge [animated]="true" [value]="50"></lu-gauge>
```

### `alt`
Type: `string` — Default: `''`

Information restituée par le lecteur d'écran.

```html
<lu-gauge [alt]="'Jauge de performance'" [value]="50"></lu-gauge>
```

### `noAlt`
Type: `boolean` — Default: `false`

Empêche la restitution par le lecteur d'écran. À n'utiliser que si l'information est déjà présente.

```html
<lu-gauge [noAlt]="true" [value]="50"></lu-gauge>
```

## Patterns courants

### Jauge de succès
```html
<!-- Jauge indiquant un succès avec une palette verte -->
<lu-gauge palette="success" [value]="80" [circular]="true"></lu-gauge>
```

## Accessibilité
Assurez-vous que toutes les jauges ont des attributs `alt` appropriés pour permettre aux lecteurs d'écran de fournir un contexte significatif.

## Guidelines Prisme
- Utilisez des couleurs appropriées pour chaque état de la jauge (succès, erreur, etc.).
- Évitez d'utiliser les jauges pour des états qui ne peuvent pas être représentés en pourcentage, à moins qu'une alternative graphique ne soit fournie.