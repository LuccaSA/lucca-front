import { booleanAttribute, Component, computed, contentChild, contentChildren, ElementRef, forwardRef, inject, input, viewChild, ViewEncapsulation } from '@angular/core';
import { ResponsiveConfig, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { DataTableHeadComponent } from './data-table-head/data-table-head.component';
import { DataTableRowComponent } from './data-table-row/data-table-row.component';
import { LU_DATA_TABLE_INSTANCE } from './data-table.token';

@Component({
	selector: 'lu-data-table',
	standalone: true,
	templateUrl: './data-table.component.html',
	styleUrl: './data-table.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTableWrapper',
		'[class.mod-nested]': 'this.nested()',
		'(scroll)': 'scroll()',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_INSTANCE,
			useExisting: forwardRef(() => DataTableComponent),
		},
	],
})
export class DataTableComponent {
	#elementRef = inject<ElementRef<Element>>(ElementRef);
	tableRef = viewChild<ElementRef<Element>>('tableRef');

	hover = input(false, { transform: booleanAttribute });
	selectable = input(false, { transform: booleanAttribute });
	layoutFixed = input(false, { transform: booleanAttribute });
	cellBorder = input(false, { transform: booleanAttribute });
	nested = input(false, { transform: booleanAttribute });

	responsive = input<ResponsiveConfig<'layoutFixed', true>>({});

	verticalAlign = input<null | 'top' | 'middle' | 'bottom'>(null);

	rows = contentChildren(DataTableRowComponent, { descendants: true });
	header = contentChild(DataTableHeadComponent, { descendants: true });

	stickyHeader = computed(() => this.header().sticky());

	cols = computed(() => this.header().cols());

	classMods = computed(() => {
		return {
			dataTable: true,
			['mod-stickyHeader']: this.stickyHeader(),
			['mod-hover']: this.hover(),
			['mod-cellBorder']: this.cellBorder(),
			['mod-verticalAlignTop']: this.verticalAlign() === 'top',
			['mod-verticalAlignMiddle']: this.verticalAlign() === 'middle',
			['mod-verticalAlignBottom']: this.verticalAlign() === 'bottom',
			['mod-layoutFixed']: this.layoutFixed(),
			...Object.entries(this.responsive()).reduce((acc, [key, value]) => {
				return {
					...acc,
					[`mod-${key}`]: value,
				};
			}, {}),
		};
	});

	scroll() {
		this.header().isFirstVisible.set(this.#elementRef.nativeElement.scrollTop === 0);
	}

	constructor() {
		ɵeffectWithDeps([this.rows], () => this.scroll());
	}
}
