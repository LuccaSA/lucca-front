import { ChangeDetectionStrategy, Component, computed, Directive, forwardRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PORTAL_CONTEXT } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, LuOptionGroupByContext } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Collection, LuCoreSelectApiV5Item, ɵLU_CORE_SELECT_PUBLIC_API_VERSION } from '@lucca-front/ng/core-select/api';
import { combineLatest, filter, Observable, of, switchMap } from 'rxjs';

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
		sort: 'legalEntity.name',
		...this.filters(),
	}));

	constructor() {
		super();
		combineLatest([this.fetchTotalCount({ isArchived: false }, '/lucca-api/legal-entities'), this.fetchTotalCount({ isArchived: false })])
			.pipe(
				filter(([legalEntityCount, establishmentCount]) => legalEntityCount > 1 && establishmentCount > 1),
				takeUntilDestroyed(),
			)
			.subscribe(() => this.select.groupingSignal.set({ selector: (option: T) => option.legalEntity.id, content: LuPublicEstablishmentGroupingComponent }));
	}

	protected override getGroupOptions = (legalEntityId: unknown): Observable<T[]> =>
		this.fetchAll({ ...this.queryParams(), 'legalEntity.id': legalEntityId as string }).pipe(switchMap((collection) => this.toOptions(collection)));

	protected override toOptions(collection: LuCoreSelectApiV5Collection<T>): Observable<T[]> {
		const legalEntities = collection.embedded?.['legal-entity'] ?? {};
		return of(
			(collection.items ?? []).map((establishment) => ({
				...establishment,
				legalEntity: (legalEntities[establishment.legalEntity.id] as LuCoreSelectPublicLegalEntity | undefined) ?? establishment.legalEntity,
			})),
		);
	}
}
