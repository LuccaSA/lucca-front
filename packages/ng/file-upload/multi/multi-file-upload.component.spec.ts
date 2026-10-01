import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MultiFileUploadComponent } from './multi-file-upload.component';

@Component({
	selector: 'lu-multi-file-upload-form-field-host',
	imports: [FormFieldComponent, MultiFileUploadComponent],
	template: `
		<lu-form-field label="Files" [errorInlineMessage]="errorInlineMessage()" [invalid]="invalid()">
			<lu-multi-file-upload />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormFieldHostComponent {
	errorInlineMessage = input<string | null>(null);
	invalid = input(false);
}

describe(MultiFileUploadComponent.name, () => {
	function instructionId(element: HTMLElement): string {
		return element.querySelector('.fileUpload-instruction')?.id ?? '';
	}

	it('should describe the input with the instructions when used standalone', () => {
		// Arrange
		const fixture = TestBed.createComponent(MultiFileUploadComponent);

		// Act
		fixture.detectChanges();

		// Assert
		const element = fixture.nativeElement as HTMLElement;
		expect(element.querySelector('input')?.getAttribute('aria-describedby')).toBe(instructionId(element));
	});

	describe('inside a form field', () => {
		let fixture: ComponentFixture<FormFieldHostComponent>;

		async function createHost(inputs: Partial<Record<'errorInlineMessage' | 'invalid', unknown>> = {}): Promise<HTMLElement> {
			fixture = TestBed.createComponent(FormFieldHostComponent);
			Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
			fixture.detectChanges();
			// The form field wires input ids and aria attributes in a later task, wait for it before querying the DOM
			const formField = fixture.debugElement.query(By.directive(FormFieldComponent)).componentInstance as FormFieldComponent;
			await firstValueFrom(formField.ready$.pipe(filter(Boolean)));
			fixture.detectChanges();
			return fixture.nativeElement as HTMLElement;
		}

		it('should keep the instructions in the description', async () => {
			// Act
			const element = await createHost();

			// Assert
			expect(element.querySelector('input')?.getAttribute('aria-describedby')).toBe(instructionId(element));
		});

		it('should read the error message after the instructions', async () => {
			// Act
			const element = await createHost({ errorInlineMessage: 'File too large', invalid: true });

			// Assert
			const field = element.querySelector('input');
			expect(field?.getAttribute('aria-describedby')).toBe(`${instructionId(element)} ${field?.id}-message`);
		});
	});
});
