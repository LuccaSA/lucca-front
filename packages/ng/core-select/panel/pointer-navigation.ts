import { DestroyRef, DOCUMENT, inject, NgZone, Signal, signal, untracked } from '@angular/core';

/**
 * Tracks whether the user is currently navigating with the pointer or with the keyboard.
 *
 * Both listeners are registered natively and outside of the Angular zone, and the signal is only
 * written when the value actually changes: `mousemove` fires on every frame the mouse moves, and
 * going through Angular's event system there schedules a change detection run each time — for a
 * value that almost never changes.
 *
 * `scope` bounds pointer navigation to an element — pass the panel host. Moving the mouse anywhere
 * else on the page then doesn't drop the keyboard highlight, and leaving the scope switches back to
 * keyboard navigation: pointer mode paints the active item through `:hover` alone, which vanishes
 * with the pointer, whereas the key manager keeps that item active and keyboard navigation resumes
 * from it. `keydown` always listens on the document, since focus stays on the input, outside of the
 * panel.
 *
 * Must be called from an injection context.
 */
export function injectPointerNavigation(scope?: HTMLElement): Signal<boolean> {
	const document = inject(DOCUMENT);
	const ngZone = inject(NgZone);
	const pointerNavigation = signal(false);

	const abortController = new AbortController();
	inject(DestroyRef).onDestroy(() => abortController.abort());

	ngZone.runOutsideAngular(() => {
		const options: AddEventListenerOptions = { passive: true, signal: abortController.signal };

		(scope ?? document).addEventListener(
			'mousemove',
			() => {
				if (!untracked(pointerNavigation)) {
					pointerNavigation.set(true);
				}
			},
			options,
		);

		scope?.addEventListener(
			'mouseleave',
			() => {
				if (untracked(pointerNavigation)) {
					pointerNavigation.set(false);
				}
			},
			options,
		);

		document.addEventListener(
			'keydown',
			() => {
				if (untracked(pointerNavigation)) {
					pointerNavigation.set(false);
				}
			},
			options,
		);
	});

	return pointerNavigation.asReadonly();
}
