# data-table — Nested _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper mod-nested">
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
				<th class="dataTable-foot-row-cell">Text</th>
				<th class="dataTable-foot-row-cell">Text</th>
				<th class="dataTable-foot-row-cell">Text</th>
			</tr>
		</tfoot>
	</table>
</div>
```
