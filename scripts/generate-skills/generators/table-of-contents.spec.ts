import { describe, expect, it } from 'vitest';
import { withTableOfContents } from './table-of-contents';

const filler = (count: number) => Array.from({ length: count }, (_, i) => `line ${i}`).join('\n');

describe('withTableOfContents', () => {
	it('leaves a page of 100 lines or less untouched', () => {
		const page = `# button\n\n## Import\n${filler(97)}`;

		expect(withTableOfContents(page)).toBe(page);
	});

	it('lists the headings of a long page under its title', () => {
		const page = `# button\n\n## Import\n\n${filler(100)}\n## API Reference\n\n### ButtonComponent (component)\n`;

		expect(withTableOfContents(page).split('\n').slice(0, 9)).toEqual(['# button', '', '**Sommaire**', '', '- Import', '- API Reference', '  - ButtonComponent (component)', '', '## Import']);
	});

	it('lists every H1 after the title and strips emphasis, as ZeroHeight pages carry several', () => {
		const page = `# Couleurs\n\n# Product\n\n## **Utilisation**\n${filler(100)}`;

		expect(withTableOfContents(page)).toContain('**Sommaire**\n\n- Product\n  - Utilisation\n\n# Product');
	});

	it('ignores headings inside code fences', () => {
		const page = `# markdown\n\n## Usage\n\n\`\`\`md\n# Not a heading\n\`\`\`\n${filler(100)}`;

		expect(withTableOfContents(page)).toContain('**Sommaire**\n\n- Usage\n\n## Usage');
	});
});
