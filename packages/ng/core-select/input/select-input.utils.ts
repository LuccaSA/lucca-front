import { catchError, defaultIfEmpty, defer, distinctUntilChanged, EMPTY, expand, finalize, map, Observable, of, scan, startWith, switchMap, take, takeWhile, tap, timer } from 'rxjs';
import { SelectDataSource, SelectDataSourceParams } from '../select.model';

export interface BuildOptionsFromDataSourceDeps {
	nextPage$: Observable<void>;
	clue$: Observable<string | null>;
	isPanelOpen$: Observable<boolean>;
	setLoading: (loading: boolean) => void;
}

export function buildOptionsFromDataSource<TOption>(ds: SelectDataSource<TOption>, deps: BuildOptionsFromDataSourceDeps): Observable<readonly TOption[]> {
	const { clue$, isPanelOpen$ } = deps;

	// Resets and reloads from page 0 with the current clue. `paramsChange` carries params changes only:
	// clue changes are already handled by `clue$`, whose emissions must not load a second time
	const paramsChange$ = ds.paramsChange ?? EMPTY;

	const normalizedClue$ = clue$.pipe(
		map((clue) => clue ?? ''),
		distinctUntilChanged(),
	);

	// If a debounce is specified:
	// - empty clue ('') passes through immediately (initial state / clear)
	// - non-empty clue is debounced (user is typing)
	const debouncedClue$ = ds.clueDebounceMs ? normalizedClue$.pipe(switchMap((clue) => (clue ? timer(ds.clueDebounceMs!).pipe(map(() => clue)) : of(clue)))) : normalizedClue$;

	return isPanelOpen$.pipe(
		distinctUntilChanged(),
		switchMap((isOpen) => {
			if (!isOpen) {
				return of([] as readonly TOption[]);
			}

			return debouncedClue$.pipe(
				switchMap((clue) =>
					// A params change restarts the very same load as a clue change would, minus the debounce:
					// it comes from a deliberate action (a panel header toggle, a filter) and not from typing
					paramsChange$.pipe(
						startWith(null),
						switchMap(() => {
							ds.reset?.();
							const options$ = ds.paginated === false ? wholeList(ds, clue) : accumulatedPages(ds, clue, deps);
							return options$.pipe(
								// Applied on the accumulated list so cross-page decorations (eg. homonyms) can be computed
								// Falls back to the raw accumulated options so a failing decoration doesn't kill the whole stream
								switchMap((options) => defer(() => ds.transformOptions?.(options) ?? of(options)).pipe(catchError(() => of(options)))),
							);
						}),
					),
				),
			);
		}),
	);
}

/**
 * Data source owning the whole list (`[options]` + `(nextPage)`): every emission is the complete list,
 * so there is nothing to accumulate, no page to guard against, and no loading state to infer — the
 * consumer owns the fetching, hence the loading row too, through the `loading` input.
 */
function wholeList<TOption>(ds: SelectDataSource<TOption>, clue: string): Observable<readonly TOption[]> {
	const params: SelectDataSourceParams = { clue, page: 0 };
	return ds.getOptions(params).pipe(catchError(() => of([] as readonly TOption[])));
}

/**
 * Paginated data source: one request per page, accumulated in order until two consecutive pages come
 * back empty.
 *
 * `expand` asks for the next page from the result of the previous one, so `nextPage$` is only listened
 * to between two pages: a page can't be asked for while one is in flight, and the extra scroll events
 * Firefox emits at the bottom of the panel fall on no subscriber instead of queueing pages. Pages also
 * only ever enter the accumulator once they answered, so the guard below can't take one that is still
 * loading for an empty one.
 */
function accumulatedPages<TOption>(ds: SelectDataSource<TOption>, clue: string, { nextPage$, setLoading }: BuildOptionsFromDataSourceDeps): Observable<readonly TOption[]> {
	const loadPage = (page: number): Observable<{ page: number; items: readonly TOption[]; isFirstAnswer: boolean }> =>
		ds.getOptions({ clue, page }).pipe(
			catchError(() => of([] as readonly TOption[])),
			// A request completing without emitting still answers its page, rather than locking pagination
			defaultIfEmpty([] as readonly TOption[]),
			// A long lived data source keeps refreshing its page: those later emissions update the
			// accumulated list, but only the first one answers the page — it alone arms the request for
			// the next page and clears the loading row, which a refresh must leave up while a page is in flight
			map((items, index) => ({ page, items, isFirstAnswer: index === 0 })),
			tap({
				subscribe: () => setLoading(true),
				next: ({ isFirstAnswer }) => {
					if (isFirstAnswer) {
						setLoading(false);
					}
				},
			}),
		);

	return loadPage(0).pipe(
		expand(({ page, isFirstAnswer }) =>
			isFirstAnswer
				? nextPage$.pipe(
						take(1),
						switchMap(() => loadPage(page + 1)),
					)
				: EMPTY,
		),
		scan(
			(acc, { page, items }) => {
				acc[page] = items;
				return acc;
			},
			{} as Record<number, readonly TOption[]>,
		),
		// Stop calling pages when the last two pages came back empty
		takeWhile((pages) => {
			const lastPages = Object.values(pages).slice(-2);
			return lastPages.length < 2 || !lastPages.every((items) => items.length === 0);
		}),
		map((pages) => Object.values(pages).flat()),
		finalize(() => setLoading(false)), // Avoid infinite loading on complete API or error
	);
}
