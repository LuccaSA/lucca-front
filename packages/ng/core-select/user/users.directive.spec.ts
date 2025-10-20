import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, Directive, forwardRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { MAGIC_DEBOUNCE_DURATION } from '../api/api.directive';
import { MAGIC_OPTION_SCROLL_DELAY } from '../option/option.component';
import { provideCoreSelectCurrentUserId } from './me.provider';
import { LuCoreSelectUser } from './user-option.model';
import { LuCoreSelectUsersDirective } from './users.directive';

@Directive({
	selector: '[luTestUsers]',
	providers: [
		{
			provide: LuCoreSelectUsersDirective,
			useExisting: forwardRef(() => TestUsersDirective),
		},
	],
})
class TestUsersDirective extends LuCoreSelectUsersDirective {
	public setPageSize(size: number) {
		this.pageSize = size;
	}
}

@Component({
	selector: 'lu-users-directive-host',
	imports: [LuSimpleSelectInputComponent, TestUsersDirective],
	template: `<lu-simple-select luTestUsers />`,
})
class LuUsersDirectiveHostComponent {
	simpleSelect = viewChild.required<LuSimpleSelectInputComponent<LuCoreSelectUser>>(LuSimpleSelectInputComponent);
	usersDirective = viewChild.required<TestUsersDirective>(TestUsersDirective);
}

const CURRENT_USER_ID = 12;
const fields = 'id,firstName,lastName,picture.href';

describe('LuCoreSelectUsersDirective', () => {
	let httpTestingController: HttpTestingController;
	let fixture: ComponentFixture<LuUsersDirectiveHostComponent>;
	let simpleSelect: LuSimpleSelectInputComponent<LuCoreSelectUser>;
	let usersDirective: TestUsersDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuUsersDirectiveHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting(), provideCoreSelectCurrentUserId(() => CURRENT_USER_ID)],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		fixture = TestBed.createComponent(LuUsersDirectiveHostComponent);
		simpleSelect = fixture.componentInstance.simpleSelect();
		usersDirective = fixture.componentInstance.usersDirective();
	});

	it('should not make any call on init', fakeAsync(() => {
		// Act
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Assert
		httpTestingController.verify();
	}));

	it('should call initial list on open', fakeAsync(() => {
		// Act
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Assert (Me + Initial list)
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,20`);
		httpTestingController.verify();
	}));

	it('should call search with clue when panel is opened', fakeAsync(() => {
		// Arrange
		const clue = 'test';
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Act
		simpleSelect.clueChanged(clue);
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		fixture.detectChanges();

		// Assert (Me + Initial list + Search with clue)
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,20`);
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&clue=${clue}&paging=0,20`);
		httpTestingController.verify();
	}));

	// TODO: FixMe There is a timing issue that is not present when running in browser environment :'(
	it.skip('should not call "me" and call initial filtered list when panel is closed', fakeAsync(() => {
		// Arrange
		const clue = 'test';
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Act
		simpleSelect.clueChanged(clue);
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert (Initial filtered list)
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&clue=${clue}&paging=0,20`);
		httpTestingController.verify();
	}));

	it('should return "me" on the first page only if clue is empty', fakeAsync(() => {
		// Arrange
		usersDirective.setPageSize(3);
		simpleSelect.openPanel();
		fixture.detectChanges();

		const meUser = createUser(CURRENT_USER_ID);
		const page1 = [createUser(1), createUser(2), createUser(3)];
		const page2 = [createUser(4), meUser, createUser(6)];

		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Act (Page 1)
		const meReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		meReq.flush(usersResponse([meUser]));
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		const page1Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,3`);
		page1Req.flush(usersResponse(page1));
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Assert (Page 1)
		let options: readonly LuCoreSelectUser[];
		simpleSelect.options$.subscribe((o) => (options = o));

		expect(options).toEqual([meUser, ...page1]);

		// Act (Page 2)
		simpleSelect.nextPage.emit();
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		const page2Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=3,3`);
		page2Req.flush(usersResponse(page2));
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Assert (Page 2)
		expect(options).toEqual([meUser, ...page1, ...page2.filter((u) => u.id !== CURRENT_USER_ID)]);
		httpTestingController.verify();
	}));

	it('should append additional information for homonyms when paging is greater than the number of items', fakeAsync(() => {
		// Arrange
		usersDirective.setPageSize(4);
		simpleSelect.openPanel();
		fixture.detectChanges();

		tick(MAGIC_OPTION_SCROLL_DELAY);

		const meUser = createUser(CURRENT_USER_ID);
		const user1 = createUser(1);
		const user2 = createUser(2, 'Doe', 'John');
		const user3 = createUser(3, 'Doe', 'John');

		const page1 = [user1, user2, user3];
		const additionalInfo = {
			data: {
				items: [
					{ id: 2, department: { name: 'Engineering' } },
					{ id: 3, department: { name: 'Marketing' } },
				],
			},
		};

		// Act
		const options: Array<readonly LuCoreSelectUser[]> = [];
		simpleSelect.options$.subscribe((o) => options.push(o));

		const meReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		meReq.flush(usersResponse([meUser]));
		fixture.detectChanges();

		const page1Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,4`);
		page1Req.flush(usersResponse(page1));
		fixture.detectChanges();

		const additionalInfoReq = httpTestingController.expectOne(`/api/v3/users?id=2,3&fields=id,department.name`);
		additionalInfoReq.flush(additionalInfo);
		fixture.detectChanges();

		// Assert
		httpTestingController.verify();
		expect(options).toEqual([
			// Without additional information
			[meUser, user1, user2, user3],
			// With additional information
			[meUser, user1, { ...user2, additionalInformation: 'Engineering' }, { ...user3, additionalInformation: 'Marketing' }],
		]);
	}));
});

function createUser(id: number, lastName = 'test ' + id, firstName = 'test ' + id): LuCoreSelectUser {
	return { id, firstName, lastName, picture: null };
}

function usersResponse(users: LuCoreSelectUser[]) {
	return { data: { items: users.map((u) => ({ item: u })) } };
}
