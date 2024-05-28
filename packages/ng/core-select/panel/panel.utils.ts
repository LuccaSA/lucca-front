import { Observable, distinctUntilChanged, map, of, skip, startWith, switchMap, take } from 'rxjs';

export type GroupTemplateLocation = 'group-header' | 'option' | 'none';

/**
 * In order to avoid a blinking when we go from empty clue to a clue
 * We need to delay the change of group displayer location by waiting for the options to be updated.
 */
export function getGroupTemplateLocation(hasGrouping: boolean, clueChange$: Observable<string>, options$: Observable<unknown[]>): Observable<GroupTemplateLocation> {
	return hasGrouping
		? clueChange$.pipe(
				map((clue) => !!clue),
				distinctUntilChanged(),
				switchMap((hasClue) =>
					options$.pipe(
						skip(1),
						take(1),
						map((): GroupTemplateLocation => (hasClue ? 'option' : 'group-header')),
					),
				),
				startWith('group-header' as const),
		  )
		: of('none' as const);
}
