import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectOption} from './select.option.component';
import {LuSelectDirective} from './select.directive';
import {LuSelectPopover} from './select.popover.component';
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
				LuSelectPopover,
				LuSelect,
				//WrapperSelect,
			],
			imports: [
				FormsModule,
			]
			}).compileComponents();
		});

		it('It should contain the right clearable value input', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelect);
			fixture.detectChanges();
			const luSelect  = fixture.componentInstance;

			// Act
			luSelect.clearable = true;
			fixture.detectChanges();

			// Assert
			expect(luSelect.clearable).toBe(true);

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
				declarations: [LuSelect, WrapperSelect, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;

			// Act
			fixture.detectChanges();

			// Assert
			expect(luSelect.luOptions).not.toBeNull();
			expect(luSelect.luOptions.toArray().length).toBe(globalOptions.length);
		});

		it('It should reference has the right value', () => {

			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption]
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
			TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;
			fixture.detectChanges();

			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();

				// Assert
				expect(luSelect.clearable).toBe(false);
			});
		});

		it('It should allow empty value if clearable', () => {
			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;
			fixture.detectChanges();


			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				luSelect.clearable = true;
				luSelect.value = null;
				fixture.detectChanges();

				// Assert
				expect(luSelect.value).toBeNull();
			});
	});

	it('It should not allow empty value if not clearable', () => {
		// Arrange
		TestBed.configureTestingModule({
				declarations: [LuSelect, WrapperSelect, LuSelectOption]
			});
			const fixture = TestBed.createComponent(WrapperSelect);
			const wrapper = fixture.componentInstance;
			const luSelect: LuSelect<any> = fixture.debugElement.query(By.directive(LuSelect)).componentInstance;
			fixture.detectChanges();


			fixture.whenStable().then(() => {
				// Act
				fixture.detectChanges();
				luSelect.value = null;
				fixture.detectChanges();

				// Assert
				expect(luSelect.value).toBe(globalOptions[0]);
			});
		});

});
