import { Directive, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, LuOptionComparer, SelectDataSource } from '@lucca-front/ng/core-select';
import { BehaviorSubject, catchError, filter, map, Observable, of, pairwise, Subject, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs';

/**
 * Shallow comparison of two params objects: every directive builds its params as a flat record of
 * primitives rebuilt on each computation, so identity never holds and only the values matter.
 */
function paramsEqual<TParams>(a: TParams, b: TParams): boolean {
	if (a === b) {
		return true;
	}
	if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
		return false;
	}
	const aEntries = Object.entries(a as Record<string, unknown>);
	const bParams = b as Record<string, unknown>;
	return aEntries.length === Object.keys(bParams).length && aEntries.every(([key, value]) => bParams[key] === value);
}

export const LU_SELECT_MAGIC_PAGE_SIZE = 20;
export const MAGIC_DEBOUNCE_DURATION = 250;

@Directive()
export abstract class ALuCoreSelectApiDirective<TOption, TParams = Record<string, string | number | boolean> | null> implements OnDestroy, OnInit {
	protected readonly destroy$ = new Subject<void>();
	protected pageSize = LU_SELECT_MAGIC_PAGE_SIZE;
	protected debounceDuration = MAGIC_DEBOUNCE_DURATION;

	public select = inject<ALuSelectInputComponent<TOption, unknown>>(ALuSelectInputComponent);

	/**
	 * Current clue — updated by clueChange$ subscription (keeps select in searchable mode)
	 * and by direct getOptions calls from the select component.
	 */
	protected readonly currentClue$ = new BehaviorSubject<string>('');

	/**
	 * Clue observable — no debounce (debounce is now handled by the select component).
	 */
	protected readonly clue$ = this.currentClue$.asObservable();

	/**
	 * Create an object that will be used as params for the api call
	 */
	protected abstract params$: Observable<TParams>;

	/**
	 * Optional synchronous view of {@link params$}. When a directive derives its params from signals,
	 * it should expose them here so {@link buildParamsFromClue} can read the value that reflects the
	 * clue we just set — reading `params$` (a `toObservable` replay) can otherwise hand back the
	 * previous clue's params on the non-debounced empty-clue path, leaving searches stuck.
	 */
	protected readonly paramsSignal?: Signal<TParams>;

	/**
	 * Compare two options to know if they are the same. For example, compare by id or by JSON
	 */
	protected optionComparer: LuOptionComparer<TOption> = (a, b) => this.optionKey(a) === this.optionKey(b);

	/**
	 * Return a unique key to identify the option in for-of loops
	 */
	protected abstract optionKey: (option: TOption) => unknown;

	/**
	 * Return the options for the given params and page
	 */
	protected abstract getOptions(params: TParams, page: number): Observable<TOption[]>;

	/**
	 * Return every option of a group, ignoring pagination, so the group "select all" acts on the whole
	 * group and not only on the pages already loaded. Override it in directives that set a grouping;
	 * left undefined, the panel keeps its default behaviour and toggles the rendered options only.
	 */
	protected getGroupOptions?: (group: unknown) => Observable<TOption[]>;

	#lastClue?: string;
	#lastPage?: number;

	public ngOnInit(): void {
		if (this.select.optionComparer() === coreSelectDefaultOptionComparer) {
			this.select.optionComparer.set(this.optionComparer);
		}

		if (this.select.optionKey() === coreSelectDefaultOptionKey) {
			this.select.optionKey.set(this.optionKey);
		}

		// Subscribe to clueChange$ to (1) keep the select in searchable mode and (2) drive currentClue$
		this.select.clueChange$.pipe(takeUntil(this.destroy$)).subscribe((clue) => {
			this.currentClue$.next(clue);
			this.clearLastPageByClue();
		});

		const dataSource: SelectDataSource<TOption, unknown> = {
			paramsChange: this.buildParamsChange(),
			...(this.getGroupOptions ? { getGroupOptions: (group: unknown) => this.getGroupOptions!(group) } : {}),
			clueDebounceMs: this.debounceDuration,
			getTotalCount: () => this.totalCount$,
			reset: () => this.clearLastPageByClue(),
			transformOptions: (options) => this.transformOptions(options),
			getOptions: ({ clue, page }) => {
				const lastPage = clue === this.#lastClue ? this.#lastPage : undefined;
				if (lastPage !== undefined && page > lastPage) {
					return of([] as readonly TOption[]);
				}
				return this.buildParamsFromClue(clue).pipe(
					take(1),
					switchMap((params) =>
						this.getOptionsPage(params, page).pipe(
							tap(({ isLastPage }) => {
								if (isLastPage) {
									this.#lastClue = clue;
									this.#lastPage = page;
								}
							}),
							map(({ items }) => items as readonly TOption[]),
						),
					),
				);
			},
		};

		this.select.dataSource.set(dataSource);
	}

	/**
	 * Emits whenever something *other than the clue* changed in {@link params$}, so the option stream
	 * resets and reloads from page 0 — a panel header toggle, a filter bound to an input…
	 *
	 * Clue changes are already the select's own business (debounce included), and every directive folds
	 * the clue into its params under its own key — sometimes driving the sort along with it — so there
	 * is no clue key to strip generically. They are recognized here by comparing the clue of two
	 * consecutive params emissions instead: same clue but different params means a real params change.
	 */
	protected buildParamsChange(): Observable<TParams> {
		return this.params$.pipe(
			withLatestFrom(this.currentClue$),
			// Drops the initial params: the panel opening already loads them
			pairwise(),
			filter(([[previousParams, previousClue], [params, clue]]) => clue === previousClue && !paramsEqual(previousParams, params)),
			map(([, [params]]) => params),
		);
	}

	/**
	 * Post-process the whole list of loaded options (all pages accumulated). Override it for
	 * decorations that can't be computed page by page, eg. flagging homonyms across pages.
	 */
	protected transformOptions(options: readonly TOption[]): Observable<readonly TOption[]> {
		return of(options);
	}

	protected buildParamsFromClue(clue: string): Observable<TParams> {
		this.currentClue$.next(clue);
		// Prefer the synchronous signal (always reflects the clue we just set); fall back to the
		// reactive observable for directives that still build their params from observables.
		return this.paramsSignal ? of(this.paramsSignal()) : this.params$.pipe(take(1));
	}

	public abstract totalCount$: Observable<number>;

	protected clearLastPageByClue() {
		this.#lastClue = undefined;
		this.#lastPage = undefined;
	}

	protected getOptionsPage(params: TParams, page: number): Observable<{ items: TOption[]; isLastPage: boolean }> {
		return this.getOptions(params, page).pipe(
			catchError(() => of([] as TOption[])),
			map((items) => ({ items, isLastPage: items.length < this.pageSize })),
		);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
