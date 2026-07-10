# data-table — Actions _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell mod-alignRight">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell mod-actions">
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
						<span class="pr-u-mask">Edit</span>
					</button>
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
						<span class="pr-u-mask">Delete</span>
					</button>
				</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell mod-actions">
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
						<span class="pr-u-mask">Edit</span>
					</button>
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
						<span class="pr-u-mask">Delete</span>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
```
