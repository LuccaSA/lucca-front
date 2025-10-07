import { booleanAttribute, Component, ElementRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../dataTableBody/dataTableBody.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../dataTableFoot/dataTableFoot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../dataTableHead/dataTableHead.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tr[luDataTableRow]',
	standalone: true,
	//template: '<ng-content />',
	templateUrl: './dataTableRow.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row]': 'bodyRef !== null',
		'[class.dataTable-head-row]': 'headRef !== null',
		'[class.dataTable-foot-row]': 'footRef !== null',
		'[class.mod-selectable]': 'tableRef.selectable()',
	},
	imports: [CheckboxInputComponent, FormFieldComponent, FormsModule],
})
export class DataTableRowComponent {
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });

	elementRef = inject<ElementRef<Element>>(ElementRef);

	protected tableRef = inject(LU_DATA_TABLE_INSTANCE);

	selected = model<boolean>(false);
	disabled = input(false, { transform: booleanAttribute });
}
