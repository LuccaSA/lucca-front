import { describe, expect, it } from 'vitest';
import { extractTemplateLiterals } from './story-source';

/**
 * Story templates that the extractor used to miss entirely. A miss is not benign: the story was
 * still published (it had imports), so the reader got a `### Name` heading over an import block
 * and no markup at all — `daterangeinput` shipped as 29 lines with no `<lu-date-range-input>`.
 *
 * 53 of 596 stories at v21.3.1 were in that state, 55 of 636 at v22.0.0.
 */
describe('extractTemplateLiterals', () => {
	it('reads a bare template literal', () => {
		expect(extractTemplateLiterals('const s = { template: `<lu-box>Hello</lu-box>` };')).toEqual(['<lu-box>Hello</lu-box>']);
	});

	it('reads a template wrapped in a helper call — the repo\'s dominant shape', () => {
		const src = 'render: () => ({ template: cleanupTemplate(`<lu-box>Hello</lu-box>`) })';

		expect(extractTemplateLiterals(src)).toEqual(['<lu-box>Hello</lu-box>']);
	});

	it('reads through nested helper calls', () => {
		expect(extractTemplateLiterals('template: outer(inner(`<p>x</p>`))')).toEqual(['<p>x</p>']);
	});

	it('reads a returned quoted string containing markup', () => {
		expect(extractTemplateLiterals(`function getTemplate() { return '<span class="tag">Text</span>'; }`)).toEqual([
			'<span class="tag">Text</span>',
		]);
	});

	it('ignores a returned string that is not markup', () => {
		expect(extractTemplateLiterals("function label() { return 'Lorem ipsum'; }")).toEqual([]);
	});

	it('does not mistake an identifier starting with return for the keyword', () => {
		expect(extractTemplateLiterals("const returnValue = '<p>x</p>';")).toEqual([]);
	});

	it('collapses interpolations into a placeholder', () => {
		expect(extractTemplateLiterals('template: cleanupTemplate(`<lu-box ${generateInputs(args, argTypes)} />`)')).toEqual([
			'<lu-box ${…} />',
		]);
	});

	it('deduplicates a template matched by both patterns', () => {
		expect(extractTemplateLiterals('return `<p>x</p>`;\ntemplate: `<p>x</p>`')).toEqual(['<p>x</p>']);
	});
});
