# pagination — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-navigation-pagination-angular--docs)

## Angular

### Pagination

```js
import { luPaginationTranslations, PAGINATION_MOD, PaginationComponent } from '@lucca-front/ng/pagination';
```

```html
<lu-pagination
	from="1"
	to="20"
	itemsCount="27"
	isFirstPage
	(previousPage)="previousPage($event)"
	(nextPage)="nextPage($event)"
/>
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
