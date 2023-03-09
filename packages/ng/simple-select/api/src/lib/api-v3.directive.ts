import { HttpClient } from '@angular/common/http';
import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ILuApiCollectionResponse, ILuApiItem } from '@lucca-front/ng/api';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { BehaviorSubject, catchError, combineLatest, concatMap, debounceTime, filter, map, of, ReplaySubject, scan, startWith, Subject, switchMap, takeUntil, takeWhile, tap } from 'rxjs';

export const MAGIC_PAGE_SIZE = 20;
export const MAGIC_DEBOUNCE_TIME = 250;

@Directive({
	selector: 'lu-simple-select[apiV3]',
	standalone: true,
})
export class LuSimpleSelectApiV3Directive<T extends ILuApiItem> implements OnDestroy, OnInit {
	@Input()
	public set apiV3(value: string) {
		this.url$.next(value);
	}

	@Input()
	public set fields(value: string) {
		this.fields$.next(value);
	}

	@Input()
	public set orderBy(value: string) {
		this.orderBy$.next(value);
	}

	@Input()
	public set filters(value: Record<string, string | number | boolean>) {
		this.filters$.next(value);
	}

	protected url$ = new ReplaySubject<string>(1);
	protected fields$ = new BehaviorSubject<string>('id,name');
	protected orderBy$ = new BehaviorSubject<string>('name,asc');
	protected filters$ = new BehaviorSubject<Record<string, string | number | boolean>>({});

	protected destroy$ = new Subject<void>();

	protected select = inject<LuSimpleSelectInputComponent<T>>(LuSimpleSelectInputComponent);
	protected httpClient = inject(HttpClient);

	protected page$ = this.select.nextPage.pipe(
		scan((page) => page + 1, 0),
		startWith(0),
	);

	protected clue$ = this.select.clueChange.pipe(startWith(''), debounceTime(MAGIC_DEBOUNCE_TIME));

	protected request$ = combineLatest([this.select.isPanelOpen$, this.url$, this.fields$, this.filters$, this.orderBy$, this.clue$]).pipe(
		filter(([panelOpened]) => panelOpened),
		map(([, url, fields, filters, orderBy, clue]) => ({
			url,
			params: {
				...filters,
				fields: fields,
				orderBy: orderBy,
				...(clue ? { name: `like,${encodeURIComponent(clue)}` } : {}),
			},
		})),
	);

	protected loading$ = new BehaviorSubject(false);

	protected options$ = this.request$.pipe(
		debounceTime(0),
		switchMap((request) =>
			this.page$.pipe(
				concatMap((page) => {
					this.loading$.next(true);
					return this.httpClient
						.get<ILuApiCollectionResponse<T>>(request.url, {
							params: {
								...request.params,
								paging: `${page * MAGIC_PAGE_SIZE},${MAGIC_PAGE_SIZE}`,
							},
						})
						.pipe(
							map((response) => response?.data?.items || []),
							catchError(() => of([])),
							tap(() => this.loading$.next(false)),
						);
				}),
				takeWhile((items) => items.length === MAGIC_PAGE_SIZE, true),
				scan((acc, items) => [...acc, ...items], [] as T[]),
			),
		),
	);

	public ngOnInit(): void {
		this.options$.pipe(takeUntil(this.destroy$)).subscribe(this.select.options$);
		this.loading$.pipe(debounceTime(0), takeUntil(this.destroy$)).subscribe(this.select.loading$);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
