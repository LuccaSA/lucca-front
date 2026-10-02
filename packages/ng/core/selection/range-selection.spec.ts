import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LOCALE_ID, signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ɵRangeSelectableItem, ɵRangeSelection } from './range-selection';

interface FakeItem extends ɵRangeSelectableItem {
	selected: WritableSignal<boolean>;
	selectable: WritableSignal<boolean>;
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
		return {
			selected,
			selectable,
			checkbox,
			getRangeSelected: () => selected,
			getRangeElement: () => element,
			isRangeSelectable: () => selectable(),
		};
	});
}

/** Simulates the browser behaviour: the checkbox is toggled before the click event is dispatched. */
function clickItem(rangeSelection: ɵRangeSelection<FakeItem>, item: FakeItem, shiftKey = false): number {
	item.checkbox.checked = !item.checkbox.checked;
	item.selected.set(item.checkbox.checked);

	const event = new MouseEvent('click', { shiftKey });
	Object.defineProperty(event, 'target', { value: item.checkbox });

	return rangeSelection.handleClick(item, event);
}

describe('ɵRangeSelection', () => {
	let announce: ReturnType<typeof vi.fn>;
	let items: FakeItem[];
	let rangeSelection: ɵRangeSelection<FakeItem>;

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
		rangeSelection = TestBed.runInInjectionContext(() => new ɵRangeSelection(() => items));
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
		expect(count).toBe(3);
		expect(items.map((item) => item.selected())).toEqual([false, true, true, true, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('3 items selected', 'polite');
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
		expect(count).toBe(3);
		expect(items.map((item) => item.selected())).toEqual([false, false, false, true, true]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('3 items unselected', 'polite');
	});

	it('should leave unselectable items unchanged', () => {
		// Arrange
		items[2].selectable.set(false);

		// Act
		clickItem(rangeSelection, items[0]);
		const count = clickItem(rangeSelection, items[4], true);

		// Assert
		expect(count).toBe(4);
		expect(items.map((item) => item.selected())).toEqual([true, true, false, true, true]);
	});

	it('should use the last clicked item as the new anchor', () => {
		// Act
		clickItem(rangeSelection, items[0]);
		clickItem(rangeSelection, items[1], true);
		clickItem(rangeSelection, items[3], true);

		// Assert
		expect(items.map((item) => item.selected())).toEqual([true, true, true, true, false]);
	});

	it('should sort items in document order whatever the order of the list', () => {
		// Arrange
		const shuffled = [items[3], items[0], items[4], items[1], items[2]];
		rangeSelection = TestBed.runInInjectionContext(() => new ɵRangeSelection(() => shuffled));

		// Act
		clickItem(rangeSelection, items[1]);
		clickItem(rangeSelection, items[3], true);

		// Assert
		expect(items.map((item) => item.selected())).toEqual([false, true, true, true, false]);
	});

	it('should ignore the range when the anchor is no longer in the list', () => {
		// Arrange
		const [removed, ...others] = items;
		rangeSelection = TestBed.runInInjectionContext(() => new ɵRangeSelection(() => (removed.selectable() ? items : others)));
		clickItem(rangeSelection, removed);
		removed.selectable.set(false);

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
		Object.defineProperty(event, 'target', { value: items[3].getRangeElement() });

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
		expect(count).toBe(3);
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
