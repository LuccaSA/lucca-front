import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, inject, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../data-table-body/data-table-body.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../data-table-foot/data-table-foot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../data-table-head/data-table-head.token';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tr[luDataTableRow]',
	templateUrl: './data-table-row.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row]': 'bodyRef !== null',
		'[class.dataTable-head-row]': 'headRef !== null',
		'[class.dataTable-foot-row]': 'footRef !== null',
		'[class.mod-selectable]': 'tableRef.selectable()',
	},
	imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, NgTemplateOutlet],
})
export class DataTableRowComponent {
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });

	protected tableRef = inject(LU_DATA_TABLE_INSTANCE);

	selected = model<boolean>(false);
	selectedLabel = input<string | null>(null);
	disabled = input(false, { transform: booleanAttribute });
}
