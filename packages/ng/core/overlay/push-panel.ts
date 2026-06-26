/**
 * Reads the `--commons-pushPanel-inlineSize` design token — the inline-end space reserved for a
 * docked panel that shrinks the page content — from the document root, in pixels.
 * Returns 0 when the token is unset or cannot be parsed as a pixel length.
 */
export function getPushPanelInlineSize(document: Document): number {
	const raw = getComputedStyle(document.documentElement).getPropertyValue('--commons-pushPanel-inlineSize').trim();
	const px = Number.parseFloat(raw);
	return Number.isFinite(px) ? px : 0;
}

/**
 * Builds a per-side viewport margin for a CDK `FlexibleConnectedPositionStrategy` so connected
 * overlays (popovers, tooltips, selects…) are pushed out of the reserved pushPanel zone on the
 * inline-end instead of overflowing into it. `base` is added to every side so an existing uniform
 * margin is preserved.
 */
export function getPushPanelViewportMargin(document: Document, base = 0): { start: number; end: number; top: number; bottom: number } {
	const push = getPushPanelInlineSize(document);
	return { start: base, end: base + push, top: base, bottom: base };
}
