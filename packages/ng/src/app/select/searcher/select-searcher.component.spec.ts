import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectOption} from '../option/select-option.component';
import {ISelectSearcher} from './select-searcher.model';
import {LuSelectSearcherComponent} from './select-searcher.component';
import {LuSelectSearchIntl} from '../utils';
import { FormsModule } from '@angular/forms';
import {Platform} from '@angular/cdk/platform';
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
	template: `	<lu-select-searcher luOptionFeeder="true">
				<lu-select-option *ngFor="let option of options" [luOptionValue]="option">{{option.name}}</lu-select-option>
			</lu-select-searcher>`,
})
export class WrapperSearcherElementComponent {
	options = globalOptions;
}

describe('LuSelectSearcher', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [
			Platform,
			LuSelectSearchIntl
		],
		declarations: [
			LuSelectOption,
			LuSelectSearcherComponent,
		],
		imports: [
			FormsModule,
		]
		}).compileComponents();
	});

		it('It should be not focused at the initialization', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectSearcherComponent]
			});
			const fixture = TestBed.createComponent(LuSelectSearcherComponent);
			const searcher = fixture.componentInstance;

			// Act

			// Assert
			expect(searcher.focused).toBe(false);
		});

		it('It should be focused when we click on it', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectSearcherComponent]
			});
			const fixture = TestBed.createComponent(LuSelectSearcherComponent);
			const searcher = fixture.componentInstance;
			fixture.detectChanges();

			// Act
				// Act
			// Click on the item
			const input = fixture.nativeElement.querySelector('input');
			input.dispatchEvent(new Event('mousedown'));
			// Trigger the event
			fixture.detectChanges();

			// Assert
			expect(searcher.focused).toBe(true);
		});

		it('It should be not focused when we leave the field', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectSearcherComponent]
			});
			const fixture = TestBed.createComponent(LuSelectSearcherComponent);
			const searcher = fixture.componentInstance;
			fixture.detectChanges();

			// Act
			// Click on the item
			const input = fixture.nativeElement.querySelector('input');
			input.dispatchEvent(new Event('mousedown'));
			// Trigger the event
			fixture.detectChanges();
			input.dispatchEvent(new Event('blur'));
			// Trigger the event
			fixture.detectChanges();

			// Assert
			expect(searcher.focused).toBe(false);
		});

		it('It should filter the options', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectOption, LuSelectSearcherComponent, WrapperSearcherElementComponent]
			});
			const fixture = TestBed.createComponent(WrapperSearcherElementComponent);
			const wrapper = fixture.componentInstance;
			fixture.detectChanges();
			const searcher: LuSelectSearcherComponent<any> = fixture.debugElement.query(By.directive(LuSelectSearcherComponent)).componentInstance;
			fixture.detectChanges();

			// Act
			fixture.whenStable().then(() => {
				const filteredOptions = searcher.filter(globalOptions[0].name, searcher.luOptions.toArray());

				// Assert
				expect(filteredOptions.length).toBe(1);
			});
		});

		it('It should filter the options (displayed)', fakeAsync(() => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectOption, LuSelectSearcherComponent, WrapperSearcherElementComponent]
			});
			const fixture = TestBed.createComponent(WrapperSearcherElementComponent);
			const wrapper = fixture.componentInstance;
			fixture.detectChanges();
			const searcher: LuSelectSearcherComponent<any> = fixture.debugElement.query(By.directive(LuSelectSearcherComponent)).componentInstance;


			// Act
			fixture.whenStable().then(() => {
				// Type text in input
				const input = fixture.nativeElement.querySelector('input');
				input.value = globalOptions[0].name;
				input.dispatchEvent(new Event('input'));
				// Trigger the event
				fixture.detectChanges();
				tick(200); // debounce time
				const filterArray = searcher.luOptions.toArray().filter(option => option.displayed);

				// Assert
				expect(filterArray.length).toBe(1);
			});
		}));

});
