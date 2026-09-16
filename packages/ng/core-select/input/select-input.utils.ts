import { catchError, concatMap, defer, distinctUntilChanged, finalize, map, Observable, of, scan, startWith, switchMap, takeWhile, tap, timer } from 'rxjs';
import { SelectDataSource, SelectDataSourceParams } from '../select.model';

export interface BuildOptionsFromDataSourceDeps {
	nextPage$: Observable<void>;
	clue$: Observable<string | null>;
	isPanelOpen$: Observable<boolean>;
	setLoading: (loading: boolean) => void;
}

export function buildOptionsFromDataSource<TOption>(ds: SelectDataSource<TOption>, deps: BuildOptionsFromDataSourceDeps): Observable<readonly TOption[]> {
	const { clue$, isPanelOpen$ } = deps;

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
				switchMap((clue) => {
					ds.reset?.();
					const options$ = ds.paginated === false ? wholeList(ds, clue) : accumulatedPages(ds, clue, deps);
					return options$.pipe(
						// Applied on the accumulated list so cross-page decorations (eg. homonyms) can be computed
						// Falls back to the raw accumulated options so a failing decoration doesn't kill the whole stream
						switchMap((options) => defer(() => ds.transformOptions?.(options) ?? of(options)).pipe(catchError(() => of(options)))),
					);
				}),
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

/** Paginated data source: one request per page, accumulated in order until two consecutive pages come back empty. */
function accumulatedPages<TOption>(ds: SelectDataSource<TOption>, clue: string, { nextPage$, setLoading }: BuildOptionsFromDataSourceDeps): Observable<readonly TOption[]> {
	const page$ = nextPage$.pipe(
		scan((page) => page + 1, 0),
		startWith(0),
	);

	return page$.pipe(
		concatMap((page) => {
			setLoading(true);
			return ds.getOptions({ clue, page }).pipe(
				catchError(() => of([] as readonly TOption[])),
				tap(() => setLoading(false)),
				startWith([] as readonly TOption[]),
				map((items) => ({ items, page })),
			);
		}),
		scan(
			(acc, { items, page }) => {
				acc[page] = items;
				return acc;
			},
			{} as Record<number, readonly TOption[]>,
		),
		// Stop calling pages when last two pages are empty
		takeWhile((pages) => {
			const indexes = Object.keys(pages)
				.map((p) => parseInt(p))
				.sort((a, b) => a - b);
			const lastIndexes = indexes.slice(-2);
			return lastIndexes.length < 2 || !lastIndexes.every((i) => pages[i]?.length === 0);
		}),
		map((pages) => Object.values(pages).flat()),
		finalize(() => setLoading(false)), // Avoid infinite loading on complete API or error
	);
}
