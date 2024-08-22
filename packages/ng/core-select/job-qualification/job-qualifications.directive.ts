import { HttpClient } from '@angular/common/http';
import { Directive, Input, OnInit, computed, forwardRef, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, combineLatest, debounceTime, map, switchMap } from 'rxjs';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '../select.model';
import { LuJobQualificationGroupingComponent } from './job-qualification-grouping.component';
import { LuCoreSelectJobQualification } from './models';

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[jobQualifications],lu-multi-select[jobQualifications]',
	standalone: true,
	exportAs: 'jobQualifications',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectJobQualificationsDirective),
		},
	],
})
export class LuCoreSelectJobQualificationsDirective<T extends LuCoreSelectJobQualification = LuCoreSelectJobQualification>
	extends ALuCoreSelectApiDirective<T>
	implements OnInit, CoreSelectApiTotalCountProvider
{
	protected httpClient = inject(HttpClient);

	@Input()
	public set url(url: string | null) {
		this._url.set(url);
	}

	@Input()
	public set filters(filters: Record<string, string | number | boolean> | null) {
		this._filters.set(filters);
	}

	protected _url = signal<string>('/organization/structure/api/job-qualifications');
	protected _filters = signal<Record<string, string | number | boolean> | null>(null);

	public constructor() {
		super();

		this.select.grouping = {
			selector: (option) => option.job.id,
			content: LuJobQualificationGroupingComponent,
		};
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null, page: number): Observable<T[]> {
		return this.httpClient
			.get<T[] | { items: T[] }>(this._url(), {
				params: {
					...params,
					page: page + 1,
					limit: this.pageSize,
				},
			})
			.pipe(map((res) => (Array.isArray(res) ? res : res?.items) ?? []));
	}

	protected override params$: Observable<Record<string, string | number | boolean>> = combineLatest([toObservable(this._filters), this.clue$]).pipe(
		map(([filters, clue]) => ({
			...filters,
			...(clue ? { search: clue, sort: 'name' } : { sort: 'job.name,level.position' }),
		})),
	);

	public totalCount$ = toObservable(computed(() => ({ url: this._url(), filters: this._filters() }))).pipe(
		debounceTime(250),
		switchMap(({ url, filters }) =>
			this.httpClient.get<{ count: number }>(url, {
				params: {
					...filters,
					['fields.root']: 'count',
				},
			}),
		),
		map((res) => res?.count ?? 0),
	);

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
	protected override optionKey = (option: T) => option.id;
}
