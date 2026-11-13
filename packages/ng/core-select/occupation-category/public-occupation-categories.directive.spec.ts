import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, SelectDataSource } from '@lucca-front/ng/core-select';
import { ɵLuCoreSelectPublicApiTitleOptionComponent } from '@lucca-front/ng/core-select/api';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LuCoreSelectPublicOccupationCategoriesDirective } from './public-occupation-categories.directive';

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select publicOccupationCategories />`,
	imports: [MockSelectComponent, LuCoreSelectPublicOccupationCategoriesDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(LuCoreSelectPublicOccupationCategoriesDirective.name, () => {
	it('should search the occupation categories and display their translated title', fakeAsync(async () => {
		// Arrange
		let dataSource: SelectDataSource<unknown> | undefined;
		let optionTpl: unknown;
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [
				{
					provide: ALuSelectInputComponent,
					useValue: {
						isPanelOpen$: new BehaviorSubject(false),
						nextPage$: new Subject<void>(),
						clueChange$: new Subject<string>(),
						optionComparer: coreSelectDefaultOptionComparer,
						optionKey: coreSelectDefaultOptionKey,
						optionTpl: { set: (tpl: unknown) => (optionTpl = tpl) },
						dataSource: { set: (ds: SelectDataSource<unknown>) => (dataSource = ds) },
						loading: { set: () => {} },
					},
				},
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		});
		TestBed.createComponent(HostComponent).detectChanges();
		const httpTesting = TestBed.inject(HttpTestingController);

		// Act
		const options = firstValueFrom(dataSource!.getOptions({ clue: 'cad', page: 0 }));
		const req = httpTesting.expectOne('/lucca-api/occupation-categories?search=cad&limit=20&include=links');
		req.flush({ items: [{ id: '45', title: 'Executive' }], links: { next: null } });

		// Assert
		expect(await options).toEqual([{ id: '45', title: 'Executive' }]);
		expect(req.request.headers.get('Api-Version')).toBe('2024-11-01');
		expect(optionTpl).toBe(ɵLuCoreSelectPublicApiTitleOptionComponent);
	}));
});
