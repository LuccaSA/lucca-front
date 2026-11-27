import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LU_NO_VALUE_TRANSLATIONS } from './no-value.translate';

const TABLE_CELL_SELECTOR = 'td, th, [role="cell"], [role="gridcell"], [role="rowheader"], [role="columnheader"]';
const LAYOUT_TABLE_SELECTOR = 'table[role="presentation"], table[role="none"]';
// Content announced by screen readers without being text: image alternatives, named elements, controls.
const ACCESSIBLE_CONTENT_SELECTOR = 'img[alt]:not([alt=""]), [role="img"], [aria-label], [aria-labelledby], a[href], button, input, select, textarea';

/**
 * Displays an em dash for a missing value.
 *
 * A visually hidden text is added for screen readers, except when the dash is the only content of a table cell:
 * screen readers already announce the cell as empty.
 */
@Component({
	selector: 'lu-no-value',
	templateUrl: './no-value.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoValueComponent {
	readonly #host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	readonly intl = input(...intlInputOptions(LU_NO_VALUE_TRANSLATIONS));

	/**
	 * Text read by screen readers instead of the dash.
	 * By default, "Not entered", and nothing when the dash is the only content of a table cell. An empty string reads nothing.
	 */
	readonly alt = input<string>();

	// Unknown until the component is in the DOM: it can be inserted in its cell after its creation (@if, @for).
	readonly #aloneInTableCell = signal<boolean | null>(null);

	protected readonly hiddenText = computed(() => {
		const alt = this.alt();
		if (alt !== undefined) {
			return alt;
		}
		return this.#aloneInTableCell() === false ? this.intl().noValue : '';
	});

	constructor() {
		afterNextRender(() => this.#aloneInTableCell.set(isAloneInTableCell(this.#host)));
	}
}

/**
 * Whether the element is in a table cell with no other accessible content, which screen readers announce as empty.
 */
function isAloneInTableCell(element: HTMLElement): boolean {
	let cell = element.parentElement?.closest(TABLE_CELL_SELECTOR);
	let table = cell?.closest('table');
	// Cells of a layout table (`role="presentation"` or `role="none"`) are not announced as cells.
	while (table?.matches(LAYOUT_TABLE_SELECTOR)) {
		cell = table.parentElement?.closest(TABLE_CELL_SELECTOR);
		table = cell?.closest('table');
	}
	if (!cell) {
		return false;
	}
	const clone = cell.cloneNode(true) as Element;
	clone.querySelectorAll('lu-no-value, [aria-hidden="true"]').forEach((ignored) => ignored.remove());
	return !clone.textContent?.trim() && !clone.querySelector(ACCESSIBLE_CONTENT_SELECTOR);
}
