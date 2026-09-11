import { HttpClient } from '@angular/common/http';
import { Directive, OnInit, computed, forwardRef, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, map, of, switchMap } from 'rxjs';
import { LuJobQualificationGroupingComponent } from './job-qualification-grouping.component';
import { LuCoreSelectJobQualification } from './models';

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[jobQualifications],lu-multi-select[jobQualifications]',
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

	readonly url = input<string>('/organization/structure/api/job-qualifications');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	readonly searchDelimiter = input<string>(' ');

	protected readonly clue = toSignal(this.clue$);

	public constructor() {
		super();

		this.select.groupingSignal.set({
			selector: (option) => option.job.id,
			content: LuJobQualificationGroupingComponent,
		});
	}

	protected override buildParamsFromClue(clue: string): Observable<Record<string, string | number | boolean>> {
		// Use the clue parameter directly instead of reading from the async signal
		// to avoid stale params when selection triggers an immediate clue reset
		return of({
			...this.filters(),
			...(clue ? { search: applySearchDelimiter(clue, this.searchDelimiter()), sort: 'name' } : { sort: 'job.name,level.position' }),
		});
	}

	/**
	 * Job qualifications are grouped by job, but the panel only knows the options of the pages it
	 * already loaded: a job spanning several pages would be partially selected. Fetch the whole job
	 * instead, page by page, so "select all" covers the options that are not rendered yet. Groups are
	 * only displayed when the clue is empty, hence the clue-less params.
	 */
	protected override getGroupOptions = (jobId: unknown): Observable<T[]> => this.#getJobOptions(jobId as number, 0);

	#getJobOptions(jobId: number, page: number): Observable<T[]> {
		const params = { ...this.filters(), 'job.id': jobId, sort: 'level.position' };
		return this.getOptions(params, page).pipe(
			switchMap((options) => (options.length < this.pageSize ? of(options) : this.#getJobOptions(jobId, page + 1).pipe(map((nextOptions) => [...options, ...nextOptions])))),
		);
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null, page: number): Observable<T[]> {
		return this.httpClient
			.get<T[] | { items: T[] }>(this.url(), {
				params: {
					...params,
					page: page + 1,
					limit: this.pageSize,
				},
			})
			.pipe(map((res) => (Array.isArray(res) ? res : res?.items) ?? []));
	}

	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const filters = this.filters();
		const clue = this.clue();
		return {
			...filters,
			...(clue
				? {
						search: applySearchDelimiter(clue, this.searchDelimiter()),
						sort: 'name',
					}
				: { sort: 'job.name,level.position' }),
		};
	});
	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(this.paramsSignal);

	public readonly totalCount$ = toObservable(computed(() => ({ url: this.url(), filters: this.filters() }))).pipe(
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

	protected override optionKey = (option: T) => option.id;
}
