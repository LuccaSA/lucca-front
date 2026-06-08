# index-table — Table actions userPopover _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<button class="indexTable-body-row-cell-link" type="button"><span class="pr-u-mask">See details</span></button>
				<button class="userPopover_trigger" [luUserPopover]="bob">
					<span>
						<lu-user-picture size="XS" [user]="bob" />
						<span translate="no" class="pr-u-marginInlineStart100">{{ bob | luUserDisplay:'lf' }}</span>
						with userPopover
					</span>
				</button>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```
