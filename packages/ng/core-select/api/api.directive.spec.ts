import { Component, Directive } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
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
	protected override params$ = this.clue$.pipe(
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
})
class HostComponent {}

describe('ALuCoreSelectApiDirective', () => {
	let spectator: Spectator<HostComponent>;
	let select: LuSimpleSelectInputComponent<TestEntity>;
	let testApi: TestDirective;
	let getOptionsSpy: jest.SpyInstance<Observable<TestEntity[]>, []>;

	const createComponent = createComponentFactory<HostComponent>({
		component: HostComponent,
	});

	beforeEach(() => {
		spectator = createComponent({ detectChanges: false });
		testApi = spectator.query(TestDirective);
		select = spectator.query<LuSimpleSelectInputComponent<TestEntity>>(LuSimpleSelectInputComponent);
		getOptionsSpy = jest.spyOn(testApi, 'getOptions');
	});

	it('should query options when clicking on the select', fakeAsync(() => {
		spectator.click('lu-simple-select');
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY); // Avoid "1 periodic timer(s) still in the queue." because of the setTimeout in the option component

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({}, 0);
	}));

	it('should query options when ArrowDown keydown on the select', fakeAsync(() => {
		spectator.dispatchKeyboardEvent('lu-simple-select', 'keydown', 'ArrowDown');
		spectator.tick(10); // Wait for panel to be opened
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY); // Avoid "1 periodic timer(s) still in the queue." because of the setTimeout in the option component

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({}, 0);
	}));

	it('should query options once when searching while the select is closed', fakeAsync(() => {
		spectator.tick(); // Component initialization uses a setTimeout :see_no_evil:
		select.clueChanged('test');
		spectator.tick(10); // Wait for panel to be opened
		spectator.tick(MAGIC_DEBOUNCE_DURATION);
		spectator.tick();

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({ clue: 'test' }, 0);

		spectator.tick(); // Avoid "1 periodic timer(s) still in the queue." because of the debounceTime(0) in the ALuCoreSelectApiDirective
	}));

	it('should debounce clue options', fakeAsync(() => {
		spectator.tick(); // Component initialization uses a setTimeout :see_no_evil:

		select.clueChanged('h');
		spectator.tick(MAGIC_DEBOUNCE_DURATION - 1);
		select.clueChanged('he');
		spectator.tick(MAGIC_DEBOUNCE_DURATION - 1);
		select.clueChanged('hey');
		spectator.tick(MAGIC_DEBOUNCE_DURATION);
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY);

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({ clue: 'hey' }, 0);

		spectator.tick(); // Avoid "1 periodic timer(s) still in the queue." because of the debounceTime(0) in the ALuCoreSelectApiDirective
	}));

	it('should call each page will page not full', fakeAsync(() => {
		// Arrange
		spectator.tick(); // Component initialization uses a setTimeout :see_no_evil:
		testApi.setPageSize(2);

		// Act (Page 1)
		getOptionsSpy.mockReturnValue(
			of([
				{ id: 1, name: 'test 1' },
				{ id: 2, name: 'test 2' },
			]),
		);

		select.clueChanged('test');
		spectator.tick(10); // Wait for panel to be opened
		spectator.tick(MAGIC_DEBOUNCE_DURATION);
		spectator.tick();

		// Act (Page 2)
		getOptionsSpy.mockReturnValue(
			of([
				{ id: 3, name: 'test 3' },
				{ id: 4, name: 'test 4' },
			]),
		);
		select.nextPage.emit();
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY);
		spectator.tick();

		// // Act (Page 3)
		getOptionsSpy.mockReturnValue(of([{ id: 5, name: 'test 5' }]));
		select.nextPage.emit();
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY);
		spectator.tick();

		// Act (do nothing)
		select.nextPage.emit();
		select.nextPage.emit();

		// // Assert
		expect(testApi.getOptions).toHaveBeenCalledTimes(3);

		let options: readonly TestEntity[];

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
		spectator.tick(); // Component initialization uses a setTimeout :see_no_evil:
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
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY);

		// Act (Page 2)
		select.nextPage.emit();
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY);

		// Assert
		let options: readonly TestEntity[];
		select.options$.subscribe((o) => (options = o));
		expect(options).toEqual([
			{ id: 1, name: 'test 1' },
			{ id: 2, name: 'test 2' },
			{ id: 3, name: 'test 3' },
			{ id: 4, name: 'test 4' },
		]);
	}));
});
