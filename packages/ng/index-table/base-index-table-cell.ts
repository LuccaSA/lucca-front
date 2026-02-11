import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { LU_INDEX_TABLE_BODY_INSTANCE } from './index-table-body/index-table-body.token';
import { LU_INDEX_TABLE_FOOT_INSTANCE } from './index-table-foot/index-table-foot.token';
import { LU_INDEX_TABLE_HEAD_INSTANCE } from './index-table-head/index-table-head.token';
import { LU_INDEX_TABLE_ROW_INSTANCE } from './index-table-row/index-table-row.token';
import { LU_INDEX_TABLE_INSTANCE } from './index-table.token';

@Component({
	selector: 'lu-base-index-table-cell',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseIndexTableCell {
	tableRef = inject(LU_INDEX_TABLE_INSTANCE);
	bodyRef = inject(LU_INDEX_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_INDEX_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_INDEX_TABLE_FOOT_INSTANCE, { optional: true });
	rowRef = inject(LU_INDEX_TABLE_ROW_INSTANCE);

	align = input<null | 'start' | 'center' | 'end'>(null);

	alignCol = computed(() => {
		return this.tableRef.header().cols()[this.position()].align();
	});

	position = computed(() => {
		return this.rowRef.cells().indexOf(this);
	});
}
