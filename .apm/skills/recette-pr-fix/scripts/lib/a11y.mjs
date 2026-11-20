// Accessibility audit of a rendered story with axe-core, the engine of Storybook's a11y addon.

import { createRequire } from 'node:module';

const axePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js');

// Violations of the story and its overlays, one entry per rule and element.
export async function auditA11y(page) {
	await page.addScriptTag({ path: axePath });
	return page.evaluate(async () => {
		const include = [...document.querySelectorAll('#storybook-root, .cdk-overlay-container')];
		// `region` asks for page landmarks: noise on an isolated story, as Storybook's a11y addon considers it too
		const { violations } = await window.axe.run({ include }, { rules: { region: { enabled: false } } });
		return violations.flatMap((v) => v.nodes.map((n) => ({ rule: v.id, impact: v.impact, target: n.target.join(' '), help: v.help })));
	});
}

// Violations added and fixed by the change; `existing` were already there before.
export function diffA11y(before, after) {
	const key = (v) => `${v.rule}|${v.target}`;
	const beforeKeys = new Set(before.map(key));
	const afterKeys = new Set(after.map(key));
	return {
		added: after.filter((v) => !beforeKeys.has(key(v))),
		fixed: before.filter((v) => !afterKeys.has(key(v))),
		existing: after.filter((v) => beforeKeys.has(key(v))),
	};
}

// "color-contrast ×2, button-name"
export const summarize = (violations) =>
	Object.entries(Object.groupBy(violations, (v) => v.rule))
		.map(([rule, list]) => (list.length > 1 ? `${rule} ×${list.length}` : rule))
		.join(', ');
