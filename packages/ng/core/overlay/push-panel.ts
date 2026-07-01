/**
 * Reads the `--commons-pushPanel-inlineSize` design token — the inline-end space reserved for a
 * docked panel that shrinks the page content — from the document root, in pixels.
 * Returns 0 when the token is unset or cannot be parsed as a pixel length.
 */
export function getPushPanelInlineSize(element: Element): number {
	const raw = getComputedStyle(element).getPropertyValue('--commons-pushPanel-inlineSize').trim();
	return parsePxExpression(raw);
}

/**
 * Resolves a CSS length restricted to pixels: either a bare `<px>` value or a flat `calc(...)`
 * summing/subtracting px terms — since custom properties are returned verbatim by getComputedStyle,
 * a token like `calc(32px + 348px)` never resolves on its own. Returns 0 (clamped, non-negative)
 * for anything outside that grammar, including relative units this parser deliberately doesn't handle.
 */
function parsePxExpression(raw: string): number {
	const inner = (/^calc\((.*)\)$/.exec(raw)?.[1] ?? raw).replace(/\s+/g, '');
	const terms = inner.match(/[+-]?\d+(?:\.\d+)?px/g);
	if (!terms || terms.join('') !== inner) {
		return 0;
	}
	const sum = terms.reduce((acc, term) => acc + Number.parseFloat(term), 0);
	return Math.max(0, sum);
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
