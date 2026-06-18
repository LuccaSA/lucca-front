import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { isNotNil } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ReplaySubject } from 'rxjs';
import { BaseDataTableCell } from '../base-data-table-cell';
import { LU_DATA_TABLE_CELL_INSTANCE } from '../data-table-cell.token';
import { DataTableSort } from '../data-table.type';

const SORT_VALUES = ['none', 'ascending', 'descending'] as const;

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luDataTableCell]',
	templateUrl: './data-table-cell-header.component.html',
	styleUrl: './data-table-cell-header.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row-cell]': 'bodyRef !== null',
		'[class.dataTable-head-row-cell]': 'headRef !== null',
		'[class.dataTable-foot-row-cell]': 'footRef !== null',
		'[class.mod-alignStart]': 'align() === "start"',
		'[class.mod-alignCenter]': 'align() === "center"',
		'[class.mod-alignEnd]': 'align() === "end"',
		'[class.mod-stickyColumn]': 'isStickyStart() || isStickyEnd()',
		'[attr.aria-sort]': 'sort()',
		'[class.mod-editable]': 'editable()',
		'[attr.scope]': 'bodyRef !== null ? "row" : "col"',
		'[style.--dataTable-layoutFixed-width]': 'inlineSize() || fixedWidth()',
		'[style.insetInlineStart]': 'insetInlineStart()',
		'[style.insetInlineEnd]': 'insetInlineEnd()',
	},
	imports: [NgTemplateOutlet, ButtonComponent, IconComponent, FormsModule],
	providers: [
		{
			provide: LU_DATA_TABLE_CELL_INSTANCE,
			useExisting: forwardRef(() => DataTableRowCellHeaderComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableRowCellHeaderComponent extends BaseDataTableCell implements AfterContentInit {
	readonly elementRef = inject<ElementRef<HTMLTableCellElement>>(ElementRef);

	readonly sort = model<DataTableSort | null>(null);
	readonly fixedWidth = input<string | null>(null);
	readonly inlineSize = input<string | null>(null);

	readonly insetInlineStart = computed(() => {
		const isFirstOrLastCol = this.position() === 0 || this.position() === (this.rowRef?.cells().length ?? 0) - 1;
		if (isFirstOrLastCol || !this.isStickyStart() || !this.headRef) {
			return '';
		}
		return (
			this.headRef
				.cols()
				.slice(0, this.position())
				.reduce((acc, col) => {
					return acc + (col.inlineSizePx() ?? 0);
				}, 0) + 'px'
		);
	});

	readonly insetInlineEnd = computed(() => {
		const isFirstOrLastCol = this.position() === 0 || this.position() === (this.rowRef?.cells().length ?? 0) - 1;
		if (isFirstOrLastCol || !this.isStickyEnd() || !this.headRef) {
			return '';
		}
		return (
			this.headRef
				.cols()
				.slice((this.position() ?? 0) + 1)
				.reduce((acc, col) => {
					return acc + (col.inlineSizePx() ?? 0);
				}, 0) + 'px'
		);
	});

	readonly #inlineSizePx$ = new ReplaySubject<number>();

	readonly inlineSizePx = toSignal(this.#inlineSizePx$);

	ngAfterContentInit(): void {
		new ResizeObserver(() => {
			this.#inlineSizePx$.next(this.elementRef.nativeElement.clientWidth);
		}).observe(this.elementRef.nativeElement);
	}

	toggleSort(): void {
		const sort = this.sort();
		if (isNotNil(sort)) {
			this.sort.set(SORT_VALUES[(SORT_VALUES.indexOf(sort) + 1) % SORT_VALUES.length]);
		}
	}
}
