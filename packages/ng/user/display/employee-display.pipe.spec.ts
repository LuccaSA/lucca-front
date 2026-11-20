import { TestBed } from '@angular/core/testing';
import { LU_DEFAULT_DISPLAY_POLICY, LuDisplayFullname, LuDisplayInitials } from './display-format.model';
import { luEmployeeDisplay, LuEmployeeDisplayPipe } from './employee-display.pipe';

describe(LuEmployeeDisplayPipe.name, () => {
	const employee = { givenName: 'Edward', familyName: 'Atkinson' };

	it('should display the family name first by default', () => {
		expect(luEmployeeDisplay(employee)).toBe('Atkinson Edward');
	});

	it('should apply the given format', () => {
		expect(luEmployeeDisplay(employee, LuDisplayFullname.firstlast)).toBe('Edward Atkinson');
		expect(luEmployeeDisplay(employee, LuDisplayInitials.firstlast)).toBe('EA');
	});

	it('should fall back to the given name when the family name is missing', () => {
		expect(luEmployeeDisplay({ givenName: 'Edward', familyName: null })).toBe('Edward');
	});

	it('should return an empty string without employee', () => {
		expect(luEmployeeDisplay(null)).toBe('');
	});

	it('should use the default display policy when no format is given', () => {
		// Arrange
		TestBed.configureTestingModule({ providers: [{ provide: LU_DEFAULT_DISPLAY_POLICY, useValue: LuDisplayFullname.first }] });
		const pipe = TestBed.runInInjectionContext(() => new LuEmployeeDisplayPipe());

		// Act
		const result = pipe.transform(employee);

		// Assert
		expect(result).toBe('Edward');
	});

	it('should accept the format as a string or an object', () => {
		// Arrange
		const pipe = TestBed.runInInjectionContext(() => new LuEmployeeDisplayPipe());

		// Act & Assert
		expect(pipe.transform(employee, LuDisplayFullname.firstlast)).toBe('Edward Atkinson');
		expect(pipe.transform(employee, { format: LuDisplayFullname.last })).toBe('Atkinson');
	});
});
