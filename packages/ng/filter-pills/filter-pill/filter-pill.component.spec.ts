import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPillInputComponent } from '../core';
import { FilterPillComponent } from './filter-pill.component';

describe('FilterPillComponent', () => {
	function createComponent(locale: string): ComponentFixture<FilterPillComponent> {
		TestBed.configureTestingModule({
			providers: [{ provide: LOCALE_ID, useValue: locale }],
		});

		const fixture = TestBed.createComponent(FilterPillComponent);
		fixture.componentRef.setInput('label', 'Genre');

		const inputComponentStub = {
			enableFilterPillMode: () => {},
			registerFilterPillClosePopover: () => {},
			isFilterPillEmpty: () => false,
			isFilterPillClearable: () => false,
		} as unknown as FilterPillInputComponent;
		fixture.componentInstance.registeredInputComponentRef.set(inputComponentStub);

		fixture.detectChanges();
		return fixture;
	}

	function labelText(fixture: ComponentFixture<FilterPillComponent>): string {
		return (fixture.nativeElement as HTMLElement).querySelector('.filterPill-label')?.textContent?.trim() ?? '';
	}

	describe('colon display', () => {
		it.each(['fr', 'fr-FR', 'fr-BE'])('should display a non-breaking space before the colon for the %s locale', (locale) => {
			// Act
			const fixture = createComponent(locale);

			// Assert
			expect(labelText(fixture)).toBe('Genre :');
		});

		it.each(['en-US', 'de-DE'])('should display the colon without space for the %s locale', (locale) => {
			// Act
			const fixture = createComponent(locale);

			// Assert
			expect(labelText(fixture)).toBe('Genre:');
		});
	});
});
