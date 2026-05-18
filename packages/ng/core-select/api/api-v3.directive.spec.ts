import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ILuApiItem } from '@lucca-front/ng/api';
import { ALuSelectInputComponent, SelectDataSource, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { BehaviorSubject, Subject } from 'rxjs';
import { LuCoreSelectApiV3Directive } from './api-v3.directive';
import { LU_SELECT_MAGIC_PAGE_SIZE, MAGIC_DEBOUNCE_DURATION } from './api.directive';

const itemsMocks = Array.from({ length: LU_SELECT_MAGIC_PAGE_SIZE * 2 + 5 }, (_, i) => ({ id: i, name: `item ${i}` }));

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select [apiV3]="url" />`,
	imports: [MockSelectComponent, LuCoreSelectApiV3Directive],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
	url = '/api/v3/axisSections';
}

describe('CoreSelectApiV3Directive', () => {
	let selectMock: LuSimpleSelectInputComponent<ILuApiItem>;
	let httpTestingController: HttpTestingController;
	let fixture: ComponentFixture<TestHostComponent>;
	let capturedDataSource: SelectDataSource<ILuApiItem> | undefined;

	beforeEach(() => {
		capturedDataSource = undefined;
		selectMock = {
			isPanelOpen$: new BehaviorSubject(false),
			nextPage$: new Subject<void>(),
			clueChange$: new Subject<string>(),
			optionComparer: coreSelectDefaultOptionComparer,
			optionKey: coreSelectDefaultOptionKey,
			options: [],
			dataSource: {
				set: (ds: SelectDataSource<ILuApiItem>) => {
					capturedDataSource = ds;
				},
			},
			loading: {
				set: (_v: boolean) => {},
			},
		} as unknown as LuSimpleSelectInputComponent<ILuApiItem>;

		TestBed.configureTestingModule({
			imports: [TestHostComponent],
			providers: [
				{
					provide: ALuSelectInputComponent,
					useValue: selectMock,
				},
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should not call http.get on init', fakeAsync(() => {
		// Act
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert
		httpTestingController.verify();
	}));

	it('should call http.get when getOptions is called', fakeAsync(() => {
		// Arrange
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Act — simulate select component calling getOptions
		capturedDataSource!.getOptions({ clue: '', page: 0 }).subscribe();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20');
	}));

	it('should call http.get for next page when getOptions is called with page 1', fakeAsync(() => {
		// Arrange
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Act (Page 1)
		capturedDataSource!.getOptions({ clue: '', page: 0 }).subscribe();
		tick();
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE) },
		});
		tick();

		// Act (Page 2)
		capturedDataSource!.getOptions({ clue: '', page: 1 }).subscribe();

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=20,20').flush({
			data: { items: itemsMocks.slice(LU_SELECT_MAGIC_PAGE_SIZE, LU_SELECT_MAGIC_PAGE_SIZE * 2) },
		});
		tick();

		expect(selectMock.options()).toEqual(itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE * 2));
	}));

	it('should reset page when clue changes', fakeAsync(() => {
		// Arrange
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		capturedDataSource!.getOptions({ clue: '', page: 0 }).subscribe();
		tick();
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE) },
		});
		tick();

		capturedDataSource!.getOptions({ clue: '', page: 1 }).subscribe();
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=20,20').flush({
			data: { items: itemsMocks.slice(LU_SELECT_MAGIC_PAGE_SIZE, LU_SELECT_MAGIC_PAGE_SIZE * 2) },
		});
		tick();

		// Act — clue changes (triggers reset via clueChange$ subscription in directive)
		selectMock.clueChange$.next('bob');
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert — new query with clue, page 0
		capturedDataSource!.getOptions({ clue: 'bob', page: 0 }).subscribe();
		tick();
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&name=like,bob&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, 5) },
		});
		tick();

		expect(selectMock.options()).toEqual(itemsMocks.slice(0, 5));
	}));
});
