# Pagination

## Quand utiliser ce composant
- Pour afficher des ensembles de données répartis sur plusieurs pages, permettant ainsi à l'utilisateur de naviguer facilement entre les pages.
- Lorsque le nombre total d'éléments dépasse une certaine limite, pour éviter d'afficher tous les éléments en une seule fois.
- Dans les interfaces où l'accès rapide et la navigation entre différentes sections de données sont nécessaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-data-table-html-css-pagination--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-pagination-angular--basic)

## Composant Figma
[Pagination Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6671-42932) - La pagination est représentée de manière claire, incluant les boutons de navigation "Précédent" et "Suivant". Variantes disponibles : pr-Pagination.

## Import

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-pagination [from]="1" [to]="20" [itemsCount]="27" [isFirstPage]="true" [isLastPage]="false" [mod]="'default'"></lu-pagination>
```

## Directive / Composant : `lu-pagination` ou `<lu-pagination>`

Ce sélecteur est utilisé pour afficher un composant de pagination. Applicable sur n'importe quel élément HTML.

### Valeurs

| Valeur    | Description                                       |
|-----------|---------------------------------------------------|
| `""` (vide)     | Variante par défaut                                 |
| `"compact"` | Affiche la pagination en vue compacte, uniquement avec les boutons précédent et suivant. |

```html
<lu-pagination mod="compact" ...></lu-pagination>
```

## Inputs

### `from`
Type: `number` — Default: `1`

Numéro du premier élément affiché.

```html
<lu-pagination [from]="1" ...></lu-pagination>
```

### `to`
Type: `number` — Default: `20`

Numéro du dernier élément affiché.

```html
<lu-pagination [to]="20" ...></lu-pagination>
```

### `itemsCount`
Type: `number` — Default: `0`

Nombre total d'éléments.

```html
<lu-pagination [itemsCount]="27" ...></lu-pagination>
```

### `isFirstPage`
Type: `boolean` — Default: `false`

Désactive le bouton précédent si true.

```html
<lu-pagination [isFirstPage]="true" ...></lu-pagination>
```

### `isLastPage`
Type: `boolean` — Default: `false`

Désactive le bouton suivant si true.

```html
<lu-pagination [isLastPage]="false" ...></lu-pagination>
```

### `mod`
Type: `'default' | 'compact'` — Default: `'default'`

Affiche la pagination en vue compacte si mod est égal à 'compact'.

```html
<lu-pagination [mod]="'compact'" ...></lu-pagination>
```

## Patterns courants

### Pagination simple
```html
<!-- Pagination avec les paramètres habituels -->
<lu-pagination [from]="1" [to]="20" [itemsCount]="50" [isFirstPage]="false" [isLastPage]="false"></lu-pagination>
```

## Accessibilité
Assurez-vous que les boutons de navigation sont accessibles via le clavier et utilisent des attributs ARIA appropriés pour indiquer leur état (activé, désactivé).

## Guidelines Prisme
- Utilisez toujours les valeurs par défaut recommandées pour `itemsCount` et les états des boutons pour assurer la cohérence à travers l'application. Ne pas personnaliser excessivement l'apparence des éléments de pagination.