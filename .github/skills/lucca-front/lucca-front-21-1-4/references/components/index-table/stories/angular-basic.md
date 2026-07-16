# index-table — Basic _(Angular)_

```js
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import {
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

```html
<lu-index-table>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell>
				<a luIndexTableAction href="#">link</a>
			</th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell>Content</td>
		</tr>
		<tr luIndexTableRow>
			<td luIndexTableCell colspan="3">Content</td>
		</tr>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell>Content Content Content</td>
		</tr>
	</tbody>
</lu-index-table>
```
