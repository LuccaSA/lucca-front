import { HttpClient } from '@angular/common/http';
import { computed, Directive, forwardRef, inject, input, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '@lucca-front/ng/core-select';
import { catchError, debounceTime, map, Observable, of, switchMap, tap } from 'rxjs';
import { ALuCoreSelectApiDirective } from './api.directive';

export interface LuCoreSelectApiV5Item {
	id: string;
}

export interface LuCoreSelectApiV5Collection<T> {
	items: T[];
	totalCount?: number | null;
	links?: {
		next?: { href: string; cursor: string } | null;
	} | null;
}

export const ɵLU_CORE_SELECT_PUBLIC_API_VERSION = '2024-11-01';

type ApiV5Params = Record<string, string | number | boolean>;

@Directive()
export abstract class ALuCoreSelectApiV5Directive<T extends LuCoreSelectApiV5Item> extends ALuCoreSelectApiDirective<T, ApiV5Params> implements CoreSelectApiTotalCountProvider {
	protected httpClient = inject(HttpClient);

	protected abstract readonly url: Signal<string>;

	protected abstract readonly queryParams: Signal<ApiV5Params>;

	protected readonly apiVersion: Signal<string | null> = signal(null);

	protected readonly clue = toSignal(this.clue$, { initialValue: '' });

	#cursorByPage = new Map<number, string>();

	protected override readonly paramsSignal = computed<ApiV5Params>(() => {
		const clue = this.clue();
		return {
			...this.queryParams(),
			...(clue ? { search: clue } : {}),
		};
	});

	protected override readonly params$ = toObservable(this.paramsSignal);

	public override readonly totalCount$ = toObservable(computed(() => ({ url: this.url(), params: this.queryParams() }))).pipe(
		debounceTime(250),
		switchMap(({ url, params }) =>
			this.httpClient.get<LuCoreSelectApiV5Collection<T>>(url, {
				params: { ...params, limit: 0, include: 'totalCount' },
				headers: this.#headers(),
			}),
		),
		map((res) => res.totalCount ?? 0),
	);

	protected override getOptionsPage(params: ApiV5Params, page: number): Observable<{ items: T[]; isLastPage: boolean }> {
		if (page === 0) {
			this.#cursorByPage.clear();
		}
		const cursor = this.#cursorByPage.get(page);
		if (page > 0 && cursor === undefined) {
			return of({ items: [], isLastPage: true });
		}

		return this.httpClient
			.get<LuCoreSelectApiV5Collection<T>>(this.url(), {
				params: {
					...params,
					limit: this.pageSize,
					include: 'links',
					...(cursor ? { page: cursor } : {}),
				},
				headers: this.#headers(),
			})
			.pipe(
				tap(({ links }) => {
					if (links?.next) {
						this.#cursorByPage.set(page + 1, links.next.cursor);
					}
				}),
				map(({ items, links }) => ({ items: items ?? [], isLastPage: !links?.next })),
				catchError(() => of({ items: [] as T[], isLastPage: true })),
			);
	}

	protected override getOptions(params: ApiV5Params, page: number): Observable<T[]> {
		return this.getOptionsPage(params, page).pipe(map(({ items }) => items));
	}

	protected override optionKey = (option: T) => option.id;

	#headers(): Record<string, string> {
		const apiVersion = this.apiVersion();
		return apiVersion ? { 'Api-Version': apiVersion } : {};
	}
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[apiV5],lu-multi-select[apiV5]',
	exportAs: 'luApiV5',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectApiV5Directive),
		},
	],
})
export class LuCoreSelectApiV5Directive<T extends LuCoreSelectApiV5Item = LuCoreSelectApiV5Item> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * URL of a collection following the v5 API conventions: cursor paging through `links`, `search` param and `totalCount` include
	 */
	readonly apiV5 = input.required<string>();

	/**
	 * Sort instruction sent as the `sort` query param, e.g. `name` or `-createdAt`. Each endpoint lists the keys it accepts
	 */
	readonly sort = input<string | null>(null);

	/**
	 * Query params added to every request
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = this.apiV5;

	protected override readonly queryParams = computed<ApiV5Params>(() => {
		const sort = this.sort();
		return { ...this.filters(), ...(sort ? { sort } : {}) };
	});
}
