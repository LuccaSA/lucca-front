import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ALuSelectInputComponent, SELECT_PANEL_INSTANCE } from '@lucca-front/ng/core-select';
import { FORMER_EMPLOYEES_CONTEXT, LuCoreSelectFormerEmployeesComponent } from './former-employees.component';

describe(LuCoreSelectFormerEmployeesComponent.name, () => {
	const includeFormerEmployees = signal(false);

	beforeEach(() => {
		includeFormerEmployees.set(false);
		TestBed.configureTestingModule({
			imports: [LuCoreSelectFormerEmployeesComponent],
			providers: [
				{ provide: SELECT_PANEL_INSTANCE, useValue: { options: signal([]), pointerNavigation: signal(false) } },
				{ provide: ALuSelectInputComponent, useValue: { highlightedOption: { emit: () => undefined } } },
				{ provide: FORMER_EMPLOYEES_CONTEXT, useValue: { includeFormerEmployees } },
			],
		});
	});

	it('should render the element targeted by aria-activedescendant as a listbox option', () => {
		const fixture = TestBed.createComponent(LuCoreSelectFormerEmployeesComponent);
		fixture.detectChanges();

		// The key manager points aria-activedescendant at this id: it must exist and be an option
		const option = (fixture.nativeElement as HTMLElement).querySelector('#select-former-employees');
		expect(option).toBeTruthy();
		expect(option!.getAttribute('role')).toBe('option');
		expect(option!.getAttribute('aria-selected')).toBe('false');
	});

	it('should reflect the toggle on aria-selected', () => {
		const fixture = TestBed.createComponent(LuCoreSelectFormerEmployeesComponent);
		fixture.detectChanges();

		includeFormerEmployees.set(true);
		fixture.detectChanges();

		const option = (fixture.nativeElement as HTMLElement).querySelector('#select-former-employees');
		expect(option!.getAttribute('aria-selected')).toBe('true');
		expect(option!.querySelectorAll('.checkboxField').length).toBe(1);
	});
});
