import { afterNextRender, afterRenderEffect, DestroyRef, inject, Injector, Signal, untracked } from '@angular/core';
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

/**
 * Requests the next page for as long as the panel's scroll viewport can't scroll.
 *
 * Pagination is driven by the scroll event: reaching the bottom of the viewport asks the consumer
 * for the next page. A page that doesn't overflow the viewport therefore never asks for anything —
 * there is nothing to scroll. The popover panel caps its content at 20rem, which a page of options
 * always overflows, so this never came up; the bottom sheet is only as tall as its content instead,
 * so a first page of a few options leaves it short of a scrollbar and pagination stops right there.
 *
 * So the viewport is measured again after every render and, while it still can't scroll, the next
 * page is requested. The option count is what guards against an endless loop: a page that brought
 * no new option — the data source is exhausted — is never requested twice. A new search landing on
 * exactly the same count as the last requested page is the one case left unfilled, which the next
 * scroll — or the next keystroke — resolves on its own.
 *
 * The request itself is deferred by a microtask: the panel's first render happens inside the sheet's
 * own `ApplicationRef.tick()`, which `openPanel` runs *before* subscribing the select input to the
 * panel ref, so a page requested straight from that render would be emitted into the void. A
 * microtask lands once `openPanel` has returned, still well ahead of anything the user could do.
 *
 * Must be called from an injection context.
 */
export function fillScrollViewport({
	viewport,
	optionCount,
	loading,
	nextPage,
}: {
	viewport: Signal<HTMLElement | undefined>;
	optionCount: Signal<number>;
	loading: Signal<boolean>;
	nextPage: () => void;
}): void {
	let lastRequestedCount: number | null = null;
	let destroyed = false;
	inject(DestroyRef).onDestroy(() => (destroyed = true));

	afterRenderEffect({
		read: () => {
			const element = viewport();
			const count = optionCount();

			if (!element || loading() || count === 0 || count === lastRequestedCount) {
				return;
			}

			// `scrollHeight` and `clientHeight` are both rounded, so a sub-pixel difference between
			// them isn't a scrollbar: the same 1px tolerance as the panels' scroll handler applies.
			if (element.scrollHeight - element.clientHeight > 1) {
				return;
			}

			lastRequestedCount = count;
			queueMicrotask(() => {
				if (!destroyed) {
					untracked(nextPage);
				}
			});
		},
	});
}
