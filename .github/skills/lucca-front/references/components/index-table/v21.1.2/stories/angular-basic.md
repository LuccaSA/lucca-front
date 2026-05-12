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
<lu-index-table${…}${…}${…}>
	<thead luIndexTableHead>
		<tr luIndexTableRow${…}>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell${…}>Label</th>
			<th luIndexTableCell${…}${…}>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody${…}${…}${…}>
		${…}
	</tbody>${…}${…}
</lu-index-table>${…}
```
