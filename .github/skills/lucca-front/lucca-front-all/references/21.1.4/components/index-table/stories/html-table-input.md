# index-table — Table input _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable mod-selectable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<label class="indexTable-body-row-cell-link" for="myInput">
					<span>Importer un ficher</span>
				</label>
				<input
					id="myInput"
					type="file"
					accept=".pdf, .jpg, .jpeg, .png"
					class="indexTable-body-row-cell-link pr-u-mask"
				/>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```
