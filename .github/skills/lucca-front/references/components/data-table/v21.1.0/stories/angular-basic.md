# data-table — Basic _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

```html
<lu-data-table${…}${…}${…}${…}${…}${…}${…}>
	<thead luDataTableHead>
		<tr luDataTableRow${…}>
			<th luDataTableCell>${…}</th>${…}
			<th luDataTableCell${…}${…}${…}>${…}</th>
		</tr>
	</thead>
	<tbody luDataTableBody${…}${…}>${…}
		<tr luDataTableRow${…}>
			<th luDataTableCell>${…}${…}</th>${…}
			<td luDataTableCell${…}>${…}</td>
		</tr>
		<tr luDataTableRow${…}${…}${…}>
			<th luDataTableCell>${…}</th>${…}
			<td luDataTableCell${…}>${…}</td>
		</tr>
	</tbody>${…}${…}
</lu-data-table>
${…}${…}
```
