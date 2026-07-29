# data-table — Header _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/dataTableSticked'; // Import additionnel
```

```html
<div class="dataTableWrapper" style="block-size: 10rem">
	<table class="dataTable mod-stickyHeader">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>
```
