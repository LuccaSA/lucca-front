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
@let layoutfixed =
	{
		layoutFixedAtMediaMinS: true,
	};
<lu-data-table [responsive]="layoutfixed">
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header header header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
		</tr>
	</tbody>
</lu-data-table>
```
