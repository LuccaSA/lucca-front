# index-table — Table actions tooltipsCell _(HTML/CSS)_

<callout background="1">

Le clic sur la cellule est automatiquement désactivée par le tooltip. Il est possible de récupérer ce clic en ajoutant `(click)="..."` sur les `td` concernés.

</callout>

### Cellule

### Ligne

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/code';
```

```html
<table class="indexTable mod-layoutFixed">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Action</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 8">Content</th>
			<th
				class="indexTable-head-row-cell mod-alignRight"
				scope="col"
				style="--components-indexTable-cell-fixed-width: 3"
			>
				<span class="pr-u-mask">Secondary action</span>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row pr-u-cursorPointer" (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<!-- preventDefault is only here for demonstration -->
				<a
					href="#"
					class="indexTable-body-row-cell-link"
					(click)="$event.preventDefault(); $event.stopPropagation(); message('Primary action (on link)')"
				>
					<span class="pr-u-mask">See details</span>
				</a>
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-maxInlineSize100% pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Primary action (you can click)"
				>
					Tooltip for the cell
					<code class="code">a</code>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td
				class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection pr-u-cursorDefault"
				(click)="$event.stopPropagation()"
			>
				<span class="pr-u-cursorText">Selectable</span>
			</td>
			<td class="indexTable-body-row-cell">
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions" (click)="$event.stopPropagation()">
				<button
					luTooltip="Secondary action (you can click)"
					luTooltipOnlyForDisplay
					(click)="message('Secondary action (on button)')"
					type="button"
					class="button mod-critical indexTable-body-row-cell-subAction"
				>
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
		<tr class="indexTable-body-row pr-u-cursorPointer" (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<button type="button" class="indexTable-body-row-cell-link"><span class="pr-u-mask">See details</span></button>
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-maxInlineSize100% pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Primary action (you can click)"
				>
					Tooltip for the cell
					<code class="code">button</code>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td
				class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection pr-u-cursorDefault"
				(click)="$event.stopPropagation()"
			>
				<span class="pr-u-cursorText">Selectable</span>
			</td>
			<td class="indexTable-body-row-cell">
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions">
				<button
					luTooltip="Secondary action (you can click)"
					luTooltipOnlyForDisplay
					(click)="$event.stopPropagation(); message('Secondary action (on button)')"
					type="button"
					class="button mod-critical indexTable-body-row-cell-subAction"
				>
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
```
