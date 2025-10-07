import { booleanAttribute, Component, computed, contentChild, contentChildren, ElementRef, forwardRef, inject, input, viewChild, ViewEncapsulation } from '@angular/core';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LU_DATA_TABLE_INSTANCE } from './data-table.token';
import { DataTableHeadComponent } from './dataTableHead/dataTableHead.component';
import { DataTableRowComponent } from './dataTableRow/dataTableRow.component';

@Component({
	selector: 'lu-data-table',
	standalone: true,
	templateUrl: './data-table.component.html',
	styleUrl: './data-table.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTableWrapper',
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

	rows = contentChildren(DataTableRowComponent, { descendants: true });
	header = contentChild(DataTableHeadComponent, { descendants: true });

	stickyHeader = computed(() => this.header().sticky());

	cols = computed(() => this.header().cols());

	scroll() {
		this.header().isFirstVisible.set(this.#elementRef.nativeElement.scrollTop === 0);
	}

	constructor() {
		ɵeffectWithDeps([this.rows], () => this.scroll());
	}
}
