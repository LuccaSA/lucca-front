import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { ALuSelectInputComponent, coreSelectDefaultOptionComparer, coreSelectDefaultOptionKey, LuOptionComparer } from '@lucca-front/ng/core-select';
import { catchError, combineLatest, concatMap, debounceTime, distinctUntilChanged, map, merge, Observable, of, pairwise, scan, startWith, Subject, switchMap, takeUntil, takeWhile, tap } from 'rxjs';

export const LU_SELECT_MAGIC_PAGE_SIZE = 20;
export const MAGIC_DEBOUNCE_DURATION = 250;

@Directive()
export abstract class ALuCoreSelectApiDirective<TOption, TParams = Record<string, string | number | boolean>> implements OnDestroy, OnInit {
	protected destroy$ = new Subject<void>();
	protected pageSize = LU_SELECT_MAGIC_PAGE_SIZE;
	protected debounceDuration = MAGIC_DEBOUNCE_DURATION;

	public select = inject<ALuSelectInputComponent<TOption, unknown>>(ALuSelectInputComponent);

	protected page$ = this.select.nextPage.pipe(
		scan((page) => page + 1, 0),
		startWith(0),
	);

	protected clue$ = this.select.clueChange.pipe(debounceTime(this.debounceDuration), startWith(''));

	/**
	 * Create an object that will be used as params for the api call
	 */
	protected abstract params$: Observable<TParams>;

	/**
	 * Compare two options to know if they are the same. For example, compare by id or by JSON
	 */
	protected abstract optionComparer: LuOptionComparer<TOption>;

	/**
	 * Return a key to identify the option in for-of loops
	 */
	protected abstract optionKey: (option: TOption) => unknown;

	/**
	 * Return the options for the given params and page
	 */
	protected abstract getOptions(params: TParams, page: number): Observable<TOption[]>;

	public ngOnInit(): void {
		if (this.select.optionComparer === coreSelectDefaultOptionComparer) {
			this.select.optionComparer = this.optionComparer;
		}

		if (this.select.optionKey === coreSelectDefaultOptionKey) {
			this.select.optionKey = this.optionKey;
		}

		this.buildOptions()
			.pipe(takeUntil(this.destroy$))
			.subscribe((options) => (this.select.options = options));
	}

	protected buildOptions(): Observable<TOption[]> {
		// Prevent a double call to getOptions when the clue is changed while the panel is closed
		const clueIsPendingDebounce$ = merge(this.select.clueChange.pipe(map(() => true)), this.clue$.pipe(map(() => false))).pipe(distinctUntilChanged());
		const isOpen$ = combineLatest([this.select.isPanelOpen$, clueIsPendingDebounce$]).pipe(
			debounceTime(0),
			startWith([false, false]),
			pairwise(),
			tap(([[wasOpen], [isOpen, clueIsPendingDebounce]]) => {
				// Start the loader as soon as the panel is opened to avoid a short display of the "no result" message
				if (!wasOpen && isOpen && clueIsPendingDebounce) {
					this.select.loading = true;
				}
			}),
			map(([[wasOpen], [isOpen, clueIsPendingDebounce]]) => (isOpen && !wasOpen ? !clueIsPendingDebounce : isOpen)),
			distinctUntilChanged(),
		);

		return combineLatest([this.params$, isOpen$]).pipe(
			switchMap(([params, isOpened]) =>
				isOpened
					? this.page$.pipe(
							concatMap((page) => this.getOptionsPage(params, page).pipe(map(({ items, isLastPage }) => ({ items, isLastPage, page })))),
							takeWhile(({ isLastPage }) => !isLastPage, true),
							scan(
								(acc, { items, page }) => {
									acc[page] = items;
									return acc;
								},
								{} as Record<number, TOption[]>,
							),
							map((pages) => Object.values(pages).flat()),
						)
					: of([] as TOption[]),
			),
		);
	}

	protected getOptionsPage(params: TParams, page: number): Observable<{ items: TOption[]; isLastPage: boolean }> {
		this.select.loading = true;

		return this.getOptions(params, page).pipe(
			catchError(() => of([] as TOption[])),
			tap(() => (this.select.loading = false)),
			map((items) => ({ items, isLastPage: items.length < this.pageSize })),
		);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
