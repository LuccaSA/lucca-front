import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ClearComponent } from '@lucca-front/ng/clear';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuOptionComparer, LuOptionItemComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

const options: Entity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
];

@Component({
	selector: 'lu-select-host',
	imports: [ReactiveFormsModule, LuSelectInputComponent, LuOptionPickerComponent, LuOptionItemComponent, LuInputDisplayerDirective, ClearComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-select [formControl]="formControl" [multiple]="multiple">
			<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
			<lu-option-picker>
				@for (option of options; track option.id) {
					<lu-option [value]="option">{{ option.name }}</lu-option>
				}
			</lu-option-picker>
			<lu-clear />
		</lu-select>
	`,
})
class SelectHostComponent {
	formControl = new FormControl<Entity | Entity[] | null>(null);

	multiple = false;

	options: Entity[] = options;
}

@Component({
	selector: 'lu-select-custom-comparer-host',
	imports: [ReactiveFormsModule, LuSelectInputComponent, LuOptionPickerComponent, LuOptionItemComponent, LuInputDisplayerDirective, ClearComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-select [formControl]="formControl">
			<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
			<lu-option-picker [option-comparer]="comparer">
				@for (option of options; track option.id) {
					<lu-option [value]="option">{{ option.name }}</lu-option>
				}
			</lu-option-picker>
			<lu-clear />
		</lu-select>
	`,
})
class SelectCustomComparerHostComponent {
	formControl = new FormControl<Entity | null>(null);

	options: Entity[] = options;

	comparer: LuOptionComparer<Entity> = (a, b) => a.id === b.id;
}

describe(LuSelectInputComponent.name, () => {
	let fixture: ComponentFixture<SelectHostComponent>;
	let host: SelectHostComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SelectHostComponent, SelectCustomComparerHostComponent],
			providers: [provideNoopAnimations()],
		});

		fixture = TestBed.createComponent(SelectHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	function clearer(): HTMLElement {
		return fixture.nativeElement.querySelector('lu-clear') as HTMLElement;
	}

	it('should clear the value of a single select', () => {
		// Arrange
		host.formControl.setValue(options[0]);
		fixture.detectChanges();

		// Act
		clearer().click();
		fixture.detectChanges();

		// Assert
		expect(host.formControl.value).toBeUndefined();
	});

	it('should clear the value of a multiple select', () => {
		// Arrange
		host.multiple = true;
		host.formControl.setValue([options[0], options[1]]);
		fixture.detectChanges();

		// Act
		clearer().click();
		fixture.detectChanges();

		// Assert
		expect(host.formControl.value).toEqual([]);
	});

	it('should clear the value of a select using a custom option comparer', fakeAsync(() => {
		// Arrange
		const customFixture = TestBed.createComponent(SelectCustomComparerHostComponent);
		const customHost = customFixture.componentInstance;
		customFixture.detectChanges();
		// the picker registers its options asynchronously, and only calls the comparer on registered ones
		tick();
		customHost.formControl.setValue(options[0]);
		customFixture.detectChanges();

		// Act
		(customFixture.nativeElement.querySelector('lu-clear') as HTMLElement).click();
		customFixture.detectChanges();

		// Assert
		expect(customHost.formControl.value).toBeUndefined();
	}));

	it('should not clear the value when disabled', () => {
		// Arrange
		host.formControl.setValue(options[0]);
		host.formControl.disable();
		fixture.detectChanges();

		// Act
		clearer().click();
		fixture.detectChanges();

		// Assert
		expect(host.formControl.value).toBe(options[0]);
	});
});
