# data-table — Draggable _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-draggable" aria-hidden="true"></th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>
```
