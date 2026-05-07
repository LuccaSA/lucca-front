# Pagination

## Quand utiliser ce composant
1. Lorsque vous affichez un grand ensemble de données ou de contenu et souhaitez répartir leur affichage en plusieurs pages.
2. Quand il est nécessaire d'ajouter des boutons de navigation pour permettre à l'utilisateur de se déplacer entre les pages d'une liste ou d'un tableau.
3. Pour indiquer à l'utilisateur le nombre total de pages, quels éléments sont actuellement affichés, et le total des éléments sur plusieurs pages.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-data-table-html-css-pagination--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-pagination-angular--basic)

## Composant Figma
[Pagination - Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6671-42932)  
La pagination inclut des boutons permettant la navigation et des informations pages/éléments. Variantes disponibles : taille (normale, compacte).

## Import

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

## Usage de base

```html
<!-- Pagination de base -->
<lu-pagination 
  [isFirstPage]="false" 
  [isLastPage]="false" 
  [from]="1" 
  [to]="10" 
  [itemsCount]="100"
  [mod]="'normal'">
</lu-pagination>
```

## Composant : `<lu-pagination>`

Le composant `lu-pagination` est utilisé pour afficher et gérer la navigation entre différentes pages de contenu ou de données paginées.

## Inputs

### `isFirstPage`
Type: `boolean` — Default: `false`  
Indique si la page actuelle est la première. Si `true`, le bouton précédent est désactivé.

```html
<lu-pagination [isFirstPage]="true"></lu-pagination>
```

### `isLastPage`
Type: `boolean` — Default: `false`  
Indique si la page actuelle est la dernière. Si `true`, le bouton suivant est désactivé.

```html
<lu-pagination [isLastPage]="true"></lu-pagination>
```

### `from`
Type: `number` — Default: `0`  
Indique le numéro du premier élément actuellement affiché.

```html
<lu-pagination [from]="1"></lu-pagination>
```

### `to`
Type: `number` — Default: `0`  
Indique le numéro du dernier élément actuellement affiché.

```html
<lu-pagination [to]="10"></lu-pagination>
```

### `itemsCount`
Type: `number` — Default: `0`  
Nombre total d'éléments.

```html
<lu-pagination [itemsCount]="100"></lu-pagination>
```

### `mod`
Type: `'normal' | 'compact'` — Default: `'normal'`  
Détermine la vue de la pagination. La valeur `'compact'` réduit l'affichage à des boutons de navigation simples (précédent et suivant).

```html
<lu-pagination [mod]="'compact'"></lu-pagination>
```

## Patterns courants

### Pagination standard
```html
<!-- Pagination avec affichage complet des infos -->
<lu-pagination 
  [isFirstPage]="false" 
  [isLastPage]="false" 
  [from]="1" 
  [to]="10" 
  [itemsCount]="100">
</lu-pagination>
```

### Pagination compacte
```html
<!-- Pagination compacte avec uniquement les boutons précédent et suivant -->
<lu-pagination 
  [isFirstPage]="false" 
  [isLastPage]="true" 
  [from]="11" 
  [to]="20" 
  [itemsCount]="100" 
  [mod]="'compact'">
</lu-pagination>
```

## Accessibilité
- Les boutons de la pagination doivent être accessibles via le clavier en utilisant `Tab` pour la navigation.
- Chaque bouton doit inclure des attributs ARIA (`aria-disabled`) pour indiquer aux lecteurs d'écran si une action est disponible ou non.

## Guidelines Prisme
[Pagination - Prisme](https://prisme.lucca.io/94310e217/v/latest/p/093a9c)  
Les guidelines incluent des conseils sur l'usage de la pagination en fonction des différents cas d'utilisation, par exemple la différence entre une pagination complète et une vue compacte. Respectez les bonnes pratiques de clarté, de lisibilité et d'accessibilité.