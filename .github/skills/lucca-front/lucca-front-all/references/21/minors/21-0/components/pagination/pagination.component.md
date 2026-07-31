# pagination — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-navigation-pagination-angular--docs)

## Angular

`LuPagination` permet la navigation entre plusieurs pages, comme pour un tableau.

Il propose 2 interfaces différentes (appelé `mod`) :
   * `default` : le plus simple, avec des boutons de navigation et des informations sur la page courante et le nombre total d'éléments
   * `compact` : un mode plus compact, avec les boutons de navigation uniquement

### Mod `default`

La pagination en mode `default` est le mode par défaut si vous ne précisez rien. Pour l'utiliser, vous devrez :

   * passer les inputs suivantes :
     * `from` : l'index du premier élément de la page courante
     * `to` : l'index du dernier élément de la page courante
     * `itemsCount` : le nombre total d'éléments
     * `isFirstPage` : un booléen indiquant si la page courante est la première
     * `isLastPage` : un booléen indiquant si la page courante est la dernière

   * récupérer les outputs suivants :
     * `previousPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche gauche `<`, correspondant à "précédent"
     * `nextPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche droite `>`, correspondant à "suivant"

Voici un exemple d'utilisation de `LuPagination` en mode `default` :

### Mod `compact`

Le mode `compact` est une version plus simple de la pagination avec uniquement les boutons de navigation. Pour l'utiliser, vous devrez :

   * passer les inputs suivants :
     * `isFirstPage` : un booléen indiquant si la page courante est la première
     * `isLastPage` : un booléen indiquant si la page courante est la dernière

   * récupérer les outputs suivants :
     * `previousPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche gauche `<`, correspondant à "précédent"
     * `nextPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche droite `>`, correspondant à "suivant"

Voici un exemple d'utilisation de `LuPagination` en mode `compact` :

### Pagination

```js
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/pagination';
@forward '@lucca-front/scss/src/components/button';
```

```html
<nav class="pagination" role="navigation" aria-label="Pagination des résultats">
	<div class="pagination-count">
		<span class="pagination-count-current">
			<span class="pr-u-mask">Résultats de</span>
			1
			<span aria-hidden="true">–</span>
			<span class="pr-u-mask">à</span>
			10
		</span>
		<span class="pagination-count-separator">sur</span>
		<span class="pagination-count-total">
			50
			<span class="pr-u-mask">pages</span>
		</span>
	</div>
	<div class="pagination-scrolling">
		<button type="button" class="button mod-onlyIcon mod-ghost mod-S" disabled>
			<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
			<span class="pr-u-mask">Précédent</span>
		</button>
		<button type="button" class="button mod-onlyIcon mod-ghost mod-S">
			<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
			<span class="pr-u-mask">Suivant</span>
		</button>
	</div>
</nav>
```
