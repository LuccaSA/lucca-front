import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectOption} from './option/select-option.component';
import {LuSelectClearerFirstOrDefaultComponent} from './clearer';
import {LuSelectDirective} from './directive/select.directive';
import {LuSelectPicker} from './picker/select-picker.component';
import {LuSelect} from './select.component';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { escapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import {OVERLAY_PROVIDERS, ScrollStrategyOptions, ScrollDispatcher} from '@angular/cdk/overlay';
import {Platform} from '@angular/cdk/platform';

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
	template: `<lu-select [(ngModel)]="item">
		<lu-select-option *ngFor="let option of options" [value]="option">{{option.name}}</lu-select-option>
		<lu-select-clearer-first [options]="options"></lu-select-clearer-first>
	</lu-select>
	`,
})
export class WrapperSelect {
	options = globalOptions;
	item = globalOptions[0];
}

describe('LuSelect', () => {


		beforeEach(() => {
			TestBed.configureTestingModule({
			providers: [
				OVERLAY_PROVIDERS,
				ScrollStrategyOptions,
				ScrollDispatcher,
				Platform,
			],
			declarations: [
				LuSelectOption,
				LuSelectDirective,
				LuSelectPicker,
				LuSelect,
				//WrapperSelect,
			],
			imports: [
				FormsModule,
			]
			}).compileComponents();
		});

		it('It should reference the right clearer', () => {

			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption, LuSelectClearerFirstOrDefaultComponent]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;
			const luClearer: LuSelectClearerFirstOrDefaultComponent<any> =
				fixture.debugElement.query(By.directive(LuSelectClearerFirstOrDefaultComponent)).componentInstance;
			fixture.detectChanges();

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();

				// Assert
				expect(luSelect.clearer).toBe(luClearer);
			});

		});

		it('It should contain the right mod value input', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelect);
			fixture.detectChanges();
			const luSelect  = fixture.componentInstance;

			// Act
			luSelect.mod = 'mod-material';
			fixture.detectChanges();

			// Assert
			expect(luSelect.mod).toBe('mod-material');

		});

		it('It should set the right value', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelect);
			fixture.detectChanges();
			const luSelect  = fixture.componentInstance;

			// Act
			luSelect.value = globalOptions[0];
			fixture.detectChanges();

			// Assert
			expect(luSelect.value).toBe(globalOptions[0]);

		});

		it('It should contain the right placeholder value input', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelect);
			fixture.detectChanges();
			const luSelect  = fixture.componentInstance;

			// Act
			luSelect.placeholder = 'a label';
			fixture.detectChanges();

			// Assert
			expect(luSelect.placeholder).toBe('a label');

		});

		it('It should reflect the options number', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption, LuSelectClearerFirstOrDefaultComponent]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;
			fixture.detectChanges();

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();

				// Assert
				expect(luSelect.luOptions).not.toBeNull();
				expect(luSelect.luOptions.length).toBe(globalOptions.length);
			});
		});

		it('It should reference has the right value', () => {

			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption, LuSelectClearerFirstOrDefaultComponent]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;
			fixture.detectChanges();

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();

				// Assert
				expect(luSelect.value).toBe(globalOptions[0]);
			});

		});


		it('It should not be clearable by default', () => {
				// Arrange
				const fixture = TestBed.createComponent(LuSelect);
				fixture.detectChanges();
				const luSelect  = fixture.componentInstance;

				// Act
				luSelect.value = null;
				fixture.detectChanges();

				// Assert
				expect(luSelect.clearer).toBeUndefined();
		});

		it('It should not be clearable by key "del" or "backspace" if no clearer is set', () => {
			// Arrange
			const fixture = TestBed.createComponent(LuSelect);
			fixture.detectChanges();
			const luSelect  = fixture.componentInstance;

			// Act
			luSelect.value = globalOptions[0];
			fixture.detectChanges();
			const luSelectElement = fixture.nativeElement;
			const keyDownEvent = new Event('keydown');
			(<any>keyDownEvent).key = 'Delete';
			luSelectElement.dispatchEvent(keyDownEvent);
			// Trigger the event
			fixture.detectChanges();

			// Assert
			expect(luSelect.value).toBe(globalOptions[0]);
	});

		it('It should take the empty value of clearer if clearable', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption, LuSelectClearerFirstOrDefaultComponent]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;
			const luSelectClearer: LuSelectClearerFirstOrDefaultComponent<any> =
				fixture.debugElement.query(By.directive(LuSelectClearerFirstOrDefaultComponent)).componentInstance;
			fixture.detectChanges();


			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				luSelect.value = null;
				fixture.detectChanges();

				// Assert
				expect(luSelect.value).toBe(luSelectClearer.clearValue());
			});
	});

	it('It should not allow empty value if not clearable', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelect);
			fixture.detectChanges();
			const luSelect  = fixture.componentInstance;

			// Act
			luSelect.value = globalOptions[0];
			fixture.detectChanges();
			luSelect.value = null;
			fixture.detectChanges();

			// Assert
			expect(luSelect.value).toBe(globalOptions[0]);

		});

});
