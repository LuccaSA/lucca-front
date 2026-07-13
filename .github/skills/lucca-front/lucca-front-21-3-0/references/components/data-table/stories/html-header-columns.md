# data-table — Header columns _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/dataTableSticked'; // Import additionne
```

```html
<div class="dataTableWrapper" style="inline-size: 30rem; height: 10rem">
	<table class="dataTable mod-stickyHeader">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>
```
