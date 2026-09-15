import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isNotNil } from '@lucca-front/ng/core';
import { vi } from 'vitest';
import { TestEntity, runALuSelectInputComponentTestSuite } from '../../core-select/input/select-input.component.spec';
import { LuSimpleSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

const options: TestEntity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
	{ id: 3, name: 'test 3' },
];

@Component({
	selector: 'lu-simple-select-ng-model-host',
	imports: [FormsModule, LuSimpleSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-simple-select [ngModel]="selected" (ngModelChange)="setSelected($event)" [options]="options" clearable /> `,
})
class SimpleSelectNgModelHostComponent {
	selected: TestEntity | null = null;

	options: TestEntity[] = options;

	setSelected(value: TestEntity | null): void {
		this.selected = value;
	}
}

@Component({
	selector: 'lu-simple-select-form-control-host',
	imports: [ReactiveFormsModule, LuSimpleSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-simple-select [formControl]="formControl" [options]="options" clearable /> `,
})
class SimpleSelectFormControlHostComponent {
	formControl = new FormControl<TestEntity | null>(null);

	options: TestEntity[] = options;
}

describe('LuSimpleSelectInputComponent', () => {
	let fixture: ComponentFixture<LuSimpleSelectInputComponent<Entity>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuSimpleSelectInputComponent, SimpleSelectNgModelHostComponent, SimpleSelectFormControlHostComponent],
		});

		fixture = TestBed.createComponent<LuSimpleSelectInputComponent<Entity>>(LuSimpleSelectInputComponent);
		fixture.detectChanges();
	});

	runALuSelectInputComponentTestSuite<Entity>({
		getFixture: () => fixture,
		exampleValue: { id: 1, name: 'test' },
		emptyValue: null,
		clearerSelector: '.simpleSelect-field-clear',
	});

	function nativeElement(): HTMLElement {
		return fixture.nativeElement as HTMLElement;
	}

	function displayedValue(): string {
		fixture.detectChanges();
		return nativeElement().querySelector('.simpleSelect-field-value')?.textContent?.trim() ?? '';
	}

	function clearer(): HTMLElement | null {
		fixture.detectChanges();
		return nativeElement().querySelector<HTMLElement>('.simpleSelect-field-clear');
	}

	describe('selected value display', () => {
		it('should display nothing when there is no value', () => {
			// Assert
			expect(displayedValue()).toBe('');
		});

		it('should display the name of the selected option', () => {
			// Act
			fixture.componentInstance.writeValue(options[1]);

			// Assert
			expect(displayedValue()).toBe('test 2');
		});

		it('should display the configured placeholder while there is no value', () => {
			// Arrange
			const input = nativeElement().querySelector('input') as HTMLInputElement;

			// Act
			fixture.componentRef.setInput('placeholder', 'Pick one');
			fixture.detectChanges();

			// Assert
			expect(input.getAttribute('placeholder')).toBe('Pick one');
		});

		it('should fall back to the translated placeholder once a value is set', () => {
			// Arrange
			const input = nativeElement().querySelector('input') as HTMLInputElement;
			fixture.componentRef.setInput('placeholder', 'Pick one');
			fixture.detectChanges();

			// Act
			fixture.componentInstance.writeValue(options[0]);
			fixture.detectChanges();

			// Assert
			expect(input.getAttribute('placeholder')).toBe(fixture.componentInstance.intl().placeholder);
		});

		it('should update the display when the value changes', () => {
			// Arrange
			fixture.componentInstance.writeValue(options[0]);
			expect(displayedValue()).toBe('test 1');

			// Act
			fixture.componentInstance.writeValue(options[2]);

			// Assert
			expect(displayedValue()).toBe('test 3');
		});
	});

	describe('value emission', () => {
		it('should emit the option picked in the panel', async () => {
			// Arrange
			const onChange = vi.fn();
			const component = fixture.componentInstance;
			component.registerOnChange(onChange);
			fixture.componentRef.setInput('options', options);
			component.openPanel();
			await waitForPanel(component);

			// Act
			component.panelRef?.emitValue(options[1]);

			// Assert
			expect(onChange).toHaveBeenCalledExactlyOnceWith(options[1]);
			expect(component.value).toEqual(options[1]);
		});

		it('should replace the previous value when another option is picked', async () => {
			// Arrange
			const onChange = vi.fn();
			const component = fixture.componentInstance;
			component.registerOnChange(onChange);
			fixture.componentRef.setInput('options', options);
			component.writeValue(options[0]);

			// Act
			component.openPanel();
			await waitForPanel(component);
			component.panelRef?.emitValue(options[2]);

			// Assert
			expect(onChange).toHaveBeenCalledExactlyOnceWith(options[2]);
			expect(component.value).toEqual(options[2]);
		});

		it('should not emit a value when the parent writes one (with NgModel)', () => {
			// Arrange
			const hostFixture = TestBed.createComponent(SimpleSelectNgModelHostComponent);
			const hostComponent = hostFixture.componentInstance;
			vi.spyOn(hostComponent, 'setSelected');

			// Act
			hostComponent.selected = options[0];
			hostFixture.detectChanges();

			// Assert
			expect(hostComponent.setSelected).not.toHaveBeenCalled();
		});

		it('should not emit a value when the parent writes one (with FormControl)', () => {
			// Arrange
			const hostFixture = TestBed.createComponent(SimpleSelectFormControlHostComponent);
			hostFixture.detectChanges();
			const valueChanges = vi.fn();
			hostFixture.componentInstance.formControl.valueChanges.subscribe(valueChanges);

			// Act
			hostFixture.componentInstance.formControl.setValue(options[0], { emitEvent: false });
			hostFixture.detectChanges();

			// Assert
			expect(valueChanges).not.toHaveBeenCalled();
		});
	});

	describe('clearable', () => {
		it('should not display the clearer when the select is not clearable', () => {
			// Act
			fixture.componentInstance.writeValue(options[0]);

			// Assert
			expect(clearer()).toBeNull();
		});

		it('should not display the clearer when there is no value', () => {
			// Act
			fixture.componentRef.setInput('clearable', true);

			// Assert
			expect(clearer()).toBeNull();
		});

		it('should display the clearer when the select is clearable and has a value', () => {
			// Act
			fixture.componentRef.setInput('clearable', true);
			fixture.componentInstance.writeValue(options[0]);

			// Assert
			expect(clearer()).not.toBeNull();
		});

		it('should emit null and reset the display when clearing', () => {
			// Arrange
			const onChange = vi.fn();
			fixture.componentInstance.registerOnChange(onChange);
			fixture.componentRef.setInput('clearable', true);
			fixture.componentInstance.writeValue(options[0]);

			// Act
			clearer()?.click();

			// Assert
			expect(onChange).toHaveBeenCalledExactlyOnceWith(null);
			expect(displayedValue()).toBe('');
		});
	});

	describe('disabled', () => {
		it('should disable the input when disabled', async () => {
			// Act
			fixture.componentInstance.setDisabledState(true);
			fixture.detectChanges();
			// The disabled binding goes through NgModel, which applies it asynchronously
			await fixture.whenStable();

			// Assert
			expect((nativeElement().querySelector('input') as HTMLInputElement).disabled).toBe(true);
		});

		it('should not open the panel when disabled', () => {
			// Arrange
			fixture.componentInstance.setDisabledState(true);
			fixture.detectChanges();

			// Act
			fixture.componentInstance.openPanel();

			// Assert
			expect(fixture.componentInstance.isPanelOpen).toBe(false);
		});

		it('should hide the clearer when disabled', () => {
			// Arrange
			fixture.componentRef.setInput('clearable', true);
			fixture.componentInstance.writeValue(options[0]);
			expect(clearer()).not.toBeNull();

			// Act
			fixture.componentInstance.setDisabledState(true);

			// Assert
			expect(clearer()).toBeNull();
		});
	});
});

// openPanel() defers panel creation via setTimeout, wait until panelRef is set
function waitForPanel(componentInstance: LuSimpleSelectInputComponent<Entity>) {
	return vi.waitUntil(() => isNotNil(componentInstance.panelRef));
}
