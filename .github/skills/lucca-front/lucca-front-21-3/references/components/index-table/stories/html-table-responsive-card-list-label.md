# index-table — Table responsive card list label _(HTML/CSS)_

### Labels

### Nested

### Custom

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable mod-responsiveCardList">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label 1</th>
			<th class="indexTable-head-row-cell" scope="col">Label 2</th>
			<th class="indexTable-head-row-cell" scope="col">Label 3</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 1">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 2">Content</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 3">Content</div>
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 1">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 2">Content</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 3">Content</div>
			</td>
		</tr>
	</tbody>
</table>
```
