import { afterNextRender, Injector, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, of, skip, startWith, switchMap, take } from 'rxjs';

/**
 * Scrolls an element into view once its layout has settled.
 *
 * When a select panel opens, its opening animation (scale transform) makes the element's visual
 * geometry differ from its layout geometry; calling scrollIntoView at that point makes the browser
 * compute a bogus scroll position (e.g. the panel opens scrolled partway down). This waits, frame
 * by frame, until the element's visual height is stable before scrolling.
 *
 * Returns a cancel function to abort the pending scroll (e.g. when the highlight moves elsewhere).
 */
export function scrollIntoViewOnceReady(element: HTMLElement, injector: Injector, options?: () => ScrollIntoViewOptions | undefined): () => void {
	let rafId: number | null = null;
	let lastHeight = -1;

	const renderRef = afterNextRender(
		() => {
			const tryScroll = () => {
				rafId = null;
				if (!element.isConnected) {
					return;
				}
				const { height } = element.getBoundingClientRect();
				if (height > 0 && height === lastHeight) {
					element.scrollIntoView(options?.());
				} else {
					lastHeight = height;
					rafId = requestAnimationFrame(tryScroll);
				}
			};
			tryScroll();
		},
		{ injector },
	);

	return () => {
		renderRef.destroy();
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
		}
	};
}

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
