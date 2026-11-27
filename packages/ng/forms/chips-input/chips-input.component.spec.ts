import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChipsInputComponent } from './chips-input.component';

@Component({
	selector: 'lu-chips-input-host',
	imports: [ReactiveFormsModule, ChipsInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<lu-chips-input hasClearer [formControl]="control" [unkillableValues]="unkillableValues" [chipValidator]="chipValidator" />`,
})
class ChipsInputHostComponent {
	readonly control = new FormControl<string[]>([]);
	unkillableValues: string[] = [];
	chipValidator: ((value: string) => boolean) | null = null;
}

describe(ChipsInputComponent.name, () => {
	let fixture: ComponentFixture<ChipsInputHostComponent>;
	let control: FormControl<string[] | null>;
	let host: HTMLElement;
	let inputElement: HTMLInputElement;

	const setup = (configure?: (host: ChipsInputHostComponent) => void) => {
		TestBed.configureTestingModule({ imports: [ChipsInputHostComponent] });
		fixture = TestBed.createComponent(ChipsInputHostComponent);
		configure?.(fixture.componentInstance);
		fixture.detectChanges();
		control = fixture.componentInstance.control;
		host = fixture.nativeElement as HTMLElement;
		inputElement = host.querySelector('input')!;
	};

	const type = (text: string) => {
		inputElement.value = text;
		inputElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	};

	const press = (key: string, init: KeyboardEventInit = {}) => {
		const event = new KeyboardEvent('keydown', { key, cancelable: true, ...init });
		inputElement.dispatchEvent(event);
		fixture.detectChanges();
		return event;
	};

	const chips = () => Array.from(host.querySelectorAll<HTMLElement>('.chipsField-chip'));

	it.each(['Enter', 'Tab', ','])('should add the typed value as a chip on %s', (key) => {
		// Arrange
		setup();
		type('  marie@example.com ');
		// Act
		const event = press(key);
		// Assert
		expect(control.value).toEqual(['marie@example.com']);
		expect(inputElement.value).toBe('');
		expect(event.defaultPrevented).toBe(true);
		expect(chips().map((chip) => chip.querySelector('.chip-content')?.textContent?.trim())).toEqual(['marie@example.com']);
	});

	it('should let Tab move the focus when nothing is typed', () => {
		// Arrange
		setup();
		// Act
		const event = press('Tab');
		// Assert
		expect(event.defaultPrevented).toBe(false);
		expect(control.value).toEqual([]);
	});

	it('should not add a value twice', () => {
		// Arrange
		setup();
		control.setValue(['a']);
		type('a');
		// Act
		press('Enter');
		// Assert
		expect(control.value).toEqual(['a']);
		expect(inputElement.value).toBe('');
	});

	it('should split a pasted list into chips and keep the text after the last comma', () => {
		// Arrange
		setup();
		// Act
		type('a, b,, c');
		// Assert
		expect(control.value).toEqual(['a', 'b']);
		expect(inputElement.value).toBe(' c');
	});

	it('should display the value written by the form', () => {
		// Arrange
		setup();
		// Act
		control.setValue(['a', 'b']);
		fixture.detectChanges();
		// Assert
		expect(chips()).toHaveLength(2);
	});

	it('should select the last chip on a first Backspace in the empty field, then remove it on the next one', () => {
		// Arrange
		setup();
		control.setValue(['a', 'b']);
		fixture.detectChanges();
		// Act
		press('Backspace');
		// Assert
		expect(chips()[1].classList).toContain('is-selected');
		expect(control.value).toEqual(['a', 'b']);
		// Act
		press('Backspace');
		// Assert
		expect(control.value).toEqual(['a']);
		expect(host.querySelector('.is-selected')).toBeNull();
	});

	it('should unselect the chip when another key is pressed', () => {
		// Arrange
		setup();
		control.setValue(['a']);
		fixture.detectChanges();
		press('Backspace');
		// Act
		press('Escape');
		press('Backspace');
		// Assert
		expect(control.value).toEqual(['a']);
	});

	it('should skip unkillable chips on Backspace', () => {
		// Arrange
		setup((h) => (h.unkillableValues = ['b']));
		control.setValue(['a', 'b']);
		fixture.detectChanges();
		// Act
		press('Backspace');
		press('Backspace');
		// Assert
		expect(control.value).toEqual(['b']);
	});

	it('should remove a chip with its kill button', () => {
		// Arrange
		setup();
		control.setValue(['a', 'b']);
		fixture.detectChanges();
		// Act
		chips()[0].querySelector<HTMLButtonElement>('.chip-kill')!.click();
		fixture.detectChanges();
		// Assert
		expect(control.value).toEqual(['b']);
	});

	it('should not display a kill button on unkillable chips', () => {
		// Arrange
		setup((h) => (h.unkillableValues = ['b']));
		// Act
		control.setValue(['a', 'b']);
		fixture.detectChanges();
		// Assert
		expect(chips()[0].querySelector('.chip-kill')).not.toBeNull();
		expect(chips()[1].querySelector('.chip-kill')).toBeNull();
	});

	it('should clear every removable chip with the clearer', () => {
		// Arrange
		setup((h) => (h.unkillableValues = ['b']));
		control.setValue(['a', 'b', 'c']);
		fixture.detectChanges();
		// Act
		host.querySelector<HTMLElement>('.chipsField-clear')!.click();
		fixture.detectChanges();
		// Assert
		expect(control.value).toEqual(['b']);
	});

	it('should display the values rejected by the validator as chips in error', () => {
		// Arrange
		setup((h) => (h.chipValidator = (value) => value.includes('@')));
		// Act
		control.setValue(['a@example.com', 'b']);
		fixture.detectChanges();
		// Assert
		expect(chips()[0].classList).not.toContain('palette-critical');
		expect(chips()[1].classList).toContain('palette-critical');
		expect(control.value).toEqual(['a@example.com', 'b']);
	});

	it('should disable the input and hide the kill buttons when the control is disabled', () => {
		// Arrange
		setup();
		control.setValue(['a']);
		// Act
		control.disable();
		fixture.detectChanges();
		// Assert
		expect(inputElement.disabled).toBe(true);
		expect(host.querySelector('.chip-kill')).toBeNull();
		expect(host.querySelector('.chipsField-clear')).toBeNull();
	});

	it('should mark the control as touched on blur', () => {
		// Arrange
		setup();
		// Act
		inputElement.dispatchEvent(new Event('blur'));
		// Assert
		expect(control.touched).toBe(true);
	});
});
