import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getSoftwareIconFromModuleId, SOFTWARE_ICON_BY_MODULE_ID, SoftwareIconModuleId } from './software-icon-module-id';
import { SoftwareIconComponent } from './software-icon.component';
import { SOFTWARE_ICON, SoftwareIcon } from './software-icon.type';

describe('getSoftwareIconFromModuleId', () => {
	it('should return the icon of a known module id', () => {
		expect(getSoftwareIconFromModuleId('timmi-absences')).toBe('absences');
		expect(getSoftwareIconFromModuleId('cleemy-classic')).toBe('business-expenses');
		expect(getSoftwareIconFromModuleId('cleemy-expense-reports')).toBe('business-expenses');
	});

	it('should return null for a module id without icon', () => {
		expect(getSoftwareIconFromModuleId('ucal')).toBeNull();
		expect(getSoftwareIconFromModuleId('unknown-module')).toBeNull();
	});

	it('should return null for an empty value', () => {
		expect(getSoftwareIconFromModuleId('')).toBeNull();
		expect(getSoftwareIconFromModuleId(null)).toBeNull();
		expect(getSoftwareIconFromModuleId(undefined)).toBeNull();
	});

	it('should not resolve inherited object properties', () => {
		expect(getSoftwareIconFromModuleId('toString')).toBeNull();
		expect(getSoftwareIconFromModuleId('__proto__')).toBeNull();
	});

	it('should only map to existing software icons', () => {
		Object.values(SOFTWARE_ICON_BY_MODULE_ID).forEach((icon) => expect(SOFTWARE_ICON).toContain(icon));
	});

	it('should not map a module id named after a software icon to another icon', () => {
		Object.entries(SOFTWARE_ICON_BY_MODULE_ID)
			.filter(([moduleId]) => SOFTWARE_ICON.includes(moduleId as SoftwareIcon))
			.forEach(([moduleId, icon]) => expect(icon).toBe(moduleId));
	});
});

describe(SoftwareIconComponent.name, () => {
	const iconUrlOf = (icon: SoftwareIcon | SoftwareIconModuleId) => {
		TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
		const fixture = TestBed.createComponent(SoftwareIconComponent);
		fixture.componentRef.setInput('icon', icon);
		return fixture.componentInstance.iconUrl();
	};

	it('should use a software icon name as is', () => {
		expect(iconUrlOf('absences')).toMatch(/\/software-icon\/absences\.svg$/);
	});

	it('should resolve a module id into its software icon', () => {
		expect(iconUrlOf('timmi-absences')).toMatch(/\/software-icon\/absences\.svg$/);
	});
});
