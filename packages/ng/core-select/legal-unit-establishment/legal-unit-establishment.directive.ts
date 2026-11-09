import { HttpClient } from '@angular/common/http';
import { Directive, OnInit, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TreeGenerator, TreeNode, applySearchDelimiter, luAccumulatePages } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { getIntl } from '@lucca-front/ng/core';
import { LU_CORE_SELECT_LEGAL_UNIT_ESTABLISHMENT_TRANSLATIONS } from './legal-unit-establishment.translate';
import { BehaviorSubject, Observable, forkJoin, map, takeUntil, tap } from 'rxjs';
import { LuLegalUnitEstablishmentDisplayerComponent } from './legal-unit-establishment-displayer.component';
import {
	LuEstablishmentOption,
	LuLegalUnitEstablishmentOption,
	LuLegalUnitOption,
	LuLegalUnitEstablishmentSelection,
	luEstablishmentOption,
	luLegalUnitEstablishmentOptions,
	luLegalUnitEstablishmentSelection,
	luLegalUnitOption,
} from './models';

type ApiResponse<T> = T[] | { items: T[] };

type MatchedEstablishment = { id: number; name: string; legalUnitId: number; legalUnit?: { id: number; name: string } };

function itemsOf<T>(response: ApiResponse<T>): T[] {
	return (Array.isArray(response) ? response : response?.items) ?? [];
}

/**
 * Lists legal units and their establishments in a single multi-select, so a setting can target
 * either level. There is no endpoint serving both, so the two collections are combined here: the
 * legal units drive the list, and a legal unit fetches its establishments when it is unfolded.
 *
 * The field shows up to 20 values before grouping the rest behind a "+ N" chip, which the
 * consumer sets with `[maxValuesShown]="20"`: a directive cannot give an Angular input a
 * different default, the shell keeps its own.
 */
@Directive({
	// The attribute is already prefixed with "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-multi-select[legalUnitEstablishment]',
	exportAs: 'luLegalUnitEstablishment',
	host: {
		// Legal unit and establishment names run long, so a chip gets more room here than elsewhere
		'[style.--components-multiSelect-displayerChip-maxInlineSize]': "'12rem'",
	},
})
export class LuCoreSelectLegalUnitEstablishmentDirective
	extends ALuCoreSelectApiDirective<LuLegalUnitEstablishmentOption>
	implements OnInit, TreeGenerator<LuLegalUnitEstablishmentOption, TreeNode<LuLegalUnitEstablishmentOption>>
{
	protected httpClient = inject(HttpClient);

	readonly legalUnitsUrl = input<string>('/organization/structure/api/legal-units');
	readonly establishmentsUrl = input<string>('/organization/structure/api/establishments');
	readonly searchDelimiter = input<string>(' ');

	/**
	 * Establishments are folded under their legal unit. Read by the panel through the tree generator
	 * contract: without it the list would have to load every establishment of every legal unit up
	 * front, which is what this field exists to avoid.
	 */
	readonly collapsible = true;

	/**
	 * A legal unit is a rule: selecting it covers the establishments it holds today and those added
	 * later, so it is published alone. Selecting its establishments one by one would freeze the
	 * selection to the ones that exist now, which is the opposite of what the field is for.
	 */
	readonly parentStandsForChildren = true;

	readonly #intl = getIntl(LU_CORE_SELECT_LEGAL_UNIT_ESTABLISHMENT_TRANSLATIONS);

	/** Names what the chevron acts on, the icon inside it being decorative. */
	readonly disclosureLabel = (node: LuLegalUnitEstablishmentOption, expanded: boolean): string => `${expanded ? this.#intl.collapse : this.#intl.expand} ${node.name}`;

	/**
	 * What the panel renders under each legal unit. A `BehaviorSubject` rather than a plain map
	 * because `transformOptions` keeps listening to it: every change re-emits the whole option list
	 * with the children spliced in, which is how rows fetched after the fact reach a pipeline that
	 * otherwise only grows one page at a time.
	 */
	readonly #renderedChildren$ = new BehaviorSubject<ReadonlyMap<number, LuEstablishmentOption[]>>(new Map());

	/** Everything a legal unit holds, kept across searches so clearing one costs no refetch. */
	readonly #allChildren = new Map<number, LuEstablishmentOption[]>();

	/** What the current clue matched, per legal unit. A search shows these alone. */
	readonly #matchedChildren = new Map<number, LuEstablishmentOption[]>();

	/**
	 * Which legal units are unfolded. Held here rather than in the branches, which die with the
	 * panel: this is what makes an unfolded row still unfolded the next time the panel opens, and
	 * what lets a row folded by hand during a search stay folded until the clue changes.
	 */
	readonly #expandedLegalUnitIds = new Set<number>();

	/** The unfolded rows as they were before the current search, restored when it is cleared. */
	#expandedBeforeSearch: Set<number> | null = null;

	protected readonly clue = toSignal(this.clue$);

	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const clue = this.clue();
		return {
			...(clue ? { search: applySearchDelimiter(clue, this.searchDelimiter()) } : {}),
			sort: 'name',
		};
	});

	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(this.paramsSignal);

	// A legal unit and an establishment can share an id, so the kind has to be part of the key:
	// everything downstream — `track`, the comparer, the selected check — keys options on it.
	protected override optionKey = (option: LuLegalUnitEstablishmentOption) => `${option.kind}:${option.id}`;

	constructor() {
		super();
		this.select.treeGenerator = this;
		// Only the chips read `valueTpl`; the option rows keep the default renderer.
		this.select.valueTpl.set(LuLegalUnitEstablishmentDisplayerComponent);

		// The select keeps working on a flat array of options internally — which is what every
		// count, chip and placeholder of `lu-multi-select` reads — and only the two ends of the
		// form-control contract are translated. Same interception point as `withSelectAll`, minus
		// its eight other patches: the internal shape is unchanged here.
		const writeOptions = this.select.writeValue.bind(this.select);
		const registerOptionsChange = this.select.registerOnChange.bind(this.select);

		this.select.writeValue = (value) => writeOptions(luLegalUnitEstablishmentOptions(value as LuLegalUnitEstablishmentSelection | null));
		(this.select as { registerOnChange: (fn: (value: LuLegalUnitEstablishmentSelection) => void) => void }).registerOnChange = (onChange) =>
			registerOptionsChange((options) => onChange(luLegalUnitEstablishmentSelection((options as LuLegalUnitEstablishmentOption[]) ?? [])));
	}

	public override ngOnInit(): void {
		super.ngOnInit();
		this.select.optionExpandedChange$.pipe(takeUntil(this.destroy$)).subscribe(({ option, expanded }) => this.#onExpandedChange(option, expanded));
	}

	/**
	 * Called right before page 0 of a new clue or params, which is where a search begins and ends.
	 * Hooked here rather than on the clue stream, which has no ordering guarantee against the reload
	 * it triggers — the matches were being wiped just after being recorded.
	 */
	protected override clearLastPageByClue(): void {
		super.clearLastPageByClue();
		const clue = this.clue() ?? '';
		this.#matchedChildren.clear();

		if (clue && this.#expandedBeforeSearch === null) {
			// Entering a search: what the user had unfolded is put aside, to be given back after
			this.#expandedBeforeSearch = new Set(this.#expandedLegalUnitIds);
		} else if (!clue && this.#expandedBeforeSearch !== null) {
			this.#expandedLegalUnitIds.clear();
			this.#expandedBeforeSearch.forEach((id) => this.#expandedLegalUnitIds.add(id));
			this.#expandedBeforeSearch = null;
		}

		this.#publishChildren();
	}

	/** A search shows only what it matched; outside one, everything a legal unit holds. */
	#publishChildren(): void {
		this.#renderedChildren$.next(new Map(this.clue() ? this.#matchedChildren : this.#allChildren));
	}

	/**
	 * The list is the legal units; establishments only join it once their row is unfolded. A search is
	 * the exception: an establishment can match while its legal unit does not, so the first page of a
	 * search looks the establishments up too and brings their legal unit along, unfolded.
	 */
	protected override getOptions(params: Record<string, string | number | boolean> | null, page: number): Observable<LuLegalUnitEstablishmentOption[]> {
		const legalUnits$ = this.#fetchLegalUnits(params, page);
		if (!this.clue() || page > 0) {
			return legalUnits$;
		}
		return forkJoin([legalUnits$, this.#fetchMatchingEstablishments(params)]).pipe(map(([byName, byEstablishment]) => this.#mergeLegalUnits(byName, byEstablishment)));
	}

	#fetchLegalUnits(params: Record<string, string | number | boolean> | null, page: number): Observable<LuLegalUnitOption[]> {
		return this.httpClient
			.get<ApiResponse<{ id: number; name: string }>>(this.legalUnitsUrl(), {
				params: { ...params, page: page + 1, limit: this.pageSize },
			})
			.pipe(map((response) => itemsOf(response).map(luLegalUnitOption)));
	}

	/**
	 * Splices the establishments of every unfolded legal unit right after it. Done here rather than in
	 * the branch because the accumulated option list is a single array indexed by page, and the
	 * hierarchy is only a view over it: children held in a branch would never reach it.
	 */
	protected override transformOptions(options: readonly LuLegalUnitEstablishmentOption[]): Observable<readonly LuLegalUnitEstablishmentOption[]> {
		return this.#renderedChildren$.pipe(map((children) => options.flatMap((option) => (option.kind === 'legalUnit' ? [option, ...(children.get(option.id) ?? [])] : [option]))));
	}

	generateTrees(items: LuLegalUnitEstablishmentOption[]): TreeNode<LuLegalUnitEstablishmentOption>[] {
		const branchByLegalUnit = new Map<number, TreeNode<LuLegalUnitEstablishmentOption>>();
		const trees: TreeNode<LuLegalUnitEstablishmentOption>[] = [];

		for (const item of items) {
			if (item.kind === 'legalUnit') {
				// Unfoldable before anything is loaded: its establishments are fetched on unfold, so an
				// empty branch is not a leaf.
				const branch: TreeNode<LuLegalUnitEstablishmentOption> = {
					node: item,
					children: [],
					expandable: true,
					// Unfolded straight away when a search reached it from below
					expanded: this.#expandedLegalUnitIds.has(item.id),
				};
				branchByLegalUnit.set(item.id, branch);
				trees.push(branch);
			}
		}

		for (const item of items) {
			if (item.kind === 'establishment') {
				branchByLegalUnit.get(item.legalUnitId)?.children?.push({ node: item, children: [] });
			}
		}

		return trees;
	}

	/**
	 * The establishments a clue matched, each with the legal unit it hangs from — the DTO carries it,
	 * the only join the two collections have. They are recorded on the way, so the matching rows are
	 * already in place when the branch unfolds.
	 */
	#fetchMatchingEstablishments(params: Record<string, string | number | boolean> | null): Observable<LuLegalUnitOption[]> {
		return this.httpClient
			.get<ApiResponse<MatchedEstablishment>>(this.establishmentsUrl(), {
				params: { ...params, page: 1, limit: this.pageSize },
			})
			.pipe(
				map((response) => itemsOf(response)),
				tap((establishments) => this.#recordMatches(establishments)),
				map((establishments) => establishments.flatMap((establishment) => (establishment.legalUnit ? [luLegalUnitOption(establishment.legalUnit)] : []))),
			);
	}

	#recordMatches(establishments: MatchedEstablishment[]): void {
		for (const establishment of establishments) {
			// Unfolded so the match is visible. A row folded by hand afterwards leaves this set and
			// stays folded, until the next clue brings it back.
			this.#expandedLegalUnitIds.add(establishment.legalUnitId);
			this.#matchedChildren.set(establishment.legalUnitId, [...(this.#matchedChildren.get(establishment.legalUnitId) ?? []), luEstablishmentOption(establishment)]);
		}
		this.#publishChildren();
	}

	/** A legal unit reached by both routes stays a single row. */
	#mergeLegalUnits(byName: LuLegalUnitOption[], byEstablishment: LuLegalUnitOption[]): LuLegalUnitOption[] {
		const byId = new Map(byName.map((legalUnit) => [legalUnit.id, legalUnit]));
		for (const legalUnit of byEstablishment) {
			if (!byId.has(legalUnit.id)) {
				byId.set(legalUnit.id, legalUnit);
			}
		}
		return [...byId.values()];
	}

	#onExpandedChange(option: LuLegalUnitEstablishmentOption, expanded: boolean): void {
		if (option.kind !== 'legalUnit') {
			return;
		}

		if (expanded) {
			this.#expandedLegalUnitIds.add(option.id);
		} else {
			this.#expandedLegalUnitIds.delete(option.id);
		}

		// Fetched once per legal unit: folding a row back keeps its establishments, so unfolding it
		// again costs nothing.
		if (!expanded || this.#allChildren.has(option.id)) {
			this.#publishChildren();
			return;
		}

		this.#fetchEstablishments(option.id, 0)
			.pipe(takeUntil(this.destroy$))
			.subscribe((establishments) => {
				this.#allChildren.set(option.id, establishments);
				this.#publishChildren();
			});
	}

	#fetchEstablishments(legalUnitId: number, page: number): Observable<LuEstablishmentOption[]> {
		return luAccumulatePages((nextPage) => {
			const params = { legalUnitId, sort: 'name', page: nextPage + 1, limit: this.pageSize };
			return this.httpClient.get<ApiResponse<{ id: number; name: string; legalUnitId: number }>>(this.establishmentsUrl(), { params }).pipe(
				map((response) => itemsOf(response)),
				map((items) => ({ items: items.map(luEstablishmentOption), isLastPage: items.length < this.pageSize })),
			);
		}, page);
	}
}
