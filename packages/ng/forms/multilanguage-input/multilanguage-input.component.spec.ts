import { ChangeDetectionStrategy, Component, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { MultilanguageTranslation } from './model/multilanguage-translation';
import { MultilanguageInputComponent } from './multilanguage-input.component';

@Component({
	selector: 'lu-multilanguage-input-host',
	imports: [ReactiveFormsModule, MultilanguageInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-multilanguage-input [formControl]="formControl" [hasNoInvariant]="hasNoInvariant()" [displayLocale]="displayLocale()" /> `,
})
class MultilanguageInputHostComponent {
	readonly hasNoInvariant = input(false);
	readonly displayLocale = input('');

	formControl = new FormControl<MultilanguageTranslation[] | null>([
		{ cultureCode: 'invariant', value: 'Hello' },
		{ cultureCode: 'fr-FR', value: 'Bonjour' },
		{ cultureCode: 'en', value: 'Hi' },
	]);

	readonly multilanguageInput = viewChild.required(MultilanguageInputComponent);
}

describe(MultilanguageInputComponent.name, () => {
	let fixture: ComponentFixture<MultilanguageInputHostComponent>;
	let host: MultilanguageInputHostComponent;

	function getMainInput(): HTMLInputElement {
		return (fixture.nativeElement as HTMLElement).querySelector('input')!;
	}

	async function render(): Promise<void> {
		fixture.detectChanges();
		await fixture.whenStable();
	}

	function type(text: string): void {
		const mainInput = getMainInput();
		mainInput.value = text;
		mainInput.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	function getPanelCultureCodes(): string[] {
		return host
			.multilanguageInput()
			.panelInputs()
			.map((row) => row.cultureCode);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [MultilanguageInputHostComponent] });
		fixture = TestBed.createComponent(MultilanguageInputHostComponent);
		host = fixture.componentInstance;
	});

	describe('with invariant', () => {
		beforeEach(async () => {
			await render();
		});

		it('should display the invariant value and emit the updated translations when typing', () => {
			// Assert
			expect(getMainInput().value).toBe('Hello');

			// Act
			type('Hello world');

			// Assert
			expect(host.formControl.value).toEqual([
				{ cultureCode: 'invariant', value: 'Hello world' },
				{ cultureCode: 'fr-FR', value: 'Bonjour' },
				{ cultureCode: 'en', value: 'Hi' },
			]);
		});

		it('should throw when the value has no invariant translation', () => {
			// Act & Assert
			expect(() => host.formControl.setValue([{ cultureCode: 'fr-FR', value: 'Bonjour' }])).toThrow('Please provide an invariant translation in translation array');
		});

		it('should list every culture but the invariant in the panel', () => {
			// Assert
			expect(getPanelCultureCodes()).toEqual(['fr-FR', 'en']);
		});

		it('should prefer the LOCALE_ID translation in presentation, then the invariant', () => {
			// Act
			host.formControl.setValue([
				{ cultureCode: 'invariant', value: 'Hello' },
				{ cultureCode: 'en-US', value: 'Hello from the US' },
			]);

			// Assert
			expect(host.multilanguageInput().presentationValue()).toBe('Hello from the US');

			// Act
			host.formControl.setValue([
				{ cultureCode: 'invariant', value: 'Hello' },
				{ cultureCode: 'fr-FR', value: 'Bonjour' },
			]);

			// Assert
			expect(host.multilanguageInput().presentationValue()).toBe('Hello');
		});

		it('should not set a lang attribute on the main input', () => {
			// Assert
			expect(getMainInput().getAttribute('lang')).toBeNull();
		});

		it('should disable the main input when the control is disabled', async () => {
			// Act
			host.formControl.disable();
			await render();

			// Assert
			expect(getMainInput().disabled).toBe(true);
		});

		it('should mark the control as touched on blur', () => {
			// Act
			getMainInput().dispatchEvent(new Event('blur'));

			// Assert
			expect(host.formControl.touched).toBe(true);
		});
	});

	describe('without invariant', () => {
		beforeEach(() => {
			// Configuration warnings (required field) are not under test here
			vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			fixture.componentRef.setInput('hasNoInvariant', true);
			host.formControl.setValue([
				{ cultureCode: 'fr-FR', value: 'Bonjour' },
				{ cultureCode: 'en', value: 'Hi' },
			]);
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('should accept a value without invariant translation', async () => {
			// Act
			fixture.componentRef.setInput('displayLocale', 'fr-FR');
			await render();

			// Assert
			expect(host.formControl.value).toEqual([
				{ cultureCode: 'fr-FR', value: 'Bonjour' },
				{ cultureCode: 'en', value: 'Hi' },
			]);
		});

		it('should display the culture matching displayLocale exactly', async () => {
			// Act
			fixture.componentRef.setInput('displayLocale', 'fr-FR');
			await render();

			// Assert
			expect(getMainInput().value).toBe('Bonjour');
			expect(getMainInput().getAttribute('lang')).toBe('fr-FR');
		});

		it('should fall back to the culture matching the language of displayLocale', async () => {
			// Act
			fixture.componentRef.setInput('displayLocale', 'en-US');
			await render();

			// Assert
			expect(getMainInput().value).toBe('Hi');
			expect(getMainInput().getAttribute('lang')).toBe('en');
		});

		it('should list every culture but the displayed one in the panel', async () => {
			// Act
			fixture.componentRef.setInput('displayLocale', 'en-US');
			await render();

			// Assert
			expect(getPanelCultureCodes()).toEqual(['fr-FR']);
		});

		it('should present the displayed culture value', async () => {
			// Act
			fixture.componentRef.setInput('displayLocale', 'fr-FR');
			await render();

			// Assert
			expect(host.multilanguageInput().presentationValue()).toBe('Bonjour');
		});
	});
});
