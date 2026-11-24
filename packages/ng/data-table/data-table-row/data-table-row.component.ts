import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { intlInputOptions, luBooleanAttribute, ɵRANGE_SELECTABLE_ITEM, ɵRangeSelectableItem, ɵRangeSelectionDirective } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { ReorderDirective, ReorderHandleComponent } from '@lucca-front/ng/reorder';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../data-table-body/data-table-body.token';
import { LU_DATA_TABLE_CELL_INSTANCE } from '../data-table-cell.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../data-table-foot/data-table-foot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../data-table-head/data-table-head.token';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';
import { LU_DATA_TABLE_TRANSLATIONS } from '../data-table.translate';
import { LU_DATA_TABLE_ROW_INSTANCE } from './data-table-row.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tr[luDataTableRow]',
	templateUrl: './data-table-row.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row]': 'bodyRef !== null',
		'[class.dataTable-head-row]': 'headRef !== null',
		'[class.dataTable-foot-row]': 'footRef !== null',
		'[class.mod-selectable]': 'tableRef?.selectable() ?? false',
		'[class.mod-draggable]': 'tableRef?.drag() ?? false',
		'[class.is-rangeWillCheck]': 'rangePreview() === true',
		'[class.is-rangeWillUncheck]': 'rangePreview() === false',
		'[class.is-rangeWillMix]': "rangePreview() === 'mixed'",
	},
	imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, NgTemplateOutlet, IconComponent, CdkDragHandle, ReorderHandleComponent, ɵRangeSelectionDirective],
	providers: [
		{
			provide: LU_DATA_TABLE_ROW_INSTANCE,
			useExisting: forwardRef(() => DataTableRowComponent),
		},
		{
			provide: ɵRANGE_SELECTABLE_ITEM,
			useExisting: forwardRef(() => DataTableRowComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableRowComponent implements ɵRangeSelectableItem {
	readonly intl = input(...intlInputOptions(LU_DATA_TABLE_TRANSLATIONS));
	readonly bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	readonly headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	readonly footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });

	readonly elementRef = inject<ElementRef<Element>>(ElementRef);

	public readonly cells = contentChildren(LU_DATA_TABLE_CELL_INSTANCE);

	protected tableRef = inject(LU_DATA_TABLE_INSTANCE, { optional: true });

	protected readonly reorder = inject(ReorderDirective, { optional: true });

	readonly selected = model<boolean>(false);
	readonly selectedLabel = input<string | null>(null);
	readonly mixed = input(false, { transform: luBooleanAttribute });
	readonly disabled = input(false, { transform: luBooleanAttribute });

	/**
	 * Lets the table manage the "select all" checkbox of the head row, for the rows of the page, groups collapsed included:
	 * - its state follows all the rows, disabled ones included: checked, unchecked or mixed;
	 * - a click unselects the enabled rows when they are all selected, and selects them otherwise; disabled rows never change;
	 * - it is disabled when no row of the page is enabled.
	 * The `selected` and `mixed` inputs of the head row are then ignored, and the head row emits nothing: listen to the rows.
	 * Leave it unset when "select all" acts on several pages, and bind `selected` and `mixed` instead.
	 */
	readonly autoSelectAllOnPage = input(false, { transform: luBooleanAttribute });

	/** Whether this row is the head row and manages "select all" */
	protected readonly managesSelectAll = computed(() => !!this.headRef && this.autoSelectAllOnPage());

	/** Rows of the page reflected by the "select all" checkbox, disabled rows included */
	readonly #pageRows = computed(() =>
		this.managesSelectAll() ? (this.tableRef?.rangeSelection.getItems() ?? []).filter((item): item is DataTableRowComponent => item instanceof DataTableRowComponent) : [],
	);

	/** Rows of the page changed by the "select all" checkbox */
	readonly #enabledPageRows = computed(() => this.#pageRows().filter((row) => !row.disabled()));

	/** State of the "select all" checkbox managed by the table */
	protected readonly selectAllState = computed(() => {
		const rows = this.#pageRows();
		const selectedCount = rows.filter((row) => row.selected()).length;
		return selectedCount === 0 ? false : selectedCount === rows.length ? true : ('mixed' as const);
	});

	/** "Select all" checkbox managed by the table: a form control, so that its view is rewritten even when its value does not change */
	protected readonly selectAllControl = new FormControl(false, { nonNullable: true });

	constructor() {
		effect(() => {
			if (this.managesSelectAll()) {
				this.selectAllControl.setValue(this.selectAllState() === true, { emitEvent: false });
				if (this.#enabledPageRows().length > 0) {
					this.selectAllControl.enable({ emitEvent: false });
				} else {
					this.selectAllControl.disable({ emitEvent: false });
				}
			}
		});

		this.selectAllControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.#toggleSelectAll());
	}

	/** Unselects the enabled rows when they are all selected, selects them otherwise */
	#toggleSelectAll(): void {
		const rows = this.#enabledPageRows();
		const selected = !rows.every((row) => row.selected());
		rows.forEach((row) => row.selected.set(selected));
		this.tableRef?.rangeSelection.setAnchorAtStart();
		// The checkbox shows the state of the rows, even when it is the same as before the click
		this.selectAllControl.setValue(this.selectAllState() === true, { emitEvent: false });
	}

	/** The "select all" checkbox of the head row has no position: the next Shift + click starts a range from the first row */
	protected onSelectedChange(): void {
		if (this.headRef) {
			this.tableRef?.rangeSelection.setAnchorAtStart();
		}
	}

	/** New state a Shift + click on the hovered or focused item would give to this item, shown on its checkbox while Shift is held */
	protected rangePreview(): boolean | 'mixed' | null {
		if (this.headRef) {
			return this.managesSelectAll() ? (this.tableRef?.rangeSelection.getAggregatePreview(this.#pageRows()) ?? null) : null;
		}
		return this.tableRef?.rangeSelection.getPreview(this) ?? null;
	}

	getRangeSelected() {
		return this.selected;
	}

	/** Rows of collapsed groups are skipped: no group checkbox shows that a range changes them */
	isRangeSelectable(): boolean {
		return !!this.selectedLabel() && !this.disabled() && !this.isRangeHidden();
	}

	isRangeHidden(): boolean {
		const body = this.bodyRef;
		return !!body?.collapsible() && !body.expanded();
	}
}
