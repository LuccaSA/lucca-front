import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuSelectOption } from './select-option.component';
import { LuSelectOptionSelectionChange } from './select-option.event';
import { Component } from '@angular/core';

@Component({
	template: `<lu-select-option>
		<span>Hello Test</span>
	</lu-select-option>`,
})
export class WrapperOptionElementComponent {}

describe('LuSelectOption', () => {
	beforeEach(async () =>
		TestBed.configureTestingModule({
			providers: [],
			imports: [],
		}).compileComponents(),
	);

	it('It should be not focused at the initialization', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act

		// Assert
		expect(option.focused).toBe(false);
	});

	it('It should be not select at the initialization', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act

		// Assert
		expect(option.selected).toBe(false);
	});

	it('It should be focus', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act
		option.focus();

		// Assert
		expect(option.focused).toBe(true);
	});

	it('It should be unfocus', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act
		option.unfocus();

		// Assert
		expect(option.focused).toBe(false);
	});

	it('It should be select', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act
		option.select();

		// Assert
		expect(option.selected).toBe(true);
	});

	it('It should be unselected', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act
		option.unselect();

		// Assert
		expect(option.selected).toBe(false);
	});

	it('The text is correct', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act
		option.unselect();

		// Assert
		expect(option.selected).toBe(false);
	});

	it('It should show the correct text', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption, WrapperOptionElementComponent],
		});
		const fixture = TestBed.createComponent(WrapperOptionElementComponent);
		const wrapper = fixture.componentInstance;
		fixture.detectChanges();
		const option: LuSelectOption<any> = fixture.debugElement.query(
			By.directive(LuSelectOption),
		).componentInstance;

		// Act

		// Assert
		expect(option.viewValue).toBe('Hello Test');
	});

	it('Label should show the correct text', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption, WrapperOptionElementComponent],
		});
		const fixture = TestBed.createComponent(WrapperOptionElementComponent);
		const wrapper = fixture.componentInstance;
		fixture.detectChanges();
		const option: LuSelectOption<any> = fixture.debugElement.query(
			By.directive(LuSelectOption),
		).componentInstance;

		// Act

		// Assert
		expect(option.getLabel()).toBe('Hello Test');
	});

	it('It should have the correct input', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act
		const modelTemp = { id: 'id', name: 'hello test' };
		option.luOptionValue = modelTemp;
		fixture.detectChanges();

		// Assert
		expect(JSON.stringify(option.luOptionValue)).toBe(
			JSON.stringify(modelTemp),
		);
	});

	it('It should emit an event on click', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;
		fixture.detectChanges();

		// Act
		// Set the model
		const modelTemp = { id: 'id', name: 'hello test' };
		option.luOptionValue = modelTemp;
		// Wait for the call
		spyOn(option.onSelectionChange, 'emit');
		// Click on the item
		const li = fixture.nativeElement.querySelector('li');
		li.dispatchEvent(new Event('click'));
		// Trigger the event
		fixture.detectChanges();

		// Assert
		expect(option.onSelectionChange.emit).toHaveBeenCalled();
	});

	it('It should emit an event on click with the correct value', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;
		fixture.detectChanges();
		let liClickedCalled = false;
		const event = new LuSelectOptionSelectionChange(option, true);
		// Set the model
		const modelTemp = { id: 'id', name: 'hello test' };

		// Act
		option.luOptionValue = modelTemp;
		// Wait for the call
		const observableEvent = option.onSelectionChange;
		// Click on the item
		const li = fixture.nativeElement.querySelector('li');
		observableEvent.subscribe((value: LuSelectOptionSelectionChange<any>) => {
			expect(value).not.toBeNull('The event `value` is not null');
			expect(value.source.luOptionValue).toBe(
				modelTemp,
				'The output should emit the `value` on a click',
			);
			liClickedCalled = true;
		});
		// Trigger the event
		fixture.detectChanges();
		li.dispatchEvent(new Event('click'));

		// Assert
		expect(liClickedCalled).toBeTruthy(
			'You may have forgot the click handler on the `li` element',
		);
	});

	it('It should be displayable at the initialisation', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act

		// Assert
		expect(option.displayed).toBe(true);
	});

	it('It should be not display', () => {
		// Arrange
		TestBed.configureTestingModule({
			declarations: [LuSelectOption],
		});
		const fixture = TestBed.createComponent(LuSelectOption);
		const option = fixture.componentInstance;

		// Act
		option.displayed = false;
		fixture.detectChanges();

		// Assert
		expect(option.displayed).toBe(false);
	});
});
