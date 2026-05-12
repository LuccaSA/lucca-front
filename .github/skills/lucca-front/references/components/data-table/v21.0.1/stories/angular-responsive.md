# data-table — Responsive _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
${…}
<lu-data-table${…}${…}${…}${…}${…}${…} [responsive]="layoutfixed">
	<thead luDataTableHead${…}>
		<tr luDataTableRow>
			<th luDataTableCell>${…} ${…} ${…}</th>${…}
			<th luDataTableCell${…}${…}${…}>${…}</th>
		</tr>
	</thead>
	<tbody luDataTableBody${…}${…}>${…}
		<tr luDataTableRow>
			<th luDataTableCell>${…}${…}</th>${…}
			<td luDataTableCell${…}${…}>${…}</td>
		</tr>
		<tr luDataTableRow${…}${…}>
			<th luDataTableCell>${…}</th>${…}
			<td luDataTableCell${…}${…}>${…}</td>
		</tr>
	</tbody>${…}
</lu-data-table>
```
