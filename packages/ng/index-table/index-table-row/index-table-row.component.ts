import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, contentChildren, forwardRef, inject, input, model, numberAttribute, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_INDEX_TABLE_BODY_INSTANCE } from '../index-table-body/index-table-body.token';
import { LU_INDEX_TABLE_CELL_INSTANCE } from '../index-table-cell.token';
import { LU_INDEX_TABLE_FOOT_INSTANCE } from '../index-table-foot/index-table-foot.token';
import { LU_INDEX_TABLE_HEAD_INSTANCE } from '../index-table-head/index-table-head.token';
import { LU_INDEX_TABLE_INSTANCE } from '../index-table.token';
import { LU_INDEX_TABLE_ROW_INSTANCE } from './index-table-row.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tr[luIndexTableRow]',
	standalone: true,
	templateUrl: './index-table-row.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.indexTable-body-row]': 'bodyRef !== null',
		'[class.indexTable-head-row]': 'headRef !== null',
		'[class.indexTable-foot-row]': 'footRef !== null',
		'[class.mod-selectable]': 'tableRef.selectable()',
		'[class.mod-stack2]': 'stack() === 2',
		'[class.mod-stack3]': 'stack() === 3',
	},
	imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, NgTemplateOutlet],
	providers: [
		{
			provide: LU_INDEX_TABLE_ROW_INSTANCE,
			useExisting: forwardRef(() => IndexTableRowComponent),
		},
	],
})
export class IndexTableRowComponent {
	bodyRef = inject(LU_INDEX_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_INDEX_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_INDEX_TABLE_FOOT_INSTANCE, { optional: true });

	public readonly cells = contentChildren(LU_INDEX_TABLE_CELL_INSTANCE);

	protected tableRef = inject(LU_INDEX_TABLE_INSTANCE);

	selected = model<boolean>(false);
	selectedLabel = input<string | null>(null);
	disabled = input(false, { transform: booleanAttribute });
	stack = input(1, { transform: numberAttribute });
}
