import { ChangeDetectionStrategy, Component, computed, Directive, forwardRef, inject, input, signal } from '@angular/core';
import { PORTAL_CONTEXT } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, LuOptionGroupByContext } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Collection, LuCoreSelectApiV5Item, ɵLU_CORE_SELECT_PUBLIC_API_VERSION } from '@lucca-front/ng/core-select/api';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

export interface LuCoreSelectPublicLegalEntity extends LuCoreSelectApiV5Item {
	legalName?: string;
}

export interface LuCoreSelectPublicEstablishment extends LuCoreSelectApiV5Item {
	name: string;
	legalEntity: LuCoreSelectPublicLegalEntity;
}

@Component({
	selector: 'lu-public-establishment-grouping',
	template: `{{ group.options[0].legalEntity.legalName }}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuPublicEstablishmentGroupingComponent {
	group = inject<LuOptionGroupByContext<LuCoreSelectPublicEstablishment, string>>(PORTAL_CONTEXT).$implicit;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicEstablishments],lu-multi-select[publicEstablishments]',
	exportAs: 'luPublicEstablishments',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicEstablishmentsDirective),
		},
	],
})
export class LuCoreSelectPublicEstablishmentsDirective<T extends LuCoreSelectPublicEstablishment = LuCoreSelectPublicEstablishment> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * Query params added to every request, e.g. `{ 'legalEntity.id': '1,2' }`
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = signal('/lucca-api/business-establishments');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly includeEmbedded = true;

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => ({
		isArchived: false,
		...this.filters(),
	}));

	#allOptions?: { key: string; options$: Observable<T[]> };

	protected override getOptionsPage(params: Record<string, string | number | boolean>, page: number): Observable<{ items: T[]; isLastPage: boolean }> {
		if (params['search']) {
			return super.getOptionsPage(params, page);
		}
		if (page > 0) {
			return of({ items: [], isLastPage: true });
		}
		return this.#getAllOptions(params).pipe(
			map((items) => ({ items, isLastPage: true })),
			catchError(() => of({ items: [] as T[], isLastPage: true })),
		);
	}

	protected override getGroupOptions = (legalEntityId: unknown): Observable<T[]> =>
		this.#getAllOptions(this.queryParams()).pipe(map((options) => options.filter((option) => option.legalEntity.id === legalEntityId)));

	protected override toOptions(collection: LuCoreSelectApiV5Collection<T>): Observable<T[]> {
		return of(withLegalEntities(collection));
	}

	#getAllOptions(params: Record<string, string | number | boolean>): Observable<T[]> {
		const key = JSON.stringify(params);
		if (this.#allOptions?.key !== key) {
			this.#allOptions = {
				key,
				options$: this.fetchAll(params).pipe(
					map((collection) => sortByLegalEntity(withLegalEntities(collection))),
					tap((options) => this.#updateGrouping(options)),
					shareReplay(1),
				),
			};
		}
		return this.#allOptions.options$;
	}

	#updateGrouping(options: T[]): void {
		const legalEntityCount = new Set(options.map((option) => option.legalEntity.id)).size;
		this.select.groupingSignal.set(legalEntityCount > 1 && options.length > 1 ? { selector: (option: T) => option.legalEntity.id, content: LuPublicEstablishmentGroupingComponent } : undefined);
	}
}

function withLegalEntities<T extends LuCoreSelectPublicEstablishment>(collection: LuCoreSelectApiV5Collection<T>): T[] {
	const legalEntities = collection.embedded?.['legal-entity'] ?? {};
	return (collection.items ?? []).map((establishment) => ({
		...establishment,
		legalEntity: (legalEntities[establishment.legalEntity.id] as LuCoreSelectPublicLegalEntity | undefined) ?? establishment.legalEntity,
	}));
}

function sortByLegalEntity<T extends LuCoreSelectPublicEstablishment>(establishments: T[]): T[] {
	return [...establishments].sort(
		(a, b) => (a.legalEntity.legalName ?? '').localeCompare(b.legalEntity.legalName ?? '') || a.legalEntity.id.localeCompare(b.legalEntity.id) || a.name.localeCompare(b.name),
	);
}
