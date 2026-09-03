import { Directive, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, LuOptionComparer, SelectDataSource } from '@lucca-front/ng/core-select';
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

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

		const dataSource: SelectDataSource<TOption> = {
			paramsChange: this.params$,
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
