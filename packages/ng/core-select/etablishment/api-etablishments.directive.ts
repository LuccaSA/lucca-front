import { DestroyRef, Directive, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map } from 'rxjs';
import { LuEstablishmentGroupingComponent } from './establishment-grouping.component';
import { EstablishmentGroupingService } from './establishment-grouping.service';
import { LuCoreSelectEstablishment } from './models';

export interface LuCoreSelectEstablishmentsApiConfig {
	url: string;
	filters: Record<string, string | number | boolean>;
	appInstanceId: number;
	operations: number[];
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[establishmentsApi],lu-multi-select[establishmentsApi]',
	standalone: true,
})
export class LuCoreSelectEstablishmentsApiDirective<T extends LuCoreSelectEstablishment> extends LuCoreSelectApiV4Directive<T> implements OnInit {
	#defaultEstablishmentsUrl = '/organization/structure/api/establishments';
	#groupingService = inject(EstablishmentGroupingService);
	#destroyRef = inject(DestroyRef);

	constructor() {
		super();

		this.url$.next(this.#defaultEstablishmentsUrl);
	}

	public override ngOnInit(): void {
		super.ngOnInit();

		this.#groupingService.useGrouping$.pipe(filter(Boolean), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
			this.select.grouping = {
				selector: (option) => option.legalUnitId,
				content: LuEstablishmentGroupingComponent,
			};
		});
	}

	protected operationIds$ = new BehaviorSubject<number[] | null>(null);
	protected appInstanceId$ = new BehaviorSubject<number | null>(null);

	protected override params$: Observable<Record<string, string | number | boolean>> = combineLatest([
		distinct(this.filters$, (f) => JSON.stringify(f)),
		distinct(this.sort$),
		distinct(this.clue$),
		distinct(this.operationIds$, (ids) => JSON.stringify(ids)),
		distinct(this.appInstanceId$),
	]).pipe(
		map(([filters, sortBy, clue, operationIds, appInstanceId]) => ({
			...filters,
			...(sortBy ? { sortBy } : {}),
			...(clue ? { clue: sanitizeClueFilter(clue) } : {}),
			...(operationIds ? { operationIds: operationIds.join(',') } : {}),
			...(appInstanceId ? { appInstanceId } : {}),
		})),
	);

	@Input('establishmentsApi')
	public set config(config: Partial<LuCoreSelectEstablishmentsApiConfig>) {
		if (config.url) {
			this.url$.next(config.url);
		}
		if (config.filters) {
			this.filters$.next(config.filters);
		}
		if (config.appInstanceId) {
			this.appInstanceId$.next(config.appInstanceId);
		}
		if (config.operations) {
			this.operationIds$.next(config.operations);
		}
	}
}

function distinct<T>(obs$: Observable<T>, by?: (item: T) => string): Observable<T> {
	return obs$.pipe(distinctUntilChanged(by && ((a, b) => by(a) === by(b))));
}

function sanitizeClueFilter(clue: string) {
	return clue
		.split(' ')
		.map((c: string) => encodeURIComponent(c))
		.join(',');
}
