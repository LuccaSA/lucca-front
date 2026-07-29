# data-table — Sort _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/tableSortable';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="ascending">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="descending">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
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
	</table>
</div>
```
