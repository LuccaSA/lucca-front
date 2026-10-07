import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	contentChildren,
	DestroyRef,
	ElementRef,
	forwardRef,
	inject,
	input,
	OnInit,
	signal,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { luBooleanAttribute, luNumberAttribute, ResponsiveConfig, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { DataTableHeadComponent } from './data-table-head/data-table-head.component';
import { DataTableRowComponent } from './data-table-row/data-table-row.component';
import { LU_DATA_TABLE_INSTANCE } from './data-table.token';
import { DataTableVerticalAlign } from './data-table.type';

@Component({
	selector: 'lu-data-table',
	templateUrl: './data-table.component.html',
	styleUrl: './data-table.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTableWrapper',
		'[class.mod-nested]': 'this.nested()',
		'[class.mod-noOverflow]': 'this.noOverflow()',
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
export class DataTableComponent implements OnInit {
	#elementRef = inject<ElementRef<Element>>(ElementRef);
	readonly tableRef = viewChild<ElementRef<Element>>('tableRef');
	#destroyRef = inject(DestroyRef);

	/**
	 * Highlights the hovered row to ease the reading of wide tables (does not imply an interaction)
	 */
	readonly hover = input(false, { transform: luBooleanAttribute });

	/**
	 * Adds a selection checkbox column to the rows (displayed for rows with a `selectedLabel`)
	 */
	readonly selectable = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies a fixed layout to the table columns. A column width can be set with `inlineSize` on `th[luDataTableCell]`
	 */
	readonly layoutFixed = input(false, { transform: luBooleanAttribute });

	/**
	 * Adds a vertical separator between cells
	 */
	readonly cellBorder = input(false, { transform: luBooleanAttribute });

	/**
	 * Reduces the table border radius to nest it in a structure component
	 */
	readonly nested = input(false, { transform: luBooleanAttribute });

	/**
	 * Adds a drag handle column to the rows, to be used with the CDK drag and drop
	 */
	readonly drag = input(false, { transform: luBooleanAttribute });

	/**
	 * Lets the table grow with its content (minimum inline size set to `fit-content`) instead of scrolling horizontally
	 */
	readonly noOverflow = input(false, { transform: luBooleanAttribute });

	/**
	 * Marks the table as empty: the table gets `role="presentation"` and the header becomes `inert`.
	 * The empty state itself must be projected in a body row
	 */
	readonly empty = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies `layoutFixed` from a given breakpoint, e.g. `{ layoutFixedAtMediaMinS: true }`
	 */
	readonly responsive = input<ResponsiveConfig<'layoutFixed', true>>({});

	/**
	 * Vertical alignment of the cells content
	 */
	readonly verticalAlign = input<DataTableVerticalAlign | null>(null);

	readonly rows = contentChildren(DataTableRowComponent, { descendants: true });
	readonly header = contentChild(DataTableHeadComponent, { descendants: true });

	readonly stickyHeader = computed(() => this.header()?.sticky());

	/**
	 * Number of columns kept sticky at the start of the table when scrolling horizontally
	 */
	readonly stickyColsStart = input(0, { transform: luNumberAttribute });

	/**
	 * Number of columns kept sticky at the end of the table when scrolling horizontally
	 */
	readonly stickyColsEnd = input(0, { transform: luNumberAttribute });

	readonly firstColumnVisibleAfterColsStart = signal(true);
	readonly lastColumnVisibleBeforeColsEnd = signal(false);

	readonly firstColumnVisible = signal(true);
	readonly lastColumnVisible = signal(false);

	readonly firstRowVisible = signal(true);
	readonly lastRowVisible = signal(false);

	readonly cols = computed(() => this.header()?.cols());

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
		this.header()?.isFirstVisible.set(this.#elementRef.nativeElement.scrollTop === 0);

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

	ngOnInit(): void {
		const tableElement = this.tableRef()?.nativeElement;
		if (tableElement) {
			const observer = new ResizeObserver(() => this.scroll());
			observer.observe(tableElement);
			this.#destroyRef.onDestroy(() => observer.disconnect());
		}
	}
}
