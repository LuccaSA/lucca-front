import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectOption} from '../option/select-option.component';
import {LuSelectPicker} from '../picker/select-picker.component';
import {LuSelectDirective} from './select.directive';
import { Component} from '@angular/core';
import { escapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import { FormsModule } from '@angular/forms';
import {LuSelectModule} from '../select.module';
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
	template: `<div [luSelect]="pickerRef"
	></div>
	<lu-select-picker #pickerRef>
		<lu-select-option *ngFor="let option of options" [luOptionValue]="option">{{option.name}}</lu-select-option>
	</lu-select-picker>`,
})
export class WrapperSelectDirective {
	options = globalOptions;
}

describe('LuSelectDirective', () => {


		beforeEach(() => {
			TestBed.configureTestingModule({
			providers: [
				OVERLAY_PROVIDERS,
				ScrollStrategyOptions,
				ScrollDispatcher,
				Platform,
			],
			declarations: [
				LuSelectPicker,
				LuSelectOption,
				LuSelectDirective,
				WrapperSelectDirective,
			],
			imports: [
				FormsModule,
			]
			}).compileComponents();

				this.fixture = TestBed.createComponent(WrapperSelectDirective);
				this.fixture.detectChanges();
				this.wrapper  = this.fixture.debugElement.query(By.directive(LuSelectDirective));
				this.luSelect = this.wrapper.injector.get(LuSelectDirective) as LuSelectDirective;
		});

		it('It should reference the correct picker', () => {

			// Arrange
			const picker: LuSelectPicker<any>  = this.fixture.debugElement.query(By.directive(LuSelectPicker)).componentInstance;

			this.fixture.whenStable().then(() => {
				// Act
				this.fixture.detectChanges();

				// Assert
				expect(this.luSelect.popover).not.toBeNull();
			});

		});

});
