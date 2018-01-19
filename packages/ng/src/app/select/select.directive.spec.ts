import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectOption} from './select.option.component';
import {LuSelectPopover} from './select.popover.component';
import {LuSelectDirective} from './select.directive';
import { Component} from '@angular/core';
import { WrapperPopoverElementComponent } from './select.popover.component.spec';
import { escapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import { FormsModule } from '@angular/forms';
import {LuSelectModule} from './select.module';
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
	template: `<div [luSelect]="popoverRef"
			[(ngModel)]="item"
	></div>
	<lu-select-popover #popoverRef>
		<lu-select-option *ngFor="let option of options" [value]="option">{{option.name}}</lu-select-option>
	</lu-select-popover>`,
})
export class WrapperSelectDirective {
	options = globalOptions;
	item = globalOptions[0];
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
				LuSelectPopover,
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
				this.luSelect = this.wrapper.injector.get(LuSelectDirective) as LuSelectDirective<any>;
		});

		it('It should reference the correct popover', () => {

			// Arrange
			const popover: LuSelectPopover<any>  = this.fixture.debugElement.query(By.directive(LuSelectPopover)).componentInstance;

			// Act
			this.fixture.detectChanges();

			// Assert
			expect(this.luSelect.popover).not.toBeNull();
			expect(this.luSelect.popover.luOptions$.value).not.toBeNull();
			expect(this.luSelect.popover.luOptions$.value.length).toBe(globalOptions.length);


		});

		it('It should reference has the right value', () => {

			// Arrange
			this.fixture.whenStable().then(() => {
				// Act
				this.fixture.detectChanges();

				// Assert
				expect(this.luSelect.value).toBe(globalOptions[0]);
			});

		});

		it('It should display the right text', () => {

			// Arrange
			const divDirective = this.fixture.debugElement.query(By.css('div'));

			this.fixture.whenStable().then(() => {
				// Act
				this.fixture.detectChanges();
				const viewValue = this.luSelect.popover.luOptions$.value[0].viewValue;

				// Assert
				expect(divDirective.nativeElement.textContent).toBe(viewValue);
			});

		});

		it('It should not be clearable by default', () => {
			// Arrange
			this.fixture.whenStable().then(() => {
				// Act
				this.fixture.detectChanges();

				// Assert
				expect(this.luSelect.clearable).toBe(false);
			});
		});

		it('It should allow empty value if clearable', () => {
				// Arrange

				this.fixture.whenStable().then(() => {
					// Act
					this.fixture.detectChanges();
					this.luSelect.clearable = true;
					this.luSelect.value = null;
					this.fixture.detectChanges();

					// Assert
					expect(this.luSelect.value).toBeUndefined();
				});
		});

		it('It should not allow empty value if not clearable', () => {
			// Arrange

			this.fixture.whenStable().then(() => {
				// Act
				this.fixture.detectChanges();
				this.luSelect.value = null;
				this.fixture.detectChanges();

				// Assert
				expect(this.luSelect.value).toBe(globalOptions[0]);
			});
		});

		it('It should emit an event when we can clear the value', () => {
			// Arrange
			spyOn(this.luSelect.canremove, 'emit');

			this.fixture.whenStable().then(() => {
				// Act
				this.fixture.detectChanges();
				this.luSelect.clearable = true;
				this.luSelect.value = null;
				this.fixture.detectChanges();

				// Assert
				expect(this.luSelect.canremove.emit).toHaveBeenCalled();
			});
		});

});
