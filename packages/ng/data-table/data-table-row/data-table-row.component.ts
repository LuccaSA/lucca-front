import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, contentChildren, ElementRef, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { intlInputOptions } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../data-table-body/data-table-body.token';
import { LU_DATA_TABLE_CELL_INSTANCE } from '../data-table-cell.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../data-table-foot/data-table-foot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../data-table-head/data-table-head.token';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';
import { LU_DATA_TABLE_TRANSLATIONS } from '../data-table.translate';
import { LU_DATA_TABLE_ROW_INSTANCE } from './data-table-row.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tr[luDataTableRow]',
	templateUrl: './data-table-row.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row]': 'bodyRef !== null',
		'[class.dataTable-head-row]': 'headRef !== null',
		'[class.dataTable-foot-row]': 'footRef !== null',
		'[class.mod-selectable]': 'tableRef.selectable() ?? false',
		'[class.mod-draggable]': 'tableRef.drag() ?? false',
	},
	imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, NgTemplateOutlet, IconComponent, CdkDragHandle],
	providers: [
		{
			provide: LU_DATA_TABLE_ROW_INSTANCE,
			useExisting: forwardRef(() => DataTableRowComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableRowComponent {
	intl = input(...intlInputOptions(LU_DATA_TABLE_TRANSLATIONS));
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });

	elementRef = inject<ElementRef<Element>>(ElementRef);

	public readonly cells = contentChildren(LU_DATA_TABLE_CELL_INSTANCE);

	protected tableRef = inject(LU_DATA_TABLE_INSTANCE, { optional: true });

	selected = model<boolean>(false);
	readonly selectedLabel = input<string | null>(null);
	readonly disabled = input(false, { transform: booleanAttribute });
}
