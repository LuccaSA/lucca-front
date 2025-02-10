import { HttpClient } from '@angular/common/http';
import { Directive, OnInit, computed, forwardRef, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, map, switchMap } from 'rxjs';
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

	url = input<string>('/organization/structure/api/job-qualifications');
	filters = input<Record<string, string | number | boolean> | null>(null);
	searchDelimiter = input<string>(' ');

	protected clue = toSignal(this.clue$);

	public constructor() {
		super();

		this.select.grouping = {
			selector: (option) => option.job.id,
			content: LuJobQualificationGroupingComponent,
		};
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

	protected override params$: Observable<Record<string, string | number | boolean>> = toObservable(
		computed(() => {
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
		}),
	);

	public totalCount$ = toObservable(computed(() => ({ url: this.url(), filters: this.filters() }))).pipe(
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
