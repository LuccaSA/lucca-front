import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { vi } from 'vitest';
import { MultiFileUploadComponent } from '../multi/multi-file-upload.component';
import { SingleFileUploadComponent } from '../single/single-file-upload.component';
import { BaseFileUploadComponent } from './base-file-upload.component';

@Component({
	selector: 'lu-single-file-upload-required-host',
	imports: [FormFieldComponent, SingleFileUploadComponent],
	template: `
		<lu-form-field label="Files">
			<lu-single-file-upload required />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SingleRequiredHostComponent {}

@Component({
	selector: 'lu-multi-file-upload-required-host',
	imports: [FormFieldComponent, MultiFileUploadComponent],
	template: `
		<lu-form-field label="Files">
			<lu-multi-file-upload required />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiRequiredHostComponent {}

// The behaviour lives in the abstract base class: it is checked through both concrete components
describe.each([
	{ name: SingleFileUploadComponent.name, component: SingleFileUploadComponent as Type<BaseFileUploadComponent>, requiredHost: SingleRequiredHostComponent as Type<unknown> },
	{ name: MultiFileUploadComponent.name, component: MultiFileUploadComponent as Type<BaseFileUploadComponent>, requiredHost: MultiRequiredHostComponent as Type<unknown> },
])(`${BaseFileUploadComponent.name} through $name`, ({ component, requiredHost }) => {
	function createComponent(inputs: Record<string, unknown> = {}) {
		const fixture = TestBed.createComponent(component);
		Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
		fixture.detectChanges();
		const element = fixture.nativeElement as HTMLElement;
		return {
			fixture,
			fileInput: element.querySelector<HTMLInputElement>('input[type="file"]')!,
			fileUpload: element.querySelector<HTMLElement>('.fileUpload')!,
			formatsText: () => element.querySelector('.fileUpload-instruction-formats')?.textContent?.replace(/\s+/g, ' ').trim(),
		};
	}

	function pickFiles(fileInput: HTMLInputElement, files: File[]): void {
		// happy-dom does not let a test fill a file input: its picked files are simulated
		Object.defineProperty(fileInput, 'files', { configurable: true, value: files });
		fileInput.dispatchEvent(new Event('change'));
	}

	describe('picking files', () => {
		it('should emit filePicked once per picked file', () => {
			// Arrange
			const { fixture, fileInput } = createComponent();
			const filePicked = vi.fn();
			fixture.componentInstance.filePicked.subscribe(filePicked);
			const first = new File(['first'], 'first.png', { type: 'image/png' });
			const second = new File(['second'], 'second.pdf', { type: 'application/pdf' });

			// Act
			pickFiles(fileInput, [first, second]);

			// Assert
			expect(filePicked.mock.calls).toEqual([[first], [second]]);
		});

		it('should reset the file input so the same file can be picked again', () => {
			// Arrange
			const { fixture, fileInput, fileUpload } = createComponent();
			const valueSetter = vi.fn();
			Object.defineProperty(fileInput, 'value', { configurable: true, get: () => 'C:\\fakepath\\first.png', set: valueSetter });
			fileInput.dispatchEvent(new Event('dragenter'));
			fixture.detectChanges();
			expect(fileUpload.classList).toContain('is-droppable');

			// Act
			pickFiles(fileInput, [new File(['first'], 'first.png', { type: 'image/png' })]);
			fixture.detectChanges();

			// Assert
			expect(valueSetter).toHaveBeenCalledExactlyOnceWith('');
			expect(fileUpload.classList).not.toContain('is-droppable');
		});
	});

	describe('accepted formats', () => {
		it('should accept every format by default', () => {
			// Act
			const { fileInput, formatsText } = createComponent();

			// Assert
			expect(fileInput.getAttribute('accept')).toBe('*');
			expect(formatsText()).toBe('Accepted formats: all.');
		});

		it('should list only the named formats', () => {
			// Act
			const { fileInput, formatsText } = createComponent({
				accept: [{ format: 'image/png', name: 'PNG' }, { format: '.pdf', name: 'PDF' }, { format: '.txt' }],
			});

			// Assert
			expect(fileInput.getAttribute('accept')).toBe('image/png,.pdf,.txt');
			expect(formatsText()).toBe('Accepted formats: PNG, PDF.');
		});

		it('should use the singular for a single named format', () => {
			// Act
			const { formatsText } = createComponent({ accept: [{ format: '.pdf', name: 'PDF' }] });

			// Assert
			expect(formatsText()).toBe('Accepted format: PDF.');
		});
	});

	describe('inside a form field', () => {
		it('should mark the form field as required with the required input', () => {
			// Arrange
			const fixture = TestBed.createComponent(requiredHost);

			// Act
			fixture.detectChanges();

			// Assert
			const formField = fixture.debugElement.query(By.directive(FormFieldComponent)).componentInstance as FormFieldComponent;
			expect(formField.isInputRequired()).toBe(true);
		});
	});
});
