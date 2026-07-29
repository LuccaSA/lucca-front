# index-table — Table actions dropdown _(HTML/CSS)_

<callout background="1">

Le clic sur la cellule est automatiquement désactivée par le bouton d'action. Il est possible de récupérer ce clic en ajoutant `(click)="..."` sur les `td` concernés.

</callout>

### Dropdown

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">
				<span class="pr-u-mask">Actions</span>
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
			<td class="indexTable-body-row-cell mod-actions">
				<button
					type="button"
					class="button indexTable-body-row-cell-subActionDropdownTrigger mod-ghost mod-onlyIcon mod-S"
				>
					<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
```
