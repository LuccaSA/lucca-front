/**
 * Reads the `--commons-pushPanel-inlineSize` design token — the inline-end space reserved for a
 * docked panel that shrinks the page content — from the document root, in pixels.
 * Returns 0 when the token is unset or cannot be parsed as a pixel length.
 */
export function getPushPanelInlineSize(element: Element): number {
	const raw = getComputedStyle(element).getPropertyValue('--commons-pushPanel-inlineSize').trim();
	if (raw === '') {
		return 0;
	}

	// Custom properties aren't resolved by the browser (getComputedStyle returns them verbatim), so a
	// value like `calc(32px + 348px)` never matches a plain px regex. Assign it to a real <length>
	// property on a probe element and read back the computed value, which the browser always resolves to px.
	const probe = document.createElement('div');
	probe.style.position = 'absolute';
	probe.style.width = raw;
	// `element` may be a void element (e.g. an <input> carrying the trigger) that can't hold children,
	// so probe from its parent: custom properties inherit, so the resolution context is the same.
	const host = element.parentElement ?? element.ownerDocument.body;
	host.appendChild(probe);
	const computed = getComputedStyle(probe).width;
	probe.remove();

	const match = /^(\d+(?:\.\d+)?)px$/.exec(computed);
	return match ? Number.parseFloat(match[1]) : 0;
}

/**
 * Builds a per-side viewport margin for a CDK `FlexibleConnectedPositionStrategy` so connected
 * overlays (popovers, tooltips, selects…) are pushed out of the reserved pushPanel zone on the
 * inline-end instead of overflowing into it. `base` is added to every side so an existing uniform
 * margin is preserved.
 */
export function getPushPanelViewportMargin(element: Element, base = 0): { start: number; end: number; top: number; bottom: number } {
	const push = getPushPanelInlineSize(element);
	return { start: base, end: base + push, top: base, bottom: base };
}
