import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LOCALE_ID, signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ɵRangeSelectableItem, ɵRangeSelection } from './range-selection';

interface FakeItem extends ɵRangeSelectableItem {
	selected: WritableSignal<boolean>;
	selectable: WritableSignal<boolean>;
	hidden: WritableSignal<boolean>;
	element: HTMLElement;
	checkbox: HTMLInputElement;
}

function createItems(count: number): FakeItem[] {
	const container = document.createElement('div');
	document.body.appendChild(container);

	return Array.from({ length: count }, () => {
		const element = document.createElement('div');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		element.appendChild(checkbox);
		container.appendChild(element);

		const selected = signal(false);
		const selectable = signal(true);
		const hidden = signal(false);
		return {
			selected,
			selectable,
			hidden,
			element,
			checkbox,
			getRangeSelected: () => selected,
			isRangeSelectable: () => selectable(),
			isRangeHidden: () => hidden(),
		};
	});
}

/** Simulates the browser behaviour: the checkbox is toggled before the click event is dispatched. */
function clickItem(rangeSelection: ɵRangeSelection, item: FakeItem, shiftKey = false): number {
	item.checkbox.checked = !item.checkbox.checked;
	item.selected.set(item.checkbox.checked);

	const event = new MouseEvent('click', { shiftKey });
	Object.defineProperty(event, 'target', { value: item.checkbox });

	return rangeSelection.handleClick(item, event);
}

describe('ɵRangeSelection', () => {
	let announce: ReturnType<typeof vi.fn>;
	let items: FakeItem[];
	let rangeSelection: ɵRangeSelection;

	function createRangeSelection(registered: readonly FakeItem[]): ɵRangeSelection {
		const created = TestBed.runInInjectionContext(() => new ɵRangeSelection());
		registered.forEach((item) => created.register(item, item.element));
		return created;
	}

	beforeEach(() => {
		document.body.innerHTML = '';
		announce = vi.fn().mockResolvedValue(undefined);

		TestBed.configureTestingModule({
			providers: [
				{ provide: LiveAnnouncer, useValue: { announce } },
				{ provide: LOCALE_ID, useValue: 'en' },
			],
		});

		items = createItems(5);
		rangeSelection = createRangeSelection(items);
	});

	it('should only toggle the clicked item without Shift', () => {
		// Act
		clickItem(rangeSelection, items[0]);
		const count = clickItem(rangeSelection, items[3]);

		// Assert
		expect(count).toBe(0);
		expect(items.map((item) => item.selected())).toEqual([true, false, false, true, false]);
		expect(announce).not.toHaveBeenCalled();
	});

	it('should not select a range on the first Shift + click, as there is no anchor yet', () => {
		// Act
		const count = clickItem(rangeSelection, items[2], true);

		// Assert
		expect(count).toBe(0);
		expect(items.map((item) => item.selected())).toEqual([false, false, true, false, false]);
	});

	it('should select every item between the anchor and the Shift + clicked item', () => {
		// Act
		clickItem(rangeSelection, items[1]);
		const count = clickItem(rangeSelection, items[3], true);

		// Assert
		expect(count).toBe(2);
		expect(items.map((item) => item.selected())).toEqual([false, true, true, true, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 2 items', 'polite');
	});

	it('should select a range upwards', () => {
		// Act
		clickItem(rangeSelection, items[4]);
		clickItem(rangeSelection, items[2], true);

		// Assert
		expect(items.map((item) => item.selected())).toEqual([false, false, true, true, true]);
	});

	it('should unselect the range when the Shift + clicked item is unchecked', () => {
		// Arrange
		items.forEach((item) => {
			item.checkbox.checked = true;
			item.selected.set(true);
		});

		// Act
		clickItem(rangeSelection, items[0]);
		const count = clickItem(rangeSelection, items[2], true);

		// Assert
		expect(count).toBe(2);
		expect(items.map((item) => item.selected())).toEqual([false, false, false, true, true]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just unselected 2 items', 'polite');
	});

	it('should leave unselectable items unchanged', () => {
		// Arrange
		items[2].selectable.set(false);

		// Act
		clickItem(rangeSelection, items[0]);
		const count = clickItem(rangeSelection, items[4], true);

		// Assert
		expect(count).toBe(3);
		expect(items.map((item) => item.selected())).toEqual([true, true, false, true, true]);
	});

	it('should only count the items whose state changed', () => {
		// Arrange
		items[2].selected.set(true);
		clickItem(rangeSelection, items[0]);

		// Act
		const count = clickItem(rangeSelection, items[4], true);

		// Assert
		expect(count).toBe(3);
		expect(items.map((item) => item.selected())).toEqual([true, true, true, true, true]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 3 items', 'polite');
	});

	it('should use the last clicked item as the new anchor', () => {
		// Act
		clickItem(rangeSelection, items[0]);
		clickItem(rangeSelection, items[1], true);
		clickItem(rangeSelection, items[3], true);

		// Assert
		expect(items.map((item) => item.selected())).toEqual([true, true, true, true, false]);
	});

	it('should ignore an anchor which cannot start a range anymore (disabled)', () => {
		// Arrange
		clickItem(rangeSelection, items[0]);
		items[0].selectable.set(false);

		// Act
		const count = clickItem(rangeSelection, items[3], true);

		// Assert
		expect(count).toBe(0);
		expect(items.map((item) => item.selected())).toEqual([true, false, false, true, false]);
	});

	it('should ignore an anchor which became hidden (in a collapsed group…)', () => {
		// Arrange
		clickItem(rangeSelection, items[0]);
		items[0].hidden.set(true);

		// Act
		const count = clickItem(rangeSelection, items[3], true);

		// Assert
		expect(count).toBe(0);
		expect(items.map((item) => item.selected())).toEqual([true, false, false, true, false]);
	});

	it('should change the hidden items of the range (in a collapsed group…)', () => {
		// Arrange
		items[1].hidden.set(true);
		items[2].hidden.set(true);

		// Act
		clickItem(rangeSelection, items[0]);
		const count = clickItem(rangeSelection, items[3], true);

		// Assert
		expect(count).toBe(3);
		expect(items.map((item) => item.selected())).toEqual([true, true, true, true, false]);
	});

	describe('preview', () => {
		function pressShift(type: 'keydown' | 'keyup', shiftKey: boolean) {
			document.dispatchEvent(new KeyboardEvent(type, { key: 'Shift', shiftKey }));
		}

		function preview(): (boolean | null)[] {
			return items.map((item) => rangeSelection.getPreview(item));
		}

		it('should preview the items a Shift + click on the target would select, only while Shift is held', () => {
			// Arrange
			clickItem(rangeSelection, items[1]);
			rangeSelection.setTarget(items[3]);

			// Act & Assert
			expect(preview()).toEqual([null, null, null, null, null]);
			pressShift('keydown', true);
			expect(preview()).toEqual([null, null, true, true, null]);
			pressShift('keyup', false);
			expect(preview()).toEqual([null, null, null, null, null]);
		});

		it('should follow the target, upwards too', () => {
			// Arrange
			clickItem(rangeSelection, items[2]);
			pressShift('keydown', true);

			// Act
			rangeSelection.setTarget(items[0]);

			// Assert
			expect(preview()).toEqual([true, true, null, null, null]);
		});

		it('should preview the unselection when the target is selected', () => {
			// Arrange
			items.forEach((item) => {
				item.selected.set(true);
				item.checkbox.checked = true;
			});
			clickItem(rangeSelection, items[0]);
			pressShift('keydown', true);

			// Act
			rangeSelection.setTarget(items[3]);

			// Assert
			expect(preview()).toEqual([null, false, false, false, null]);
		});

		it('should only preview the items whose state would change', () => {
			// Arrange
			items[2].selected.set(true);
			items[3].selectable.set(false);
			clickItem(rangeSelection, items[0]);
			pressShift('keydown', true);

			// Act
			rangeSelection.setTarget(items[4]);

			// Assert
			expect(preview()).toEqual([null, true, null, null, true]);
		});

		it('should not preview anything when the target cannot be selected', () => {
			// Arrange
			clickItem(rangeSelection, items[0]);
			items[3].selectable.set(false);
			pressShift('keydown', true);

			// Act
			rangeSelection.setTarget(items[3]);

			// Assert
			expect(preview()).toEqual([null, null, null, null, null]);
		});

		it('should keep the preview while going back with Shift + Tab', () => {
			// Arrange
			clickItem(rangeSelection, items[3]);
			pressShift('keydown', true);

			// Act
			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
			rangeSelection.setTarget(items[1]);

			// Assert
			expect(preview()).toEqual([null, true, true, null, null]);
		});

		it('should follow the hovered checkbox area, then the focused one, and hide the preview outside of them', () => {
			// Arrange
			clickItem(rangeSelection, items[0]);
			items.forEach((item) => rangeSelection.listenTarget(item, item.element));
			pressShift('keydown', true);

			// Act
			items[3].element.dispatchEvent(new FocusEvent('focusin'));
			const focused = preview();
			items[2].element.dispatchEvent(new PointerEvent('pointerenter'));
			const hovered = preview();
			items[2].element.dispatchEvent(new PointerEvent('pointerleave'));
			const leftHovered = preview();
			items[3].element.dispatchEvent(new FocusEvent('focusout'));
			const leftFocused = preview();

			// Assert
			expect(focused).toEqual([null, true, true, true, null]);
			expect(hovered).toEqual([null, true, true, null, null]);
			expect(leftHovered).toEqual([null, true, true, true, null]);
			expect(leftFocused).toEqual([null, null, null, null, null]);
		});

		it('should hide the preview when the window loses the focus while Shift is held', () => {
			// Arrange
			clickItem(rangeSelection, items[1]);
			rangeSelection.setTarget(items[3]);
			pressShift('keydown', true);

			// Act
			window.dispatchEvent(new Event('blur'));

			// Assert
			expect(preview()).toEqual([null, null, null, null, null]);
		});

		it('should preview the state of a checkbox reflecting several items', () => {
			// Arrange
			clickItem(rangeSelection, items[0]);
			pressShift('keydown', true);

			// Act
			rangeSelection.setTarget(items[2]);

			// Assert
			expect(rangeSelection.getAggregatePreview([items[0], items[1], items[2]])).toBe(true);
			expect(rangeSelection.getAggregatePreview([items[2], items[3]])).toBe('mixed');
			expect(rangeSelection.getAggregatePreview([items[0], items[1]])).toBe(true);
			expect(rangeSelection.getAggregatePreview([items[3], items[4]])).toBeNull();
			expect(rangeSelection.getAggregatePreview([])).toBeNull();
		});

		it('should preview the unselection of a checkbox reflecting several items', () => {
			// Arrange
			items.forEach((item) => {
				item.selected.set(true);
				item.checkbox.checked = true;
			});
			clickItem(rangeSelection, items[0]);
			pressShift('keydown', true);

			// Act
			rangeSelection.setTarget(items[1]);

			// Assert
			expect(rangeSelection.getAggregatePreview([items[0], items[1]])).toBe(false);
			expect(rangeSelection.getAggregatePreview(items)).toBeNull();
		});

		it('should preview from the first item after the anchor has been set at the start', () => {
			// Arrange
			clickItem(rangeSelection, items[3]);
			rangeSelection.setTarget(items[2]);
			rangeSelection.setAnchorAtStart();

			// Act
			pressShift('keydown', true);

			// Assert
			expect(preview()).toEqual([true, true, true, null, null]);
		});
	});

	it('should select a range from the first item after the anchor has been set at the start', () => {
		// Arrange
		clickItem(rangeSelection, items[4]);
		rangeSelection.setAnchorAtStart();

		// Act
		const count = clickItem(rangeSelection, items[2], true);

		// Assert
		expect(count).toBe(3);
		expect(items.map((item) => item.selected())).toEqual([true, true, true, false, true]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 3 items', 'polite');
	});

	it('should sort items in document order whatever their registration order', () => {
		// Arrange
		rangeSelection = createRangeSelection([items[3], items[0], items[4], items[1], items[2]]);

		// Act
		clickItem(rangeSelection, items[1]);
		clickItem(rangeSelection, items[3], true);

		// Assert
		expect(items.map((item) => item.selected())).toEqual([false, true, true, true, false]);
	});

	it('should ignore the range when the anchor has been unregistered', () => {
		// Arrange
		rangeSelection = TestBed.runInInjectionContext(() => new ɵRangeSelection());
		const unregisterFirst = rangeSelection.register(items[0], items[0].element);
		items.slice(1).forEach((item) => rangeSelection.register(item, item.element));
		clickItem(rangeSelection, items[0]);
		unregisterFirst();

		// Act
		const count = clickItem(rangeSelection, items[3], true);

		// Assert
		expect(count).toBe(0);
		expect(items.slice(1).map((item) => item.selected())).toEqual([false, false, true, false]);
	});

	it('should ignore clicks which do not come from a checkbox', () => {
		// Arrange
		clickItem(rangeSelection, items[0]);
		const event = new MouseEvent('click', { shiftKey: true });
		Object.defineProperty(event, 'target', { value: items[3].element });

		// Act
		const count = rangeSelection.handleClick(items[3], event);

		// Assert
		expect(count).toBe(0);
		expect(items.map((item) => item.selected())).toEqual([true, false, false, false, false]);
	});

	it('should not announce anything when the rest of the range is already in the clicked state', () => {
		// Arrange
		items[1].selected.set(true);
		clickItem(rangeSelection, items[0]);

		// Act
		const count = clickItem(rangeSelection, items[2], true);

		// Assert
		expect(count).toBe(0);
		expect(items.map((item) => item.selected())).toEqual([true, true, true, false, false]);
		expect(announce).not.toHaveBeenCalled();
	});

	it('should use the Shift key of the keyboard when the click dispatched on Space has no modifier (Firefox)', () => {
		// Arrange
		clickItem(rangeSelection, items[0]);
		items[2].checkbox.checked = true;
		items[2].selected.set(true);
		const event = new MouseEvent('click', { detail: 0 });
		Object.defineProperty(event, 'target', { value: items[2].checkbox });

		// Act
		rangeSelection.handleKey(new KeyboardEvent('keyup', { key: ' ', shiftKey: true }));
		const count = rangeSelection.handleClick(items[2], event);

		// Assert
		expect(count).toBe(2);
		expect(items.map((item) => item.selected())).toEqual([true, true, true, false, false]);
	});

	it('should ignore the keyboard Shift key on a pointer click', () => {
		// Arrange
		clickItem(rangeSelection, items[0]);
		rangeSelection.handleKey(new KeyboardEvent('keyup', { key: ' ', shiftKey: true }));
		items[2].checkbox.checked = true;
		items[2].selected.set(true);
		const event = new MouseEvent('click', { detail: 1 });
		Object.defineProperty(event, 'target', { value: items[2].checkbox });

		// Act
		const count = rangeSelection.handleClick(items[2], event);

		// Assert
		expect(count).toBe(0);
		expect(items.map((item) => item.selected())).toEqual([true, false, true, false, false]);
	});
});
