import { DestroyRef, DOCUMENT, inject, NgZone, Signal, signal, untracked } from '@angular/core';

/**
 * Tracks whether the user is currently navigating with the pointer or with the keyboard.
 *
 * Both listeners are registered natively and outside of the Angular zone, and the signal is only
 * written when the value actually changes: `mousemove` fires on every frame the mouse moves, and
 * going through Angular's event system there schedules a change detection run each time — for a
 * value that almost never changes.
 *
 * Must be called from an injection context.
 */
export function injectPointerNavigation(): Signal<boolean> {
	const document = inject(DOCUMENT);
	const ngZone = inject(NgZone);
	const pointerNavigation = signal(false);

	const abortController = new AbortController();
	inject(DestroyRef).onDestroy(() => abortController.abort());

	ngZone.runOutsideAngular(() => {
		const options: AddEventListenerOptions = { passive: true, signal: abortController.signal };

		document.addEventListener(
			'mousemove',
			() => {
				if (!untracked(pointerNavigation)) {
					pointerNavigation.set(true);
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
