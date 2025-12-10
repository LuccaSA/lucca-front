import {
	afterNextRender,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	contentChildren,
	ElementRef,
	forwardRef,
	inject,
	input,
	numberAttribute,
	signal,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { ResponsiveConfig, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { DataTableHeadComponent } from './data-table-head/data-table-head.component';
import { DataTableRowComponent } from './data-table-row/data-table-row.component';
import { LU_DATA_TABLE_INSTANCE } from './data-table.token';

@Component({
	selector: 'lu-data-table',
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
	#elementRef = inject<ElementRef<Element>>(ElementRef);
	tableRef = viewChild<ElementRef<Element>>('tableRef');

	readonly hover = input(false, { transform: booleanAttribute });
	readonly selectable = input(false, { transform: booleanAttribute });
	readonly layoutFixed = input(false, { transform: booleanAttribute });
	readonly cellBorder = input(false, { transform: booleanAttribute });
	readonly nested = input(false, { transform: booleanAttribute });
	readonly drag = input(false, { transform: booleanAttribute });

	readonly responsive = input<ResponsiveConfig<'layoutFixed', true>>({});

	readonly verticalAlign = input<null | 'top' | 'middle' | 'bottom'>(null);

	readonly rows = contentChildren(DataTableRowComponent, { descendants: true });
	readonly header = contentChild(DataTableHeadComponent, { descendants: true });

	readonly stickyHeader = computed(() => this.header().sticky());

	readonly stickyColsStart = input(0, { transform: numberAttribute });
	readonly stickyColsEnd = input(0, { transform: numberAttribute });

	firstColumnVisibleAfterColsStart = signal(true);
	lastColumnVisibleBeforeColsEnd = signal(false);

	firstColumnVisible = signal(true);
	lastColumnVisible = signal(false);

	firstRowVisible = signal(true);
	lastRowVisible = signal(false);

	readonly cols = computed(() => this.header().cols());

	readonly classMods = computed(() => {
		return {
			dataTable: true,
			['mod-stickyHeader']: this.stickyHeader(),
			['mod-hover']: this.hover(),
			['mod-cellBorder']: this.cellBorder(),
			['mod-verticalAlignTop']: this.verticalAlign() === 'top',
			['mod-verticalAlignMiddle']: this.verticalAlign() === 'middle',
			['mod-verticalAlignBottom']: this.verticalAlign() === 'bottom',
			['mod-columnsOverflow']: this.stickyColsStart() || this.stickyColsEnd(),
			['is-firstColumnVisible']: this.stickyColsStart() || this.firstColumnVisible(),
			['is-lastColumnVisible']: this.stickyColsEnd() || this.lastColumnVisible(),
			['is-firstColumnVisibleAfterColsStart']: this.firstColumnVisibleAfterColsStart(),
			['is-lastColumnVisibleBeforeColsEnd']: this.lastColumnVisibleBeforeColsEnd(),
			['is-firstRowVisible']: this.firstRowVisible(),
			['is-lastRowVisible']: this.lastRowVisible(),
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

		this.firstRowVisible.set(this.#elementRef.nativeElement.scrollTop === 0);
		this.lastRowVisible.set(this.#elementRef.nativeElement.scrollTop >= this.#elementRef.nativeElement.scrollHeight - this.#elementRef.nativeElement.clientHeight);

		this.firstColumnVisibleAfterColsStart.set(this.#elementRef.nativeElement.scrollLeft === 0);
		this.lastColumnVisibleBeforeColsEnd.set(this.#elementRef.nativeElement.scrollLeft >= this.#elementRef.nativeElement.scrollWidth - this.#elementRef.nativeElement.clientWidth);

		this.firstColumnVisible.set(this.#elementRef.nativeElement.scrollLeft === 0);
		this.lastColumnVisible.set(this.#elementRef.nativeElement.scrollLeft >= this.#elementRef.nativeElement.scrollWidth - this.#elementRef.nativeElement.clientWidth);
	}

	constructor() {
		ɵeffectWithDeps([this.rows], () => this.scroll());

		afterNextRender(() => {
			this.scroll();
		});
	}
}
