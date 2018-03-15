import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuUserPicker} from './user-select-picker.component';
import {LuSelectOption, LuSelectSearchIntl} from '../../../select';
import { Component} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';




describe('LuUserPicker', () => {

	let http: HttpTestingController;

	const users = [{
		id:1,
		firstName: 'Lucca',
		lastName: 'Admin'
	},{
		id:2,
		firstName: 'Chloé',
		lastName: 'Alibert'
	},{
		id:3,
		firstName: 'Peter',
		lastName: 'Benson'
	},{
		id:4,
		firstName: 'Maurice',
		lastName: 'Bart'
	},{
		id:5,
		firstName: 'Marie-Françoise',
		lastName: 'Archer'
	}];
	const apiUsers = {
		data: {
			items: users
		}
	};



	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				Platform,
				LuSelectSearchIntl
			],
			imports: [
				HttpClientTestingModule,
				FormsModule,
			],
			declarations: [LuSelectOption, LuUserPicker]
		}).compileComponents();
	http = TestBed.get(HttpTestingController);
	});

	it('It should call the user service at first', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const picker = fixture.componentInstance;

		// Act
		fixture.detectChanges();

		http.expectOne('/api/v3/users/find?formerEmployees=false&clue=&paging=0,10&fields=id,firstName,lastName')
		.flush(apiUsers);


		// Assert
		expect(picker._users).toEqual(users, 'The users sould be called with ');

	});

	it('It should call the user service with correct fields', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const picker = fixture.componentInstance;

		// Act
		fixture.detectChanges();
		picker.fields = ['birthDate','startDate'];
		fixture.detectChanges();

		picker.open();

		// Assert
		const testRequest = http.expectOne('/api/v3/users/find?formerEmployees=false&clue=&paging=0,10&fields=id,firstName,lastName,birthDate,startDate');
		expect(testRequest.request).toBeDefined('The users sould be called with correct parameters');

	});

	it('It should call the user service with correct formerEmployees', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const picker = fixture.componentInstance;

		// Act
		fixture.detectChanges();
		picker.formerEmployees = true;
		fixture.detectChanges();

		picker.open();

		// Assert
		const testRequest = http.expectOne('/api/v3/users/find?formerEmployees=true&clue=&paging=0,10&fields=id,firstName,lastName');
		expect(testRequest.request).toBeDefined('The users sould be called with correct parameters');

	});

	it('It should call the user service with correct paging', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const picker = fixture.componentInstance;

		// Act
		fixture.detectChanges();
		picker.pagingSize = 50;
		picker.pagingStart = 100;
		fixture.detectChanges();

		picker.open();

		// Assert
		const testRequest = http.expectOne('/api/v3/users/find?formerEmployees=false&clue=&paging=100,50&fields=id,firstName,lastName');
		expect(testRequest.request).toBeDefined('The users sould be called with correct parameters');

	});

	it('It should be not focused at the initialization', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const picker = fixture.componentInstance;

		// Act

		// Assert
		expect(picker.focused).toBe(false);
	});

	it('It should be focused when we click on it', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const picker = fixture.componentInstance;
		fixture.detectChanges();

		// Act
			// Act
		// Click on the item
		const input = fixture.nativeElement.querySelector('input');
		input.dispatchEvent(new Event('mousedown'));
		// Trigger the event
		fixture.detectChanges();

		// Assert
		expect(picker.focused).toBe(true);
	});

	it('It should be not focused when we leave the field', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const picker = fixture.componentInstance;
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
		expect(picker.focused).toBe(false);
	});


	it('It should filter the options (displayed)', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserPicker);
		const wrapper = fixture.componentInstance;
		fixture.detectChanges();

		// Act
		fixture.whenStable().then(() => {
			// Type text in input
			const input = fixture.nativeElement.querySelector('input');
			input.value = 'clue';
			input.dispatchEvent(new Event('input'));
			// Trigger the event
			fixture.detectChanges();
			tick(200); // debounce time

			// Assert
			const testRequest = http.expectOne('/api/v3/users/find?formerEmployees=false&clue=clue&paging=0,10&fields=id,firstName,lastName');
			expect(testRequest.request).toBeDefined('The users sould be called with correct parameters');
		});
	});

});
