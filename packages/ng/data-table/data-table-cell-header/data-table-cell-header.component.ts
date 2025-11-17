import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, computed, ElementRef, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { ReplaySubject } from 'rxjs';
import { BaseDataTableCell } from '../base-data-table-cell';
import { LU_DATA_TABLE_CELL_INSTANCE } from '../data-table-cell.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luDataTableCell]',
	standalone: true,
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
		'[style.--dataTable-layoutFixed-width]': 'fixedWidth()',
		'[style.insetInlineStart]': 'insetInlineStart()',
		'[style.insetInlineEnd]': 'insetInlineEnd()',
	},
	imports: [NgTemplateOutlet, ButtonComponent, IconComponent],
	providers: [
		{
			provide: LU_DATA_TABLE_CELL_INSTANCE,
			useExisting: forwardRef(() => DataTableRowCellHeaderComponent),
		},
	],
})
export class DataTableRowCellHeaderComponent extends BaseDataTableCell implements AfterContentInit {
	elementRef = inject<ElementRef<HTMLTableCellElement>>(ElementRef);

	sort = input<undefined | null | 'ascending' | 'descending'>(undefined);
	fixedWidth = input<string | null>(null);

	insetInlineStart = computed(() => {
		if (!this.isStickyStart() || !this.headRef) {
			return '';
		}
		return (
			this.headRef
				.cols()
				.slice(0, this.position())
				.reduce((acc, col) => {
					return acc + col.inlineSizePx();
				}, 0) + 'px'
		);
	});

	insetInlineEnd = computed(() => {
		if (!this.isStickyEnd() || !this.headRef) {
			return '';
		}
		return (
			this.headRef
				.cols()
				.slice(this.position() + 1)
				.reduce((acc, col) => {
					return acc + col.inlineSizePx();
				}, 0) + 'px'
		);
	});

	#inlineSizePx$ = new ReplaySubject<number>();

	inlineSizePx = toSignal(this.#inlineSizePx$);

	ngAfterContentInit(): void {
		new ResizeObserver(() => {
			this.#inlineSizePx$.next(this.elementRef.nativeElement.clientWidth);
		}).observe(this.elementRef.nativeElement);
	}
}
