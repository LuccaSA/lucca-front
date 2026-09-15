import { Injectable } from '@angular/core';

/**
 * Single, shared IntersectionObserver used by every tooltip to defer its first ellipsis
 * measurement until the host element is near the viewport.
 *
 * One observer for the whole page is far cheaper than one IntersectionObserver per tooltip when
 * many tooltips are created at once (e.g. a large table being (re)rendered): the browser then
 * delivers a single batched callback instead of one per element.
 */
@Injectable({ providedIn: 'root' })
export class TooltipVisibilityObserver {
	#observer?: IntersectionObserver;
	readonly #callbacks = new WeakMap<Element, () => void>();

	/** Calls `onVisible` once — the first time `element` comes near the viewport — then stops observing it. */
	observeOnce(element: Element, onVisible: () => void): void {
		this.#callbacks.set(element, onVisible);
		this.#getObserver().observe(element);
	}

	unobserve(element: Element): void {
		this.#callbacks.delete(element);
		this.#observer?.unobserve(element);
	}

	// Created lazily so the observer is only instantiated in the browser, on first use.
	#getObserver(): IntersectionObserver {
		return (this.#observer ??= new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) {
						continue;
					}
					const onVisible = this.#callbacks.get(entry.target);
					this.unobserve(entry.target);
					onVisible?.();
				}
			},
			{ rootMargin: '100px' },
		));
	}
}
