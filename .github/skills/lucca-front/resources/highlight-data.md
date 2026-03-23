# pr-HighlightData

## Quand utiliser ce composant
- Pour afficher des statistiques importantes sous forme de données mises en avant.
- Lorsqu'il est nécessaire de mettre en valeur des informations clés dans une interface utilisateur.
- Pour intégrer des graphiques de données résumées avec options de feedback visuel.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-highlight-data-angular-basic--template)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-185189) - Visualisation du composant avec plusieurs variantes disponibles, incluant différentes tailles et thèmes.

## Import

```typescript
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-highlight-data [heading]="'Titre'" [value]="'Valeur'" [subText]="'Texte additionnel'">...</lu-highlight-data>
```

## Directive / Composant : `luHighlightData` ou `<lu-highlight-data>`

Directive pour personnaliser l'affichage des données mises en avant. Applicable sur des éléments du composant Angular.

### Valeurs

| Valeur      | Description                          |
|-------------|--------------------------------------|
| `null`      | Variante par défaut                  |
| `"S"`       | Taille petite                        |
| `"XS"`      | Taille extra petite                  |

```html
<lu-highlight-data [size]="'S'">...</lu-highlight-data>
```

## Inputs

### `heading`
Type: `string` — Default: `undefined`

Le titre principal de la mise en avant.

```html
<lu-highlight-data [heading]="'Mon Titre'">...</lu-highlight-data>
```

### `value`
Type: `string` — Default: `undefined`

La valeur principale à mettre en avant.

```html
<lu-highlight-data [value]="'1000'">...</lu-highlight-data>
```

### `subText`
Type: `string` — Default: `undefined`

Texte additionnel pour accompagner la valeur.

```html
<lu-highlight-data [subText]="'Informations supplémentaires'">...</lu-highlight-data>
```

### `bubble`
Type: `1 | 2 | 3 | 4 | null` — Default: `null`

Indique une bulle d'information associée à la mise en avant.

### `illustration`
Type: `'calculator' | 'calendar' | 'cleemy-card' | 'coffee' | 'headphone' | 'mail' | 'manifying-glass' | 'medallon' | 'piggy-bank' | 'polaroid-female' | 'polaroid-male' | 'polaroids' | null` — Default: `null`

Permet d'afficher une illustration pertinente.

### `valueFirst`
Type: `boolean` — Default: `false`

Indique si la valeur doit être affichée avant le titre.

### `size`
Type: `null | 'S' | 'XS'` — Default: `null`

Définit la taille de la mise en avant.

### `theme`
Type: `null | 'light' | 'dark'` — Default: `null`

Choix du thème d'affichage.

## Patterns courants

### Mise en avant de statistiques
```html
<lu-highlight-data 
  [heading]="'Visiteurs'"
  [value]="'150'"
  [subText]="'Visiteurs uniques cette semaine'"
  [bubble]="2"
  [theme]="'light'"
  [size]="'S'">
</lu-highlight-data>
```

## Accessibilité
S'assurer que tous les textes et sous-textes sont visibles afin de garantir une bonne lisibilité, et utiliser des couleurs contrastées selon le thème sélectionné.

## Guidelines Prisme
- Utiliser des termes simples et accessibles.
- Éviter de surcharger l’utilisateur d’informations. 
- S’assurer de la cohérence des tailles et thèmes à travers l’application.