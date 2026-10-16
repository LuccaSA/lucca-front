import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileEntry } from '../file-upload-entry';
import { FileEntryComponent } from './file-entry.component';

describe(FileEntryComponent.name, () => {
	const NON_BREAKING_SPACE = '\u00a0'; // Used by the translation and Intl.NumberFormat
	const PDF_FORMAT = `PDF${NON_BREAKING_SPACE}file`;

	let fixture: ComponentFixture<FileEntryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: LOCALE_ID, useValue: 'en' }],
		});
	});

	function createComponent(entry: FileEntry): HTMLElement {
		fixture = TestBed.createComponent(FileEntryComponent);
		fixture.componentRef.setInput('entry', entry);
		fixture.detectChanges();
		return fixture.nativeElement as HTMLElement;
	}

	function format(element: HTMLElement): string | undefined {
		return element.querySelector('.fileEntry-description-format')?.textContent?.trim();
	}

	function size(element: HTMLElement): string | undefined {
		return element.querySelector('.fileEntry-description-size')?.textContent?.trim();
	}

	function divider(element: HTMLElement): Element | null {
		return element.querySelector('.fileEntry-description-divider');
	}

	it('should display the format and the size', () => {
		// Act
		const element = createComponent({ name: 'report.pdf', type: 'application/pdf', size: 2000 });

		// Assert
		expect(format(element)).toBe(PDF_FORMAT);
		expect(size(element)).toBe('2kB');
		expect(divider(element)).not.toBeNull();
	});

	describe('type', () => {
		it('should deduce the format from the file name when the type is omitted', () => {
			// Act
			const element = createComponent({ name: 'report.pdf', size: 2000 });

			// Assert
			expect(format(element)).toBe(PDF_FORMAT);
		});

		it('should not display the format when the type is null', () => {
			// Act
			const element = createComponent({ name: 'report.pdf', type: null, size: 2000 });

			// Assert
			expect(format(element)).toBeUndefined();
			expect(divider(element)).toBeNull();
			expect(size(element)).toBe('2kB');
		});

		it('should not display an empty format when it cannot be deduced from the file name', () => {
			// Act
			const element = createComponent({ name: 'report', size: 2000 });

			// Assert
			expect(format(element)).toBeUndefined();
			expect(divider(element)).toBeNull();
		});
	});

	describe('size', () => {
		it('should not display the size when it is null', () => {
			// Act
			const element = createComponent({ name: 'report.pdf', type: 'application/pdf', size: null });

			// Assert
			expect(size(element)).toBeUndefined();
			expect(divider(element)).toBeNull();
			expect(format(element)).toBe(PDF_FORMAT);
		});

		it('should not display the size when it is omitted', () => {
			// Act
			const element = createComponent({ name: 'report.pdf', type: 'application/pdf' });

			// Assert
			expect(size(element)).toBeUndefined();
		});

		it('should display a size of zero', () => {
			// Act
			const element = createComponent({ name: 'report.pdf', type: 'application/pdf', size: 0 });

			// Assert
			expect(size(element)).toBe('0B');
		});
	});

	it('should not render the description when both the type and the size are null', () => {
		// Act
		const element = createComponent({ name: 'report.pdf', type: null, size: null });

		// Assert
		expect(element.querySelector('.fileEntry-description')).toBeNull();
	});

	describe('tooltip', () => {
		it('should list the name, the format and the size', () => {
			// Act
			createComponent({ name: 'report.pdf', type: 'application/pdf', size: 2000 });
			fixture.componentRef.setInput('media', true);

			// Assert
			expect(fixture.componentInstance.tooltip()).toBe(`report.pdf – ${PDF_FORMAT} – 2kB`);
		});

		it('should skip the missing format and size', () => {
			// Act
			createComponent({ name: 'report.pdf', type: null, size: null });
			fixture.componentRef.setInput('media', true);

			// Assert
			expect(fixture.componentInstance.tooltip()).toBe('report.pdf');
		});

		it('should be null when there is nothing to display', () => {
			// Act
			createComponent({ name: 'report.pdf', type: null, size: null });

			// Assert
			expect(fixture.componentInstance.tooltip()).toBeNull();
		});
	});
});
