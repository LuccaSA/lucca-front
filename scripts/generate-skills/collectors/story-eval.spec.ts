import { describe, expect, it } from 'vitest';
import { renderStoryTemplates } from './story-eval';

/**
 * The evaluator runs a story in a `vm` where every import is an inert stub. Two ways that used to
 * abort the whole evaluation — and an abort is not neutral: the caller falls back to static
 * extraction, which publishes `<lu-bubble-icon${…}${…} />`, markup nobody can copy. On the 22.0
 * generation that cost 14 of 111 component pages their examples, every form field included.
 */
describe('renderStoryTemplates', () => {
	it('survives a spread of a stubbed import', () => {
		// `[...PALETTE]` on a stub used to throw "is not iterable", by design.
		const source = `
			import { PALETTE } from '@lucca/prisme/core';
			export default { title: 'X', argTypes: { palette: { options: [...PALETTE] } } };
			export const Basic = { render: () => ({ template: '<lu-thing />' }) };
		`;

		expect(renderStoryTemplates(source, new Map())).toEqual(['<lu-thing />']);
	});

	it('survives array destructuring of a stub', () => {
		// `const [formControl] = useState(…)` goes through Symbol.iterator too, but unlike a spread it
		// needs elements: an empty iterator hands back `undefined` and the next method call throws.
		// That is what kept `multilanguagefield` on placeholders.
		const source = `
			import { useState } from '@storybook/preview-api';
			export default { title: 'X' };
			export const Basic = { render: () => { const [ctrl] = useState(null); ctrl.disable(); return { template: '<lu-thing />' }; } };
		`;

		expect(renderStoryTemplates(source, new Map())).toEqual(['<lu-thing />']);
	});

	it('survives a helper this file does not re-implement', () => {
		// `useStoryModel` was added to the repo in 22.0. The helper list was closed, so it came back
		// undefined and every story calling it threw "is not a function".
		const source = `
			import { useStoryModel } from '@/helpers/stories';
			export default { title: 'X' };
			export const Basic = { render: () => { const m = useStoryModel(); return { props: { m }, template: '<lu-thing />' }; } };
		`;

		expect(renderStoryTemplates(source, new Map())).toEqual(['<lu-thing />']);
	});

	it('still resolves interpolations at default args', () => {
		const source = `
			export default { title: 'X' };
			export const Basic = { args: { label: 'Bonjour' }, render: (args) => ({ template: \`<lu-thing label="\${args.label}" />\` }) };
		`;

		expect(renderStoryTemplates(source, new Map())).toEqual(['<lu-thing label="Bonjour" />']);
	});

	it('rejects a template it could not fully resolve', () => {
		// Publishing a half-resolved template is worse than publishing none: the caller falls back.
		const source = `
			export default { title: 'X' };
			export const Basic = { render: () => ({ template: '<lu-thing \${unresolved} />' }) };
		`;

		expect(renderStoryTemplates(source, new Map())).toBeNull();
	});
});
