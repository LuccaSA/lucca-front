import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { BehaviorSubject, catchError, combineLatest, concatMap, debounceTime, Observable, of, scan, startWith, Subject, switchMap, takeUntil, takeWhile, tap } from 'rxjs';

export const MAGIC_PAGE_SIZE = 20;
export const MAGIC_DEBOUNCE_DURATION = 250;

@Directive()
export abstract class ALuSimpleSelectApiDirective<TOption, TParams = Record<string, string | number | boolean>> implements OnDestroy, OnInit {
	protected destroy$ = new Subject<void>();
	protected pageSize = MAGIC_PAGE_SIZE;
	protected debounceDuration = MAGIC_DEBOUNCE_DURATION;

	protected select = inject<LuSimpleSelectInputComponent<TOption>>(LuSimpleSelectInputComponent);

	protected page$ = this.select.nextPage.pipe(
		scan((page) => page + 1, 0),
		startWith(0),
	);

	protected clue$ = this.select.clueChange.pipe(startWith(''), debounceTime(this.debounceDuration));

	protected abstract params$: Observable<TParams>;
	protected abstract getOptions(params: TParams, page: number): Observable<TOption[]>;

	protected loading$ = new BehaviorSubject(false);

	public ngOnInit(): void {
		this.buildOptions().pipe(takeUntil(this.destroy$)).subscribe(this.select.options$);
		this.loading$.pipe(debounceTime(0), takeUntil(this.destroy$)).subscribe(this.select.loading$);
	}

	protected buildOptions(): Observable<TOption[]> {
		return combineLatest([this.params$.pipe(debounceTime(0)), this.select.isPanelOpen$]).pipe(
			switchMap(([params, isOpened]) =>
				isOpened
					? this.page$.pipe(
							concatMap((page) => {
								this.loading$.next(true);
								return this.getOptions(params, page).pipe(
									catchError(() => of([])),
									tap(() => this.loading$.next(false)),
								);
							}),
							takeWhile((items) => items.length === this.pageSize, true),
							scan((acc, items) => [...acc, ...items], [] as TOption[]),
					  )
					: of([]),
			),
		);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
