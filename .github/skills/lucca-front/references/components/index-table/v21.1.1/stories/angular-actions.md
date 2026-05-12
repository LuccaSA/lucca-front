# index-table — Actions _(Angular)_

```js
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import {
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
```

```html
<lu-index-table${…}>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell actions${…}>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell>Content Content Content</td>
			<td luIndexTableCell align="end">
				${…}
			</td>
		</tr>
	</tbody>
</lu-index-table>${…}
```
