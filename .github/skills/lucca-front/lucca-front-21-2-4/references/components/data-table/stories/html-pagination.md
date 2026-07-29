# data-table — Pagination _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/pagination';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tfoot class="dataTable-foot">
			<tr class="dataTable-foot-row">
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
			</tr>
		</tfoot>
	</table>
	<nav class="pagination dataTableWrapper-pagination" role="navigation" aria-label="Pagination des résultats">
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
</div>
```
