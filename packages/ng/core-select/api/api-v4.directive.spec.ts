import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ILuApiItem } from '@lucca-front/ng/api';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuCoreSelectApiV4Directive } from './api-v4.directive';
import { LU_SELECT_MAGIC_PAGE_SIZE, MAGIC_DEBOUNCE_DURATION } from './api.directive';

const url = '/api/v4/legumes';
const legumes: ILuApiItem[] = Array.from({ length: LU_SELECT_MAGIC_PAGE_SIZE + 5 }, (_, i) => ({ id: i + 1, name: `Légume ${i + 1}` }));
const firstPage = legumes.slice(0, LU_SELECT_MAGIC_PAGE_SIZE);
const secondPage = legumes.slice(LU_SELECT_MAGIC_PAGE_SIZE);

@Component({
	selector: 'lu-api-v4-default-host',
	imports: [LuSimpleSelectInputComponent, LuCoreSelectApiV4Directive],
	template: `<lu-simple-select apiV4="${url}" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {
	readonly simpleSelect = viewChild.required<LuSimpleSelectInputComponent<ILuApiItem>>(LuSimpleSelectInputComponent);
}

@Component({
	selector: 'lu-api-v4-configured-host',
	imports: [LuSimpleSelectInputComponent, LuCoreSelectApiV4Directive],
	template: `<lu-simple-select apiV4="${url}" [filters]="filters()" [sort]="sort()" [searchDelimiter]="searchDelimiter()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfiguredHostComponent {
	readonly filters = signal<Record<string, string | number | boolean>>({ color: 'green' });
	readonly sort = signal<string | null>('-name');
	readonly searchDelimiter = signal(',');
	readonly simpleSelect = viewChild.required<LuSimpleSelectInputComponent<ILuApiItem>>(LuSimpleSelectInputComponent);
	readonly apiV4Directive = viewChild.required<LuCoreSelectApiV4Directive<ILuApiItem>>(LuCoreSelectApiV4Directive);
}

describe('LuCoreSelectApiV4Directive', () => {
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	function openPanel<T extends DefaultHostComponent | ConfiguredHostComponent>(fixture: ComponentFixture<T>): LuSimpleSelectInputComponent<ILuApiItem> {
		fixture.detectChanges();
		const simpleSelect = fixture.componentInstance.simpleSelect();
		simpleSelect.openPanel();
		fixture.detectChanges();
		tick();
		return simpleSelect;
	}

	function search<T extends DefaultHostComponent | ConfiguredHostComponent>(fixture: ComponentFixture<T>, clue: string): void {
		fixture.componentInstance.simpleSelect().clueChanged(clue);
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		fixture.detectChanges();
	}

	describe('with its default inputs', () => {
		let fixture: ComponentFixture<DefaultHostComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(DefaultHostComponent);
		});

		it('should request the first page sorted by name when the panel opens', fakeAsync(() => {
			// Act
			const simpleSelect = openPanel(fixture);
			httpTestingController.expectOne(`${url}?sort=%2Bname&page=1&limit=20`).flush(firstPage);
			fixture.detectChanges();
			tick();

			// Assert
			expect(simpleSelect.dataSourceOptions()).toEqual(firstPage);
		}));

		it('should request the next page by its number, starting at 1', fakeAsync(() => {
			// Arrange
			const simpleSelect = openPanel(fixture);
			httpTestingController.expectOne(`${url}?sort=%2Bname&page=1&limit=20`).flush(firstPage);
			fixture.detectChanges();
			tick();

			// Act
			simpleSelect.nextPage$.next();
			fixture.detectChanges();
			tick();
			httpTestingController.expectOne(`${url}?sort=%2Bname&page=2&limit=20`).flush(secondPage);
			fixture.detectChanges();
			tick();

			// Assert
			expect(simpleSelect.dataSourceOptions()).toEqual(legumes);
		}));

		it('should send the clue as the search param', fakeAsync(() => {
			// Arrange
			openPanel(fixture);
			httpTestingController.expectOne(`${url}?sort=%2Bname&page=1&limit=20`).flush(firstPage);

			// Act
			search(fixture, 'pomme de terre');

			// Assert
			httpTestingController.expectOne(`${url}?sort=%2Bname&search=pomme%20de%20terre&page=1&limit=20`);
		}));

		it('should accept a response that wraps the options in `items`', fakeAsync(() => {
			// Act
			const simpleSelect = openPanel(fixture);
			httpTestingController.expectOne(`${url}?sort=%2Bname&page=1&limit=20`).flush({ items: secondPage });
			fixture.detectChanges();
			tick();

			// Assert
			expect(simpleSelect.dataSourceOptions()).toEqual(secondPage);
		}));
	});

	describe('with filters, a sort and a search delimiter', () => {
		let fixture: ComponentFixture<ConfiguredHostComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(ConfiguredHostComponent);
		});

		it('should send the filters and the sort with each page', fakeAsync(() => {
			// Act
			openPanel(fixture);

			// Assert
			httpTestingController.expectOne(`${url}?color=green&sort=-name&page=1&limit=20`);
		}));

		it('should not sort when the sort is null', fakeAsync(() => {
			// Arrange
			fixture.componentInstance.sort.set(null);

			// Act
			openPanel(fixture);

			// Assert
			httpTestingController.expectOne(`${url}?color=green&page=1&limit=20`);
		}));

		it('should join the words of the clue with the search delimiter', fakeAsync(() => {
			// Arrange
			openPanel(fixture);
			httpTestingController.expectOne(`${url}?color=green&sort=-name&page=1&limit=20`).flush(firstPage);

			// Act
			search(fixture, 'pomme de terre');

			// Assert
			httpTestingController.expectOne(`${url}?color=green&sort=-name&search=pomme,de,terre&page=1&limit=20`);
		}));

		it('should count the options with the filters only, without sort, search nor paging', fakeAsync(() => {
			// Arrange
			fixture.detectChanges();
			let totalCount: number | undefined;

			// Act
			fixture.componentInstance.apiV4Directive().totalCount$.subscribe((count) => (totalCount = count));
			tick(MAGIC_DEBOUNCE_DURATION);
			httpTestingController.expectOne(`${url}?color=green&fields.root=count`).flush({ count: 42 });

			// Assert
			expect(totalCount).toBe(42);
		}));
	});
});
