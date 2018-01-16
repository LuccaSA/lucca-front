import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectOption, LuSelectOptionSelectionChange} from './select.option.component';
import {LuSelectPopover} from './select.popover.component';
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
	template: `<lu-select-popover>
		<lu-select-option *ngFor="let option of options" [value]="option">{{option.name}}</lu-select-option>
	</lu-select-popover>`,
})
export class WrapperPopoverElementComponent {
	options = globalOptions;
}


describe('LuSelectPopover', () => {

		beforeEach(async() => TestBed.configureTestingModule({
			providers: [],
			imports: []
		}).compileComponents());

		it('It should have an empty array of options', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover]
			});
			const fixture = TestBed.createComponent(LuSelectPopover);
			const popover = fixture.componentInstance;

			// Act
			fixture.detectChanges();

			// Assert
			expect(popover.luOptions$).not.toBeNull();
			expect(popover.luOptions$.value.length).toBe(0);
		});

		it('It should reflect the options number', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			// Act
			fixture.detectChanges();

			// Assert
			expect(popover.luOptions$).not.toBeNull();
			expect(popover.luOptions$.value.length).toBe(globalOptions.length);
		});

		it('It should find the correct option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			// Act
			fixture.detectChanges();
			popover.find(globalOptions[0]).subscribe((luOption) => {
				// Assert
				expect(luOption).not.toBeNull();
				expect(luOption.value).toBe(globalOptions[0]);
			});
		});

		it('It should generate an error if there is no option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			// Act
			fixture.detectChanges();
			popover.find({})
			.subscribe((luOption) => {
				// Assert
				expect(luOption).toBeUndefined();
			});
		});

		it('It should highlight the right option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			// Act
			fixture.detectChanges();
			popover.search(globalOptions[1].name);
			fixture.detectChanges();

			// Assert
			expect(popover.luOptions$.value[1].focused).toBe(true);

		});

		it('It select the right option', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			// Act
			fixture.detectChanges();
			popover.selectOption(globalOptions[1]);
			fixture.detectChanges();

			// Assert
			expect(popover.luOptions$.value[1].focused).toBe(true);

		});

		it('It should emit an event when an option is selected', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;
			spyOn(popover.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			popover.selectOption(globalOptions[1]);
			fixture.detectChanges();

			// Assert
			expect(popover.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should emit an event when an option is selected with the correct value', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;
			let selectionEmit = false;

			// Act
			fixture.detectChanges();
			popover.itemSelected.subscribe((luOption) => {
				expect(luOption).not.toBeNull('The event `value` is not null');
				expect(luOption.value).toBe(globalOptions[1], 'The output value emit is not right');
				selectionEmit = true;
			});
			popover.selectOption(globalOptions[1]);
			fixture.detectChanges();

			// Assert
			expect(selectionEmit).toBeTruthy('The selection event was not fired');

		});

		it('It should emit an event when enter key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;
			spyOn(popover.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			popover.onEnterKeydown();
			fixture.detectChanges();

			// Assert
			expect(popover.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should emit an event when down key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;
			spyOn(popover.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			popover.onDownKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(popover.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should change the highlight item when down key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				popover.selectOption(globalOptions[2]);
				fixture.detectChanges();
				popover.onDownKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(popover.luOptions$.value[2].focused).toBe(false);
				expect(popover.luOptions$.value[3].focused).toBe(true);
			});

		});

		it('It should emit an event when up key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;
			spyOn(popover.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			popover.onUpKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(popover.itemSelected.emit).toHaveBeenCalled();
		});

		it('It should change the highlight item when up key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				popover.selectOption(globalOptions[2]);
				popover.onUpKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(popover.luOptions$.value[1].focused).toBe(true);
				expect(popover.luOptions$.value[2].focused).toBe(false);
			});

		});

		it('It should emit an event when home key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;
			spyOn(popover.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			popover.onHomeKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(popover.itemSelected.emit).toHaveBeenCalled();
		});

		it('It should change the highlight item when home key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				popover.selectOption(globalOptions[2]);
				popover.onHomeKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(popover.luOptions$.value[0].focused).toBe(true);
				expect(popover.luOptions$.value[2].focused).toBe(false);
			});
		});

		it('It should emit an event when End key is hit ', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;
			spyOn(popover.itemSelected, 'emit');

			// Act
			fixture.detectChanges();
			popover.onEndKeydown(false);
			fixture.detectChanges();

			// Assert
			expect(popover.itemSelected.emit).toHaveBeenCalled();

		});

		it('It should change the highlight item when end key is hit ', async() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectPopover, WrapperPopoverElementComponent, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperPopoverElementComponent);
			fixture.detectChanges();
			const wrapper = fixture.componentInstance;
			const popover: LuSelectPopover<any> = fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				popover.selectOption(globalOptions[2]);
				popover.onEndKeydown(true);
				fixture.detectChanges();

				// Assert
				expect(popover.luOptions$.value[2].focused).toBe(false);
				expect(popover.luOptions$.value[4].focused).toBe(true);
			});

		});

});
