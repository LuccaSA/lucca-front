// Clip of what a story actually paints, shared by the before and after captures so they can be compared side by side.

// Union of what is actually painted (text, leaf elements, backgrounds, borders, shadows) — not full-width wrappers.
// Overlays (tooltips, dropdowns, dialogs) are rendered by the CDK outside #storybook-root: they are measured too.
export function contentBox(page) {
	return page.evaluate(() => {
		const r = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
		const add = (b) => {
			if (!b.width || !b.height) return;
			r.x1 = Math.min(r.x1, b.left + scrollX);
			r.y1 = Math.min(r.y1, b.top + scrollY);
			r.x2 = Math.max(r.x2, b.right + scrollX);
			r.y2 = Math.max(r.y2, b.bottom + scrollY);
		};
		for (const root of document.querySelectorAll('#storybook-root, .cdk-overlay-container')) {
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
			while (walker.nextNode()) {
				const node = walker.currentNode;
				if (node.nodeType === Node.TEXT_NODE) {
					if (!node.textContent.trim()) continue;
					const range = document.createRange();
					range.selectNodeContents(node);
					for (const b of range.getClientRects()) add(b);
					continue;
				}
				// The backdrop covers the whole viewport: measuring it would undo the crop
				if (node.classList.contains('cdk-overlay-backdrop')) continue;
				const s = getComputedStyle(node);
				if (s.display === 'none' || s.visibility === 'hidden') continue;
				const border = ['Top', 'Right', 'Bottom', 'Left'].some(
					(side) => parseFloat(s[`border${side}Width`]) > 0 && s[`border${side}Style`] !== 'none',
				);
				// Text is measured through its text nodes; an empty leaf (live region, positioning box) paints nothing.
				// Icons draw through ::before/::after content, media and form controls through their own box.
				const pseudo = ['::before', '::after'].some((p) => !['none', 'normal'].includes(getComputedStyle(node, p).content));
				const replaced = /^(IMG|SVG|svg|VIDEO|CANVAS|INPUT|TEXTAREA|SELECT|BUTTON)$/.test(node.tagName);
				const painted =
					pseudo ||
					replaced ||
					border ||
					s.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
					s.backgroundImage !== 'none' ||
					s.boxShadow !== 'none';
				if (painted) add(node.getBoundingClientRect());
			}
		}
		return Number.isFinite(r.x1) ? r : null;
	});
}

export function union(boxes) {
	const pad = 16;
	if (!boxes.length) return { x: 0, y: 0, width: 1280, height: 800 };
	const x1 = Math.max(0, Math.min(...boxes.map((b) => b.x1)) - pad);
	const y1 = Math.max(0, Math.min(...boxes.map((b) => b.y1)) - pad);
	const x2 = Math.max(...boxes.map((b) => b.x2)) + pad;
	const y2 = Math.max(...boxes.map((b) => b.y2)) + pad;
	return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}
