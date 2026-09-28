import { registerLocaleData } from '@angular/common';
import localeArEg from '@angular/common/locales/ar-EG';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CalendarWeekInfo, WEEK_INFO } from './calendar.token';

registerLocaleData(localeFr, 'fr-FR');
registerLocaleData(localeArEg, 'ar-EG');

function weekInfo(locale: string): CalendarWeekInfo {
	TestBed.configureTestingModule({
		providers: [{ provide: LOCALE_ID, useValue: locale }],
	});

	return TestBed.inject(WEEK_INFO);
}

describe('WEEK_INFO', () => {
	it('should start the week on monday for fr-FR', () => {
		// Act
		const { firstDay } = weekInfo('fr-FR');

		// Assert
		expect(firstDay).toBe(1);
	});

	it('should set saturday and sunday as weekend for fr-FR', () => {
		// Act
		const { weekend } = weekInfo('fr-FR');

		// Assert
		expect(weekend).toEqual([6, 7]);
	});

	it('should set friday and saturday as weekend for ar-EG', () => {
		// Act
		const { firstDay, weekend } = weekInfo('ar-EG');

		// Assert
		expect(firstDay).toBe(6);
		expect(weekend).toEqual([5, 6]);
	});

	it('should set saturday and sunday as weekend for en-US', () => {
		// Act
		const { weekend } = weekInfo('en-US');

		// Assert
		expect(weekend).toEqual([6, 7]);
	});

	// Known inconsistency: sunday is mapped to 7 in `weekend` but stays 0 in `firstDay`,
	// even though `CalendarWeekDay` only allows 1 to 7.
	it('should return 0 as first day for en-US, where the week starts on sunday', () => {
		// Act
		const { firstDay } = weekInfo('en-US');

		// Assert
		expect(firstDay).toBe(0 as never);
	});

	it('should resolve the week info from LOCALE_ID by default', () => {
		// Act
		const info = weekInfo('fr-FR');

		// Assert
		expect(info).toEqual({ firstDay: 1, weekend: [6, 7] });
	});

	it('should be overridable by an explicit provider', () => {
		// Arrange
		const custom: CalendarWeekInfo = { firstDay: 3, weekend: [1, 2] };
		TestBed.configureTestingModule({
			providers: [{ provide: WEEK_INFO, useValue: custom }],
		});

		// Act
		const info = TestBed.inject(WEEK_INFO);

		// Assert
		expect(info).toBe(custom);
	});
});
