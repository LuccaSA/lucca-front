import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, contentChildren, ElementRef, forwardRef, input, viewChild, ViewEncapsulation } from '@angular/core';
import { ResponsiveConfig } from '@lucca-front/ng/core';

import { IndexTableHeadComponent } from './index-table-head/index-table-head.component';
import { IndexTableRowComponent } from './index-table-row/index-table-row.component';
import { LU_INDEX_TABLE_INSTANCE } from './index-table.token';

@Component({
	selector: 'lu-index-table',
	standalone: true,
	templateUrl: './index-table.component.html',
	styleUrl: './index-table.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'indexTableWrapper',
	},
	providers: [
		{
			provide: LU_INDEX_TABLE_INSTANCE,
			useExisting: forwardRef(() => IndexTableComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexTableComponent {
	tableRef = viewChild<ElementRef<Element>>('tableRef');

	selectable = input(false, { transform: booleanAttribute });
	layoutFixed = input(false, { transform: booleanAttribute });
	empty = input(false, { transform: booleanAttribute });

	responsive = input<ResponsiveConfig<'layoutFixed', true>>({});

	rows = contentChildren(IndexTableRowComponent, { descendants: true });
	header = contentChild(IndexTableHeadComponent, { descendants: true });

	cols = computed(() => this.header().cols());

	classMods = computed(() => {
		return {
			indexTable: true,
			['mod-selectable']: this.selectable(),
			['mod-layoutFixed']: this.layoutFixed(),
			...Object.entries(this.responsive()).reduce((acc, [key, value]) => {
				return {
					...acc,
					[`mod-${key}`]: value,
				};
			}, {}),
		};
	});
}
