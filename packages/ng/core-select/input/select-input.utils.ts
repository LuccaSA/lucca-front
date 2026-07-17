import { catchError, concatMap, distinctUntilChanged, finalize, map, Observable, of, scan, startWith, switchMap, takeWhile, tap, timer } from 'rxjs';
import { SelectDataSource } from '../select.model';

export interface BuildOptionsFromDataSourceDeps {
	nextPage$: Observable<void>;
	clue$: Observable<string | null>;
	isPanelOpen$: Observable<boolean>;
	setLoading: (loading: boolean) => void;
}

export function buildOptionsFromDataSource<TOption>(ds: SelectDataSource<TOption>, deps: BuildOptionsFromDataSourceDeps): Observable<readonly TOption[]> {
	const { nextPage$, clue$, isPanelOpen$, setLoading } = deps;

	const page$ = nextPage$.pipe(
		scan((page) => page + 1, 0),
		startWith(0),
	);

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
				}),
			);
		}),
	);
}
