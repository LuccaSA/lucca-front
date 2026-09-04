import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { DestroyRef, ElementRef, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isNotNil } from '../misc';

function paneOf(element: Element): Element | null {
	// A trigger inside an overlay keeps its own behaviour when the focus moves within that same overlay.
	return element.closest('.cdk-overlay-pane');
}

const silentRequests = new WeakSet<HTMLElement>();

/**
 * Focuses `element` the way a closing overlay does.
 *
 * - Whatever a user focus reveals — a tooltip, a popover panel — stays hidden.
 * - Use it when an application moves the focus itself and wants none of that.
 * - Keep `element.focus()` when it wants that reveal.
 * - To reveal from an actual overlay handover, focus through `inject(FocusMonitor).focusVia(element, 'keyboard')`.
 */
export function focusSilently(element: HTMLElement): void {
	if (element.ownerDocument.activeElement !== element) {
		silentRequests.add(element);
	}

	element.focus();
}

/**
 * Emits every focus arrival on `host` that was aimed at `host` itself.
 *
 * - Skips the handover an overlay performs when it hands the focus back to its trigger on close.
 * - Skips the calls to `focusSilently`.
 * - Pointer, touch and keyboard arrivals always emit.
 * - An application calling `focus()` on the trigger emits too: it stays a request to focus it.
 * - Must be called in an injection context.
 * - Monitoring stops when that context is destroyed.
 */
export function ɵintentionalFocus$(host: ElementRef<HTMLElement>): Observable<FocusOrigin> {
	const element = host.nativeElement;
	const focusMonitor = inject(FocusMonitor);

	// Some overlays dispose their pane before handing the focus back, leaving nothing to inspect on the return leg.
	let leftToPane: Element | null = null;
	const trackDeparture = ({ relatedTarget }: FocusEvent) => {
		leftToPane = relatedTarget instanceof Element ? paneOf(relatedTarget) : null;
	};
	element.addEventListener('focusout', trackDeparture);

	inject(DestroyRef).onDestroy(() => {
		element.removeEventListener('focusout', trackDeparture);
		focusMonitor.stopMonitoring(host);
	});

	return focusMonitor.monitor(host).pipe(
		// `null` is the blur, which every trigger already handles on its own.
		filter(isNotNil),
		filter((origin) => {
			const cameBackFromPane = leftToPane;
			leftToPane = null;

			if (silentRequests.delete(element)) {
				return false;
			}

			// A handover comes back from the pane of another overlay, where an application's own `focus()` does not.
			return origin !== 'program' || cameBackFromPane === null || cameBackFromPane === paneOf(element);
		}),
	);
}
