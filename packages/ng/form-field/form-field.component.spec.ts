import { ApplicationRef, ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldIdDirective, TextInputComponent } from '@lucca-front/ng/forms';
import { By } from '@angular/platform-browser';
import { InlineMessageState } from '@lucca-front/ng/inline-message';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { vi } from 'vitest';
import { FormFieldComponent } from './form-field.component';
import { FormFieldLayout } from './form-field.type';
import { InputDirective } from './input.directive';

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
		<lu-form-field [label]="label()" [tooltip]="tooltip()" [inlineMessage]="inlineMessage()" [inlineMessageState]="inlineMessageState()" [hiddenLabel]="hiddenLabel()" [layout]="layout()">
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
	layout = input<FormFieldLayout>('default');

	formControl = new FormControl('');
}

@Component({
	selector: 'lu-form-field-aria-test',
	imports: [FormFieldComponent, InputDirective],
	template: `
		<lu-form-field label="Files" [inlineMessage]="inlineMessage()" [extraDescribedBy]="extraDescribedBy()">
			<input luInput [luInputLabelledBy]="ownLabelledBy()" [luInputDescribedBy]="ownDescribedBy()" [luInputStandalone]="standalone()" />
		</lu-form-field>
		<input class="outside" luInput aria-describedby="consumer-description" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormFieldAriaTestComponent {
	inlineMessage = input<string | null>(null);
	extraDescribedBy = input('');
	ownLabelledBy = input<string | null>(null);
	ownDescribedBy = input<string | null>(null);
	standalone = input(false);
}

@Component({
	selector: 'lu-form-field-swap-test',
	imports: [FormFieldComponent, InputDirective],
	template: `
		<lu-form-field label="First name">
			@if (useButton()) {
				<button luInput type="button">Pick…</button>
			} @else {
				<input luInput type="text" />
			}
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormFieldSwapTestComponent {
	readonly useButton = input(false);
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

		async function createContentHost(inputs: Partial<Record<'label' | 'tooltip' | 'inlineMessage' | 'inlineMessageState' | 'hiddenLabel' | 'layout', unknown>> = {}): Promise<void> {
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

		it('should mask the fieldset legend but keep it accessible to assistive technologies when hiddenLabel is set', async () => {
			// Act
			await createContentHost({ label: 'First name', hiddenLabel: true, layout: 'fieldset' });

			// Assert
			const legend = queryRequired<HTMLLegendElement>('legend.formLabel');
			expect(legend?.textContent).toContain('First name');
			expect(legend?.classList).toContain('pr-u-mask');
			expect(legend?.hasAttribute('aria-hidden')).toBe(false);
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

	describe('aria ids', () => {
		let ariaFixture: ComponentFixture<FormFieldAriaTestComponent>;
		let formField: FormFieldComponent;

		async function createAriaHost(inputs: Partial<Record<'inlineMessage' | 'extraDescribedBy' | 'ownLabelledBy' | 'ownDescribedBy' | 'standalone', unknown>> = {}): Promise<HTMLInputElement> {
			ariaFixture = TestBed.createComponent(FormFieldAriaTestComponent);
			Object.entries(inputs).forEach(([name, value]) => ariaFixture.componentRef.setInput(name, value));
			ariaFixture.detectChanges();
			formField = ariaFixture.debugElement.query(By.directive(FormFieldComponent)).componentInstance as FormFieldComponent;
			await firstValueFrom(formField.ready$.pipe(filter(Boolean)));
			ariaFixture.detectChanges();
			return (ariaFixture.nativeElement as HTMLElement).querySelector('lu-form-field input') as HTMLInputElement;
		}

		it('should not reference a missing inline message', async () => {
			// Act
			const field = await createAriaHost();

			// Assert
			expect(field.hasAttribute('aria-describedby')).toBe(false);
		});

		it('should keep the ids of the input next to the ones of the form field', async () => {
			// Act
			const field = await createAriaHost({ inlineMessage: 'Helper text', ownLabelledBy: 'value-1', ownDescribedBy: 'instruction-1' });

			// Assert
			expect(field.getAttribute('aria-labelledby')).toBe(`${field.id}-label value-1`);
			expect(field.getAttribute('aria-describedby')).toBe(`instruction-1 ${field.id}-message`);
		});

		it('should keep the ids of the input when the field state changes', async () => {
			// Arrange
			const field = await createAriaHost({ ownDescribedBy: 'instruction-1' });

			// Act
			ariaFixture.componentRef.setInput('inlineMessage', 'Helper text');
			ariaFixture.detectChanges();
			ariaFixture.componentRef.setInput('extraDescribedBy', 'extra-1');
			ariaFixture.detectChanges();

			// Assert
			expect(field.getAttribute('aria-describedby')).toBe(`instruction-1 ${field.id}-message extra-1`);
		});

		it('should remove a labelledby id from the DOM', async () => {
			// Arrange
			const field = await createAriaHost();
			formField.addLabelledBy('custom-1');
			ariaFixture.detectChanges();

			// Act
			formField.removeLabelledBy('custom-1');
			ariaFixture.detectChanges();

			// Assert
			expect(field.getAttribute('aria-labelledby')).toBe(`${field.id}-label`);
		});

		it('should only apply the ids of the input when standalone', async () => {
			// Act
			const field = await createAriaHost({ inlineMessage: 'Helper text', ownDescribedBy: 'instruction-1', standalone: true });

			// Assert
			expect(field.getAttribute('aria-describedby')).toBe('instruction-1');
			expect(field.hasAttribute('aria-labelledby')).toBe(false);
		});

		it('should not touch the attributes of an input without ids', async () => {
			// Act
			await createAriaHost();

			// Assert
			const outside = (ariaFixture.nativeElement as HTMLElement).querySelector('input.outside');
			expect(outside?.getAttribute('aria-describedby')).toBe('consumer-description');
		});
	});

	describe('when the projected luInput is torn down and replaced', () => {
		// Mirrors a select's bottom sheet trigger, which swaps between a button and a text input as the
		// viewport crosses a breakpoint — each swap destroys one `luInput` and creates another.
		it('should not leave stale ids behind in aria-labelledby', () => {
			// Arrange
			const swapFixture = TestBed.createComponent(FormFieldSwapTestComponent);
			swapFixture.detectChanges();
			TestBed.inject(ApplicationRef).tick();

			// Act — flip back and forth a few times, as resizing across the breakpoint repeatedly would
			swapFixture.componentRef.setInput('useButton', true);
			swapFixture.detectChanges();
			TestBed.inject(ApplicationRef).tick();
			swapFixture.componentRef.setInput('useButton', false);
			swapFixture.detectChanges();
			TestBed.inject(ApplicationRef).tick();

			// Assert
			const current = (swapFixture.nativeElement as HTMLElement).querySelector('[luInput]');
			const ids = current?.getAttribute('aria-labelledby')?.split(' ') ?? [];
			expect(ids).not.toHaveLength(0);
			expect(ids.every((id) => document.getElementById(id) !== null)).toBe(true);
		});
	});
});
