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

		it('should match the end date only', () => {
			// Arrange
			const end = new Date(2025, 5, 20);
			const calendar = getCalendar(createHost([{ end, scope: 'day' }]));

			// Assert
			expect(calendar.getRangeInfo(end, 'day')).not.toBeNull();
			expect(calendar.getRangeInfo(new Date(2025, 5, 19), 'day')).toBeNull();
		});

		it('should render its end date the same way as a range that only has a start date', () => {
			// Arrange
			const date = new Date(2025, 5, 20);
			const fixture = createHost([{ end: date, scope: 'day' }]);
			const calendar = getCalendar(fixture);
			const fromEnd = calendar.dateToCellInfo(date).classes;

			// Act
			fixture.componentInstance.ranges = [{ start: date, scope: 'day' }];
			fixture.detectChanges();

			// Assert
			expect(fromEnd).toEqual(calendar.dateToCellInfo(date).classes);
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

	it('should ignore a range that has no bound at all', () => {
		const calendar = getCalendar(createHost([{ scope: 'day' }]));

		expect(calendar.getRangeInfo(new Date(2025, 5, 20), 'day')).toBeNull();
	});
});
