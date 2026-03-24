# Pagination

## Quand utiliser ce composant
- Pour répartir un contenu volumineux en plusieurs pages numérotées, facilitant ainsi la navigation.
- Lors de l'affichage de listes d'éléments où la limitation du nombre d'éléments par page améliore l'expérience utilisateur.
- Dans des tableaux de données où l'utilisateur a besoin de naviguer entre différentes pages de résultats.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-data-table-html-css-pagination--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-pagination-angular--basic)

## Composant Figma
[pr-Pagination sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6671-42932) — Ce composant permet de visualiser des éléments de navigation sous forme de pagination, offrant une interface claire avec des options pour accéder facilement à différentes pages. Il n'y a qu'une seule variante disponible.

## Import

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-pagination></lu-pagination>
```

## Directive / Composant : `lu-pagination` ou `<lu-pagination>`

Composant de pagination qui permet de naviguer entre plusieurs pages de contenu.

## Inputs

### `totalItems`
Type: `number` — Default: `0`

Indique le nombre total d'éléments à paginer.

```html
<lu-pagination [totalItems]="100"></lu-pagination>
```

### `itemsPerPage`
Type: `number` — Default: `10`

Spécifie le nombre d'éléments à afficher par page.

```html
<lu-pagination [itemsPerPage]="20"></lu-pagination>
```

### `currentPage`
Type: `number` — Default: `1`

Indique la page actuelle.

```html
<lu-pagination [currentPage]="2"></lu-pagination>
```

## Patterns courants

### Pagination simple
```html
<!-- Ajoute une pagination pour un tableau de 100 éléments -->
<lu-pagination [totalItems]="100" [itemsPerPage]="10" [currentPage]="1"></lu-pagination>
```

## Accessibilité
Assurez-vous que chaque élément de navigation est accessible via le clavier et que les étiquettes sont claires pour aider les utilisateurs qui utilisent des lecteurs d'écran.

## Guidelines Prisme
- Suivre les principes de design de Lucca pour assurer l'harmonie visuelle et la cohérence fonctionnelle.
- Utiliser des terminologies claires et précises dans les libellés des boutons de pagination pour améliorer l'expérience utilisateur.