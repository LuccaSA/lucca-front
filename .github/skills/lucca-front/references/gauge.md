# pr-Gauge

## Quand utiliser ce composant
- Pour afficher une représentation visuelle de la progression ou du statut d'une tâche.
- Lorsqu'il est nécessaire d'indiquer un pourcentage d'achèvement de manière dynamique.
- Pour des tableaux de bord ou des interfaces montrant des données en temps réel.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-gauge-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-gauge-angular-basic--basic)

## Composant Figma
[Documentation Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=31115-14785) — Le composant pr-Gauge propose différentes variantes visuelles adaptées à différentes palettes et styles, y compris les jauges circulaires et fines.

## Import

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

## Usage de base

```html
<!-- Usage minimal de la jauge -->
<lu-gauge [value]="50"></lu-gauge>
```

## Directive / Composant : `lu-gauge`

Le sélecteur `lu-gauge` est utilisé pour afficher une jauge de charge. Il est applicable sur les composants Angular.

### Valeurs

| Valeur        | Description                                  |
|---------------|----------------------------------------------|
| `""` (vide)  | Variante par défaut                          |
| `"thin"`     | Diminue l'épaisseur de la jauge             |
| `"circular"`  | Affiche la jauge sous forme circulaire      |
| `"palette"`  | Choisit la palette de couleurs              |

```html
<lu-gauge [palette]="'Success'" [thin]="true" [circular]="false" [value]="75"></lu-gauge>
```

## Inputs

### `palette`
Type: `'Product' | 'Success' | 'Error' | 'Neutral' | 'Warning'` — Default: `'Product'`

Applique une palette de couleurs à la jauge.

```html
<lu-gauge [palette]="'Error'" [value]="50"></lu-gauge>
```

### `thin`
Type: `boolean` — Default: `false`

Diminue l'épaisseur de la jauge.

```html
<lu-gauge [thin]="true" [value]="50"></lu-gauge>
```

### `animated`
Type: `boolean` — Default: `false`

Ajoute une animation au chargement ou lorsque la valeur est modifiée.

```html
<lu-gauge [animated]="true" [value]="50"></lu-gauge>
```

### `circular`
Type: `boolean` — Default: `false`

Affiche la jauge sous une forme circulaire.

```html
<lu-gauge [circular]="true" [value]="50"></lu-gauge>
```

### `size`
Type: `number` — Default: `undefined`

Taille du composant pour sa forme circulaire.

```html
<lu-gauge [size]="100" [value]="50"></lu-gauge>
```

### `value`
Type: `number` — Default: `0`

Valeur en pourcentage.

```html
<lu-gauge [value]="75"></lu-gauge>
```

### `alt`
Type: `string` — Default: `undefined`

Information restituée par le lecteur d'écran.

```html
<lu-gauge [alt]="'Progression de 75%'" [value]="75"></lu-gauge>
```

### `noAlt`
Type: `boolean` — Default: `false`

Empêche la restitution par le lecteur d'écran. À n'utiliser que si l'information est déjà présente.

```html
<lu-gauge [noAlt]="true" [value]="75"></lu-gauge>
```

## Patterns courants

### Jauge de succès
```html
<!-- Affiche une jauge de progression réussie -->
<lu-gauge [palette]="'Success'" [value]="100"></lu-gauge>
```

## Accessibilité
Assurez-vous que les valeurs sont correctement énoncées par les lecteurs d'écran, surtout si `noAlt` est utilisé.

## Guidelines Prisme
- Évitez de mélanger les palettes de couleurs qui peuvent créer de la confusion.
- Assurez-vous que les jauges sont bien dimensionnées pour que l'utilisateur puisse les lire facilement.