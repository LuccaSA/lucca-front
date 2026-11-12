import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, SelectDataSource } from '@lucca-front/ng/core-select';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LuCoreSelectPublicDepartmentsDirective } from './public-departments.directive';

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select publicDepartments />`,
	imports: [MockSelectComponent, LuCoreSelectPublicDepartmentsDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(LuCoreSelectPublicDepartmentsDirective.name, () => {
	it('should search the non archived departments sorted by name', fakeAsync(async () => {
		// Arrange
		let dataSource: SelectDataSource<unknown> | undefined;
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
						optionTpl: { set: () => {} },
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
		const options = firstValueFrom(dataSource!.getOptions({ clue: 'bob', page: 0 }));
		const req = httpTesting.expectOne((r) => r.urlWithParams === '/lucca-api/departments?isArchived=false&sort=name&search=bob&limit=20&include=links');
		req.flush({ items: [{ id: '1' }], links: { next: null } });

		// Assert
		expect(await options).toEqual([{ id: '1' }]);
		expect(req.request.headers.get('Api-Version')).toBe('2024-11-01');
	}));
});
