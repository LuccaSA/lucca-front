import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Calendar2Component } from './calendar2.component';
import { DateRange } from './date-range';

registerLocaleData(localeFr, 'fr-FR');

@Component({
	template: `<lu-calendar2 [date]="date" [ranges]="ranges" />`,
	imports: [Calendar2Component],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	date = new Date(2025, 5, 1);
	ranges: readonly DateRange[] = [];
}

describe(Calendar2Component.name, () => {
	function createHost(ranges: readonly DateRange[]): ComponentFixture<HostComponent> {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(HostComponent);
		fixture.componentInstance.ranges = ranges;
		fixture.detectChanges();

		return fixture;
	}

	function getCalendar(fixture: ComponentFixture<HostComponent>): Calendar2Component {
		return fixture.debugElement.query(By.directive(Calendar2Component)).componentInstance as Calendar2Component;
	}

	describe('range without start date', () => {
		it('should anchor the range on its end date', () => {
			// Arrange
			const end = new Date(2025, 5, 20);
			const calendar = getCalendar(createHost([{ end, scope: 'day' }]));

			// Assert
			expect(calendar.getRangeInfo(end, 'day')?.anchor).toEqual(end);
		});

		it('should match every date up to the end date when nothing is hovered', () => {
			// Arrange
			const end = new Date(2025, 5, 20);
			const calendar = getCalendar(createHost([{ end, scope: 'day' }]));

			// Assert
			expect(calendar.getRangeInfo(end, 'day')).not.toBeNull();
			expect(calendar.getRangeInfo(new Date(2025, 5, 2), 'day')).not.toBeNull();
			expect(calendar.getRangeInfo(new Date(2025, 5, 21), 'day')).toBeNull();
		});

		it('should render its end date as the end of the range', () => {
			// Arrange
			const end = new Date(2025, 5, 20);
			const calendar = getCalendar(createHost([{ end, scope: 'day' }]));

			// Act
			const cell = calendar.dateToCellInfo(end);

			// Assert
			expect(cell.isSelected).toBe(true);
			expect(cell.classes).toMatchObject({ 'is-end': true, 'is-endInProgress': true, 'is-start': false, 'is-startInProgress': false });
		});

		it('should highlight the dates before the end date without selecting them', () => {
			// Arrange
			const calendar = getCalendar(createHost([{ end: new Date(2025, 5, 20), scope: 'day' }]));

			// Act
			const cell = calendar.dateToCellInfo(new Date(2025, 5, 10));

			// Assert
			expect(cell.isSelected).toBe(false);
			expect(cell.classes).toMatchObject({ 'is-selectionInProgress': true, 'is-startInProgress': false, 'is-endInProgress': false });
		});

		it('should extend to the hovered date while the start date is being picked', () => {
			// Arrange
			const fixture = createHost([{ end: new Date(2025, 5, 20), scope: 'day' }]);
			const calendar = getCalendar(fixture);

			// Act
			calendar.dateHovered.set(new Date(2025, 5, 18));
			fixture.detectChanges();

			// Assert
			expect(calendar.getRangeInfo(new Date(2025, 5, 19), 'day')).not.toBeNull();
		});
	});

	describe('range without end date', () => {
		it('should match every date from the start date when nothing is hovered', () => {
			// Arrange
			const start = new Date(2025, 5, 10);
			const calendar = getCalendar(createHost([{ start, scope: 'day' }]));

			// Assert
			expect(calendar.getRangeInfo(start, 'day')).not.toBeNull();
			expect(calendar.getRangeInfo(new Date(2025, 5, 28), 'day')).not.toBeNull();
			expect(calendar.getRangeInfo(new Date(2025, 5, 9), 'day')).toBeNull();
		});

		it('should render its start date as the start of the range', () => {
			// Arrange
			const start = new Date(2025, 5, 10);
			const calendar = getCalendar(createHost([{ start, scope: 'day' }]));

			// Act
			const cell = calendar.dateToCellInfo(start);

			// Assert
			expect(cell.isSelected).toBe(true);
			expect(cell.classes).toMatchObject({ 'is-start': true, 'is-startInProgress': true, 'is-end': false, 'is-endInProgress': false });
		});

		it('should extend to the hovered date only while the end date is being picked', () => {
			// Arrange
			const fixture = createHost([{ start: new Date(2025, 5, 10), scope: 'day' }]);
			const calendar = getCalendar(fixture);

			// Act
			calendar.dateHovered.set(new Date(2025, 5, 15));
			fixture.detectChanges();

			// Assert
			expect(calendar.getRangeInfo(new Date(2025, 5, 12), 'day')).not.toBeNull();
			expect(calendar.getRangeInfo(new Date(2025, 5, 20), 'day')).toBeNull();
		});
	});

	it('should ignore a range that has no bound at all', () => {
		const calendar = getCalendar(createHost([{ scope: 'day' }]));

		expect(calendar.getRangeInfo(new Date(2025, 5, 20), 'day')).toBeNull();
	});
});
