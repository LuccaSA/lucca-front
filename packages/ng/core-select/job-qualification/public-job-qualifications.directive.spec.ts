import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, LuOptionGrouping, SelectDataSource } from '@lucca-front/ng/core-select';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LuCoreSelectPublicJobQualification, LuCoreSelectPublicJobQualificationsDirective } from './public-job-qualifications.directive';

@Component({
	selector: 'lu-simple-select',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockSelectComponent {}

@Component({
	template: `<lu-simple-select publicJobQualifications />`,
	imports: [MockSelectComponent, LuCoreSelectPublicJobQualificationsDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

const professions = { items: [{ id: '89', title: 'Developer', t9n: { title: { 'fr-FR': 'Développeur' } } }], links: { next: null } };

describe(LuCoreSelectPublicJobQualificationsDirective.name, () => {
	let dataSource: SelectDataSource<LuCoreSelectPublicJobQualification, unknown> | undefined;
	let grouping: LuOptionGrouping<LuCoreSelectPublicJobQualification, unknown> | undefined;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
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
						groupingSignal: { set: (g: typeof grouping) => (grouping = g) },
						dataSource: { set: (ds: SelectDataSource<LuCoreSelectPublicJobQualification, unknown>) => (dataSource = ds) },
						loading: { set: () => {} },
					},
				},
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		});
		TestBed.createComponent(HostComponent).detectChanges();
		httpTesting = TestBed.inject(HttpTestingController);
	});

	it('should sort by profession and rank without a clue, and attach the profession to each option', fakeAsync(async () => {
		// Act
		const options = firstValueFrom(dataSource!.getOptions({ clue: '', page: 0 }));
		httpTesting
			.expectOne('/lucca-api/job-qualifications?sort=profession,rank&limit=20&include=links')
			.flush({ items: [{ id: '982', title: 'Lead Developer', profession: { id: '89' }, rank: 2 }], links: { next: null } });
		httpTesting.expectOne('/lucca-api/professions?limit=100&include=links').flush(professions);

		// Assert
		expect(await options).toEqual([{ id: '982', title: 'Lead Developer', profession: professions.items[0], rank: 2 }]);
		expect(grouping?.selector({ id: '982', title: 'Lead Developer', profession: { id: '89' } })).toBe('89');
	}));

	it('should search by title sorted by name', fakeAsync(async () => {
		// Act
		const options = firstValueFrom(dataSource!.getOptions({ clue: 'lead', page: 0 }));
		httpTesting.expectOne('/lucca-api/job-qualifications?search=lead&sort=name&limit=20&include=links').flush({ items: [], links: { next: null } });
		httpTesting.expectOne('/lucca-api/professions?limit=100&include=links').flush(professions);

		// Assert
		expect(await options).toEqual([]);
	}));

	it('should load every job qualification of a profession to select it as a whole', fakeAsync(async () => {
		// Act
		const options = firstValueFrom(dataSource!.getGroupOptions!('89'));
		httpTesting
			.expectOne('/lucca-api/job-qualifications?profession.id=89&sort=rank&limit=100&include=links')
			.flush({ items: [{ id: '982', title: 'Lead Developer', profession: { id: '89' } }], links: { next: null } });
		httpTesting.expectOne('/lucca-api/professions?limit=100&include=links').flush(professions);

		// Assert
		expect((await options).map(({ id }) => id)).toEqual(['982']);
	}));
});
