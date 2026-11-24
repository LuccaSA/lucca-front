import { LiveAnnouncer } from '@angular/cdk/a11y';
import { computed, DestroyRef, DOCUMENT, inject, InjectionToken, NgZone, signal, WritableSignal } from '@angular/core';
import { IntlParamsPipe } from '../translate/intl-params.pipe';
import { getIntl } from '../translate/intl.model';
import { getIntlPluralLabel } from '../translate/translation.model';
import { LOCALE_PLURAL_RULES } from '../translate/translation.token';
import { LU_RANGE_SELECTION_TRANSLATIONS } from './range-selection.translate';

export interface ɵRangeSelectableItem {
	/** Selection state of the item, written when the item is part of a range. */
	getRangeSelected(): WritableSignal<boolean>;
	/** Whether the item can be changed by a range: false when disabled… */
	isRangeSelectable(): boolean;
	/** Whether the item is hidden (in a collapsed group…): a range changes it, but cannot start from it, its checkbox not being visible. */
	isRangeHidden(): boolean;
}

/**
 * Group of items with its own checkbox, toggling all its items: it can start or end a range, at the position of its checkbox,
 * but is never changed by a range itself.
 */
export interface ɵRangeSelectableGroup {
	/** Items of the group, toggled by its checkbox */
	getRangeItems(): readonly ɵRangeSelectableItem[];
	/** Whether the group can start or end a range: false when it has no items… */
	isRangeSelectable(): boolean;
}

export type ɵRangeSelectableEntry = ɵRangeSelectableItem | ɵRangeSelectableGroup;

function isGroup(entry: ɵRangeSelectableEntry): entry is ɵRangeSelectableGroup {
	return 'getRangeItems' in entry;
}

/** State of an entry: a group is selected when all its items are */
function isSelected(entry: ɵRangeSelectableEntry): boolean {
	return isGroup(entry) ? entry.getRangeItems().length > 0 && entry.getRangeItems().every((item) => item.getRangeSelected()()) : entry.getRangeSelected()();
}

/** Anchor before the first item: set by "select all", which has no position in the list */
const START = Symbol('start');

/** Item or group owning a checkbox wired with `luRangeSelection`: each selectable item or group component provides itself with this token. */
export const ɵRANGE_SELECTABLE_ITEM = new InjectionToken<ɵRangeSelectableEntry>('ɵRANGE_SELECTABLE_ITEM');

/**
 * Range selection on checkboxes (Shift + click, or Shift + Space): every item between the last clicked one (the anchor)
 * and the clicked one takes the new state of the clicked one. The number of items in the range is announced to screen readers.
 * While Shift is held, the items a click on the target (last hovered or focused item) would change are previewed.
 *
 * Must be created in an injection context.
 */
export class ɵRangeSelection {
	readonly #liveAnnouncer = inject(LiveAnnouncer);
	readonly #pluralRules = inject(LOCALE_PLURAL_RULES);
	readonly #intl = getIntl(LU_RANGE_SELECTION_TRANSLATIONS);
	readonly #intlParams = new IntlParamsPipe();

	/** Registered items, with the element used to sort them in document order */
	readonly #items = new Map<ɵRangeSelectableEntry, Element>();
	/** Changes when items are added or removed, the map not being a signal */
	readonly #itemsVersion = signal(0);
	readonly #anchor = signal<ɵRangeSelectableEntry | typeof START | null>(null);
	/** Hovered and focused items, tracked without rendering anything */
	#hovered: ɵRangeSelectableEntry | null = null;
	#focused: ɵRangeSelectableEntry | null = null;
	/** Item a Shift + click would end the range on: the last hovered or focused one, only updated while Shift is held */
	readonly #target = signal<ɵRangeSelectableEntry | null>(null);
	readonly #ngZone = inject(NgZone);
	/** Whether Shift is held, to preview the range */
	readonly #shiftHeld = signal(false);
	/** New state of the items a click on the target would change, while Shift is held */
	readonly #preview = computed(() => {
		const preview = new Map<ɵRangeSelectableItem, boolean>();
		const target = this.#target();
		const range = this.#shiftHeld() && target?.isRangeSelectable() ? this.#getRange(target) : null;

		if (target && range) {
			// The target toggles, the other items take its new state
			const selected = !isSelected(target);
			// A group target also changes its own items
			const groupItems = isGroup(target) ? target.getRangeItems() : [];
			[...range, ...groupItems].filter((rangeItem) => rangeItem.getRangeSelected()() !== selected).forEach((rangeItem) => preview.set(rangeItem, selected));
		}

		return preview;
	});
	#keyboardShiftKey = false;

	#setShiftHeld(shiftHeld: boolean): void {
		this.#shiftHeld.set(shiftHeld);
		this.#updateTarget();
	}

	constructor() {
		const document = inject(DOCUMENT);
		const onKey = (event: KeyboardEvent) => this.#setShiftHeld(event.shiftKey);
		// The keyup of Shift is lost when the window loses the focus while it is held
		const onBlur = () => this.#setShiftHeld(false);

		// Outside Angular: only the signals render something, and only when Shift is pressed or released
		this.#ngZone.runOutsideAngular(() => {
			document.addEventListener('keydown', onKey);
			document.addEventListener('keyup', onKey);
			document.defaultView?.addEventListener('blur', onBlur);
		});

		inject(DestroyRef).onDestroy(() => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('keyup', onKey);
			document.defaultView?.removeEventListener('blur', onBlur);
		});
	}

	/**
	 * Adds an item to the range selection, `element` giving its position in the document.
	 * Returns the function removing it.
	 */
	register(item: ɵRangeSelectableEntry, element: Element): () => void {
		this.#items.set(item, element);
		this.#itemsVersion.update((version) => version + 1);

		return () => {
			this.#items.delete(item);
			this.#itemsVersion.update((version) => version + 1);
			if (this.#anchor() === item) {
				this.#anchor.set(null);
			}
			if (this.#hovered === item) {
				this.#hovered = null;
			}
			if (this.#focused === item) {
				this.#focused = null;
			}
			if (this.#target() === item) {
				this.#target.set(null);
			}
		};
	}

	/**
	 * Makes the item the target of the preview while `element` (the checkbox area) is hovered or focused, the hovered one winning.
	 * The listeners run outside Angular: hovering only renders something while Shift is held. Returns the function removing them.
	 */
	listenTarget(item: ɵRangeSelectableEntry, element: Element): () => void {
		const onPointerEnter = () => this.setTarget(item);
		const onPointerLeave = () => {
			if (this.#hovered === item) {
				this.#hovered = null;
				this.#updateTarget();
			}
		};
		const onFocusIn = () => {
			this.#focused = item;
			this.#updateTarget();
		};
		const onFocusOut = () => {
			if (this.#focused === item) {
				this.#focused = null;
				this.#updateTarget();
			}
		};
		const listeners: [string, () => void][] = [
			['pointerenter', onPointerEnter],
			['pointerleave', onPointerLeave],
			['focusin', onFocusIn],
			['focusout', onFocusOut],
		];

		this.#ngZone.runOutsideAngular(() => listeners.forEach(([type, listener]) => element.addEventListener(type, listener)));

		return () => listeners.forEach(([type, listener]) => element.removeEventListener(type, listener));
	}

	/**
	 * To call on the `keydown` and `keyup` events of the item checkbox: Firefox drops the modifiers
	 * of the click it dispatches when the checkbox is toggled with Space.
	 */
	handleKey(event: KeyboardEvent): void {
		this.#keyboardShiftKey = event.shiftKey;
	}

	/**
	 * To call when the "select all" checkbox is toggled: the next Shift + click starts a range from the beginning of the list,
	 * so that "select all" then a Shift + click unselects (or selects) everything up to the clicked item.
	 */
	setAnchorAtStart(): void {
		this.#anchor.set(START);
	}

	/** Registered items, groups excluded, in registration order. Reactive: tracks additions and removals. */
	getItems(): ɵRangeSelectableItem[] {
		this.#itemsVersion();
		return [...this.#items.keys()].filter((entry): entry is ɵRangeSelectableItem => !isGroup(entry));
	}

	/** Sets the hovered item, the end of the previewed range while Shift is held. `listenTarget` calls it for the checkbox area. */
	setTarget(item: ɵRangeSelectableEntry): void {
		this.#hovered = item;
		this.#updateTarget();
	}

	/** The hovered checkbox wins over the focused one; nothing renders while Shift is not held */
	#updateTarget(): void {
		this.#target.set(this.#shiftHeld() ? (this.#hovered ?? this.#focused) : null);
	}

	/**
	 * New state the item would take with a Shift + click on the target, `null` when it would not change.
	 * Always `null` while Shift is not held.
	 */
	getPreview(item: ɵRangeSelectableItem): boolean | null {
		return this.#preview().get(item) ?? null;
	}

	/**
	 * New state a checkbox reflecting several items ("select all", group…) would take with a Shift + click on the target:
	 * `true` when all of them would be selected, `false` when none, `'mixed'` otherwise; `null` when it would not change.
	 */
	getAggregatePreview(items: readonly ɵRangeSelectableItem[]): boolean | 'mixed' | null {
		const preview = this.#preview();
		if (items.length === 0 || !items.some((item) => preview.has(item))) {
			return null;
		}

		const aggregate = (selected: boolean[]) => (selected.every(Boolean) ? true : selected.some(Boolean) ? 'mixed' : false);
		const current = aggregate(items.map((item) => item.getRangeSelected()()));
		const next = aggregate(items.map((item) => preview.get(item) ?? item.getRangeSelected()()));

		return next === current ? null : next;
	}

	/**
	 * To call on the `click` event of the item checkbox: the checkbox state has already been toggled by the browser at this point.
	 * Returns the number of items whose state changed, the clicked one included, or 0 when the click only toggled the clicked item.
	 */
	handleClick(item: ɵRangeSelectableEntry, event: MouseEvent): number {
		const target = event.target;
		if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') {
			return 0;
		}

		// A click dispatched by the keyboard has no detail (no pointer click count)
		const shiftKey = event.shiftKey || (event.detail === 0 && this.#keyboardShiftKey);
		this.#keyboardShiftKey = false;

		const range = shiftKey ? this.#getRange(item) : null;
		this.#anchor.set(item);

		if (!range) {
			return 0;
		}

		// Shift + click extends the native text selection, which is unwanted here
		target.ownerDocument.getSelection()?.removeAllRanges();

		const selected = target.checked;
		// The clicked item, or the items of the clicked group, are updated by its own checkbox
		const groupItems = isGroup(item) ? item.getRangeItems().filter((groupItem) => groupItem.getRangeSelected()() !== selected) : [];
		const rangeItems = range.filter((rangeItem) => rangeItem !== item && !groupItems.includes(rangeItem));
		let rangeCount = 0;

		rangeItems.forEach((rangeItem) => {
			const rangeItemSelected = rangeItem.getRangeSelected();
			if (rangeItemSelected() !== selected) {
				rangeItemSelected.set(selected);
				rangeCount++;
			}
		});

		if (rangeCount === 0) {
			return 0;
		}

		// The clicked item always changes, other items only when they are not already in its new state
		const count = rangeCount + (isGroup(item) ? groupItems.length : 1);

		const label = getIntlPluralLabel(this.#pluralRules, selected ? this.#intl.rangeSelected : this.#intl.rangeUnselected, count);
		void this.#liveAnnouncer.announce(this.#intlParams.transform(label, { count }), 'polite');

		return count;
	}

	/**
	 * Selectable items from the anchor to the given item or group, in document order, both included, without the groups themselves;
	 * hidden items included (in a collapsed group…);
	 * `null` without an anchor, or when the anchor cannot start a range anymore (disabled, hidden…).
	 */
	#getRange(item: ɵRangeSelectableEntry): ɵRangeSelectableItem[] | null {
		this.#itemsVersion();
		const anchor = this.#anchor();
		if (!anchor || anchor === item || (anchor !== START && (!anchor.isRangeSelectable() || (!isGroup(anchor) && anchor.isRangeHidden())))) {
			return null;
		}

		// Registration order can differ from the displayed order (sorted or inserted items)
		const items = [...this.#items.entries()].sort(([, a], [, b]) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)).map(([rangeItem]) => rangeItem);
		const anchorIndex = anchor === START ? 0 : items.indexOf(anchor);
		const itemIndex = items.indexOf(item);

		if (anchorIndex === -1 || itemIndex === -1) {
			return null;
		}

		const [start, end] = anchorIndex < itemIndex ? [anchorIndex, itemIndex] : [itemIndex, anchorIndex];

		return items.slice(start, end + 1).filter((rangeItem): rangeItem is ɵRangeSelectableItem => !isGroup(rangeItem) && (rangeItem === item || rangeItem.isRangeSelectable()));
	}
}
