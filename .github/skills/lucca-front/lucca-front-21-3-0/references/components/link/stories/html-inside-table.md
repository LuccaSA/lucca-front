# link — Inside table _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow></tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luDataTableCell>cell</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luDataTableCell>cell</td>
		</tr>
	</tbody>
</lu-data-table>
<br />
<lu-index-table>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>header</th>
			<th luIndexTableCell>header</th>
			<th luIndexTableCell>header</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell>
				<a luIndexTableAction href="#">action</a>
			</th>
			<td luIndexTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luIndexTableCell>cell</td>
		</tr>
		<tr luIndexTableRow>
			<th luIndexTableCell>
				<a luIndexTableAction href="#">action</a>
			</th>
			<td luIndexTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luIndexTableCell>cell</td>
		</tr>
	</tbody>
</lu-index-table>
```
