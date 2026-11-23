import { HttpClient } from '@angular/common/http';
import { Directive, OnInit, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TreeGenerator, TreeNode, applySearchDelimiter, luAccumulatePages } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { BehaviorSubject, Observable, map, takeUntil } from 'rxjs';
import { LuLegalUnitEstablishmentDisplayerComponent } from './legal-unit-establishment-displayer.component';
import {
	LuEstablishmentOption,
	LuLegalUnitEstablishmentOption,
	LuLegalUnitEstablishmentSelection,
	LuLegalUnitOption,
	luEstablishmentOption,
	luLegalUnitEstablishmentOptions,
	luLegalUnitEstablishmentSelection,
	luLegalUnitOption,
} from './models';

/** Pinned by the API, which rejects a request without it. */
const API_VERSION = '2024-11-01';

/** Every collection of the API answers in this shape. */
interface ApiCollection<T> {
	items?: T[];
	links?: { prev?: { cursor: string } | null; next?: { cursor: string } | null } | null;
	embedded?: Record<string, Record<string, unknown>> | null;
}

interface ApiLegalEntity {
	id: string;
	legalName: string;
}

interface ApiEstablishment {
	id: string;
	name: string;
	legalEntity: { id: string };
}

/** One page, flattened: what it holds, and the cursor that reaches the next one. */
interface Page<T> {
	items: T[];
	nextCursor: string | null;
}

/**
 * Lists legal units and their establishments in a single multi-select, so a setting can target
 * either level. There is no endpoint serving both, so the two collections are combined here: the
 * legal units drive the list, and a legal unit fetches its establishments when it is unfolded.
 *
 * The API calls a legal unit a legal-entity. That name is kept at the edge only: everything the
 * consumer sees — the published value, the option kinds, the labels — speaks the language of the
 * interface, which is the one the guideline uses.
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

	readonly legalUnitsUrl = input<string>('/lucca-api/legal-entities');
	readonly establishmentsUrl = input<string>('/lucca-api/business-establishments');
	readonly searchDelimiter = input<string>(' ');

	/**
	 * Establishments are folded under their legal unit. Read by the panel through the tree generator
	 * contract: without it the list would have to load every establishment of every legal unit up
	 * front, which is what this field exists to avoid.
	 */
	readonly collapsable = true;

	/**
	 * A legal unit is a rule: selecting it covers the establishments it holds today and those added
	 * later, so it is published alone. Selecting its establishments one by one would freeze the
	 * selection to the ones that exist now, which is the opposite of what the field is for.
	 */
	readonly parentStandsForChildren = true;

	/**
	 * What the panel renders under each legal unit. A `BehaviorSubject` rather than a plain map
	 * because `transformOptions` keeps listening to it: every change re-emits the whole option list
	 * with the children spliced in, which is how rows fetched after the fact reach a pipeline that
	 * otherwise only grows one page at a time.
	 */
	readonly #renderedChildren$ = new BehaviorSubject<ReadonlyMap<string, LuEstablishmentOption[]>>(new Map());

	/** Everything a legal unit holds, kept across searches so clearing one costs no refetch. */
	readonly #allChildren = new Map<string, LuEstablishmentOption[]>();

	/** What the current clue matched, per legal unit. A search shows these alone. */
	readonly #matchedChildren = new Map<string, LuEstablishmentOption[]>();

	/**
	 * Which legal units are unfolded. Held here rather than in the branches, which die with the
	 * panel: this is what makes an unfolded row still unfolded the next time the panel opens, and
	 * what lets a row folded by hand during a search stay folded until the clue changes.
	 */
	readonly #expandedLegalUnitIds = new Set<string>();

	/** The unfolded rows as they were before the current search, restored when it is cleared. */
	#expandedBeforeSearch: Set<string> | null = null;

	/**
	 * Cursor opening each page of the list, learned from the page before it. Pages are asked for
	 * strictly in order and never two at a time, so remembering them by index is enough to walk a
	 * cursor-paginated collection through an accumulator that only counts.
	 */
	readonly #cursorByPage = new Map<number, string>();

	protected readonly clue = toSignal(this.clue$);

	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const clue = this.clue();
		// Neither collection takes a sort, so the order is the one the API returns.
		const params: Record<string, string | number | boolean> = {};
		if (clue) {
			params['search'] = applySearchDelimiter(clue, this.searchDelimiter());
		}
		return params;
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
		this.#cursorByPage.clear();

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
	 * The end of the collection is told by the API — a missing `next` link — rather than guessed from
	 * a short page, which is wrong whenever the total is an exact multiple of the page size.
	 */
	protected override getOptionsPage(params: Record<string, string | number | boolean> | null, page: number): Observable<{ items: LuLegalUnitEstablishmentOption[]; isLastPage: boolean }> {
		return this.#loadListPage(params, page).pipe(map(({ items, nextCursor }) => ({ items, isLastPage: nextCursor === null })));
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null, page: number): Observable<LuLegalUnitEstablishmentOption[]> {
		return this.#loadListPage(params, page).pipe(map(({ items }) => items));
	}

	/**
	 * Without a clue the list is the legal units. With one it is built from the establishments
	 * instead: only their collection can be searched, so a legal unit shows up when it holds a match
	 * and stays out otherwise — which is also what the guideline asks for.
	 */
	#loadListPage(params: Record<string, string | number | boolean> | null, page: number): Observable<Page<LuLegalUnitOption>> {
		return this.clue() ? this.#searchLegalUnits(params, page) : this.#fetchLegalUnits(params, page);
	}

	#fetchLegalUnits(params: Record<string, string | number | boolean> | null, page: number): Observable<Page<LuLegalUnitOption>> {
		return this.#fetchCollection<ApiLegalEntity>(this.legalUnitsUrl(), params, page).pipe(
			map((body) => ({
				items: (body.items ?? []).map((entity) => luLegalUnitOption({ id: entity.id, name: entity.legalName })),
				nextCursor: body.links?.next?.cursor ?? null,
			})),
		);
	}

	/**
	 * The legal units holding an establishment the clue matched. An establishment carries only a
	 * reference to its legal unit, the full one arriving in `embedded` — that dictionary is the only
	 * join the two collections have. Matches are recorded on the way, so the rows are already in
	 * place when the branch unfolds.
	 */
	#searchLegalUnits(params: Record<string, string | number | boolean> | null, page: number): Observable<Page<LuLegalUnitOption>> {
		return this.#fetchCollection<ApiEstablishment>(this.establishmentsUrl(), { ...params, include: 'embedded,links' }, page).pipe(
			map((body) => {
				const legalEntities = (body.embedded?.['legal-entity'] ?? {}) as Record<string, ApiLegalEntity | undefined>;
				const byId = new Map<string, LuLegalUnitOption>();

				for (const establishment of body.items ?? []) {
					const legalUnitId = establishment.legalEntity.id;
					const legalEntity = legalEntities[legalUnitId];
					if (legalEntity && !byId.has(legalUnitId)) {
						byId.set(legalUnitId, luLegalUnitOption({ id: legalEntity.id, name: legalEntity.legalName }));
					}
					this.#recordMatch(establishment);
				}

				this.#publishChildren();
				return { items: [...byId.values()], nextCursor: body.links?.next?.cursor ?? null };
			}),
		);
	}

	#recordMatch(establishment: ApiEstablishment): void {
		const legalUnitId = establishment.legalEntity.id;
		// Unfolded so the match is visible. A row folded by hand afterwards leaves this set and
		// stays folded, until the next clue brings it back.
		this.#expandedLegalUnitIds.add(legalUnitId);
		const option = luEstablishmentOption({ id: establishment.id, name: establishment.name, legalUnitId });
		this.#matchedChildren.set(legalUnitId, [...(this.#matchedChildren.get(legalUnitId) ?? []), option]);
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
		const branchByLegalUnit = new Map<string, TreeNode<LuLegalUnitEstablishmentOption>>();
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

		this.#fetchEstablishmentsOf(option.id)
			.pipe(takeUntil(this.destroy$))
			.subscribe((establishments) => {
				this.#allChildren.set(option.id, establishments);
				this.#publishChildren();
			});
	}

	/**
	 * Every establishment of one legal unit, walked to the end. The cursor is held in the closure
	 * rather than by page index: the accumulator asks for pages one after another and never two at a
	 * time, so the last answer always holds the way into the next.
	 */
	#fetchEstablishmentsOf(legalUnitId: string): Observable<LuEstablishmentOption[]> {
		let cursor: string | null = null;
		return luAccumulatePages(() =>
			this.#fetchCollection<ApiEstablishment>(this.establishmentsUrl(), { ['legalEntity.id']: legalUnitId }, 0, cursor).pipe(
				map((body) => {
					cursor = body.links?.next?.cursor ?? null;
					return {
						items: (body.items ?? []).map((establishment) => luEstablishmentOption({ id: establishment.id, name: establishment.name, legalUnitId })),
						isLastPage: cursor === null,
					};
				}),
			),
		);
	}

	/**
	 * One request to a collection. `page` is a cursor, not an index: the first page is asked for
	 * without it, and every next one with the cursor the page before handed back.
	 */
	#fetchCollection<T>(url: string, params: Record<string, string | number | boolean> | null, page: number, cursor?: string | null): Observable<ApiCollection<T>> {
		const pageCursor = cursor === undefined ? (page === 0 ? null : (this.#cursorByPage.get(page) ?? null)) : cursor;
		return this.httpClient
			.get<ApiCollection<T>>(url, {
				headers: { 'Api-Version': API_VERSION },
				params: {
					include: 'links',
					...params,
					limit: this.pageSize,
					...(pageCursor ? { page: pageCursor } : {}),
				},
			})
			.pipe(
				map((body) => {
					const next = body?.links?.next?.cursor;
					if (cursor === undefined && next) {
						this.#cursorByPage.set(page + 1, next);
					}
					return body ?? {};
				}),
			);
	}
}
