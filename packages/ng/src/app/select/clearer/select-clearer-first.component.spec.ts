import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectClearerFirstOrDefaultComponent} from './select-clearer-first.component';
import { Component} from '@angular/core';
import { escapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
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
	template: `<lu-select-clearer-first [options]="options"></lu-select-clearer-first>
	`,
})
export class WrapperSelectClearFirst {
	options = globalOptions;
}

describe('LuSelectClearer', () => {


		beforeEach(() => {
			TestBed.configureTestingModule({
			providers: [
				Platform,
			],
			declarations: [
				LuSelectClearerFirstOrDefaultComponent,
			],
			imports: [
			]
			}).compileComponents();
		});

		it('It should return first value of options as clearValue', () => {

			// Arrange
			TestBed.configureTestingModule({
				declarations: [LuSelectClearerFirstOrDefaultComponent, WrapperSelectClearFirst]
			});
			const fixture = TestBed.createComponent(WrapperSelectClearFirst);
			const wrapper = fixture.componentInstance;
			const luSelectClearer: LuSelectClearerFirstOrDefaultComponent<any> =
				fixture.debugElement.query(By.directive(LuSelectClearerFirstOrDefaultComponent)).componentInstance;

			// Act
			fixture.detectChanges();

			// Assert
			expect(luSelectClearer.clearValue()).toBe(globalOptions[0]);

		});

		it('It should fire an error if no options are specified', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelectClearerFirstOrDefaultComponent);
			const luClearer = fixture.componentInstance;
			fixture.detectChanges();

			// Act
			fixture.whenStable().then(() => {
				let errorFire = false;
				try {
					luClearer.clearValue();
				}catch (error) {
					errorFire = true;
				}
				fixture.detectChanges();

				// Assert
				expect(errorFire).toBeTruthy();
			});

		});

});
