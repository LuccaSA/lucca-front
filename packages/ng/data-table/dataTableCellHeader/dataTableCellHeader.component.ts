import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../dataTableBody/dataTableBody.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../dataTableFoot/dataTableFoot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../dataTableHead/dataTableHead.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luDataTableCell]',
	standalone: true,
	templateUrl: './dataTableCellHeader.component.html',
	styleUrl: './dataTableCellHeader.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row-cell]': 'bodyRef !== null',
		'[class.dataTable-head-row-cell]': 'headRef !== null',
		'[class.dataTable-foot-row-cell]': 'footRef !== null',
		'[attr.aria-sort]': 'sort()',
		'[style.--dataTable-layoutFixed-width]': 'fixedWidth()',
	},
	imports: [NgTemplateOutlet, ButtonComponent, IconComponent],
})
export class DataTableRowCellHeaderComponent {
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });

	sort = input<undefined | null | 'ascending' | 'descending'>(undefined);
	fixedWidth = input<string | null>(null);
}
