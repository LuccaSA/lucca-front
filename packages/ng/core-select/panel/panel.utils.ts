import { afterNextRender, computed, Injector, Signal } from '@angular/core';

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
 * In order to avoid a blinking when we go from empty clue to a clue
 * We need to delay the change of group displayer location by waiting for the options to be updated.
 */
export function getGroupTemplateLocation(hasGrouping: Signal<boolean>, clue: Signal<string>, searchable = true): Signal<GroupTemplateLocation> {
	const hasClue = computed(() => !!clue());

	return computed(() => {
		if (!hasGrouping()) {
			return 'none';
		}

		if (!searchable) {
			return 'group-header';
		}

		return hasClue() ? 'option' : 'group-header';
	});
}
