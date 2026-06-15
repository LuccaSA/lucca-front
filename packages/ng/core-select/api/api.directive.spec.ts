import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Observable, map, of } from 'rxjs';
import { MAGIC_OPTION_SCROLL_DELAY } from '../option/option.component';
import { ALuCoreSelectApiDirective, MAGIC_DEBOUNCE_DURATION } from './api.directive';

interface TestEntity {
	id: number;
	name: string;
}

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[testApi]',
})
class TestDirective extends ALuCoreSelectApiDirective<TestEntity> {
	protected override readonly params$ = this.clue$.pipe(
		map((clue) => ({
			...(clue ? { clue } : {}),
		})),
	);

	protected override optionKey = (option: TestEntity) => option.id;

	public override getOptions(): Observable<TestEntity[]> {
		return of([{ id: 1, name: 'test' }]);
	}

	public setPageSize(size: number) {
		this.pageSize = size;
	}

	public override getOptionsPage(
		params: Record<string, string | number | boolean>,
		page: number,
	): Observable<{
		items: TestEntity[];
		isLastPage: boolean;
	}> {
		return super.getOptionsPage(params, page);
	}
}

@Component({
	template: ` <lu-simple-select testApi />`,
	imports: [TestDirective, LuSimpleSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('ALuCoreSelectApiDirective', () => {
	let fixture: ComponentFixture<HostComponent>;
	let selectElement: HTMLElement;
	let select: LuSimpleSelectInputComponent<TestEntity>;
	let testApi: TestDirective;
	let getOptionsSpy: jest.SpyInstance<Observable<TestEntity[]>, []>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
		});

		fixture = TestBed.createComponent(HostComponent);

		const selectDebugElement = fixture.debugElement.query(By.directive(LuSimpleSelectInputComponent));
		selectElement = selectDebugElement.nativeElement as HTMLElement;
		select = selectDebugElement.componentInstance as LuSimpleSelectInputComponent<TestEntity>;
		testApi = fixture.debugElement.query(By.directive(TestDirective)).injector.get(TestDirective);
		getOptionsSpy = jest.spyOn(testApi, 'getOptions');
	});

	it('should query options when clicking on the select', fakeAsync(() => {
		selectElement.click();
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY); // Avoid "1 periodic timer(s) still in the queue." because of the setTimeout in the option component

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({}, 0);
	}));

	it('should query options when ArrowDown keydown on the select', fakeAsync(() => {
		selectElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
		fixture.detectChanges();
		tick(10); // Wait for panel to be opened
		tick(MAGIC_OPTION_SCROLL_DELAY); // Avoid "1 periodic timer(s) still in the queue." because of the setTimeout in the option component

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({}, 0);
	}));

	it('should query options once when searching while the select is closed', fakeAsync(() => {
		tick(); // Component initialization uses a setTimeout :see_no_evil:
		select.clueChanged('test');
		fixture.detectChanges();
		tick(10); // Wait for panel to be opened
		tick(MAGIC_DEBOUNCE_DURATION);
		tick();

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({ clue: 'test' }, 0);

		tick(); // Avoid "1 periodic timer(s) still in the queue." because of the debounceTime(0) in the ALuCoreSelectApiDirective
	}));

	it('should debounce clue options', fakeAsync(() => {
		tick(); // Component initialization uses a setTimeout :see_no_evil:
		fixture.detectChanges();

		select.clueChanged('h');
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION - 1);
		select.clueChanged('he');
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION - 1);
		select.clueChanged('hey');
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		tick(MAGIC_OPTION_SCROLL_DELAY);

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({ clue: 'hey' }, 0);

		tick(); // Avoid "1 periodic timer(s) still in the queue." because of the debounceTime(0) in the ALuCoreSelectApiDirective
	}));

	it('should call each page will page not full', fakeAsync(() => {
		// Arrange
		tick(); // Component initialization uses a setTimeout :see_no_evil:
		testApi.setPageSize(2);

		// Act (Page 1)
		getOptionsSpy.mockReturnValue(
			of([
				{ id: 1, name: 'test 1' },
				{ id: 2, name: 'test 2' },
			]),
		);

		select.clueChanged('test');
		fixture.detectChanges();
		tick(10); // Wait for panel to be opened
		tick(MAGIC_DEBOUNCE_DURATION);

		// Act (Page 2)
		getOptionsSpy.mockReturnValue(
			of([
				{ id: 3, name: 'test 3' },
				{ id: 4, name: 'test 4' },
			]),
		);
		select.nextPage$.next();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// // Act (Page 3)
		getOptionsSpy.mockReturnValue(of([{ id: 5, name: 'test 5' }]));
		select.nextPage$.next();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Act (do nothing)
		select.nextPage$.next();
		select.nextPage$.next();

		// // Assert
		expect(testApi.getOptions).toHaveBeenCalledTimes(3);

		let options: readonly TestEntity[] = [];

		select.options$.subscribe((o) => (options = o));

		expect(options).toEqual([
			{ id: 1, name: 'test 1' },
			{ id: 2, name: 'test 2' },
			{ id: 3, name: 'test 3' },
			{ id: 4, name: 'test 4' },
			{ id: 5, name: 'test 5' },
		]);
	}));

	it('should allow multiple emission on same page', fakeAsync(() => {
		// Arrange
		tick(); // Component initialization uses a setTimeout :see_no_evil:
		testApi.setPageSize(2);

		const getPageSpy = jest.spyOn(testApi, 'getOptionsPage');
		getPageSpy.mockImplementation((_params, page) => {
			// Emit one list, then the same list with one more item
			return of(
				{
					items: [{ id: page * 2 + 1, name: `test ${page * 2 + 1}` }],
					isLastPage: false,
				},
				{
					items: [
						{ id: page * 2 + 1, name: `test ${page * 2 + 1}` },
						{ id: page * 2 + 2, name: `test ${page * 2 + 2}` },
					],
					isLastPage: false,
				},
			);
		});

		// Act (Page 1)
		select.openPanel();
		fixture.detectChanges();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Act (Page 2)
		select.nextPage$.next();
		tick(MAGIC_OPTION_SCROLL_DELAY);

		// Assert
		let options: readonly TestEntity[] = [];
		select.options$.subscribe((o) => (options = o));
		expect(options).toEqual([
			{ id: 1, name: 'test 1' },
			{ id: 2, name: 'test 2' },
			{ id: 3, name: 'test 3' },
			{ id: 4, name: 'test 4' },
		]);
	}));
});
