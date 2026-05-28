import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { BaseIndexTableCell } from '../base-index-table-cell';
import { LU_INDEX_TABLE_CELL_INSTANCE } from '../index-table-cell.token';

const SORT_VALUES = ['none', 'ascending', 'descending'] as const;

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luIndexTableCell]',
	standalone: true,
	templateUrl: './index-table-cell-header.component.html',
	styleUrl: './index-table-cell-header.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.indexTable-body-row-cell]': 'bodyRef !== null',
		'[class.indexTable-head-row-cell]': 'headRef !== null',
		'[class.indexTable-foot-row-cell]': 'footRef !== null',
		'[class.mod-alignStart]': 'align() === "start" || alignCol() === "start"',
		'[class.mod-alignCenter]': 'align() === "center" || alignCol() === "center"',
		'[class.mod-alignEnd]': 'align() === "end" || alignCol() === "end"',
		'[attr.aria-sort]': 'sort()',
		'[attr.scope]': 'bodyRef !== null ? "row" : "col"',
		'[class.mod-selectable]': 'selectable()',
		'[class.mod-actions]': 'actions()',
		'[style.--components-indexTable-cell-fixed-width]': 'inlineSize() !== 0 ? inlineSize() : null',
	},
	imports: [NgTemplateOutlet, ButtonComponent, IconComponent, FormsModule],
	providers: [
		{
			provide: LU_INDEX_TABLE_CELL_INSTANCE,
			useExisting: forwardRef(() => IndexTableRowCellHeaderComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexTableRowCellHeaderComponent extends BaseIndexTableCell {
	readonly elementRef = inject<ElementRef<HTMLTableCellElement>>(ElementRef);

	readonly sort = model<null | 'none' | 'ascending' | 'descending'>(null);
	readonly selectable = input(false, { transform: luBooleanAttribute });
	readonly hiddenLabel = input(false, { transform: luBooleanAttribute });
	readonly actions = input(false, { transform: luBooleanAttribute });
	readonly inlineSize = input(0, { transform: luNumberAttribute });

	toggleSort(): void {
		if (this.sort()) {
			this.sort.set(SORT_VALUES[(SORT_VALUES.indexOf(this.sort() ?? 'none') + 1) % SORT_VALUES.length]);
		}
	}
}
