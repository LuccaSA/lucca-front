import { ChangeDetectionStrategy, Component, computed, Directive, forwardRef, inject, input, LOCALE_ID, signal } from '@angular/core';
import { PORTAL_CONTEXT } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, LuOptionGroupByContext } from '@lucca-front/ng/core-select';
import {
	ALuCoreSelectApiV5Directive,
	LuCoreSelectApiV5Collection,
	LuCoreSelectApiV5Item,
	ɵLU_CORE_SELECT_PUBLIC_API_VERSION,
	ɵluPublicApiTitle,
	ɵLuCoreSelectPublicApiTitled,
	ɵLuCoreSelectPublicApiTitleOptionComponent,
} from '@lucca-front/ng/core-select/api';
import { catchError, map, Observable, of, shareReplay, switchMap } from 'rxjs';

export interface LuCoreSelectPublicProfession extends LuCoreSelectApiV5Item, Partial<ɵLuCoreSelectPublicApiTitled> {}

export interface LuCoreSelectPublicJobQualification extends LuCoreSelectApiV5Item, ɵLuCoreSelectPublicApiTitled {
	profession: LuCoreSelectPublicProfession;
	rank?: number;
}

@Component({
	selector: 'lu-public-job-qualification-grouping',
	template: `{{ title() }}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuPublicJobQualificationGroupingComponent {
	group = inject<LuOptionGroupByContext<LuCoreSelectPublicJobQualification, string>>(PORTAL_CONTEXT).$implicit;
	#locale = inject(LOCALE_ID);

	protected title(): string {
		const profession = this.group.options[0].profession;
		return profession.title ? ɵluPublicApiTitle({ title: profession.title, t9n: profession.t9n }, this.#locale) : '';
	}
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicJobQualifications],lu-multi-select[publicJobQualifications]',
	exportAs: 'luPublicJobQualifications',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicJobQualificationsDirective),
		},
	],
})
export class LuCoreSelectPublicJobQualificationsDirective<T extends LuCoreSelectPublicJobQualification = LuCoreSelectPublicJobQualification> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * Query params added to every request, e.g. `{ 'profession.id': '89' }`
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = signal('/lucca-api/job-qualifications');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => ({ ...this.filters() }));

	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const clue = this.clue();
		return {
			...this.queryParams(),
			...(clue ? { search: clue, sort: 'name' } : { sort: 'profession,rank' }),
		};
	});

	#professions$?: Observable<Map<string, LuCoreSelectPublicProfession>>;

	constructor() {
		super();
		this.select.optionTpl.set(ɵLuCoreSelectPublicApiTitleOptionComponent);
		this.select.groupingSignal.set({
			selector: (option: T) => option.profession.id,
			content: LuPublicJobQualificationGroupingComponent,
		});
	}

	protected override getGroupOptions = (professionId: unknown): Observable<T[]> =>
		this.fetchAll({ ...this.queryParams(), 'profession.id': professionId as string, sort: 'rank' }).pipe(switchMap((collection) => this.toOptions(collection)));

	protected override toOptions(collection: LuCoreSelectApiV5Collection<T>): Observable<T[]> {
		return this.#getProfessions().pipe(
			map((professions) => (collection.items ?? []).map((jobQualification) => ({ ...jobQualification, profession: professions.get(jobQualification.profession.id) ?? jobQualification.profession }))),
		);
	}

	#getProfessions(): Observable<Map<string, LuCoreSelectPublicProfession>> {
		this.#professions$ ??= this.fetchAll<LuCoreSelectPublicProfession>({}, '/lucca-api/professions').pipe(
			map((collection) => new Map((collection.items ?? []).map((profession) => [profession.id, profession]))),
			catchError(() => of(new Map<string, LuCoreSelectPublicProfession>())),
			shareReplay(1),
		);
		return this.#professions$;
	}
}
