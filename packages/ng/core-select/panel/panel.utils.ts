import { Observable, distinctUntilChanged, map, of, skip, startWith, switchMap, take, mergeMap } from 'rxjs';

export type GroupTemplateLocation = 'group-header' | 'option' | 'none';

/**
 * In order to avoid a blinking when we go from empty clue to a clue
 * We need to delay the change of group displayer location by waiting for the options to be updated.
 */
export function getGroupTemplateLocation(
	hasGrouping$: Observable<boolean>,
	clueChange$: Observable<string>,
	options$: Observable<readonly unknown[]>,
	searchable = true,
): Observable<GroupTemplateLocation> {
	return hasGrouping$.pipe(
		mergeMap((hasGrouping) => {
			if (!hasGrouping) {
				return of<GroupTemplateLocation>('none');
			}

			const getGroupTemplateLocation$ = (hasClue: boolean) =>
				options$.pipe(
					skip(1),
					take(1),
					map((): GroupTemplateLocation => (hasClue ? 'option' : 'group-header')),
					startWith('group-header' as const satisfies GroupTemplateLocation),
				);
			return searchable
				? clueChange$.pipe(
						map((clue) => !!clue),
						distinctUntilChanged(),
						switchMap(getGroupTemplateLocation$),
					)
				: getGroupTemplateLocation$(false);
		}),
	);
}
