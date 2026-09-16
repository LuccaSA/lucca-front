import { catchError, concatMap, defer, distinctUntilChanged, filter, finalize, map, Observable, of, scan, startWith, switchMap, takeWhile, tap, timer } from 'rxjs';
import { SelectDataSource } from '../select.model';

export interface BuildOptionsFromDataSourceDeps {
	nextPage$: Observable<void>;
	clue$: Observable<string | null>;
	isPanelOpen$: Observable<boolean>;
	setLoading: (loading: boolean) => void;
	/**
	 * Called when a next page request is actually accepted (ie. not dropped because a page is already
	 * loading). Data sources that close their current page when the next one is asked must rely on this
	 * rather than on `nextPage$`, whose duplicates would cut a page still waiting for its options.
	 */
	onPageAccepted?: () => void;
}

/**
 * State of a single page in the accumulator: a page stays `pending` until its request emits, so the
 * pagination guard never mistakes a page that is still loading for a page the data source answered empty.
 */
interface PageState<TOption> {
	status: 'pending' | 'loaded';
	items: readonly TOption[];
}

type PageEmission<TOption> = PageState<TOption> & { page: number };

export function buildOptionsFromDataSource<TOption>(ds: SelectDataSource<TOption>, deps: BuildOptionsFromDataSourceDeps): Observable<readonly TOption[]> {
	const { nextPage$, clue$, isPanelOpen$, setLoading, onPageAccepted } = deps;

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
					// `defer` so the paging state below is rebuilt for each clue, alongside the accumulator
					return defer(() => {
						let isPageLoading = false;
						let lastPage = 0;

						// Only one page in flight at a time: scrolling to the bottom of the panel can ask for the
						// next page twice (Firefox emits two scroll events where Chrome emits one), and asking for
						// page n+1 before page n has answered would leave two pending pages behind.
						const page$ = nextPage$.pipe(
							filter(() => !isPageLoading),
							map(() => ++lastPage),
							// Emitted before `concatMap` subscribes to the new page, so a data source closing its current
							// page on this signal doesn't lose options that are still on their way
							tap(() => onPageAccepted?.()),
							startWith(0),
						);

						return page$.pipe(
							concatMap((page) => {
								isPageLoading = true;
								setLoading(true);
								const pageLoaded = () => {
									isPageLoading = false;
									setLoading(false);
								};
								return ds.getOptions({ clue, page }).pipe(
									catchError(() => of([] as readonly TOption[])),
									tap(pageLoaded),
									map((items) => ({ page, status: 'loaded', items }) satisfies PageEmission<TOption>),
									startWith({ page, status: 'pending', items: [] } satisfies PageEmission<TOption>),
									// A request completing without emitting (or erroring) must not keep pagination locked
									finalize(pageLoaded),
								);
							}),
							scan(
								(acc, { page, status, items }) => {
									acc[page] = { status, items };
									return acc;
								},
								{} as Record<number, PageState<TOption>>,
							),
							// Stop calling pages when the last two *loaded* pages are empty
							takeWhile((pages) => {
								const lastLoadedPages = Object.values(pages)
									.filter(({ status }) => status === 'loaded')
									.slice(-2);
								return lastLoadedPages.length < 2 || !lastLoadedPages.every(({ items }) => items.length === 0);
							}),
							map((pages) => Object.values(pages).flatMap(({ items }) => items)),
							// Applied on the accumulated list so cross-page decorations (eg. homonyms) can be computed
							// Falls back to the raw accumulated options so a failing decoration doesn't kill the whole stream
							switchMap((options) => defer(() => ds.transformOptions?.(options) ?? of(options)).pipe(catchError(() => of(options)))),
							finalize(() => setLoading(false)), // Avoid infinite loading on complete API or error
						);
					});
				}),
			);
		}),
	);
}
