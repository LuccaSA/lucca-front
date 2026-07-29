# data-table — Columns responsive _(HTML/CSS)_

### Responsive

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable mod-layoutFixedAtMediaMinM">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 10rem'">
					Fixed 10rem column
				</th>
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 12rem'">
					Fixed 12rem column
				</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>
```
