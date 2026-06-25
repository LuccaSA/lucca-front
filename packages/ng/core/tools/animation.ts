/**
 * Detects whether the user has requested reduced motion.
 * Returns `false` in non-browser environments (SSR), where there is nothing to animate.
 */
export function prefersReducedMotion(): boolean {
	return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

export interface WaitForAnimationsOptions {
	/** Also wait for animations running on descendant elements. Defaults to `false`. */
	subtree?: boolean;
}

/**
 * Waits for the CSS animations currently running on an element to finish.
 *
 * Resolves immediately when reduced motion is enabled, when the element has no
 * running animation, or in non-browser environments. Never rejects: a cancelled
 * animation still resolves, so it is safe to `await` in a closing/teardown flow.
 *
 * `Element.getAnimations()` flushes pending styles, so animations triggered by a
 * class added right before the call are taken into account.
 *
 * @example
 * host.classList.add('lu-popover-leave');
 * await waitForAnimations(host);
 * overlayRef.detach();
 */
export function waitForAnimations(element: Element, options?: WaitForAnimationsOptions): Promise<void> {
	if (prefersReducedMotion()) {
		return Promise.resolve();
	}

	const animations = element.getAnimations({ subtree: options?.subtree ?? false });

	if (animations.length === 0) {
		return Promise.resolve();
	}

	return Promise.allSettled(animations.map((animation) => animation.finished)).then(() => undefined);
}
