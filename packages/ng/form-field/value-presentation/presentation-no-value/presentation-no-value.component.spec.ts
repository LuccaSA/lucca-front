import { ChangeDetectionStrategy, Component, input, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { FormFieldComponent } from '../../form-field.component';
import { DataPresentationComponent } from '../data-presentation/data-presentation.component';
import { ɵPresentationNoValueComponent } from './presentation-no-value.component';

/**
 * Text exposed to assistive technologies: the content without the `aria-hidden` parts.
 */
function accessibleText(element: Element): string {
	const clone = element.cloneNode(true) as Element;
	clone.querySelectorAll('[aria-hidden="true"]').forEach((hidden) => hidden.remove());
	return clone.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

@Component({
	selector: 'lu-presentation-no-value-data-presentation-test',
	imports: [DataPresentationComponent],
	template: `<lu-data-presentation label="Name" [noValue]="noValue()">{{ noValue() ? '' : 'John' }}</lu-data-presentation>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DataPresentationTestComponent {
	readonly noValue = input(false);
}

@Component({
	selector: 'lu-presentation-no-value-form-field-test',
	imports: [FormFieldComponent, TextInputComponent, ReactiveFormsModule],
	template: `
		<lu-form-field label="Name" presentation>
			<lu-text-input [formControl]="formControl" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormFieldPresentationTestComponent {
	readonly formControl = new FormControl<string | null>(null);
}

describe(ɵPresentationNoValueComponent.name, () => {
	function renderDataPresentation(noValue: boolean): Element {
		const fixture = TestBed.createComponent(DataPresentationTestComponent);
		fixture.componentRef.setInput('noValue', noValue);
		fixture.detectChanges();
		return fixture.nativeElement.querySelector('.presentation-definition');
	}

	it('should expose a text to assistive technologies when data presentation has no value', () => {
		const definition = renderDataPresentation(true);

		expect(definition.querySelector('[aria-hidden="true"][data-content-before="–"]')).toBeTruthy();
		expect(accessibleText(definition)).toBe('Not provided');
	});

	it('should not render the empty value when data presentation has a value', () => {
		const definition = renderDataPresentation(false);

		expect(definition.querySelector('lu-presentation-no-value')).toBeNull();
		expect(accessibleText(definition)).toBe('John');
	});

	it('should translate the text with the current locale', () => {
		TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] });

		const definition = renderDataPresentation(true);

		expect(accessibleText(definition)).toBe('Non renseigné');
	});

	it('should expose a text to assistive technologies when a field in presentation mode is empty', () => {
		const fixture = TestBed.createComponent(FormFieldPresentationTestComponent);
		fixture.detectChanges();

		const noValue = fixture.nativeElement.querySelector('lu-presentation-no-value');

		expect(noValue).toBeTruthy();
		expect(accessibleText(noValue)).toBe('Not provided');
	});

	it('should not render the empty value when a field in presentation mode has a value', () => {
		const fixture = TestBed.createComponent(FormFieldPresentationTestComponent);
		fixture.componentInstance.formControl.setValue('John');
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('lu-presentation-no-value')).toBeNull();
	});
});
