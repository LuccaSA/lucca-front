import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, of, skip, startWith, switchMap, take } from 'rxjs';

export type GroupTemplateLocation = 'group-header' | 'option' | 'none';

/**
 * In order to avoid a blinking (and a stale option list rendered under the wrong layout)
 * when we go from an empty clue to a clue — or back — we delay switching the group displayer
 * location until the options have actually been updated. We keep showing `group-header` while
 * the options are being (re)fetched, then flip to the final location on the next options emission.
 */
export function getGroupTemplateLocation(hasGrouping: Signal<boolean>, clue: Signal<string>, options: Signal<readonly unknown[]>, searchable = true): Signal<GroupTemplateLocation> {
	// `toObservable` must run in an injection context, so convert every signal up front
	// (this function is called during panel construction) rather than lazily inside `switchMap`.
	const hasGrouping$ = toObservable(hasGrouping);
	const clue$ = toObservable(clue);
	const options$ = toObservable(options);

	// Wait for the options to update (skip the current, stale emission and take the next one)
	// before committing to the target location; meanwhile hold on `group-header`.
	const locationOnceOptionsUpdate$ = (hasClue: boolean) =>
		options$.pipe(
			skip(1),
			take(1),
			map((): GroupTemplateLocation => (hasClue ? 'option' : 'group-header')),
			startWith('group-header' as const satisfies GroupTemplateLocation),
		);

	const location$ = hasGrouping$.pipe(
		switchMap((grouping) => {
			if (!grouping) {
				return of<GroupTemplateLocation>('none');
			}

			return searchable
				? clue$.pipe(
						map((value) => !!value),
						distinctUntilChanged(),
						switchMap(locationOnceOptionsUpdate$),
					)
				: locationOnceOptionsUpdate$(false);
		}),
	);

	return toSignal(location$, { initialValue: hasGrouping() ? 'group-header' : 'none' });
}
