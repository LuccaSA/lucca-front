import { ChangeDetectionStrategy, Component, input, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarWeekInfo, WEEK_INFO } from '../calendar.token';
import { CalendarMode } from './calendar-mode';
import { Calendar2CellDirective } from './calendar2-cell.directive';
import { CALENDAR_DISPLAY_MODE, CALENDAR_TABBABLE_DATE } from './calendar2.tokens';

@Component({
	selector: 'lu-calendar2-cell-test',
	imports: [Calendar2CellDirective],
	template: `<button type="button" [luCalendar2Cell]="0" [luCalendar2Mode]="mode()" [luCalendar2Date]="date()">Cell</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Calendar2CellTestComponent {
	readonly mode = input<CalendarMode>('day');
	readonly date = input<Date>(new Date(2024, 2, 13));
}

const MONDAY_FIRST: CalendarWeekInfo = { firstDay: 1, weekend: [6, 7] };
const SUNDAY_FIRST: CalendarWeekInfo = { firstDay: 7, weekend: [6, 7] };

// Wednesday, March 13th 2024
const CELL_DATE = new Date(2024, 2, 13);

describe(Calendar2CellDirective.name, () => {
	let fixture: ComponentFixture<Calendar2CellTestComponent>;
	let cellElement: HTMLButtonElement;
	let directive: Calendar2CellDirective;
	let tabbableDate: WritableSignal<Date>;
	let displayMode: WritableSignal<CalendarMode | null>;

	const setup = ({ mode = 'day', date = CELL_DATE, weekInfo = MONDAY_FIRST }: { mode?: CalendarMode; date?: Date; weekInfo?: CalendarWeekInfo } = {}) => {
		tabbableDate = signal(date);
		displayMode = signal(mode);

		TestBed.configureTestingModule({
			imports: [Calendar2CellTestComponent],
			providers: [
				{ provide: CALENDAR_TABBABLE_DATE, useValue: tabbableDate },
				{ provide: CALENDAR_DISPLAY_MODE, useValue: displayMode },
				{ provide: WEEK_INFO, useValue: weekInfo },
			],
		});

		fixture = TestBed.createComponent(Calendar2CellTestComponent);
		fixture.componentRef.setInput('mode', mode);
		fixture.componentRef.setInput('date', date);
		fixture.detectChanges();

		const cellDebugElement = fixture.debugElement.query(By.directive(Calendar2CellDirective));
		cellElement = cellDebugElement.nativeElement as HTMLButtonElement;
		directive = cellDebugElement.injector.get(Calendar2CellDirective);
	};

	const pressKey = (key: string, shiftKey = false): KeyboardEvent => {
		const event = new KeyboardEvent('keydown', { key, shiftKey, cancelable: true });
		cellElement.dispatchEvent(event);
		return event;
	};

	describe('tabindex', () => {
		it('should be tabbable when its date is the tabbable date', () => {
			// Act
			setup();
			// Assert
			expect(cellElement.tabIndex).toBe(0);
		});

		it('should not be tabbable when its date is not the tabbable date', () => {
			// Arrange
			setup();
			// Act
			tabbableDate.set(new Date(2024, 2, 14));
			fixture.detectChanges();
			// Assert
			expect(cellElement.tabIndex).toBe(-1);
		});

		it('should become tabbable again when the tabbable date comes back to its date', () => {
			// Arrange
			setup();
			tabbableDate.set(new Date(2024, 2, 14));
			fixture.detectChanges();
			// Act
			tabbableDate.set(new Date(2024, 2, 13, 18, 30));
			fixture.detectChanges();
			// Assert
			expect(cellElement.tabIndex).toBe(0);
		});

		it('should not be tabbable when its mode differs from the calendar display mode', () => {
			// Arrange
			setup({ mode: 'day' });
			// Act
			displayMode.set('week');
			fixture.detectChanges();
			// Assert
			expect(cellElement.tabIndex).toBe(-1);
		});

		it.each<[CalendarMode, Date]>([
			['month', new Date(2024, 2, 28)],
			['year', new Date(2024, 10, 1)],
		])('should compare dates by %s', (mode, otherDateInPeriod) => {
			// Arrange
			setup({ mode });
			// Act
			tabbableDate.set(otherDateInPeriod);
			fixture.detectChanges();
			// Assert
			expect(cellElement.tabIndex).toBe(0);
		});

		it('should compare weeks starting on monday for a monday-first locale', () => {
			// Arrange: Sunday, March 10th 2024
			setup({ mode: 'week', date: new Date(2024, 2, 10), weekInfo: MONDAY_FIRST });
			// Act: Monday, March 11th 2024
			tabbableDate.set(new Date(2024, 2, 11));
			fixture.detectChanges();
			// Assert
			expect(cellElement.tabIndex).toBe(-1);
		});

		it('should compare weeks starting on sunday for a sunday-first locale', () => {
			// Arrange: Sunday, March 10th 2024
			setup({ mode: 'week', date: new Date(2024, 2, 10), weekInfo: SUNDAY_FIRST });
			// Act: Monday, March 11th 2024
			tabbableDate.set(new Date(2024, 2, 11));
			fixture.detectChanges();
			// Assert
			expect(cellElement.tabIndex).toBe(0);
		});
	});

	describe('keyboard navigation', () => {
		it.each<[CalendarMode, string, boolean, Date]>([
			['day', 'ArrowRight', false, new Date(2024, 2, 14)],
			['day', 'ArrowLeft', false, new Date(2024, 2, 12)],
			['day', 'ArrowDown', false, new Date(2024, 2, 20)],
			['day', 'ArrowUp', false, new Date(2024, 2, 6)],
			['day', 'PageUp', false, new Date(2024, 1, 13)],
			['day', 'PageUp', true, new Date(2023, 2, 13)],
			['day', 'PageDown', false, new Date(2024, 3, 13)],
			['day', 'PageDown', true, new Date(2025, 2, 13)],
			['week', 'ArrowRight', false, new Date(2024, 2, 20)],
			['week', 'ArrowLeft', false, new Date(2024, 2, 6)],
			['week', 'ArrowDown', false, new Date(2024, 2, 20)],
			['week', 'ArrowUp', false, new Date(2024, 2, 6)],
			['week', 'PageUp', false, new Date(2024, 1, 13)],
			['week', 'PageDown', true, new Date(2025, 2, 13)],
			['month', 'ArrowRight', false, new Date(2024, 3, 13)],
			['month', 'ArrowLeft', false, new Date(2024, 1, 13)],
			['month', 'ArrowDown', false, new Date(2024, 5, 13)],
			['month', 'ArrowUp', false, new Date(2023, 11, 13)],
			['year', 'ArrowRight', false, new Date(2025, 2, 13)],
			['year', 'ArrowLeft', false, new Date(2023, 2, 13)],
			['year', 'ArrowDown', false, new Date(2027, 2, 13)],
			['year', 'ArrowUp', false, new Date(2021, 2, 13)],
		])('should move the tabbable date in %s mode on %s (shift: %s)', (mode, key, shiftKey, expected) => {
			// Arrange
			setup({ mode });
			// Act
			const event = pressKey(key, shiftKey);
			// Assert
			expect(tabbableDate()).toEqual(expected);
			expect(event.defaultPrevented).toBe(true);
		});

		it.each<[CalendarWeekInfo, string, Date]>([
			[MONDAY_FIRST, 'Home', new Date(2024, 2, 11)],
			[MONDAY_FIRST, 'End', new Date(2024, 2, 17, 23, 59, 59, 999)],
			[SUNDAY_FIRST, 'Home', new Date(2024, 2, 10)],
			[SUNDAY_FIRST, 'End', new Date(2024, 2, 16, 23, 59, 59, 999)],
		])('should move the tabbable date to the week boundary in day mode (%j) on %s', (weekInfo, key, expected) => {
			// Arrange
			setup({ mode: 'day', weekInfo });
			// Act
			const event = pressKey(key);
			// Assert
			expect(tabbableDate()).toEqual(expected);
			expect(event.defaultPrevented).toBe(true);
		});

		it.each<[CalendarMode, string]>([
			['week', 'Home'],
			['week', 'End'],
			['month', 'Home'],
			['month', 'PageUp'],
			['month', 'PageDown'],
			['year', 'End'],
			['year', 'PageUp'],
			['day', 'Enter'],
			['day', 'Tab'],
		])('should ignore %s mode %s key', (mode, key) => {
			// Arrange
			setup({ mode });
			// Act
			const event = pressKey(key);
			// Assert
			expect(tabbableDate()).toEqual(CELL_DATE);
			expect(event.defaultPrevented).toBe(false);
		});

		it('should cross month boundaries in day mode', () => {
			// Arrange
			setup({ mode: 'day', date: new Date(2024, 1, 29) });
			// Act
			pressKey('ArrowRight');
			// Assert
			expect(tabbableDate()).toEqual(new Date(2024, 2, 1));
		});

		it('should clamp to the last day of a shorter month in month mode', () => {
			// Arrange
			setup({ mode: 'month', date: new Date(2024, 0, 31) });
			// Act
			pressKey('ArrowRight');
			// Assert
			expect(tabbableDate()).toEqual(new Date(2024, 1, 29));
		});

		it('should move from the cell date rather than from the current tabbable date', () => {
			// Arrange
			setup({ mode: 'day' });
			tabbableDate.set(new Date(2024, 5, 1));
			// Act
			pressKey('ArrowRight');
			// Assert
			expect(tabbableDate()).toEqual(new Date(2024, 2, 14));
		});
	});

	describe('focus / blur', () => {
		it('should focus its host element', () => {
			// Arrange
			setup();
			// Act
			directive.focus();
			// Assert
			expect(document.activeElement).toBe(cellElement);
		});

		it('should blur its host element', () => {
			// Arrange
			setup();
			directive.focus();
			// Act
			directive.blur();
			// Assert
			expect(document.activeElement).not.toBe(cellElement);
		});
	});
});
