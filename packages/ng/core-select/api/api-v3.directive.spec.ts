import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ILuApiItem } from '@lucca-front/ng/api';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey } from '@lucca-front/ng/core-select';
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

	beforeEach(() => {
		selectMock = {
			isPanelOpen$: new BehaviorSubject(false),
			nextPage$: new Subject<void>(),
			clueChange$: new Subject<string>(),
			loading$: new BehaviorSubject(false),
			optionComparerRef: signal(coreSelectDefaultOptionComparer),
			optionKeyRef: signal(coreSelectDefaultOptionKey),
			optionsRef: signal([]),
			loadingRef: signal(false),
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

	it('should call http.get on open', fakeAsync(() => {
		// Arrange
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		// Act
		selectMock.isPanelOpen$.next(true);
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20');
	}));

	it('should call http.get when page changes and aggregate options', fakeAsync(() => {
		// Arrange
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		selectMock.isPanelOpen$.next(true);
		tick(MAGIC_DEBOUNCE_DURATION);

		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE) },
		});
		tick();

		// Act
		selectMock.nextPage$.next();
		tick();

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=20,20').flush({
			data: { items: itemsMocks.slice(LU_SELECT_MAGIC_PAGE_SIZE, LU_SELECT_MAGIC_PAGE_SIZE * 2) },
		});
		tick();

		expect(selectMock.optionsRef()).toEqual(itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE * 2));
	}));

	it('should call http.get when clue changes and reset options and page', fakeAsync(() => {
		// Arrange
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		selectMock.isPanelOpen$.next(true);
		tick(MAGIC_DEBOUNCE_DURATION);

		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, LU_SELECT_MAGIC_PAGE_SIZE) },
		});
		tick();

		selectMock.nextPage$.next();
		tick();
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&paging=20,20').flush({
			data: { items: itemsMocks.slice(LU_SELECT_MAGIC_PAGE_SIZE, LU_SELECT_MAGIC_PAGE_SIZE * 2) },
		});
		tick();

		// Act
		selectMock.clueChange$.next('bob');
		tick(MAGIC_DEBOUNCE_DURATION);

		// Assert
		httpTestingController.expectOne('/api/v3/axisSections?fields=id,name&orderBy=name,asc&name=like,bob&paging=0,20').flush({
			data: { items: itemsMocks.slice(0, 5) },
		});
		tick();

		expect(selectMock.optionsRef()).toEqual(itemsMocks.slice(0, 5));
	}));
});
