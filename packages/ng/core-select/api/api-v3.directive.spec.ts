import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ILuApiItem } from '@lucca-front/ng/api';
import { ALuSelectInputComponent } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { BehaviorSubject, ReplaySubject, first } from 'rxjs';
import { LuCoreSelectApiV3Directive } from './api-v3.directive';
import { MAGIC_DEBOUNCE_DURATION, LU_SELECT_MAGIC_PAGE_SIZE } from './api.directive';

const itemsMocks = Array.from({ length: LU_SELECT_MAGIC_PAGE_SIZE * 2 + 5 }, (_, i) => ({ id: i, name: `item ${i}` }));

describe('CoreSelectApiV3Directive', () => {
	let directive: LuCoreSelectApiV3Directive<ILuApiItem>;
	let selectMock: LuSimpleSelectInputComponent<ILuApiItem>;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		selectMock = {
			isPanelOpen$: new BehaviorSubject(false),
			nextPage: new EventEmitter<void>(),
			clueChange: new EventEmitter<string>(),
			options$: new ReplaySubject(1),
			loading$: new BehaviorSubject(false),
		} as LuSimpleSelectInputComponent<ILuApiItem>;

		TestBed.configureTestingModule({
			providers: [
				LuCoreSelectApiV3Directive,
				{
					provide: ALuSelectInputComponent,
					useValue: selectMock,
				},
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		});

		directive = TestBed.inject<LuCoreSelectApiV3Directive<ILuApiItem>>(LuCoreSelectApiV3Directive);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should not call http.get on init', fakeAsync(() => {
		// Act
		directive.ngOnInit();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert
		httpTestingController.verify();
	}));

	it('should call http.get on open', fakeAsync(() => {
		// Arrange
		directive.apiV3 = '/api/v3/axisSections';
		directive.ngOnInit();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Act
		selectMock.isPanelOpen$.next(true);
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20');
	}));

	it('should call http.get when page changes and aggregate options', fakeAsync(() => {
		// Arrange
		directive.apiV3 = '/api/v3/axisSections';
		directive.ngOnInit();
		tick(MAGIC_DEBOUNCE_DURATION);
		selectMock.isPanelOpen$.next(true);
		tick();

		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE) },
		});
		tick();

		// Act
		selectMock.nextPage.emit();

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=20,20').flush({
			data: { items: itemsMocks.slice(LU_SELECT_MAGIC_PAGE_SIZE, LU_SELECT_MAGIC_PAGE_SIZE * 2) },
		});

		selectMock.options$.pipe(first()).subscribe((options) => {
			expect(options).toEqual(itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE * 2));
		});
		tick();
	}));

	it('should call http.get when clue changes and reset options and page', fakeAsync(() => {
		// Arrange
		directive.apiV3 = '/api/v3/axisSections';
		directive.ngOnInit();
		tick(MAGIC_DEBOUNCE_DURATION);
		selectMock.isPanelOpen$.next(true);
		tick();

		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE) },
		});
		tick();

		selectMock.nextPage.emit();
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=20,20').flush({
			data: { items: itemsMocks.slice(LU_SELECT_MAGIC_PAGE_SIZE, LU_SELECT_MAGIC_PAGE_SIZE * 2) },
		});

		// Act
		selectMock.clueChange.emit('bob');
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&name=like,bob&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, 5) },
		});

		selectMock.options$.pipe(first()).subscribe((options) => {
			expect(options).toEqual(itemsMocks.slice(0, 5));
		});
		tick();
	}));
});
