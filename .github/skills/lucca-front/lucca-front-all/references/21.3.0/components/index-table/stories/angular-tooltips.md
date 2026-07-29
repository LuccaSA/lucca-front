# index-table — Tooltips _(Angular)_

```js
import { finn } from '@/stories/users/user.mocks';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import {
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```

```html
<lu-index-table layoutFixed>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Action</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell actions>Secondary action</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow #line1>
			<th luIndexTableCell>
				<a href="#" luIndexTableAction class="pr-u-ellipsis" luTooltip="Primary action" [luTooltipAnchor]="line1">
					Tooltip for the row
					<code class="code">a</code>
				</a>
			</th>
			<td luIndexTableCell>
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td luIndexTableCell selectable>Selectable</td>
			<td luIndexTableCell>
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">
				<button
					luButton
					luTooltip="Secondary action"
					luTooltipOnlyForDisplay
					type="button"
					class="indexTable-body-row-cell-subAction"
				>
					<lu-icon icon="trashDelete" alt="Supprimer" />
				</button>
			</td>
		</tr>
	</tbody>
</lu-index-table>
```
