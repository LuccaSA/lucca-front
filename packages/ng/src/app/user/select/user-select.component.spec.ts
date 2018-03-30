import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LuUserSelect} from './user-select.component';
import {
	LuSelectOption,
	LuSelectSearchIntl,
	LuSelect,
	LuSelectPicker,
	LuSelectDirective,
	LuSelectApiPicker
} from '../../select';
import { Component} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {OVERLAY_PROVIDERS, ScrollStrategyOptions, ScrollDispatcher} from '@angular/cdk/overlay';
import { UserSelectApiFeeder } from './user-select-api-feeder';


@Component({
	template: `<lu-user-select [(ngModel)]="item">
		</lu-user-select>
	`,
})
// tslint:disable-next-line:component-class-suffix
export class WrapperUserSelect {
	item = {
		id: 1,
		firstName: 'Lucca',
		lastName: 'Admin'
	};
}

describe('LuUserSelect', () => {

	let http: HttpTestingController;

	const users = [{
		id: 1,
		firstName: 'Lucca',
		lastName: 'Admin'
	}, {
		id: 2,
		firstName: 'Chloé',
		lastName: 'Alibert'
	}, {
		id: 3,
		firstName: 'Peter',
		lastName: 'Benson'
	}, {
		id: 4,
		firstName: 'Maurice',
		lastName: 'Bart'
	}, {
		id: 5,
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
				OVERLAY_PROVIDERS,
				ScrollStrategyOptions,
				ScrollDispatcher,
				LuSelectSearchIntl,
				{ provide: UserSelectApiFeeder, useClass: UserSelectApiFeeder },
			],
			imports: [
				HttpClientTestingModule,
				FormsModule,
			],
			declarations: [
				LuSelectOption,
				LuSelect,
				LuSelectPicker,
				LuSelectDirective,
				LuSelectApiPicker,
				LuUserSelect,
				WrapperUserSelect,
			]
		}).compileComponents();
	http = TestBed.get(HttpTestingController);
	});

	it('It should call the user service at first', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserSelect);
		const userSelect = fixture.componentInstance;

		fixture.whenStable().then(() => {

			// Act
			fixture.detectChanges();

					// Assert
			const testRequest = http.expectOne('/api/v3/users/find?formerEmployees=false&clue=&paging=0,10&fields=id,firstName,lastName');
			expect(testRequest.request).toBeDefined('The users sould be called with correct parameters');
		});

	});

	it('It should call the user service with correct fields', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserSelect);
		const userSelect = fixture.componentInstance;

		// Act
		fixture.detectChanges();
		userSelect.fields = ['birthDate', 'startDate'];
		fixture.detectChanges();

		// Assert
		expect(userSelect.fields.length).toBe(['birthDate', 'startDate'].length);

	});

	it('It should call the user service with correct formerEmployees', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserSelect);
		const userSelect = fixture.componentInstance;

		// Act
		fixture.detectChanges();
		userSelect.formerEmployees = true;
		fixture.detectChanges();

		// Assert
		expect(userSelect.formerEmployees).toBe(true);

	});

	it('It should call the user service with correct paging', () => {
		// Arrange
		const fixture = TestBed.createComponent(LuUserSelect);
		const userSelect = fixture.componentInstance;

		// Act
		fixture.detectChanges();
		userSelect.pagingSize = 50;
		userSelect.pagingStart = 100;
		fixture.detectChanges();

		// Assert
		expect(userSelect.pagingStart).toBe(100);
		expect(userSelect.pagingSize).toBe(50);

	});


	it('It should reference has the right value', () => {

		// Arrange
		const fixture = TestBed.createComponent(WrapperUserSelect);
		const userSelect: LuUserSelect<any> = fixture.debugElement.query(By.directive(LuUserSelect)).componentInstance;
		fixture.detectChanges();

		fixture.whenStable().then(() => {
			// Act
			fixture.detectChanges();

			// Assert
			expect(JSON.stringify(userSelect.value)).toBe(JSON.stringify(users[0]));
		});

	});


});
