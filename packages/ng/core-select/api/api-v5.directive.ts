import { HttpClient } from '@angular/common/http';
import { computed, Directive, forwardRef, inject, input, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '@lucca-front/ng/core-select';
import { catchError, debounceTime, EMPTY, expand, map, Observable, of, reduce, switchMap, tap } from 'rxjs';
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
	embedded?: Record<string, Record<string, unknown>> | null;
}

export const ɵLU_CORE_SELECT_PUBLIC_API_VERSION = '2024-11-01';

const MAX_LIMIT = 100;

type ApiV5Params = Record<string, string | number | boolean>;

function mergeEmbedded(a: Record<string, Record<string, unknown>>, b: Record<string, Record<string, unknown>>): Record<string, Record<string, unknown>> {
	const merged = { ...a };
	for (const [type, resources] of Object.entries(b)) {
		merged[type] = { ...merged[type], ...resources };
	}
	return merged;
}

@Directive()
export abstract class ALuCoreSelectApiV5Directive<TItem extends LuCoreSelectApiV5Item, TOption = TItem>
	extends ALuCoreSelectApiDirective<TOption, ApiV5Params>
	implements CoreSelectApiTotalCountProvider
{
	protected httpClient = inject(HttpClient);

	protected abstract readonly url: Signal<string>;

	protected abstract readonly queryParams: Signal<ApiV5Params>;

	protected readonly apiVersion: Signal<string | null> = signal(null);

	protected readonly includeEmbedded: boolean = false;

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
			this.httpClient.get<LuCoreSelectApiV5Collection<TItem>>(url, {
				params: { ...params, limit: 0, include: 'totalCount' },
				headers: this.#headers(),
			}),
		),
		map((res) => res.totalCount ?? 0),
	);

	protected override getOptionsPage(params: ApiV5Params, page: number): Observable<{ items: TOption[]; isLastPage: boolean }> {
		if (page === 0) {
			this.#cursorByPage.clear();
		}
		const cursor = this.#cursorByPage.get(page);
		if (page > 0 && cursor === undefined) {
			return of({ items: [], isLastPage: true });
		}

		return this.fetchPage(params, cursor).pipe(
			tap(({ links }) => {
				if (links?.next) {
					this.#cursorByPage.set(page + 1, links.next.cursor);
				}
			}),
			switchMap((collection) => this.toOptions(collection).pipe(map((items) => ({ items, isLastPage: !collection.links?.next })))),
			catchError(() => of({ items: [] as TOption[], isLastPage: true })),
		);
	}

	protected override getOptions(params: ApiV5Params, page: number): Observable<TOption[]> {
		return this.getOptionsPage(params, page).pipe(map(({ items }) => items));
	}

	protected fetchPage(params: ApiV5Params, cursor?: string, limit = this.pageSize, url = this.url()): Observable<LuCoreSelectApiV5Collection<TItem>> {
		return this.httpClient.get<LuCoreSelectApiV5Collection<TItem>>(url, {
			params: {
				...params,
				limit,
				include: this.includeEmbedded ? 'links,embedded' : 'links',
				...(cursor ? { page: cursor } : {}),
			},
			headers: this.#headers(),
		});
	}

	protected fetchAll<TResource = TItem>(params: ApiV5Params, url = this.url()): Observable<LuCoreSelectApiV5Collection<TResource>> {
		const fetch = (cursor?: string) => this.fetchPage(params, cursor, MAX_LIMIT, url) as unknown as Observable<LuCoreSelectApiV5Collection<TResource>>;
		return fetch().pipe(
			expand((collection) => (collection.links?.next ? fetch(collection.links.next.cursor) : EMPTY)),
			reduce<LuCoreSelectApiV5Collection<TResource>, Required<Pick<LuCoreSelectApiV5Collection<TResource>, 'items' | 'embedded'>>>(
				(all, collection) => ({
					items: [...all.items, ...(collection.items ?? [])],
					embedded: mergeEmbedded(all.embedded ?? {}, collection.embedded ?? {}),
				}),
				{ items: [], embedded: {} },
			),
		);
	}

	protected toOptions(collection: LuCoreSelectApiV5Collection<TItem>): Observable<TOption[]> {
		return of((collection.items ?? []) as unknown as TOption[]);
	}

	protected override optionKey = (option: TOption) => (option as unknown as LuCoreSelectApiV5Item).id;

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
	 * Version sent as the `Api-Version` header, e.g. `2024-11-01`. Omitted when null
	 */
	override readonly apiVersion = input<string | null>(null);

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
