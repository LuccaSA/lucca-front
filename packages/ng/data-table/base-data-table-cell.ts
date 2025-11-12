import { booleanAttribute, Component, computed, inject, input } from '@angular/core';
import { LU_DATA_TABLE_BODY_INSTANCE } from './data-table-body/data-table-body.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from './data-table-foot/data-table-foot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from './data-table-head/data-table-head.token';
import { LU_DATA_TABLE_ROW_INSTANCE } from './data-table-row/data-table-row.token';
import { LU_DATA_TABLE_INSTANCE } from './data-table.token';

@Component({
	selector: 'lu-base-data-table-cell',
	template: '',
})
export abstract class BaseDataTableCell {
	tableRef = inject(LU_DATA_TABLE_INSTANCE);
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });
	rowRef = inject(LU_DATA_TABLE_ROW_INSTANCE);

	editable = input(false, { transform: booleanAttribute });
	align = input<null | 'start' | 'center' | 'end'>(null);

	isStickyStart = computed(() => {
		return this.position() <= this.tableRef.stickyColsStart() - 1;
	});

	isStickyEnd = computed(() => {
		return this.position() >= this.rowRef.cells().length - this.tableRef.stickyColsEnd();
	});

	position = computed(() => {
		return this.rowRef.cells().indexOf(this);
	});
}
