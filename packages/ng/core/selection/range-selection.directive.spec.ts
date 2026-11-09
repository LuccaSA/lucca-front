import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, forwardRef, input, LOCALE_ID, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ɵRANGE_SELECTABLE_ITEM, ɵRangeSelectableItem, ɵRangeSelection } from './range-selection';
import { ɵRangeSelectionDirective } from './range-selection.directive';

@Component({
	selector: 'lu-range-selection-test-item',
	imports: [ɵRangeSelectionDirective],
	providers: [{ provide: ɵRANGE_SELECTABLE_ITEM, useExisting: forwardRef(() => TestItemComponent) }],
	template: `<input type="checkbox" [luRangeSelection]="rangeSelection()" [checked]="selected()" (change)="selected.set($any($event.target).checked)" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestItemComponent implements ɵRangeSelectableItem {
	readonly rangeSelection = input<ɵRangeSelection | null>(null);
	readonly selected = signal(false);

	getRangeSelected() {
		return this.selected;
	}

	isRangeSelectable(): boolean {
		return true;
	}
}

@Component({
	selector: 'lu-range-selection-test-host',
	imports: [TestItemComponent],
	template: `
		@for (id of ids(); track id) {
			<lu-range-selection-test-item [rangeSelection]="enabled() ? rangeSelection : null" />
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	readonly rangeSelection = new ɵRangeSelection();
	readonly enabled = signal(true);
	readonly ids = signal([0, 1, 2, 3]);
}

describe(ɵRangeSelectionDirective.name, () => {
	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;

	function click(index: number, shiftKey = false) {
		const checkboxes = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
		// The browser toggles the checkbox and then dispatches `input` and `change`
		checkboxes[index].dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey }));
		fixture.detectChanges();
	}

	function states() {
		return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="checkbox"]')).map((checkbox) => checkbox.checked);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [
				{ provide: LiveAnnouncer, useValue: { announce: vi.fn().mockResolvedValue(undefined) } },
				{ provide: LOCALE_ID, useValue: 'en' },
			],
		});
		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should wire the checkbox to the item provided by its component', () => {
		// Act
		click(0);
		click(2, true);

		// Assert
		expect(states()).toEqual([true, true, true, false]);
	});

	it('should keep the checkboxes out of the range selection while it is null', () => {
		// Arrange
		host.enabled.set(false);
		fixture.detectChanges();

		// Act
		click(0);
		click(2, true);

		// Assert
		expect(states()).toEqual([true, false, true, false]);
	});

	it('should register the checkboxes again when the range selection is set back', () => {
		// Arrange
		host.enabled.set(false);
		fixture.detectChanges();
		host.enabled.set(true);
		fixture.detectChanges();

		// Act
		click(0);
		click(2, true);

		// Assert
		expect(states()).toEqual([true, true, true, false]);
	});

	it('should unregister the checkbox of a destroyed item', () => {
		// Arrange
		click(0);
		host.ids.set([1, 2, 3]);
		fixture.detectChanges();

		// Act
		click(1, true);

		// Assert
		expect(states()).toEqual([false, true, false]);
	});
});
