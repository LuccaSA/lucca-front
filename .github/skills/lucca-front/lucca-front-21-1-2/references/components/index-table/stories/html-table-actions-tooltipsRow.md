# index-table — Table actions tooltipsRow _(HTML/CSS)_

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
		<tr class="indexTable-body-row pr-u-cursorPointer" #line1 (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<!-- preventDefault is only here for demonstration -->
				<a
					href="#primaryNavigation"
					luTooltip="Primary action (you can click)"
					[luTooltipAnchor]="line1"
					class="indexTable-body-row-cell-link pr-u-ellipsis"
					(click)=" $event.preventDefault(); $event.stopPropagation(); message('Primary action (on link)')"
				>
					Tooltip for the row
					<code class="code">a</code>
				</a>
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
		<tr class="indexTable-body-row pr-u-cursorPointer" #line2 (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<button
					luTooltip="Primary action (you can click)"
					[luTooltipAnchor]="line2"
					type="button"
					class="indexTable-body-row-cell-link pr-u-ellipsis"
				>
					Tooltip for the row
					<code class="code">button</code>
				</button>
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
