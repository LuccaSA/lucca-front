import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ALuSelectInputComponent, SELECT_PANEL_INSTANCE } from '@lucca-front/ng/core-select';
import { ARCHIVED_LEGAL_UNITS_CONTEXT, LuCoreSelectArchivedLegalUnitsComponent } from './archived-legal-units.component';

describe(LuCoreSelectArchivedLegalUnitsComponent.name, () => {
	const includeArchivedLegalUnits = signal(false);

	beforeEach(() => {
		includeArchivedLegalUnits.set(false);
		TestBed.configureTestingModule({
			imports: [LuCoreSelectArchivedLegalUnitsComponent],
			providers: [
				{ provide: SELECT_PANEL_INSTANCE, useValue: { options: signal([]), pointerNavigation: signal(false) } },
				{ provide: ALuSelectInputComponent, useValue: { highlightedOption: { emit: () => undefined } } },
				{ provide: ARCHIVED_LEGAL_UNITS_CONTEXT, useValue: { includeArchivedLegalUnits } },
			],
		});
	});

	it('should render the element targeted by aria-activedescendant as a listbox option', () => {
		const fixture = TestBed.createComponent(LuCoreSelectArchivedLegalUnitsComponent);
		fixture.detectChanges();

		// The key manager points aria-activedescendant at this id: it must exist and be an option
		const option = (fixture.nativeElement as HTMLElement).querySelector('#select-archived-legal-units');
		expect(option).toBeTruthy();
		expect(option!.getAttribute('role')).toBe('option');
		expect(option!.getAttribute('aria-selected')).toBe('false');
	});

	it('should reflect the toggle on aria-selected', () => {
		const fixture = TestBed.createComponent(LuCoreSelectArchivedLegalUnitsComponent);
		fixture.detectChanges();

		includeArchivedLegalUnits.set(true);
		fixture.detectChanges();

		const option = (fixture.nativeElement as HTMLElement).querySelector('#select-archived-legal-units');
		expect(option!.getAttribute('aria-selected')).toBe('true');
		expect(option!.querySelectorAll('.checkboxField').length).toBe(1);
	});
});
