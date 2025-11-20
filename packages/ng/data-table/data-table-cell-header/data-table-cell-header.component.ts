import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, inject, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../data-table-body/data-table-body.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../data-table-foot/data-table-foot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../data-table-head/data-table-head.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luDataTableCell]',
	standalone: true,
	templateUrl: './data-table-cell-header.component.html',
	styleUrl: './data-table-cell-header.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row-cell]': 'bodyRef !== null',
		'[class.dataTable-head-row-cell]': 'headRef !== null',
		'[class.dataTable-foot-row-cell]': 'footRef !== null',
		'[class.mod-alignStart]': 'align() === "start"',
		'[class.mod-alignCenter]': 'align() === "center"',
		'[class.mod-alignEnd]': 'align() === "end"',
		'[attr.aria-sort]': 'sort()',
		'[style.--dataTable-layoutFixed-width]': 'fixedWidth()',
		'[class.mod-editable]': 'editable()',
	},
	imports: [NgTemplateOutlet, ButtonComponent, IconComponent, FormsModule],
})
export class DataTableRowCellHeaderComponent {
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });

	sort = model<undefined | null | 'ascending' | 'descending'>(undefined);
	fixedWidth = input<string | null>(null);
	editable = input(false, { transform: booleanAttribute });
	align = input<null | 'start' | 'center' | 'end'>(null);
}
