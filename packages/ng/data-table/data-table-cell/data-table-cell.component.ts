import { booleanAttribute, Component, computed, forwardRef, inject, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../data-table-body/data-table-body.token';
import { LU_DATA_TABLE_CELL_INSTANCE } from '../data-table-cell.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../data-table-foot/data-table-foot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../data-table-head/data-table-head.token';
import { LU_DATA_TABLE_ROW_INSTANCE } from '../data-table-row/data-table-row.token';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'td[luDataTableCell]',
	standalone: true,
	templateUrl: './data-table-cell.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row-cell]': 'bodyRef !== null',
		'[class.dataTable-head-row-cell]': 'headRef !== null',
		'[class.dataTable-foot-row-cell]': 'footRef !== null',
		'[class.mod-alignStart]': 'align() === "start"',
		'[class.mod-alignCenter]': 'align() === "center"',
		'[class.mod-alignEnd]': 'align() === "end"',
		'[class.mod-editable]': 'editable()',
		'[class.mod-actions]': 'actions()',
		'[class.mod-stickyColumn]': 'isSticky()',
		'[style.insetInlineStart]': 'insetInlineStart()',
		'[style.insetInlineEnd]': 'insetInlineEnd()',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_CELL_INSTANCE,
			useExisting: forwardRef(() => DataTableRowCellComponent),
		},
	],
})
export class DataTableRowCellComponent {
	tableRef = inject(LU_DATA_TABLE_INSTANCE);
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });
	rowRef = inject(LU_DATA_TABLE_ROW_INSTANCE);

	align = input<null | 'start' | 'center' | 'end'>(null);
	editable = input(false, { transform: booleanAttribute });
	actions = input(false, { transform: booleanAttribute });

	pos = input(0, { transform: numberAttribute });
	start = input<string | null>(null);
	end = input<string | null>(null);

	position = computed(() => {
		return this.rowRef.cells().indexOf(this);
	});

	isSticky = computed(() => {
		return this.position() <= this.tableRef.stickyColsStart() - 1 || this.position() >= this.rowRef.cells().length - this.tableRef.stickyColsEnd();
	});

	insetInlineStart = computed(() => {
		return this.tableRef.header().cols()[this.position()].insetInlineStart();
	});

	insetInlineEnd = computed(() => {
		return this.tableRef.header().cols()[this.position()].insetInlineEnd();
	});
}
