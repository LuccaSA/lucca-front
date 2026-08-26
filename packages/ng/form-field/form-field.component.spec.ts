import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldIdDirective, TextInputComponent } from '@lucca-front/ng/forms';
import { By } from '@angular/platform-browser';
import { InlineMessageState } from '@lucca-front/ng/inline-message';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { vi } from 'vitest';
import { FormFieldComponent } from './form-field.component';

@Component({
	selector: 'lu-form-field-test',
	imports: [TextInputComponent, FormFieldComponent, ReactiveFormsModule],
	template: `
		<lu-form-field label="">
			<lu-text-input [formControl]="formControl()" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponentTestComponent {
	readonly formControlToUse = input<'normal' | 'required'>('normal');
	readonly formField = viewChild(FormFieldComponent);

	readonly formControl = computed(() => (this.formControlToUse() === 'normal' ? this.normalFormControl : this.requiredFormControl));

	requiredFormControl = new FormControl('', { validators: Validators.required });
	normalFormControl = new FormControl('');
}

@Component({
	selector: 'lu-form-field-content-test',
	imports: [TextInputComponent, FormFieldComponent, ReactiveFormsModule],
	template: `
		<lu-form-field [label]="label()" [tooltip]="tooltip()" [inlineMessage]="inlineMessage()" [inlineMessageState]="inlineMessageState()" [hiddenLabel]="hiddenLabel()">
			<lu-text-input [formControl]="formControl" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormFieldContentTestComponent {
	label = input<string>('First name');
	tooltip = input<string | null>(null);
	inlineMessage = input<string | null>(null);
	inlineMessageState = input<InlineMessageState | null>(null);
	hiddenLabel = input(false);

	formControl = new FormControl('');
}

describe('FormFieldComponent', () => {
	let fixture: ComponentFixture<FormFieldComponentTestComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FormFieldIdDirective],
		});

		fixture = TestBed.createComponent(FormFieldComponentTestComponent);
	});

	const isInputRequired = () => fixture.componentInstance.formField()?.isInputRequired();

	it('should not detect required validator', () => {
		// Act
		fixture.detectChanges();

		// Assert
		expect(isInputRequired()).toBe(false);
	});

	it('should detect required validator', async () => {
		// Arrange
		fixture.componentRef.setInput('formControlToUse', 'required');

		// Act
		fixture.detectChanges();

		// Assert
		await vi.waitFor(() => {
			expect(isInputRequired()).toBe(true);
		});
	});

	it('should handle required when going from normal to required', async () => {
		// Arrange
		fixture.detectChanges();

		// Act
		fixture.componentRef.setInput('formControlToUse', 'required');
		fixture.detectChanges();

		// Assert
		await vi.waitFor(() => {
			expect(isInputRequired()).toBe(true);
		});
	});

	it('should handle required when going from required to normal', async () => {
		// Arrange
		fixture.componentRef.setInput('formControlToUse', 'required');
		fixture.detectChanges();

		// Act
		fixture.componentRef.setInput('formControlToUse', 'normal');
		fixture.detectChanges();

		// Assert
		await vi.waitFor(() => {
			expect(isInputRequired()).toBe(false);
		});
	});

	describe('label, tooltip and inline message', () => {
		let contentFixture: ComponentFixture<FormFieldContentTestComponent>;

		async function createContentHost(inputs: Partial<Record<'label' | 'tooltip' | 'inlineMessage' | 'inlineMessageState' | 'hiddenLabel', unknown>> = {}): Promise<void> {
			// The TestBed is already configured by the outer beforeEach
			contentFixture = TestBed.createComponent(FormFieldContentTestComponent);
			Object.entries(inputs).forEach(([name, value]) => contentFixture.componentRef.setInput(name, value));
			contentFixture.detectChanges();
			// The form field wires input ids and aria attributes in a later task, wait for it before querying the DOM
			const formField = contentFixture.debugElement.query(By.directive(FormFieldComponent)).componentInstance as FormFieldComponent;
			await firstValueFrom(formField.ready$.pipe(filter(Boolean)));
			contentFixture.detectChanges();
		}

		function query<T extends Element>(selector: string): T | null {
			return (contentFixture.nativeElement as HTMLElement).querySelector<T>(selector);
		}

		function queryRequired<T extends Element>(selector: string): T {
			const element = query<T>(selector);
			if (!element) {
				throw new Error(`Expected to find ${selector}`);
			}
			return element;
		}

		it('should render the label', async () => {
			// Act
			await createContentHost({ label: 'First name' });

			// Assert
			expect(query<HTMLLabelElement>('label.formLabel')?.textContent).toContain('First name');
		});

		it('should mask the label but keep it in the DOM when hiddenLabel is set', async () => {
			// Act
			await createContentHost({ label: 'First name', hiddenLabel: true });

			// Assert
			const label = queryRequired<HTMLLabelElement>('label.formLabel');
			expect(label?.textContent).toContain('First name');
			expect(label?.classList).toContain('pr-u-mask');
		});

		it('should bind the label to the input through matching for and id attributes', async () => {
			// Act
			await createContentHost();

			// Assert
			const label = queryRequired<HTMLLabelElement>('label.formLabel');
			const input = queryRequired<HTMLInputElement>('input');
			expect(input?.id).not.toBe('');
			expect(label?.getAttribute('for')).toBe(input?.id);
			expect(label?.getAttribute('id')).toBe(`${input?.id}-label`);
			expect(input?.getAttribute('aria-labelledby')).toContain(`${input?.id}-label`);
		});

		it('should not render a tooltip when none is provided', async () => {
			// Act
			await createContentHost();

			// Assert
			expect(query('.formLabel-info')).toBeNull();
		});

		it('should render the tooltip trigger next to the label', async () => {
			// Act
			await createContentHost({ tooltip: 'Your legal first name' });

			// Assert
			expect(query('.formLabel-info')).not.toBeNull();
		});

		it('should not render an inline message when none is provided', async () => {
			// Act
			await createContentHost();

			// Assert
			expect(query('lu-inline-message')).toBeNull();
		});

		it('should render the inline message and describe the input with it', async () => {
			// Act
			await createContentHost({ inlineMessage: 'Helper text' });

			// Assert
			const message = queryRequired('lu-inline-message');
			const input = queryRequired<HTMLInputElement>('input');
			expect(message?.textContent).toContain('Helper text');
			expect(message?.id).toBe(`${input?.id}-message`);
			expect(input?.getAttribute('aria-describedby')).toContain(`${input?.id}-message`);
		});

		it('should apply the inline message state', async () => {
			// Act
			await createContentHost({ inlineMessage: 'Helper text', inlineMessageState: 'warning' });

			// Assert
			expect(query('lu-inline-message')?.classList).toContain('is-warning');
		});
	});
});
