import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, LuOptionComparer, SelectDataSource } from '@lucca-front/ng/core-select';
import {
	BehaviorSubject,
	catchError,
	combineLatest,
	concatMap,
	debounceTime,
	distinctUntilChanged,
	map,
	merge,
	Observable,
	of,
	pairwise,
	scan,
	startWith,
	Subject,
	switchMap,
	take,
	takeUntil,
	tap,
} from 'rxjs';

export const LU_SELECT_MAGIC_PAGE_SIZE = 20;
export const MAGIC_DEBOUNCE_DURATION = 250;

@Directive()
export abstract class ALuCoreSelectApiDirective<TOption, TParams = Record<string, string | number | boolean> | null> implements OnDestroy, OnInit {
	protected readonly destroy$ = new Subject<void>();
	protected pageSize = LU_SELECT_MAGIC_PAGE_SIZE;
	protected debounceDuration = MAGIC_DEBOUNCE_DURATION;

	public select = inject<ALuSelectInputComponent<TOption, unknown>>(ALuSelectInputComponent);

	protected readonly page$ = this.select.nextPage$.pipe(
		scan((page) => page + 1, 0),
		startWith(0),
	);

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

	protected buildParamsFromClue(clue: string): Observable<TParams> {
		this.currentClue$.next(clue);
		return this.params$.pipe(take(1));
	}

	public abstract totalCount$: Observable<number>;

	protected buildOptions(): Observable<TOption[]> {
		// Prevent a double call to getOptions when the clue is changed while the panel is closed
		const clueIsPendingDebounce$ = merge(this.select.clueChange$.pipe(map(() => true)), this.clue$.pipe(map(() => false))).pipe(distinctUntilChanged());
		const isOpen$ = combineLatest([this.select.isPanelOpen$, clueIsPendingDebounce$]).pipe(
			debounceTime(0),
			startWith([false, false]),
			pairwise(),
			tap(([[wasOpen], [isOpen, clueIsPendingDebounce]]) => {
				// Start the loader as soon as the panel is opened to avoid a short display of the "no result" message
				if (!wasOpen && isOpen && clueIsPendingDebounce) {
					this.select.loading.set(true);
				}
			}),
			map(([[wasOpen], [isOpen, clueIsPendingDebounce]]) => (isOpen && !wasOpen ? !clueIsPendingDebounce : isOpen)),
			distinctUntilChanged(),
		);

		return combineLatest([this.params$, isOpen$]).pipe(
			switchMap(([params, isOpened]) => {
				const hasNextPage$ = new Subject<void>();

				return isOpened
					? this.page$.pipe(
							takeUntil(hasNextPage$),
							concatMap((page) => this.getOptionsPage(params, page).pipe(map(({ items, isLastPage }) => ({ items, isLastPage, page })))),
							tap(({ isLastPage }) => {
								if (isLastPage) {
									// `getOptionsPage` can emit multiple times (for example, when adding homonyms additional information),
									// so we cannot use takeWhile here.
									hasNextPage$.next();
									hasNextPage$.complete();
								}
							}),
							scan(
								(acc, { items, page }) => {
									acc[page] = items;
									return acc;
								},
								{} as Record<number, TOption[]>,
							),
							map((pages) => Object.values(pages).flat()),
						)
					: of([] as TOption[]);
			}),
		);
	}

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
