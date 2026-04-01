import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { isNotNil } from '@lucca-front/ng/core';
import { LU_DATA_TABLE_BODY_INSTANCE } from './data-table-body/data-table-body.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from './data-table-foot/data-table-foot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from './data-table-head/data-table-head.token';
import { LU_DATA_TABLE_ROW_INSTANCE } from './data-table-row/data-table-row.token';
import { LU_DATA_TABLE_INSTANCE } from './data-table.token';

@Component({
	selector: 'lu-base-data-table-cell',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseDataTableCell {
	tableRef = inject(LU_DATA_TABLE_INSTANCE, { optional: true });
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });
	rowRef = inject(LU_DATA_TABLE_ROW_INSTANCE, { optional: true });

	readonly editable = input(false, { transform: booleanAttribute });
	align = input<null | 'start' | 'center' | 'end'>(null);

	isStickyStart = computed(() => {
		const position = this.position();
		return isNotNil(position) && isNotNil(this.tableRef) ? position <= this.tableRef.stickyColsStart() - 1 : undefined;
	});

	isStickyEnd = computed(() => {
		const position = this.position();
		return isNotNil(position) && isNotNil(this.tableRef) && isNotNil(this.rowRef) ? position >= this.rowRef.cells().length - this.tableRef.stickyColsEnd() : undefined;
	});

	position = computed(() => {
		return this.rowRef?.cells().indexOf(this);
	});
}
