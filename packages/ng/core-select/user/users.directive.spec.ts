import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, Directive, forwardRef, viewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { MAGIC_DEBOUNCE_DURATION } from '../api/api.directive';
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
	template: `<lu-simple-select luTestUsers [filters]="filters" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuUsersDirectiveHostComponent {
	filters: Record<string, string | number | boolean> = {};
	readonly simpleSelect = viewChild.required<LuSimpleSelectInputComponent<LuCoreSelectUser>>(LuSimpleSelectInputComponent);
	readonly usersDirective = viewChild.required<TestUsersDirective>(TestUsersDirective);
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
		tick();

		// Assert
		httpTestingController.verify();
	}));

	it('should call initial list on open', fakeAsync(() => {
		// Act
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick();

		// Assert (Me + Initial list)
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,20`);
		httpTestingController.verify();
	}));

	it('should still load first page when the me request fails', fakeAsync(() => {
		// Arrange
		usersDirective.setPageSize(3);
		simpleSelect.openPanel();
		fixture.detectChanges();

		const page1 = [createUser(1), createUser(2), createUser(3)];

		tick();

		// Act
		const meReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		meReq.flush(null, { status: 500, statusText: 'Server Error' });
		fixture.detectChanges();
		tick();

		const page1Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,3`);
		page1Req.flush(usersResponse(page1));
		fixture.detectChanges();
		tick();

		// Assert
		let options: readonly LuCoreSelectUser[] = [];
		options = simpleSelect.dataSourceOptions();

		expect(options).toEqual(page1);
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

		tick();

		// Act (Page 1)
		const meReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		meReq.flush(usersResponse([meUser]));
		fixture.detectChanges();
		tick();

		const page1Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,3`);
		page1Req.flush(usersResponse(page1));
		fixture.detectChanges();
		tick();

		// Assert (Page 1)
		expect(simpleSelect.dataSourceOptions()).toEqual([meUser, ...page1]);

		// Act (Page 2)
		simpleSelect.nextPage$.next();
		fixture.detectChanges();
		tick();

		const page2Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=3,3`);
		page2Req.flush(usersResponse(page2));
		fixture.detectChanges();
		tick();

		// Assert (Page 2)
		expect(simpleSelect.dataSourceOptions()).toEqual([meUser, ...page1, ...page2.filter((u) => u.id !== CURRENT_USER_ID)]);
		httpTestingController.verify();
	}));

	it('should keep the loader on until the "me" lookup answers', fakeAsync(() => {
		// Arrange
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick();

		const meUser = createUser(CURRENT_USER_ID);
		const users = [createUser(1), createUser(2)];

		const meReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		const usersReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,20`);

		// Act (the users search answers first, the "me" lookup is still pending)
		usersReq.flush(usersResponse(users));
		fixture.detectChanges();
		tick();

		// Assert: still loading — turning the loader off before the options arrive
		// would show the "no result" empty state of the panel in the meantime
		expect(simpleSelect.loading()).toBe(true);

		// Act (the "me" lookup answers)
		meReq.flush(usersResponse([meUser]));
		fixture.detectChanges();
		tick();

		// Assert
		expect(simpleSelect.dataSourceOptions()).toEqual([meUser, ...users]);
		expect(simpleSelect.loading()).toBe(false);
		httpTestingController.verify();
	}));

	it('should display the options without "me" when the "me" lookup fails', fakeAsync(() => {
		// Arrange
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick();

		const users = [createUser(1), createUser(2)];

		const meReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		const usersReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,20`);

		// Act
		usersReq.flush(usersResponse(users));
		meReq.flush('boom', { status: 500, statusText: 'Internal Server Error' });
		fixture.detectChanges();
		tick();

		// Assert
		expect(simpleSelect.dataSourceOptions()).toEqual(users);
		expect(simpleSelect.loading()).toBe(false);
		httpTestingController.verify();
	}));

	it('should not forward `filters` to the "me" lookup request', fakeAsync(() => {
		// Arrange
		fixture.componentInstance.filters = { foo: 'bar' };
		fixture.detectChanges();

		// Act
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick();

		// Assert
		// The "me" lookup is a lookup by id and must NOT carry the search filters (`foo=bar`)
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		// The search list, on the other hand, does carry the filters
		httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&foo=bar&paging=0,20`);
		httpTestingController.verify();
	}));

	it('should append additional information for homonyms when paging is greater than the number of items', fakeAsync(() => {
		// Arrange
		usersDirective.setPageSize(4);
		simpleSelect.openPanel();
		fixture.detectChanges();

		tick();

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
		TestBed.runInInjectionContext(() =>
			toObservable(simpleSelect.dataSourceOptions)
				.pipe(skip(1))
				.subscribe((o) => options.push(o)),
		);

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

	it('should append additional information for homonyms split across two pages', fakeAsync(() => {
		// Arrange
		usersDirective.setPageSize(2);
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick();

		const meUser = createUser(CURRENT_USER_ID);
		const user1 = createUser(1);
		const user2 = createUser(2, 'Doe', 'John');
		const user3 = createUser(3, 'Doe', 'John');
		const user4 = createUser(4);

		// Act (Page 1: the first homonym is the last option of the page)
		const meReq = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&id=${CURRENT_USER_ID}`);
		meReq.flush(usersResponse([meUser]));
		fixture.detectChanges();
		tick();

		const page1Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=0,2`);
		page1Req.flush(usersResponse([user1, user2]));
		fixture.detectChanges();
		tick();

		// Assert (Page 1: no homonym detected yet)
		expect(simpleSelect.dataSourceOptions()).toEqual([meUser, user1, user2]);
		httpTestingController.verify();

		// Act (Page 2: the second homonym is the first option of the page)
		simpleSelect.nextPage$.next();
		fixture.detectChanges();
		tick();

		const page2Req = httpTestingController.expectOne(`/api/v3/users/search?fields=${fields}&paging=2,2`);
		page2Req.flush(usersResponse([user3, user4]));
		fixture.detectChanges();
		tick();

		const additionalInfoReq = httpTestingController.expectOne(`/api/v3/users?id=2,3&fields=id,department.name`);
		additionalInfoReq.flush({
			data: {
				items: [
					{ id: 2, department: { name: 'Engineering' } },
					{ id: 3, department: { name: 'Marketing' } },
				],
			},
		});
		fixture.detectChanges();
		tick();

		// Assert (Page 2: both homonyms are decorated, including the one loaded on the previous page)
		expect(simpleSelect.dataSourceOptions()).toEqual([meUser, user1, { ...user2, additionalInformation: 'Engineering' }, { ...user3, additionalInformation: 'Marketing' }, user4]);
		httpTestingController.verify();
	}));
});

function createUser(id: number, lastName = 'test ' + id, firstName = 'test ' + id): LuCoreSelectUser {
	return { id, firstName, lastName };
}

function usersResponse(users: LuCoreSelectUser[]) {
	return { data: { items: users.map((u) => ({ item: u })) } };
}
