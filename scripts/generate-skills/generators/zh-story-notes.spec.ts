import { describe, expect, it } from 'vitest';
import { extractZhStoryNotes } from './template-renderer';

/**
 * `extractZhStoryNotes` used to push EVERY line of every ts/typescript/css code block of a
 * ZeroHeight tab into a single `imports: string[]`. Two consequences, both shipped in the skill:
 * TypeScript lines rendered inside the SCSS fence, and multi-line excerpts (an options object, a
 * directive class) flattened into a list of orphan, re-indented lines.
 */
const tab = (body: string) => `<tab><tab-title>Base</tab-title>\n[story](https://lucca-front.lucca.io/storybook/iframe.html?id=daterangeinput--with-shortcuts)\n${body}\n</tab>`;

describe('extractZhStoryNotes', () => {
	it('separates Sass imports from TypeScript imports', () => {
		const [note] = extractZhStoryNotes(tab("```css\n@forward '@lucca-front/scss/src/components/time';\n```\n```ts\nimport { FormFieldComponent } from '@lucca-front/ng/form-field';\n```"));

		expect(note.scssImports).toEqual(["@forward '@lucca-front/scss/src/components/time';"]);
		expect(note.tsImports).toEqual(["import { FormFieldComponent } from '@lucca-front/ng/form-field';"]);
	});

	it('keeps a non-import excerpt verbatim as a snippet instead of passing it off as imports', () => {
		const [note] = extractZhStoryNotes(tab("```ts\nshortcuts: [\n\t{\n\t\tlabel: 'Last week',\n\t},\n]\n```"));

		expect(note.tsImports).toEqual([]);
		expect(note.snippets).toEqual([{ lang: 'ts', code: "shortcuts: [\n\t{\n\t\tlabel: 'Last week',\n\t},\n]" }]);
	});

	it('fences a Sass excerpt as scss, keeping ```css for the import block', () => {
		const [note] = extractZhStoryNotes(tab('```css\n.foo {\n\tcolor: red;\n}\n```'));

		expect(note.snippets).toEqual([{ lang: 'scss', code: '.foo {\n\tcolor: red;\n}' }]);
	});

	it('captures tsx blocks, which were skipped entirely', () => {
		const [note] = extractZhStoryNotes(tab("```tsx\nimport { LuDialogService } from '@lucca-front/ng/dialog';\nbootstrapApplication(App);\n```"));

		expect(note.tsImports).toEqual(["import { LuDialogService } from '@lucca-front/ng/dialog';"]);
		expect(note.snippets).toEqual([{ lang: 'ts', code: 'bootstrapApplication(App);' }]);
	});

	it('drops a comment-only leftover', () => {
		const [note] = extractZhStoryNotes(tab("```css\n// Imports additionnels\n@use '@lucca-front/scss/src/tools';\n```"));

		expect(note.scssImports).toEqual(["@use '@lucca-front/scss/src/tools';"]);
		expect(note.snippets).toEqual([]);
	});

	it('deduplicates repeated import lines', () => {
		const [note] = extractZhStoryNotes(tab("```ts\nimport { A } from 'x';\n```\n```ts\nimport { A } from 'x';\nimport { B } from 'y';\n```"));

		expect(note.tsImports).toEqual(["import { A } from 'x';", "import { B } from 'y';"]);
	});

	it('ignores a tab with no story link', () => {
		expect(extractZhStoryNotes("<tab><tab-title>Base</tab-title>\n```ts\nimport { A } from 'x';\n```\n</tab>")).toEqual([]);
	});
});
