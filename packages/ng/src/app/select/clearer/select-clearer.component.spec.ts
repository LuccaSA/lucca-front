import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuSelectClearerComponent} from './select-clearer.component';
import { Component} from '@angular/core';
import { escapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import {Platform} from '@angular/cdk/platform';


describe('LuSelectClearer', () => {


		beforeEach(() => {
			TestBed.configureTestingModule({
			providers: [
				Platform,
			],
			declarations: [
				LuSelectClearerComponent,
			],
			imports: [
			]
			}).compileComponents();
		});

		it('It should have class is-clearable when remove mode is true', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelectClearerComponent);
			fixture.detectChanges();
			const luSelectClearer  = fixture.componentInstance;
			const luSelectClearerElement = fixture.elementRef;

			// Act
			luSelectClearer.canRemove(true);
			fixture.detectChanges();

			// Assert
			expect(luSelectClearer.modRemove).toBe(true);
			expect(luSelectClearerElement.nativeElement.classList.contains('is-clearable')).toBeTruthy();

		});

		it('It should return null as clearValue', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelectClearerComponent);
			fixture.detectChanges();
			const luSelectClearer  = fixture.componentInstance;
			const luSelectClearerElement = fixture.elementRef;

			// Act
			fixture.detectChanges();

			// Assert
			expect(luSelectClearer.clearValue()).toBeNull();

		});

		it('It should return clearValue when subscribe', () => {

			// Arrange
			const fixture = TestBed.createComponent(LuSelectClearerComponent);
			fixture.detectChanges();
			const luSelectClearer  = fixture.componentInstance;
			const callbackMock = {callback : () => {}};

			// Act
			spyOn(callbackMock, 'callback');
			luSelectClearer.subscribe(callbackMock.callback);
			fixture.detectChanges();

			// Assert
			expect(callbackMock.callback).toHaveBeenCalled();

		});

		it('It should call the callback on click', () => {
			// Arrange
			const fixture = TestBed.createComponent(LuSelectClearerComponent);
			const luSelectClearer = fixture.componentInstance;
			const callbackMock = {callback : () => {}};

			// Act
			// Wait for the call
			spyOn(callbackMock, 'callback');
			luSelectClearer.subscribe(callbackMock.callback);
			fixture.detectChanges();
			// Click on the item
			fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
			// Trigger the event
			fixture.detectChanges();

			// Assert
			expect(callbackMock.callback).toHaveBeenCalledTimes(2);
		});

});
