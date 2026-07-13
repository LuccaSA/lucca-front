# data-table — Inject _(Angular)_

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

```html
<tr luDataTableRow>
	<th luDataTableCell>header</th>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
</tr>
```

```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
		</tr>
		<tr-component />
	</tbody>
</lu-data-table>
```
