import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectOption, LuSelectOptionSelectionChange} from '../option';
import {LuSelectPicker} from './select-picker.component';
import { Component} from '@angular/core';

const globalOptions = [{
	id: 'id1',
	name: 'Hello Option 1'
}, {
	id: 'id2',
	name: 'Hello Option 2'
}, {
	id: 'id3',
	name: 'Hello Option 3'
}, {
	id: 'id4',
	name: 'Hello Option 4'
}, {
	id: 'id5',
	name: 'Hello Option 5'
}];

@Component({
	template: `<lu-select-picker>
		<lu-select-option *ngFor="let option of options" [luOptionValue]="option">{{option.name}}</lu-select-option>
	</lu-select-picker>`,
})
export class WrapperPickerElementComponent {
	options = globalOptions;
}


describe('LuSelectPicker', () => {

		beforeEach(async() => TestBed.configureTestingModule({
			providers: [],
			imports: []
		}).compileComponents());

		it('It should have an empty array of options', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker]
			});
			const fixture = TestBed.createComponent(LuSelectPicker);
			const picker = fixture.componentInstance;

			// Act
			fixture.detectChanges();

			// Assert
			expect(picker.luOptions$).not.toBeNull();
			expect(picker.luOptions$.value.length).toBe(0);
		});

		it('It should reflect the options number', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			// Act
			fixture.detectChanges();

			// Assert
			expect(picker.luOptions$).not.toBeNull();
			expect(picker.luOptions$.value.length).toBe(globalOptions.length);
		});

		it('It should find the correct option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			// Act
			fixture.detectChanges();
			picker.find(globalOptions[0]).subscribe((luOption) => {
				// Assert
				expect(luOption).not.toBeNull();
				expect(luOption.luOptionValue).toBe(globalOptions[0]);
			});
		});

		it('It should generate an error if there is no option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			// Act
			fixture.detectChanges();
			picker.find({})
			.subscribe((luOption) => {
				// Assert
				expect(luOption).toBeUndefined();
			});
		});

		it('It should highlight the right option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			// Act
			fixture.detectChanges();
			picker.search(globalOptions[1].name);
			fixture.detectChanges();

			// Assert
			expect(picker.luOptions$.value[1].focused).toBe(true);

		});

		it('It select the right option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			// Act
			fixture.detectChanges();
			picker.selectOption(globalOptions[1]);
			fixture.detectChanges();

			// Assert
			expect(picker.luOptions$.value[1].focused).toBe(true);

		});

		it('It should emit an event when an option is selected', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;
			spyOn(picker.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			picker.selectOption(globalOptions[1]);
			fixture.detectChanges();

			// Assert
			expect(picker.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should emit an event when an option is selected with the correct value', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;
			let selectionEmit = false;

			// Act
			fixture.detectChanges();
			picker.itemSelected.subscribe((luOption) => {
				expect(luOption).not.toBeNull('The event `value` is not null');
				expect(luOption.luOptionValue).toBe(globalOptions[1], 'The output value emit is not right');
				selectionEmit = true;
			});
			picker.selectOption(globalOptions[1]);
			fixture.detectChanges();

			// Assert
			expect(selectionEmit).toBeTruthy('The selection event was not fired');

		});

		it('It should emit an event when enter key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;
			spyOn(picker.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			picker.onEnterKeydown();
			fixture.detectChanges();

			// Assert
			expect(picker.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should emit an event when down key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;
			spyOn(picker.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			picker.onDownKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(picker.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should change the highlight item when down key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				picker.selectOption(globalOptions[2]);
				fixture.detectChanges();
				picker.onDownKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(picker.luOptions$.value[2].focused).toBe(false);
				expect(picker.luOptions$.value[3].focused).toBe(true);
			});

		});

		it('It should emit an event when up key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;
			spyOn(picker.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			picker.onUpKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(picker.itemSelected.emit).toHaveBeenCalled();
		});

		it('It should change the highlight item when up key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				picker.selectOption(globalOptions[2]);
				picker.onUpKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(picker.luOptions$.value[1].focused).toBe(true);
				expect(picker.luOptions$.value[2].focused).toBe(false);
			});

		});

		it('It should emit an event when home key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;
			spyOn(picker.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			picker.onHomeKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(picker.itemSelected.emit).toHaveBeenCalled();
		});

		it('It should change the highlight item when home key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				picker.selectOption(globalOptions[2]);
				picker.onHomeKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(picker.luOptions$.value[0].focused).toBe(true);
				expect(picker.luOptions$.value[2].focused).toBe(false);
			});
		});

		it('It should emit an event when End key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;
			spyOn(picker.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			picker.onEndKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(picker.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should change the highlight item when end key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPicker, WrapperPickerElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPickerElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const picker: LuSelectPicker<any> = fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				picker.selectOption(globalOptions[2]);
				picker.onEndKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(picker.luOptions$.value[2].focused).toBe(false);
				expect(picker.luOptions$.value[4].focused).toBe(true);
			});

		});

});
