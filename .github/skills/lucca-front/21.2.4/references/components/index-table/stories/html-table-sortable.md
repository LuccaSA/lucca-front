# index-table — Table sortable _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/tableSortable'; // Import additionnel
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Not sortable</th>
			<th class="indexTable-head-row-cell" scope="col">
				<button type="button" class="tableSortable button">
					Sortable
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="ascending">
				<button type="button" class="tableSortable button">
					Sorted ascending
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="descending">
				<button type="button" class="tableSortable button">
					Sorted descending
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="none">
				<button
					type="button"
					class="tableSortable button"
					onclick="
						switch (this.parentNode.getAttribute('aria-sort')) {
							case 'ascending':
								this.parentNode.setAttribute('aria-sort', 'descending');
								break;
							case 'descending':
								this.parentNode.setAttribute('aria-sort', 'none');
								break;
							default:
								this.parentNode.setAttribute('aria-sort', 'ascending');
						}
					"
				>
					Interactive
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```
