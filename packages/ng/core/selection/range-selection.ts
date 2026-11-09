import { LiveAnnouncer } from '@angular/cdk/a11y';
import { inject, InjectionToken, WritableSignal } from '@angular/core';
import { IntlParamsPipe } from '../translate/intl-params.pipe';
import { getIntl } from '../translate/intl.model';
import { getIntlPluralLabel } from '../translate/translation.model';
import { LOCALE_PLURAL_RULES } from '../translate/translation.token';
import { LU_RANGE_SELECTION_TRANSLATIONS } from './range-selection.translate';

export interface ɵRangeSelectableItem {
	/** Selection state of the item, written when the item is part of a range. */
	getRangeSelected(): WritableSignal<boolean>;
	/** Whether the item can be changed by a range: false when disabled, hidden in a collapsed group… */
	isRangeSelectable(): boolean;
}

/** Item owning a checkbox wired with `luRangeSelection`: each selectable item component provides itself with this token. */
export const ɵRANGE_SELECTABLE_ITEM = new InjectionToken<ɵRangeSelectableItem>('ɵRANGE_SELECTABLE_ITEM');

/**
 * Range selection on checkboxes (Shift + click, or Shift + Space): every item between the last clicked one (the anchor)
 * and the clicked one takes the new state of the clicked one. The number of items in the range is announced to screen readers.
 *
 * Must be created in an injection context.
 */
export class ɵRangeSelection {
	readonly #liveAnnouncer = inject(LiveAnnouncer);
	readonly #pluralRules = inject(LOCALE_PLURAL_RULES);
	readonly #intl = getIntl(LU_RANGE_SELECTION_TRANSLATIONS);
	readonly #intlParams = new IntlParamsPipe();

	/** Registered items, with the element used to sort them in document order */
	readonly #items = new Map<ɵRangeSelectableItem, Element>();
	#anchor: ɵRangeSelectableItem | null = null;
	#keyboardShiftKey = false;

	/**
	 * Adds an item to the range selection, `element` giving its position in the document.
	 * Returns the function removing it.
	 */
	register(item: ɵRangeSelectableItem, element: Element): () => void {
		this.#items.set(item, element);

		return () => {
			this.#items.delete(item);
			if (this.#anchor === item) {
				this.#anchor = null;
			}
		};
	}

	/**
	 * To call on the `keydown` and `keyup` events of the item checkbox: Firefox drops the modifiers
	 * of the click it dispatches when the checkbox is toggled with Space.
	 */
	handleKey(event: KeyboardEvent): void {
		this.#keyboardShiftKey = event.shiftKey;
	}

	/**
	 * To call when a checkbox acting on several items at once is toggled ("select all", group…):
	 * the next Shift + click only toggles the clicked item, instead of starting a range from an outdated anchor.
	 */
	resetAnchor(): void {
		this.#anchor = null;
	}

	/**
	 * To call on the `click` event of the item checkbox: the checkbox state has already been toggled by the browser at this point.
	 * Returns the number of items whose state changed, the clicked one included, or 0 when the click only toggled the clicked item.
	 */
	handleClick(item: ɵRangeSelectableItem, event: MouseEvent): number {
		const target = event.target;
		if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') {
			return 0;
		}

		// A click dispatched by the keyboard has no detail (no pointer click count)
		const shiftKey = event.shiftKey || (event.detail === 0 && this.#keyboardShiftKey);
		this.#keyboardShiftKey = false;

		const anchor = this.#anchor;
		this.#anchor = item;

		if (!shiftKey || !anchor || anchor === item) {
			return 0;
		}

		// Registration order can differ from the displayed order (sorted or inserted items)
		const items = [...this.#items.entries()].sort(([, a], [, b]) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)).map(([rangeItem]) => rangeItem);
		const anchorIndex = items.indexOf(anchor);
		const itemIndex = items.indexOf(item);

		if (anchorIndex === -1 || itemIndex === -1) {
			return 0;
		}

		// Shift + click extends the native text selection, which is unwanted here
		target.ownerDocument.getSelection()?.removeAllRanges();

		const selected = target.checked;
		const [start, end] = anchorIndex < itemIndex ? [anchorIndex, itemIndex] : [itemIndex, anchorIndex];
		// The clicked item is updated by its own checkbox
		const rangeItems = items.slice(start, end + 1).filter((rangeItem) => rangeItem !== item && rangeItem.isRangeSelectable());
		// The clicked item always changes, other items only when they are not already in its new state
		let count = 1;

		rangeItems.forEach((rangeItem) => {
			const rangeItemSelected = rangeItem.getRangeSelected();
			if (rangeItemSelected() !== selected) {
				rangeItemSelected.set(selected);
				count++;
			}
		});

		if (count === 1) {
			return 0;
		}

		const label = getIntlPluralLabel(this.#pluralRules, selected ? this.#intl.rangeSelected : this.#intl.rangeUnselected, count);
		void this.#liveAnnouncer.announce(this.#intlParams.transform(label, { count }), 'polite');

		return count;
	}
}
